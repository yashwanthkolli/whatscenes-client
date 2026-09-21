import "./Footer.styles.scss"

const RULES = [
  ["How it works", "how-it-works"],
  ["Safety", "/policy/safety"],
  ["Refunds", "/policy/refunds"],
  ["FAQ", "/policy/faq"],
]

const COMPANY = [
  ["Terms and conditions", "/policy/terms"],
  ["Privacy policy", "/policy/privacy"],
  ["Contact us", "/policy/contact"],
]

export default function FooterSection({ onHowItWorks }) {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__inner">
        <div className="landing-footer__brand">
          <span className="landing-footer__wordmark" aria-label="Whatscenes" />
          <div className="landing-footer__city">Hyderabad</div>
        </div>

        <div className="landing-footer__mobile-links">
          <button type="button" onClick={onHowItWorks}>
            How it works
          </button>
          <a href="/policy/safety">Safety</a>
          <a href="/policy/refunds">Refunds</a>
          <a href="/policy/faq">FAQ</a>
          <a href="/policy/terms">Terms</a>
          <a href="/policy/privacy">Privacy</a>
          <a href="/policy/contact">Contact us</a>
        </div>

        <FooterColumn title="the rules">
          {RULES.map(([label, href]) =>
            href === "how-it-works" ? (
              <button type="button" key={label} onClick={onHowItWorks}>
                {label}
              </button>
            ) : (
              <a href={href} key={label}>
                {label}
              </a>
            )
          )}
        </FooterColumn>

        <FooterColumn title="company">
          {COMPANY.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </FooterColumn>

        <div className="landing-footer__column landing-footer__column--follow">
          <div className="landing-footer__heading">follow</div>
          <div className="landing-footer__socials">
            <a
              href="https://www.instagram.com/whatscenes"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://www.linkedin.com/company/whatscenes"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </div>
      </div>

      <div className="landing-footer__copyright">© 2026 Whatscenes</div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div className="landing-footer__column">
      <div className="landing-footer__heading">{title}</div>
      <div className="landing-footer__links">{children}</div>
    </div>
  )
}
