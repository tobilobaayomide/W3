import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowDownRight } from "react-icons/fi";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import HeroProtocolPanel from "./HeroProtocolPanel";

gsap.registerPlugin(useGSAP);

type HeroProps = {
  introReady?: boolean;
  sectionRef?: RefObject<HTMLElement | null>;
};

const Hero: React.FC<HeroProps> = ({ introReady = true, sectionRef: externalSectionRef }) => {
  const internalSectionRef = useRef<HTMLElement | null>(null);
  const sectionRef = externalSectionRef ?? internalSectionRef;
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!introReady) {
        return;
      }

      if (prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          '[data-hero-line="top"]',
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.3, ease: "power1.inOut" },
        )
        .fromTo(
          '[data-hero-line="bottom"]',
          { scaleX: 0, transformOrigin: "right center" },
          { scaleX: 1, duration: 1.3, ease: "power1.inOut" },
          0.18,
        )
        .fromTo(
          '[data-hero-line="vertical"]',
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.15, ease: "power1.inOut", stagger: 0.16 },
          0.42,
        )
        .from(
          '[data-hero="chrome"]',
          { y: 24, autoAlpha: 0, duration: 0.75, stagger: 0.08 },
          1.02,
        )
        .from(
          '[data-hero="tagline"]',
          { y: 32, autoAlpha: 0, duration: 0.84 },
          1.24,
        )
        .from(
          '[data-hero="cta"]',
          { y: 28, autoAlpha: 0, duration: 0.74 },
          1.54,
        )
        .from(
          '[data-hero="media"]',
          { clipPath: "inset(100% 0% 0% 0%)", duration: 1.08, ease: "power2.inOut" },
          1.42,
        )
        .from(
          "[data-hero-word]",
          { yPercent: 120, autoAlpha: 0, duration: 0.96, stagger: 0.06 },
          1.88,
        )
        .fromTo(
          "[data-hero-fill]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.05,
            ease: "power2.out",
            stagger: 0.16,
          },
          2.26,
        );
    },
    { scope: sectionRef, dependencies: [introReady] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col bg-[#e3dfd8]"
    >
      {/* Top line */}
      <div
        data-hero-line="top"
        className="absolute top-7 left-4 right-4 h-px bg-black md:left-7 md:right-7"
      />

      {/* Vertical lines - hidden on mobile */}
      <div
        data-hero-line="vertical"
        className="absolute bottom-7 top-7 left-140 hidden w-px -translate-x-1/2 bg-black opacity-20 md:block"
      />
      <div
        data-hero-line="vertical"
        className="absolute top-7 bottom-0 left-190 hidden w-px -translate-x-1/2 bg-black opacity-20 md:block"
      />

      {/* Top bar */}
      <div className="flex items-start justify-between px-4 pt-16 md:px-7">
        <span data-hero="chrome" className="text-2xl font-extrabold md:text-3xl">
          W3.
        </span>

        {/* Nav links - hidden on mobile */}
        <div
          data-hero="chrome"
          className="absolute top-15 right-85 hidden flex-col gap-1 md:flex"
        >
          <a href="/stack" className="text-lg">
            Stack
          </a>
          <a href="/trigger" className="text-lg">
            Trigger
          </a>
          <a href="/knowledge" className="text-lg">
            Knowledge
          </a>
          <a href="/signals" className="text-lg">
            Signals
          </a>
          <a href="/doc" className="text-lg">
            Doc
          </a>
          <a href="/console" className="text-lg">
            Console
          </a>
          <a href="/launch-tools" className="text-lg font-bold underline underline-offset-4">
            Launch Tools
          </a>
        </div>

        <span data-hero="chrome" className="text-base md:text-lg">
          [2026]
        </span>
      </div>

      {/* Tagline */}
      <div
        data-hero="tagline"
        className="mt-6 max-w-90 px-4 md:absolute md:top-15 md:left-142 md:mt-0 md:max-w-100"
      >
        <span className="text-2xl font-extrabold md:text-3xl">
          WE BUILD TOOLS
          <br />
          FOR DEVELOPERS WHO TREAT THE BLOCKCHAIN AS EXECUTION, NOT SPECTACLE
        </span>
      </div>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col items-start gap-6 px-4 pb-16 md:flex-row md:items-end md:px-7 md:pb-17">

        {/* Box */}
        <div className="w-full shrink-0 md:w-auto">
          <a
            href="/engineering"
            data-hero="cta"
            className="mb-2 flex items-center gap-2 text-base font-medium underline underline-offset-4 md:text-lg"
          >
            Start Engineering <FiArrowDownRight size={24} />
          </a>
          <div
            data-hero="media"
            className="h-65 w-full overflow-hidden bg-ink md:h-120 md:w-127"
          >
            <HeroProtocolPanel />
          </div>
        </div>

        {/* Big text */}
        <div className="-mb-3 flex w-full flex-col text-4xl font-extrabold text-[#9c9b98] md:text-9xl">
          <span className="flex w-full justify-between overflow-hidden">
            <span data-hero-word className="inline-flex">
              RETHINK
            </span>
            <span data-hero-word className="inline-flex">
              WHAT
            </span>
          </span>
          <span className="flex w-full justify-between overflow-hidden">
            <span data-hero-word className="inline-flex items-end">
              <span className="relative inline-block">
                <span>WEB3</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  WEB3
                </span>
              </span>
              <span className="text-sm font-normal md:text-lg">[Forge]</span>
            </span>
            <span data-hero-word className="inline-flex">
              CAN
            </span>
            <span data-hero-word className="inline-flex">
              BE
            </span>
          </span>
          <span className="flex gap-4 overflow-hidden md:gap-8">
            <span data-hero-word className="inline-flex">
              WHEN
            </span>
            <span data-hero-word className="inline-flex">
              <span className="relative inline-block">
                <span>BITCOIN</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  BITCOIN
                </span>
              </span>
            </span>
          </span>
          <span className="flex overflow-hidden">
            <span data-hero-word className="inline-flex">
              <span className="relative inline-block">
                <span>RUNS THE LOGIC.</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  RUNS THE LOGIC.
                </span>
              </span>
            </span>
          </span>
        </div>

      </div>

      {/* Bottom line */}
      <div
        data-hero-line="bottom"
        className="absolute bottom-7 left-4 right-4 h-px bg-black md:left-7 md:right-7"
      />
    </section>
  );
};

export default Hero;
