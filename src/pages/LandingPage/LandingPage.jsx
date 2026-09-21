import HeroSection from "./Sections/HeroSection/HeroSection"

import "./LandingPage.styles.scss"
import CTASection from "./Sections/CTASection/CTASection"
import Footer from "./Sections/Footer/Footer"

export default function LandingPage() {
  return (
    <main className="landing-page">
      <HeroSection />
      <CTASection />
      <Footer />
    </main>
  )
}
