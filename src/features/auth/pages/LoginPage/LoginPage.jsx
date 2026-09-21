import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import { useAuthStore } from "@/store/auth.store"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { sendOtp, loginWithOtp } from "@/services/auth.service"

import Button from "@/components/ui/Button"
import "./LoginPage.styles.scss"

const INITIAL_RESEND_SECONDS = 30
const OTP_LENGTH = 6

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [resendSeconds, setResendSeconds] = useState(INITIAL_RESEND_SECONDS)
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""))

  const otpRefs = useRef([])

  const setUser = useAuthStore((state) => state.setUser)

  const isSignup = searchParams.get("mode") === "signup"

  const { register, handleSubmit, getValues, setValue, watch, reset } = useForm({
    defaultValues: {
      countryCode: "+91",
      phone: "",
      otp: "",
    },
  })

  const phone = watch("phone")
  const otp = watch("otp")

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,

    onSuccess: (_, variables) => {
      setPhoneNumber(variables.phone)
      setResendSeconds(INITIAL_RESEND_SECONDS)
      setOtpDigits(Array(OTP_LENGTH).fill(""))
      setStep("otp")
    },
  })

  const verifyOtpMutation = useMutation({
    mutationFn: loginWithOtp,

    onSuccess: (data) => {
      setUser(data.user)
    },
  })

  useEffect(() => {
    if (step !== "otp" || resendSeconds <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [step, resendSeconds])

  useEffect(() => {
    if (step !== "otp") {
      return
    }

    requestAnimationFrame(() => {
      otpRefs.current[0]?.focus()
    })
  }, [step])

  const handleSendOtp = ({ countryCode, phone }) => {
    sendOtpMutation.mutate({
      countryCode,
      phone,
    })
  }

  const handleVerifyOtp = () => {
    const otp = otpDigits.join("")

    if (otp.length !== OTP_LENGTH) {
      return
    }

    verifyOtpMutation.mutate({
      countryCode: getValues("countryCode"),
      phone: phoneNumber,
      otp,
    })
  }

  const updateOtpDigits = (digits) => {
    setOtpDigits(digits)

    setValue("otp", digits.join(""), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1)

    const nextDigits = [...otpDigits]
    nextDigits[index] = digit

    updateOtpDigits(nextDigits)

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpPaste = (event) => {
    event.preventDefault()

    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)

    if (!pastedDigits) {
      return
    }

    const nextDigits = Array(OTP_LENGTH).fill("")

    pastedDigits.split("").forEach((digit, index) => {
      nextDigits[index] = digit
    })

    updateOtpDigits(nextDigits)

    const focusIndex = Math.min(pastedDigits.length, OTP_LENGTH - 1)

    requestAnimationFrame(() => {
      otpRefs.current[focusIndex]?.focus()
    })
  }

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault()

      const nextDigits = [...otpDigits]

      if (nextDigits[index]) {
        nextDigits[index] = ""
        updateOtpDigits(nextDigits)
        return
      }

      if (index > 0) {
        nextDigits[index - 1] = ""
        updateOtpDigits(nextDigits)

        requestAnimationFrame(() => {
          otpRefs.current[index - 1]?.focus()
        })
      }

      return
    }

    if (event.key === "Delete") {
      event.preventDefault()

      const nextDigits = [...otpDigits]
      nextDigits[index] = ""

      updateOtpDigits(nextDigits)
      return
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault()
      otpRefs.current[index - 1]?.focus()
      return
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault()
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleChangeNumber = () => {
    reset({
      countryCode: "+91",
      phone: phoneNumber,
      otp: "",
    })

    setOtpDigits(Array(OTP_LENGTH).fill(""))
    setStep("phone")
  }

  return (
    <main className="prelaunch-auth-page">
      <section className="prelaunch-auth-content" aria-labelledby="auth-heading">
        {step === "phone" && (
          <>
            <p className="prelaunch-auth-eyebrow">{isSignup ? "SIGN UP" : "LOG IN"}</p>

            <h1 id="auth-heading">
              {isSignup ? (
                "Enter your phone number"
              ) : (
                <>
                  Enter your registered
                  <br />
                  phone number
                </>
              )}
            </h1>

            <form onSubmit={handleSubmit(handleSendOtp)} noValidate>
              <div className="prelaunch-phone-field">
                <span aria-hidden="true">+91</span>

                <label className="sr-only" htmlFor="phone">
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  autoFocus
                  aria-describedby="phone-helper phone-error"
                  aria-invalid={sendOtpMutation.error ? "true" : "false"}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                />
              </div>

              <p id="phone-helper" className="prelaunch-auth-helper">
                A six-digit code follows
              </p>

              {sendOtpMutation.error && (
                <p id="phone-error" className="prelaunch-auth-error" role="alert">
                  {getErrorMessage(sendOtpMutation.error)}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                loading={sendOtpMutation.isPending}
                disabled={!phone || phone.length !== 10}
                className="prelaunch-auth-button"
              >
                Send code
              </Button>

              <p className="prelaunch-auth-legal">
                <a href="/terms">Terms</a> and <a href="/privacy">privacy policy</a> apply.
              </p>

              {isSignup ? (
                <a href="/auth/login" className="prelaunch-auth-secondary-link">
                  Been here before? Log in →
                </a>
              ) : (
                <a href="/auth/login?mode=signup" className="prelaunch-auth-secondary-link">
                  First time here? Sign up →
                </a>
              )}
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="prelaunch-auth-eyebrow">VERIFY</p>

            <h1 id="auth-heading">Six-digit code</h1>

            <p className="prelaunch-auth-subtitle">
              Sent to +91 {phoneNumber}.{" "}
              <button
                type="button"
                onClick={handleChangeNumber}
                className="prelaunch-auth-change-number"
              >
                Change the number
              </button>
            </p>

            <form onSubmit={handleSubmit(handleVerifyOtp)}>
              <div
                className="prelaunch-otp-fields"
                role="group"
                aria-label="Six-digit verification code"
                onPaste={handleOtpPaste}
              >
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpRefs.current[index] = element
                    }}
                    id={`otp-${index + 1}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    value={digit}
                    aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                    aria-invalid={verifyOtpMutation.error ? "true" : "false"}
                    onChange={(event) => handleOtpChange(index, event.target.value)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  />
                ))}
              </div>

              <div className="prelaunch-otp-actions">
                <Button
                  type="submit"
                  loading={verifyOtpMutation.isPending}
                  disabled={otpDigits.some((digit) => !digit)}
                  className="prelaunch-otp-button"
                >
                  Verify code
                </Button>

                {verifyOtpMutation.error && (
                  <p className="prelaunch-otp-wrong" role="alert">
                    {getErrorMessage(verifyOtpMutation.error)}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="prelaunch-otp-resend"
                disabled={resendSeconds > 0 || sendOtpMutation.isPending}
                onClick={() =>
                  sendOtpMutation.mutate({
                    countryCode: getValues("countryCode"),
                    phone: phoneNumber,
                  })
                }
              >
                {resendSeconds > 0
                  ? `Resend in 0:${String(resendSeconds).padStart(2, "0")}`
                  : "Resend code"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  )
}
