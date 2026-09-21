import { useState } from "react"
import "./CTASection.styles.scss"

const CTA_TITLE = "Popping scenes in Hyderabad soon"
const CTA_NOTE = "Build your next experience with us"
const SIGNUP_HREF = "auth/login?mode=signup"

const HOW_IT_WORKS = [
  [
    "01",
    "Sign up with your number",
    "A six-digit code, then a short profile. 21 and over, and three photos we use only to verify you.",
  ],
  [
    "02",
    "Answer the questions",
    "One at a time — where you are from, what you studied, what you do, how you live, how you are in a group, what you listen to and watch.",
  ],
  ["03", "Pick a scene and join the list", "Free. Nothing is charged while you are on a list."],
  [
    "04",
    "The engine brings your group together",
    "Language, age, lifestyle, social style and taste all have to line up. A pair is never seated together twice.",
  ],
  [
    "05",
    "Your match is released",
    "A message reaches you first. The seat is charged after that, never before.",
  ],
  [
    "06",
    "The night itself",
    "Three hours, seven guests and a trained host who opens each round. A public venue — the address comes 24 hours ahead.",
  ],
  [
    "07",
    "At the door",
    "An Aadhaar card that matches your profile. Your profile is marked verified after your first scene.",
  ],
  ["08", "After", "Anyone you and they both choose to keep shows up in your connections."],
]

export default function CTASection() {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)

  return (
    <>
      <section className="landing-cta">
        <div className="landing-cta__card">
          <div className="landing-cta__city">
            <span />
            Hyderabad
          </div>

          <h2>{CTA_TITLE}</h2>
          <p>{CTA_NOTE}</p>

          <div className="landing-cta__actions">
            <a href={SIGNUP_HREF} className="landing-cta__primary">
              Join the waitlist
            </a>
            <button
              type="button"
              className="landing-cta__secondary"
              onClick={() => setHowItWorksOpen(true)}
            >
              See how it works
            </button>
          </div>
        </div>
      </section>

      {howItWorksOpen && (
        <div
          className="landing-how-it-works"
          role="dialog"
          aria-modal="true"
          aria-label="How it works"
        >
          <button
            type="button"
            className="landing-how-it-works__backdrop"
            aria-label="Close"
            onClick={() => setHowItWorksOpen(false)}
          />
          <div className="landing-how-it-works__panel">
            <button
              type="button"
              className="landing-how-it-works__close"
              aria-label="Close"
              onClick={() => setHowItWorksOpen(false)}
            >
              ×
            </button>

            <div className="landing-how-it-works__eyebrow">how it works</div>
            <h3>The right strangers, picked on purpose</h3>

            <div className="landing-how-it-works__steps">
              {HOW_IT_WORKS.map(([number, title, text]) => (
                <div className="landing-how-it-works__step" key={number}>
                  <div className="landing-how-it-works__number">{number}</div>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
