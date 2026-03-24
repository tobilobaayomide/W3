import { useRef, useState, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowDownRight, FiMenu, FiX } from "react-icons/fi";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useGSAP(
    () => {
      if (!introReady) return;

      if (prefersReducedMotion) {
        gsap.set("[data-hero-base]", { color: "#171411" });
        gsap.set("[data-hero-fill]", { autoAlpha: 0 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
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
          { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.05,
            ease: "power2.out",
            stagger: 0.16,
          },
          2.26,
        )
        .add(() => {
          gsap.set("[data-hero-base]", { color: "#171411" });
          gsap.set("[data-hero-fill]", { autoAlpha: 0 });
        });
    },
    { scope: sectionRef, dependencies: [introReady] },
  );

  const navLinks = [
    { href: "/stack", label: "Stack" },
    { href: "/trigger", label: "Trigger" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/signals", label: "Signals" },
    { href: "/doc", label: "Doc" },
    { href: "/console", label: "Console" },
    { href: "/launch-tools", label: "Launch Tools", bold: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col bg-[#e3dfd8]"
    >
      <div
        data-hero-line="top"
        className="absolute top-7 left-4 right-4 h-px bg-black md:left-7 md:right-7"
      />

      <div
        data-hero-line="vertical"
        className="absolute bottom-7 top-7 hidden w-px bg-black opacity-20 lg:block"
        style={{ left: "38%" }}
      />
      <div
        data-hero-line="vertical"
        className="absolute top-7 bottom-0 hidden w-px bg-black opacity-20 lg:block"
        style={{ left: "62%" }}
      />

      <div className="flex items-center justify-between px-4 pt-16 md:px-7">
        <span data-hero="chrome" className="text-2xl font-extrabold md:text-3xl">
          W3.
        </span>

  
        <nav
          data-hero="chrome"
          className="hidden lg:flex flex-col gap-1 items-end"
          aria-label="Primary navigation"
        >
          {navLinks.map(({ href, label, bold }) => (
            <a
              key={href}
              href={href}
              className={`text-base xl:text-lg leading-snug hover:opacity-60 transition-opacity ${
                bold ? "font-bold underline underline-offset-4" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span data-hero="chrome" className="text-base md:text-lg">
            [2026]
          </span>
          <button
            data-hero="chrome"
            className="lg:hidden p-1 -mr-1"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav
          className="lg:hidden flex flex-col gap-3 px-4 pt-4 pb-6 border-b border-black/20"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ href, label, bold }) => (
            <a
              key={href}
              href={href}
              className={`text-lg ${bold ? "font-bold underline underline-offset-4" : ""}`}
              onClick={() => setMobileNavOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}

      <div
        data-hero="tagline"
        className="mt-6 px-4 md:px-7 lg:absolute lg:top-16 lg:mt-0 lg:px-0"
        style={{ left: "calc(38% + 1.75rem)", maxWidth: "min(26rem, 36%)" }}
      >
        <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
          WE BUILD TOOLS
          <br />
          FOR DEVELOPERS WHO TREAT THE BLOCKCHAIN AS EXECUTION, NOT SPECTACLE
        </span>
      </div>

      <div className="mt-auto flex flex-col items-start gap-6 px-4 pb-12 md:pb-16 md:px-7 lg:flex-row lg:items-end lg:pb-17">

        <div className="w-full shrink-0 lg:w-auto">
          <a
            href="/engineering"
            data-hero="cta"
            className="mb-2 flex items-center gap-2 text-base font-medium underline underline-offset-4 md:text-lg"
          >
            Start Engineering <FiArrowDownRight size={24} />
          </a>
          <div
            data-hero="media"
            className="h-56 w-full overflow-hidden bg-ink sm:h-64 md:h-80 lg:h-120 lg:w-md xl:w-127"
          >
            <HeroProtocolPanel />
          </div>
        </div>

        <div className="-mb-3 flex w-full flex-col text-3xl font-extrabold text-[#9c9b98] sm:text-5xl md:text-7xl lg:text-9xl">
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
                <span data-hero-base>WEB3</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="invisible absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  WEB3
                </span>
              </span>
              <span className="text-xs font-normal sm:text-sm md:text-base lg:text-lg">[Forge]</span>
            </span>
            <span data-hero-word className="inline-flex">
              CAN
            </span>
            <span data-hero-word className="inline-flex">
              BE
            </span>
          </span>
          <span className="flex gap-3 overflow-hidden sm:gap-4 md:gap-6 lg:gap-8">
            <span data-hero-word className="inline-flex">
              WHEN
            </span>
            <span data-hero-word className="inline-flex">
              <span className="relative inline-block">
                <span data-hero-base>BITCOIN</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="invisible absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  BITCOIN
                </span>
              </span>
            </span>
          </span>

          <span className="flex w-full overflow-hidden">
            <span data-hero-word className="inline-flex min-w-0">
              <span className="relative inline-block w-full">
                <span data-hero-base>RUNS THE LOGIC.</span>
                <span
                  data-hero-fill
                  aria-hidden="true"
                  className="invisible absolute inset-0 overflow-hidden whitespace-nowrap text-ink"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  RUNS THE LOGIC.
                </span>
              </span>
            </span>
          </span>
        </div>

      </div>

      <div
        data-hero-line="bottom"
        className="absolute bottom-7 left-4 right-4 h-px bg-black md:left-7 md:right-7"
      />
    </section>
  );
};

export default Hero;