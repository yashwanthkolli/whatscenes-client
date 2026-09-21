import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./HeroSection.styles.scss"

gsap.registerPlugin(ScrollTrigger)

/*
 * ============================================================
 * DESKTOP PEOPLE
 * ============================================================
 *
 * These are the exact 13 people from the supplied
 * WhatscenesPrelaunchDesktop.jsx.
 *
 * Reference world: 1536 x 1024
 *
 * Every person is composed of:
 *   - one head asset
 *   - one body asset
 *
 * The `order`, `y`, `tx`, and `ty` values are the same values
 * used by the original prototype's homeFrame().
 */

const DESKTOP_PEOPLE = [
  {
    id: 2,
    order: 2,
    y: 0,

    left: 652,
    top: 78,
    width: 97,
    height: 297,

    head: {
      src: "/assets/C/image6.png",
      left: 0,
      top: 0,
      width: 78,
      height: 80,
    },

    body: {
      src: "/assets/C/image7.png",
      left: 0,
      top: 59,
      width: 97,
      height: 238,
    },
  },

  {
    id: 1,
    order: 1,
    y: 0,

    left: 364,
    top: 98,
    width: 78,
    height: 316,

    head: {
      src: "/assets/C/image4.png",
      left: 0,
      top: 0,
      width: 78,
      height: 80,
    },

    body: {
      src: "/assets/C/image5.png",
      left: 0,
      top: 59,
      width: 78,
      height: 257,
    },
  },

  {
    id: 3,
    order: 3,
    y: 1,

    tx: -681.13,
    ty: 882.85,

    left: 921,
    top: 98,
    width: 96,
    height: 296,

    head: {
      src: "/assets/C/image8.png",
      left: 19,
      top: 0,
      width: 77,
      height: 80,
    },

    body: {
      src: "/assets/C/image9.png",
      left: 0,
      top: 59,
      width: 96,
      height: 237,
    },
  },

  {
    id: 0,
    order: 0,
    y: 1,

    tx: 172.87,
    ty: 833.35,

    left: 57,
    top: 118,
    width: 116,
    height: 355,

    head: {
      src: "/assets/C/image2.png",
      left: 19,
      top: 0,
      width: 97,
      height: 79,
    },

    body: {
      src: "/assets/C/image3.png",
      left: 0,
      top: 59,
      width: 116,
      height: 296,
    },
  },

  {
    id: 6,
    order: 6,
    y: 1,

    tx: -1045.63,
    ty: 852.85,

    left: 1285,
    top: 118,
    width: 97,
    height: 316,

    head: {
      src: "/assets/C/image10.png",
      left: 19,
      top: 0,
      width: 59,
      height: 99,
    },

    body: {
      src: "/assets/C/image11.png",
      left: 0,
      top: 59,
      width: 97,
      height: 257,
    },
  },

  {
    id: 9,
    order: 9,
    y: 0,

    left: 1151,
    top: 295,
    width: 97,
    height: 336,

    head: {
      src: "/assets/C/image18.png",
      left: 0,
      top: 0,
      width: 97,
      height: 99,
    },

    body: {
      src: "/assets/C/image19.png",
      left: 0,
      top: 79,
      width: 97,
      height: 257,
    },
  },

  {
    id: 5,
    order: 5,
    y: 1,

    tx: -258.63,
    ty: 636.35,

    left: 498,
    top: 315,
    width: 97,
    height: 355,

    head: {
      src: "/assets/C/image14.png",
      left: 0,
      top: 0,
      width: 97,
      height: 99,
    },

    body: {
      src: "/assets/C/image15.png",
      left: 0,
      top: 78,
      width: 97,
      height: 277,
    },
  },

  {
    id: 7,
    order: 7,
    y: 1,

    tx: -508.63,
    ty: 636.35,

    left: 748,
    top: 315,
    width: 97,
    height: 355,

    head: {
      src: "/assets/C/image16.png",
      left: 0,
      top: 0,
      width: 97,
      height: 99,
    },

    body: {
      src: "/assets/C/image17.png",
      left: 0,
      top: 78,
      width: 97,
      height: 277,
    },
  },

  {
    id: 4,
    order: 4,
    y: 0,

    left: 191,
    top: 393,
    width: 116,
    height: 316,

    head: {
      src: "/assets/C/image12.png",
      left: 20,
      top: 0,
      width: 77,
      height: 80,
    },

    body: {
      src: "/assets/C/image13.png",
      left: 0,
      top: 59,
      width: 116,
      height: 257,
    },
  },

  {
    id: 10,
    order: 10,
    y: 1,

    tx: -719.63,
    ty: 577.85,

    left: 959,
    top: 393,
    width: 97,
    height: 316,

    head: {
      src: "/assets/C/image20.png",
      left: 19,
      top: 0,
      width: 78,
      height: 80,
    },

    body: {
      src: "/assets/C/image21.png",
      left: 0,
      top: 59,
      width: 97,
      height: 257,
    },
  },

  {
    id: 8,
    order: 8,
    y: 0,

    left: 364,
    top: 551,
    width: 97,
    height: 375,

    head: {
      src: "/assets/C/image22.png",
      left: 0,
      top: 0,
      width: 78,
      height: 80,
    },

    body: {
      src: "/assets/C/image23.png",
      left: 0,
      top: 59,
      width: 97,
      height: 316,
    },
  },

  {
    id: 11,
    order: 11,
    y: 1,

    tx: -422.13,
    ty: 360.85,

    left: 652,
    top: 590,
    width: 116,
    height: 356,

    head: {
      src: "/assets/C/image24.png",
      left: 0,
      top: 0,
      width: 97,
      height: 100,
    },

    body: {
      src: "/assets/C/image25.png",
      left: 0,
      top: 79,
      width: 116,
      height: 277,
    },
  },

  {
    id: 12,
    order: 12,
    y: 0,

    left: 1266,
    top: 590,
    width: 116,
    height: 356,

    head: {
      src: "/assets/C/image26.png",
      left: 19,
      top: 0,
      width: 97,
      height: 100,
    },

    body: {
      src: "/assets/C/image27.png",
      left: 0,
      top: 79,
      width: 116,
      height: 277,
    },
  },
]

/*
 * ============================================================
 * MOBILE PEOPLE
 * ============================================================
 *
 * Separate 900 x 1440 composition from the mobile prototype.
 */

const MOBILE_PEOPLE = [
  {
    id: 2,
    order: 2,
    y: 0,

    left: 152,
    top: 280,
    width: 54.3,
    height: 166.3,

    head: {
      src: "/assets/C/image6.png",
      left: 0,
      top: 0,
      width: 43.7,
      height: 44.8,
    },

    body: {
      src: "/assets/C/image7.png",
      left: 0,
      top: 33,
      width: 54.3,
      height: 133.3,
    },
  },

  {
    id: 1,
    order: 1,
    y: 0,

    left: 340,
    top: 292,
    width: 43.7,
    height: 177,

    head: {
      src: "/assets/C/image4.png",
      left: 0,
      top: 0,
      width: 43.7,
      height: 44.8,
    },

    body: {
      src: "/assets/C/image5.png",
      left: 0,
      top: 33,
      width: 43.7,
      height: 143.9,
    },
  },

  {
    id: 3,
    order: 3,
    y: 1,

    tx: -366.1,
    ty: 682.9,

    left: 500,
    top: 270,
    width: 53.8,
    height: 165.8,

    head: {
      src: "/assets/C/image8.png",
      left: 10.6,
      top: 0,
      width: 43.1,
      height: 44.8,
    },

    body: {
      src: "/assets/C/image9.png",
      left: 0,
      top: 33,
      width: 53.8,
      height: 132.7,
    },
  },

  {
    id: 0,
    order: 0,
    y: 1,

    tx: -561.7,
    ty: 652.4,

    left: 690,
    top: 284,
    width: 65,
    height: 198.8,

    head: {
      src: "/assets/C/image2.png",
      left: 10.6,
      top: 0,
      width: 54.3,
      height: 44.2,
    },

    body: {
      src: "/assets/C/image3.png",
      left: 0,
      top: 33,
      width: 65,
      height: 165.8,
    },
  },

  {
    id: 6,
    order: 6,
    y: 1,

    tx: -47.25,
    ty: 451.85,

    left: 178,
    top: 486,
    width: 60.1,
    height: 195.9,

    head: {
      src: "/assets/C/image10.png",
      left: 11.8,
      top: 0,
      width: 36.6,
      height: 61.4,
    },

    body: {
      src: "/assets/C/image11.png",
      left: 0,
      top: 36.6,
      width: 60.1,
      height: 159.3,
    },
  },

  {
    id: 9,
    order: 9,
    y: 0,

    left: 400,
    top: 504,
    width: 60.1,
    height: 208.3,

    head: {
      src: "/assets/C/image18.png",
      left: 0,
      top: 0,
      width: 60.1,
      height: 61.4,
    },

    body: {
      src: "/assets/C/image19.png",
      left: 0,
      top: 49,
      width: 60.1,
      height: 159.3,
    },
  },

  {
    id: 5,
    order: 5,
    y: 1,

    tx: -491.25,
    ty: 447.75,

    left: 622,
    top: 478,
    width: 60.1,
    height: 220.1,

    head: {
      src: "/assets/C/image14.png",
      left: 0,
      top: 0,
      width: 60.1,
      height: 61.4,
    },

    body: {
      src: "/assets/C/image15.png",
      left: 0,
      top: 48.4,
      width: 60.1,
      height: 171.7,
    },
  },

  {
    id: 7,
    order: 7,
    y: 1,

    tx: 23.8,
    ty: 265.1,

    left: 104,
    top: 650,
    width: 66,
    height: 241.4,

    head: {
      src: "/assets/C/image16.png",
      left: 0,
      top: 0,
      width: 66,
      height: 67.3,
    },

    body: {
      src: "/assets/C/image17.png",
      left: 0,
      top: 53,
      width: 66,
      height: 188.4,
    },
  },

  {
    id: 4,
    order: 4,
    y: 0,

    left: 296,
    top: 686,
    width: 78.9,
    height: 214.9,

    head: {
      src: "/assets/C/image12.png",
      left: 13.6,
      top: 0,
      width: 52.4,
      height: 54.4,
    },

    body: {
      src: "/assets/C/image13.png",
      left: 0,
      top: 40.1,
      width: 78.9,
      height: 174.8,
    },
  },

  {
    id: 10,
    order: 10,
    y: 1,

    tx: -378.2,
    ty: 264.35,

    left: 506,
    top: 664,
    width: 66,
    height: 214.9,

    head: {
      src: "/assets/C/image20.png",
      left: 12.9,
      top: 0,
      width: 53,
      height: 54.4,
    },

    body: {
      src: "/assets/C/image21.png",
      left: 0,
      top: 40.1,
      width: 66,
      height: 174.8,
    },
  },

  {
    id: 12,
    order: 12,
    y: 0,

    left: 700,
    top: 700,
    width: 78.9,
    height: 242.1,

    head: {
      src: "/assets/C/image26.png",
      left: 12.9,
      top: 0,
      width: 66,
      height: 68,
    },

    body: {
      src: "/assets/C/image27.png",
      left: 0,
      top: 53.7,
      width: 78.9,
      height: 188.4,
    },
  },

  {
    id: 8,
    order: 8,
    y: 0,

    left: 186,
    top: 812,
    width: 71.8,
    height: 277.5,

    head: {
      src: "/assets/C/image22.png",
      left: 0,
      top: 0,
      width: 57.7,
      height: 59.2,
    },

    body: {
      src: "/assets/C/image23.png",
      left: 0,
      top: 43.7,
      width: 71.8,
      height: 233.8,
    },
  },

  {
    id: 11,
    order: 11,
    y: 1,

    tx: -478.1,
    ty: 62.1,

    left: 596,
    top: 842,
    width: 85.8,
    height: 263.4,

    head: {
      src: "/assets/C/image24.png",
      left: 0,
      top: 0,
      width: 71.8,
      height: 74,
    },

    body: {
      src: "/assets/C/image25.png",
      left: 0,
      top: 58.5,
      width: 85.8,
      height: 204.9,
    },
  },
]

const LATER_FIGURES_DESKTOP = [
  {
    id: 2,
    order: 2,
    delay: 0.431,
    src: "/assets/L/f1.png",
    left: 652,
    top: 98,
    width: 116,
    height: 316,
  },
  {
    id: 3,
    order: 3,
    delay: 0.514,
    src: "/assets/L/f2.png",
    left: 768,
    top: 59,
    width: 135,
    height: 316,
  },
  {
    id: 4,
    order: 4,
    delay: 0.584,
    src: "/assets/L/f3.png",
    left: 921,
    top: 98,
    width: 116,
    height: 296,
  },
  {
    id: 5,
    order: 5,
    delay: 0.638,
    src: "/assets/L/f4.png",
    left: 1036,
    top: 118,
    width: 116,
    height: 316,
  },
  {
    id: 6,
    order: 6,
    delay: 0.694,
    src: "/assets/L/f5.png",
    left: 1152,
    top: 177,
    width: 96,
    height: 296,
  },
  {
    id: 0,
    order: 0,
    delay: 0.362,
    src: "/assets/L/f6.png",
    left: 748,
    top: 354,
    width: 116,
    height: 296,
  },
  {
    id: 1,
    order: 1,
    delay: 0.428,
    src: "/assets/L/f7.png",
    left: 844,
    top: 354,
    width: 116,
    height: 296,
  },
]

const LATER_FIGURES_MOBILE = [
  {
    id: 0,
    order: 0,
    delay: 0.362,
    src: "/assets/L/f6.png",
    left: 499,
    top: 39,
    width: 116,
    height: 296,
  },
  {
    id: 1,
    order: 1,
    delay: 0.428,
    src: "/assets/L/f7.png",
    left: 595,
    top: 39,
    width: 116,
    height: 296,
  },
  {
    id: 2,
    order: 2,
    delay: 0.431,
    src: "/assets/L/f1.png",
    left: 403,
    top: -217,
    width: 116,
    height: 316,
  },
  {
    id: 3,
    order: 3,
    delay: 0.514,
    src: "/assets/L/f2.png",
    left: 519,
    top: -256,
    width: 135,
    height: 316,
  },
  {
    id: 4,
    order: 4,
    delay: 0.584,
    src: "/assets/L/f3.png",
    left: 672,
    top: -217,
    width: 116,
    height: 296,
  },
  {
    id: 5,
    order: 5,
    delay: 0.638,
    src: "/assets/L/f4.png",
    left: 787,
    top: -197,
    width: 116,
    height: 316,
  },
  {
    id: 6,
    order: 6,
    delay: 0.694,
    src: "/assets/L/f5.png",
    left: 903,
    top: -138,
    width: 96,
    height: 296,
  },
]

function LaterFigure({ figure }) {
  return (
    <img
      className="hero-later-figure"
      data-anim="fig"
      data-o={figure.order}
      data-d={figure.delay}
      src={figure.src}
      alt=""
      style={{
        position: "absolute",
        left: `${figure.left}px`,
        top: `${figure.top}px`,
        width: `${figure.width}px`,
        height: `${figure.height}px`,
      }}
    />
  )
}

function HostFigure() {
  return (
    <div className="hero-host" data-anim="host">
      <img src="/assets/L/host-head.png" alt="" />
      <img src="/assets/L/host-body.png" alt="" />
    </div>
  )
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function segment(progress, start, end) {
  return clamp((progress - start) / (end - start))
}

function easeInOutCubic(value) {
  if (value < 0.5) {
    return 4 * value * value * value
  }

  return 1 - Math.pow(-2 * value + 2, 3) / 2
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

function Person({ person }) {
  return (
    <div
      className="hero-person"
      data-anim="person"
      data-o={person.order}
      data-y={person.y}
      data-tx={person.tx ?? 0}
      data-ty={person.ty ?? 0}
      style={{
        position: "absolute",
        left: `${person.left}px`,
        top: `${person.top}px`,
        width: `${person.width}px`,
        height: `${person.height}px`,
        "--tx": `${person.tx ?? 0}px`,
        "--ty": `${person.ty ?? 0}px`,
      }}
    >
      <img
        src={person.head.src}
        alt=""
        style={{
          position: "absolute",
          left: `${person.head.left}px`,
          top: `${person.head.top}px`,
          width: `${person.head.width}px`,
          height: `${person.head.height}px`,
        }}
      />

      <img
        src={person.body.src}
        alt=""
        style={{
          position: "absolute",
          left: `${person.body.left}px`,
          top: `${person.body.top}px`,
          width: `${person.body.width}px`,
          height: `${person.body.height}px`,
        }}
      />
    </div>
  )
}

function HeroHeader({ headerRef }) {
  const [cityOpen, setCityOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Hyderabad")
  const cityRef = useRef(null)

  const cities = [
    { name: "Hyderabad", status: "live" },
    { name: "Bengaluru", status: "soon" },
    { name: "Mumbai", status: "soon" },
    { name: "Delhi", status: "soon" },
    { name: "Pune", status: "soon" },
    { name: "Chennai", status: "soon" },
    { name: "Kolkata", status: "soon" },
    { name: "Ahmedabad", status: "soon" },
    { name: "Jaipur", status: "soon" },
    { name: "Kochi", status: "soon" },
  ]

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setCityOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  return (
    <header ref={headerRef} className="hero-header">
      <a href="/" className="hero-header__logo" aria-label="Whatscenes">
        <span className="hero-header__logo-mark" aria-hidden="true" />
      </a>

      <nav className="hero-header__actions">
        <div ref={cityRef} className="hero-city-picker">
          <button
            type="button"
            className={`hero-city${cityOpen ? " is-open" : ""}`}
            aria-haspopup="listbox"
            aria-expanded={cityOpen}
            onClick={() => setCityOpen((open) => !open)}
          >
            <span className="hero-city__dot" aria-hidden="true" />
            <span className="hero-city__label">{selectedCity}</span>
            <span className="hero-city__arrow" aria-hidden="true" />
          </button>

          <div
            className={`hero-city__dropdown${cityOpen ? " is-open" : ""}`}
            role="listbox"
            aria-label="Choose city"
            aria-hidden={!cityOpen}
          >
            {cities.map((city) => (
              <button
                key={city.name}
                type="button"
                role="option"
                aria-selected={selectedCity === city.name}
                className={`hero-city__option${selectedCity === city.name ? " is-selected" : ""}`}
                onClick={() => {
                  setSelectedCity(city.name)
                  setCityOpen(false)
                }}
              >
                <span>{city.name}</span>
                <span className={`hero-city__status hero-city__status--${city.status}`}>
                  {city.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        <a href="/auth/login?mode=signup" className="hero-header__button">
          Sign up
        </a>
        <a href="/auth/login" className="hero-header__button">
          Log in
        </a>
      </nav>
    </header>
  )
}

function ScrollCue() {
  return (
    <div className="hero-scroll-cue" data-cue="1">
      <span className="hero-scroll-cue__label">scroll</span>

      <span className="hero-scroll-cue__track">
        <span className="hero-scroll-cue__line" />
      </span>
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)

  const cityWorldRef = useRef(null)
  const desktopPeopleWorldRef = useRef(null)
  const mobilePeopleWorldRef = useRef(null)

  const headlineRef = useRef(null)
  const textShadowRef = useRef(null)
  const topGradientRef = useRef(null)
  const scrollCueRef = useRef(null)
  const headerRef = useRef(null)

  const redBackgroundRef = useRef(null)
  const secondaryTextRef = useRef(null)
  const secondaryTextBRef = useRef(null)
  const finalTextRef = useRef(null)
  const hostTextRef = useRef(null)
  const desktopLaterWorldRef = useRef(null)
  const mobileLaterWorldRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current

    if (!section || !stage) {
      return undefined
    }

    const ctx = gsap.context(() => {
      /*
       * --------------------------------------------------------
       * WORLD SCALING
       * --------------------------------------------------------
       *
       * Exact prototype scaling:
       *
       * Desktop:
       *   --s  = min(vw / 1536, vh / 1024)
       *   --sc = max(vw / 1536, vh / 864)
       *
       * Mobile:
       *   --s  = min(vw / 830, vh / 1440)
       *   --sc = max(vw / 900, vh / 1440)
       */

      const updateScale = () => {
        const rect = stage.getBoundingClientRect()

        const vw = rect.width
        const vh = rect.height

        const desktopPeopleScale = Math.min(vw / 1536, vh / 1024)

        const desktopSceneScale = Math.max(vw / 1536, vh / 864)

        const mobilePeopleScale = Math.min(vw / 830, vh / 1440)

        const mobileSceneScale = Math.max(vw / 900, vh / 1440)

        gsap.set(stage, {
          "--desktopPeopleScale": desktopPeopleScale,

          "--desktopSceneScale": desktopSceneScale,

          "--mobilePeopleScale": mobilePeopleScale,

          "--mobileSceneScale": mobileSceneScale,
        })
      }

      updateScale()

      window.addEventListener("resize", updateScale)

      /*
       * --------------------------------------------------------
       * PEOPLE
       * --------------------------------------------------------
       */

      const desktopPeople = gsap.utils.toArray(
        desktopPeopleWorldRef.current?.querySelectorAll('[data-anim="person"]') || []
      )

      const mobilePeople = gsap.utils.toArray(
        mobilePeopleWorldRef.current?.querySelectorAll('[data-anim="person"]') || []
      )

      const desktopFigures = gsap.utils.toArray(
        desktopLaterWorldRef.current?.querySelectorAll('[data-anim="fig"]') || []
      )

      const mobileFigures = gsap.utils.toArray(
        mobileLaterWorldRef.current?.querySelectorAll('[data-anim="fig"]') || []
      )

      const desktopHosts = gsap.utils.toArray(
        desktopLaterWorldRef.current?.querySelectorAll('[data-anim="host"]') || []
      )

      const mobileHosts = gsap.utils.toArray(
        mobileLaterWorldRef.current?.querySelectorAll('[data-anim="host"]') || []
      )

      /*
       * --------------------------------------------------------
       * SCROLL STORY
       * --------------------------------------------------------
       *
       * These ranges are taken from the original homeFrame().
       */

      const render = (progress) => {
        const p = clamp(progress)

        /*
         * People entering the scene.
         */
        const crowd = segment(p, 0.095, 0.29)

        /*
         * First + second convergence.
         */
        const conv =
          easeInOutCubic(segment(p, 0.485, 0.585)) * 0.38 +
          easeInOutCubic(segment(p, 0.69, 0.785)) * 0.62

        /*
         * Other people movement.
         */
        const others = easeInOutCubic(segment(p, 0.335, 0.44))

        // Host enters near the end of the story, matching the reference.
        const hostIn = easeOutCubic(segment(p, 0.948, 0.988))

        /*
         * Hero city/headline exit.
         */
        const heroOut = easeInOutCubic(segment(p, 0.08, 0.165))

        const redReveal = easeOutCubic(segment(p, 0.785, 0.875))
        const dotO = easeOutCubic(segment(p, 0.7, 0.75))
        const dotMix = segment(p, 0.785, 0.815)
        const ds = segment(p, 0.815, 0.92)
        const logoO = segment(p, 0.815, 0.832)
        const draw = ds
        const c2 = clamp(easeOutCubic(segment(p, 0.2, 0.27)) - segment(p, 0.34, 0.385))
        const c2b = clamp(easeOutCubic(segment(p, 0.49, 0.55)) - segment(p, 0.655, 0.695))
        const c3 = easeOutCubic(segment(p, 0.883, 0.92))
        const c4 = easeOutCubic(segment(p, 0.958, 0.998))

        /*
         * Radial text shadow fade.
         *
         * Original:
         *
         * --c1 = 1 - sg(p, .05, .11)
         */
        const c1 = 1 - segment(p, 0.05, 0.11)

        /*
         * Scroll cue highlight.
         *
         * Original:
         *
         * 1 - sg(p,.095,.155)
         * + sg(p,.79,.825)
         */
        const hl = clamp(1 - segment(p, 0.095, 0.155) + segment(p, 0.79, 0.825))

        /*
         * The city and headline are part of the same visual
         * world in the prototype.
         */
        gsap.set(cityWorldRef.current, {
          opacity: 1 - heroOut,
        })

        /*
         * Headline movement.
         *
         * Exact prototype:
         *
         * translate3d(
         *   0,
         *   calc(var(--heroOut) * -60px),
         *   0
         * )
         */
        gsap.set(headlineRef.current, {
          opacity: c1,
          y: heroOut * -60,
        })

        /*
         * Shadow disappears with c1.
         */
        gsap.set(textShadowRef.current, {
          opacity: c1 * 0.95,
        })

        /*
         * Top gradient follows the hero's exit.
         */
        gsap.set(topGradientRef.current, {
          opacity: 1 - heroOut,
        })

        const rect = stage.getBoundingClientRect()
        const vw = rect.width
        const vh = rect.height
        const desktopScale = Math.min(vw / 1536, vh / 1024)
        const mobileScale = Math.min(vw / 830, vh / 1440)
        const isMobile = window.matchMedia("(max-width: 700px)").matches
        const sceneScale = isMobile ? mobileScale : desktopScale
        const centerX = isMobile
          ? vw / 2 + (160.8 - 450) * sceneScale
          : vw / 2 + (393.5 - 768) * sceneScale
        const centerY = isMobile
          ? vh / 2 + (1035.8 - 720) * sceneScale
          : vh / 2 + (876.5 - 512) * sceneScale
        const maxRadius = Math.max(
          Math.hypot(centerX, centerY),
          Math.hypot(vw - centerX, centerY),
          Math.hypot(centerX, vh - centerY),
          Math.hypot(vw - centerX, vh - centerY)
        )

        gsap.set(redBackgroundRef.current, {
          opacity: redReveal > 0 ? 1 : 0,
          "--hero-red-radius": redReveal * maxRadius,
          "--hero-red-x": centerX,
          "--hero-red-y": centerY,
        })

        gsap.set(secondaryTextRef.current, { opacity: c2, y: (1 - c2) * 26 })
        gsap.set(secondaryTextBRef.current, { opacity: c2b, y: (1 - c2b) * 26 })
        gsap.set(finalTextRef.current, { opacity: c3, y: (1 - c3) * 30 })
        gsap.set(hostTextRef.current, { opacity: c4, y: (1 - c4) * 24 })

        const laterWorlds = [desktopLaterWorldRef.current, mobileLaterWorldRef.current].filter(
          Boolean
        )
        laterWorlds.forEach((world) => {
          gsap.set(world.querySelector(".hero-later-world__dot"), {
            opacity: dotO * (1 - dotMix),
          })
          gsap.set(world.querySelector(".hero-later-world__dot-trail"), {
            opacity: dotMix,
            scaleX: 0.104 + ds * 0.896,
            scaleY: 0.169 + ds * 0.831,
          })
          gsap.set(world.querySelector(".hero-later-world__trail"), {
            opacity: logoO,
            "--draw": draw,
          })
        })

        /*
         * Scroll cue fades toward its later colour.
         */
        gsap.set(scrollCueRef.current, {
          "--hl": hl,
        })

        /*
         * Header logo follows the same colour transition as the
         * original prototype: white during the hero, transitioning
         * to Whatscenes red as the city leaves, then back to white
         * for the later red reveal.
         */
        gsap.set(headerRef.current, {
          "--hl": hl,
        })

        /*
         * ------------------------------------------------------
         * DESKTOP PEOPLE
         * ------------------------------------------------------
         */

        desktopPeople.forEach((element) => {
          const order = Number(element.dataset.o)

          const isConverging = element.dataset.y === "1"

          /*
           * Exact stagger/easing from homeFrame:
           *
           * const e = eo(
           *   cl(
           *     (crowd * 1.42 - o * .052) / .40
           *   )
           * )
           */
          const e = easeOutCubic(clamp((crowd * 1.42 - order * 0.052) / 0.4))

          if (isConverging) {
            /*
             * Original:
             *
             * opacity: var(--o,0)
             *
             * where:
             * o = min(e, cl((1-conv)*9))
             */
            const opacity = Math.min(e, clamp((1 - conv) * 9))

            gsap.set(element, {
              opacity,
              "--conv": conv,
              "--e": e,
              "--o": opacity,
            })
          } else {
            const opacity = e * (1 - others)

            gsap.set(element, {
              opacity,
              "--e": e,
              "--others": others,
              "--o": opacity,
            })
          }
        })

        /*
         * ------------------------------------------------------
         * MOBILE PEOPLE
         * ------------------------------------------------------
         *
         * Same story timings, but the mobile prototype uses
         * 32px rise and 20px secondary movement.
         */

        mobilePeople.forEach((element) => {
          const order = Number(element.dataset.o)

          const isConverging = element.dataset.y === "1"

          const e = easeOutCubic(clamp((crowd * 1.42 - order * 0.052) / 0.4))

          if (isConverging) {
            const opacity = Math.min(e, clamp((1 - conv) * 9))

            gsap.set(element, {
              opacity,
              "--conv": conv,
              "--e": e,
              "--o": opacity,
            })
          } else {
            const opacity = e * (1 - others)

            gsap.set(element, {
              opacity,
              "--e": e,
              "--others": others,
              "--o": opacity,
            })
          }
        })

        const renderLaterFigures = (elements) => {
          elements.forEach((element) => {
            const delay = Number(element.dataset.d) || 0.4
            const t = clamp((ds - delay + 0.06) / 0.11)
            const e = easeOutCubic(t)
            gsap.set(element, {
              opacity: easeOutCubic(clamp(t * 2.2)),
              y: (1 - e) * 46,
              scale: 0.955 + e * 0.045,
            })
          })
        }

        renderLaterFigures(desktopFigures)
        renderLaterFigures(mobileFigures)

        desktopHosts.forEach((element) => {
          gsap.set(element, { opacity: hostIn, y: (1 - hostIn) * 52, scale: 0.94 + hostIn * 0.06 })
        })

        mobileHosts.forEach((element) => {
          gsap.set(element, { opacity: hostIn, y: (1 - hostIn) * 52, scale: 0.94 + hostIn * 0.06 })
        })
      }

      /*
       * --------------------------------------------------------
       * GSAP SCROLLTRIGGER
       * --------------------------------------------------------
       *
       * The prototype calculates progress from the 860vh
       * story track. ScrollTrigger gives us the same normalized
       * 0 -> 1 progress.
       */

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",
        end: "bottom bottom",

        scrub: true,

        onUpdate: (self) => {
          render(self.progress)
        },
      })

      /*
       * Initial frame.
       */
      render(0)

      /*
       * Cleanup.
       */
      return () => {
        trigger.kill()

        window.removeEventListener("resize", updateScale)
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="landing-hero-section">
      <div ref={stageRef} className="hero-section__stage">
        {/* ====================================================
            RED STORY BACKGROUND
            ==================================================== */}

        <div ref={redBackgroundRef} className="hero-section__red-background" />

        {/* ====================================================
            CITY / HEADLINE WORLD
            ==================================================== */}

        <div ref={cityWorldRef} className="hero-city-world">
          <img className="hero-city-world__image" src="/assets/city2.png" alt="" />

          <div ref={textShadowRef} className="hero-city-world__text-shadow" />

          <h1 ref={headlineRef} className="hero-city-world__headline">
            <span>The city is</span>
            <span>full of people</span>
          </h1>
        </div>

        <div ref={topGradientRef} className="hero-section__top-gradient" />

        {/* ====================================================
            DESKTOP PEOPLE WORLD
            ==================================================== */}

        <div ref={desktopPeopleWorldRef} className="hero-people-world hero-people-world--desktop">
          <div className="hero-people-world__inner">
            {DESKTOP_PEOPLE.map((person) => (
              <Person key={person.id} person={person} />
            ))}
          </div>
        </div>

        {/* ====================================================
            MOBILE PEOPLE WORLD
            ==================================================== */}

        <div ref={mobilePeopleWorldRef} className="hero-people-world hero-people-world--mobile">
          {MOBILE_PEOPLE.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </div>

        {/* ====================================================
            SECONDARY STORY / CONVERGENCE
            ==================================================== */}

        <div ref={secondaryTextRef} className="hero-story-text hero-story-text--c2">
          Not all of them are <span className="hero-highlight">yours</span>
        </div>

        <div ref={secondaryTextBRef} className="hero-story-text hero-story-text--c2b">
          <span className="hero-highlight">These</span> ones are
        </div>

        <div className="hero-later-world hero-later-world--desktop" ref={desktopLaterWorldRef}>
          <div className="hero-later-world__dot" />
          <img className="hero-later-world__dot-trail" src="/assets/L/dot.png" alt="" />
          <div className="hero-later-world__trail">
            <img src="/assets/L/trail.png" alt="" />
          </div>
          {LATER_FIGURES_DESKTOP.map((figure) => (
            <LaterFigure key={figure.id} figure={figure} />
          ))}
          <HostFigure />
        </div>

        <div className="hero-later-world hero-later-world--mobile" ref={mobileLaterWorldRef}>
          <div className="hero-later-world__dot" />
          <img className="hero-later-world__dot-trail" src="/assets/L/dot.png" alt="" />
          <div className="hero-later-world__trail">
            <img src="/assets/L/trail.png" alt="" />
          </div>
          {LATER_FIGURES_MOBILE.map((figure) => (
            <LaterFigure key={figure.id} figure={figure} />
          ))}
          <HostFigure />
        </div>

        <div ref={finalTextRef} className="hero-story-text hero-story-text--c3">
          And we put y'all in a <span className="hero-highlight">scene</span> of your choice
        </div>

        <div ref={hostTextRef} className="hero-story-text hero-story-text--c4">
          With a <span className="hero-highlight">host</span> who knows how to break the ice
        </div>

        {/* ====================================================
            HEADER
            ==================================================== */}

        <HeroHeader headerRef={headerRef} />

        {/* ====================================================
            SCROLL CUE
            ==================================================== */}

        <div ref={scrollCueRef}>
          <ScrollCue />
        </div>
      </div>
    </section>
  )
}
