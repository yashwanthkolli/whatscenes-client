import "./ProgressBar.styles.scss"

export default function ProgressBar({ answered, total }) {

  const percent = Math.round((answered / total) * 100)

  return (
    <div className="progress-bar">

      <div
        className="progress-bar__fill"
        style={{ width: `${percent}%` }}
      />

      <span className="progress-bar__text">
        {answered} / {total}
      </span>

    </div>
  )
}