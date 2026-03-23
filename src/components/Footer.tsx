import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlArrowDown } from "react-icons/sl";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navGroups = [
  {
    label: "Tools & Infrastructure",
    links: [
      "ChainFrame",
      "Ordinal Matrix",
      "PulseView",
      "IndexNode",
      "HookSync",
      "LogicField",
      "CodeBridge",
      "DepthScan",
      "SideLayers",
      "stack.lib",
      "core.rpc",
    ],
  },
  {
    label: "Build",
    links: ["Tech Manual", "Starter Projects", "Hands-on Patterns"],
  },
  {
    label: "Company",
    links: ["Open Roles", "Team Story", "Pressroom", "Exploit Reward Program"],
  },
  {
    label: "Community",
    links: ["Twitter", "Dev Chat", "Repo Vault", "WorkGraph"],
  },
];

const Footer: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobilePanelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const isDesktop = window.innerWidth >= 768;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      timeline
        .fromTo(
          '[data-footer="guide"]',
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.65, stagger: 0.12 },
        )
        .from(
          '[data-footer="brand"]',
          { y: 18, autoAlpha: 0, duration: 0.58 },
          "-=0.72",
        )
        .from(
          '[data-footer="statement"]',
          { y: 34, autoAlpha: 0, duration: 0.82 },
          "-=0.42",
        )
        .fromTo(
          '[data-footer="input-line"]',
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.78, ease: "power2.out" },
          "-=0.36",
        )
        .from(
          '[data-footer="signup"]',
          { y: 22, autoAlpha: 0, duration: 0.56, stagger: 0.06 },
          "-=0.48",
        );

      if (isDesktop) {
        timeline.from(
          '[data-footer="nav-group"]',
          { y: 26, autoAlpha: 0, duration: 0.68, stagger: 0.1 },
          "-=0.34",
        );

        return;
      }

      timeline.from(
        '[data-footer="mobile-group"]',
        { y: 18, autoAlpha: 0, duration: 0.52, stagger: 0.08 },
        "-=0.34",
      );
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    mobilePanelRefs.current.forEach((panel, index) => {
      const inner = mobileInnerRefs.current[index];

      if (!panel || !inner) {
        return;
      }

      const isOpen = openIndex === index;

      gsap.killTweensOf([panel, inner]);

      if (prefersReducedMotion) {
        panel.style.height = isOpen ? "auto" : "0px";
        inner.style.opacity = isOpen ? "1" : "0";
        inner.style.transform = "translateY(0px)";
        return;
      }

      if (isOpen) {
        gsap.fromTo(
          panel,
          { height: panel.offsetHeight },
          {
            height: inner.scrollHeight,
            duration: 0.52,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(panel, { height: "auto" });
            },
          },
        );

        gsap.fromTo(
          inner,
          { y: 14, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.38,
            delay: 0.06,
            ease: "power2.out",
            clearProps: "transform",
          },
        );

        return;
      }

      gsap.to(inner, {
        y: 8,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.in",
      });

      gsap.to(panel, {
        height: 0,
        duration: 0.42,
        ease: "power3.inOut",
      });
    });
  }, [openIndex, prefersReducedMotion]);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col bg-[#e3dfd8] pb-5"
    >
      {/* Vertical lines - desktop only */}
      <div
        data-footer="guide"
        className="absolute bottom-0 top-0 left-180 hidden w-px -translate-x-1/2 bg-black opacity-20 md:block"
      />
      <div
        data-footer="guide"
        className="absolute top-0 bottom-0 left-230 hidden w-px -translate-x-1/2 bg-black opacity-20 md:block"
      />

      {/* Top section */}
      <div className="flex flex-col items-start justify-between gap-16 px-4 pt-10 md:flex-row md:gap-0 md:px-7 md:pt-25">
        {/* Left: brand + email */}
        <div className="flex flex-col gap-10 md:gap-50">
          <span data-footer="brand" className="text-2xl font-extrabold md:text-3xl">
            W3.
          </span>
          <div className="flex flex-col gap-8">
            <p
              data-footer="statement"
              className="max-w-full text-2xl font-extrabold leading-tight md:max-w-145 md:text-4xl"
            >
              GET EARLY ACCESS TO CHAIN UPDATES, PROTOCOL RESEARCH & ENGINEERING BRIEFS.
            </p>
            <div className="relative mt-6 mb-6 flex max-w-120 items-center md:mt-20 md:mb-20 md:max-w-90">
              <input
                type="email"
                placeholder="Enter your email"
                data-footer="signup"
                className="flex-1 bg-transparent py-2 text-xl outline-none placeholder:text-[#9c9b98] placeholder:transition-colors focus:placeholder:text-[#6f6d69]"
              />
              <button
                data-footer="signup"
                className="ml-4 shrink-0 text-xl font-medium transition-colors duration-300 hover:text-[#9c9b98]"
              >
                Join Feed
              </button>
              <div
                data-footer="input-line"
                className="absolute bottom-0 left-0 h-px w-full bg-black"
              />
            </div>
          </div>
        </div>

        {/* Right: nav groups */}
        <div className="flex w-full flex-col gap-0 md:w-auto">
          {/* Mobile accordion */}
          <div className="flex flex-col md:hidden">
            {navGroups.map((group, index) => (
              <div key={group.label} data-footer="mobile-group">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-xl font-medium text-[#858484]">{group.label}</span>
                  <SlArrowDown
                    size={18}
                    className="transition-transform duration-300"
                    style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  ref={(element) => {
                    mobilePanelRefs.current[index] = element;
                  }}
                  className="overflow-hidden"
                  style={{ height: 0 }}
                >
                  <div
                    ref={(element) => {
                      mobileInnerRefs.current[index] = element;
                    }}
                    className="flex flex-col gap-3 pb-4 opacity-0"
                  >
                    {group.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-xl transition-colors duration-300 hover:text-ink"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop layout */}
          <div className="hidden items-start gap-16 text-xl md:mr-20 md:flex">
            <div data-footer="nav-group" className="flex flex-col gap-4">
              <span className="text-[#858484]">Tools & Infrastructure</span>
              {navGroups[0].links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mt-1 transition-colors duration-300 hover:text-ink"
                >
                  {link}
                </a>
              ))}
            </div>

            <div data-footer="nav-group" className="flex flex-col gap-12">
              {[navGroups[1], navGroups[2]].map((group) => (
                <div key={group.label} className="flex flex-col gap-4">
                  <span className="text-[#858484]">{group.label}</span>
                  {group.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="mt-1 transition-colors duration-300 hover:text-ink"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>

            <div data-footer="nav-group" className="flex flex-col gap-4">
              <span className="text-[#858484]">Community</span>
              {navGroups[3].links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mt-1 transition-colors duration-300 hover:text-ink"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
