import clsx from "clsx"
import Spinner from "../Spinner"
import "./Button.styles.scss"

export default function Button({
  as: Component = "button",
  children,

  variant = "primary",
  size = "md",

  leftIcon,
  rightIcon,

  loading = false,
  disabled = false,
  fullWidth = false,

  onClick,

  className,
  ...props
}) {
  const classes = clsx(
    "button",
    `button--${variant}`,
    `button--${size}`,
    {
      "is-loading": loading,
      "is-full": fullWidth,
    },
    className
  )

  const handleClick = (e) => {
    if (!onClick) return
    
    e.stopPropagation();
    onClick?.(e)
  }

  return (
    <Component
      className={classes}
      disabled={Component === "button" ? disabled || loading : undefined}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className="button__spinner">
          <Spinner size="sm" />
        </span>
      )}

      {!loading && leftIcon && (
        <span className="button__icon">{leftIcon}</span>
      )}

      {!loading && (
        <span className="button__label">{children}</span>
      )}

      {!loading && rightIcon && (
        <span className="button__icon">{rightIcon}</span>
      )}
    </Component>
  )
}