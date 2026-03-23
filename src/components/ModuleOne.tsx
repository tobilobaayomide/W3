import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowDown } from "react-icons/go";
import bitcoin from "../assets/bitcoin.jpeg";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const modules = [
  {
    title: "ZEROSCOPE: ORDINAL ENTRY FILTER",
    desc: "A precision filter layer that screens ordinal inscriptions at entry points, ensuring only valid and verified data passes through the network pipeline.",
  },
  {
    title: "PULSESYNC: BLOCK TIMESTAMP SYNC",
    desc: "Synchronizes block timestamps across nodes in real-time, maintaining consensus integrity and preventing time-drift vulnerabilities in the network.",
  },
  {
    title: "CODEDOCK: CONTRACT DEPLOYMENT HUB",
    desc: "A unified deployment interface for smart contracts on Bitcoin Layer-2, streamlining the process from compilation to on-chain execution.",
  },
  {
    title: "LOGICUNIT: ON-CHAIN VERIFICATION ENGINE",
    desc: "Handles deterministic on-chain logic verification, ensuring all execution outputs are provably correct and tamper-resistant.",
  },
  {
    title: "METAINDEX: METADATA AGGREGATION SERVICE",
    desc: "Aggregates and indexes on-chain metadata from multiple sources, providing developers with fast and structured access to historical chain data.",
  },
  {
    title: "BLOCKTRACE: PROVENANCE TRACKING SYSTEM",
    desc: "Tracks the full provenance of assets and transactions across the chain, enabling transparent audit trails for all on-chain activity.",
  },
];

const ModuleOne: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const arrowRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .fromTo(
          '[data-module-one="guide"]',
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1 },
        )
        .from(
          '[data-module-one="eyebrow"]',
          { y: 28, autoAlpha: 0, duration: 0.7 },
          "-=0.65",
        )
        .from(
          '[data-module-one="heading"]',
          { y: 36, autoAlpha: 0, duration: 0.9 },
          "-=0.55",
        )
        .from(
          '[data-module-one="filter"]',
          { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.05 },
          "-=0.55",
        );

      gsap.utils
        .toArray<HTMLElement>("[data-module-one-divider]")
        .forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: divider,
                start: "top 92%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>('[data-module-one="row-button"]')
        .forEach((button) => {
          gsap.from(button, {
            y: 24,
            autoAlpha: 0,
            duration: 0.68,
            ease: "power3.out",
            scrollTrigger: {
              trigger: button,
              start: "top 88%",
              once: true,
            },
          });
        });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      const panel = panelRefs.current[index];
      const panelInner = panelInnerRefs.current[index];
      const media = mediaRefs.current[index];
      const arrow = arrowRefs.current[index];

      if (!row || !panel || !panelInner || !media || !arrow) {
        return;
      }

      const isOpen = openIndex === index;

      gsap.killTweensOf([row, panel, panelInner, media, arrow]);

      if (prefersReducedMotion) {
        panel.style.height = isOpen ? "auto" : "0px";
        panelInner.style.opacity = isOpen ? "1" : "0";
        panelInner.style.transform = "translateY(0px)";
        media.style.clipPath = isOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
        arrow.style.transform = `rotate(${isOpen ? 180 : 0}deg)`;
        return;
      }

      if (isOpen) {
        gsap.to(row, {
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(arrow, {
          rotate: 180,
          duration: 0.45,
          ease: "power2.out",
        });

        gsap.fromTo(
          panel,
          { height: panel.offsetHeight },
          {
            height: panelInner.scrollHeight,
            duration: 0.62,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(panel, { height: "auto" });
            },
          },
        );

        gsap.fromTo(
          panelInner,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.48,
            delay: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
        );

        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.78,
            ease: "power2.inOut",
          },
        );

        return;
      }

      gsap.to(row, {
        backgroundColor: "rgba(23, 20, 17, 0)",
        duration: 0.28,
        ease: "power2.out",
      });

      gsap.to(arrow, {
        rotate: 0,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(panelInner, {
        y: 10,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(media, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.4,
        ease: "power2.in",
      });

      gsap.to(panel, {
        height: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  }, [openIndex, prefersReducedMotion]);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative flex w-full flex-col bg-[#e3dfd8] pb-16"
    >
      {/* Vertical guide */}
      <div
        data-module-one="guide"
        className="absolute bottom-16 top-0 left-190 hidden w-px -translate-x-1/2 bg-black opacity-20 md:block"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-10 px-4 pt-20 md:flex-row md:gap-0 md:px-7 md:pt-50">
        <div className="flex w-full flex-col gap-10 md:w-auto md:gap-25">
          <span data-module-one="eyebrow" className="text-base font-medium md:text-lg">
            <span className="text-[#9c9b98]">[01]</span> Infra Modules
          </span>
          <div className="flex flex-col gap-4">
            <span
              data-module-one="heading"
              className="text-4xl font-extrabold leading-tight md:text-7xl"
            >
              INFRASTRUCTURE
              <br />
              MODULES
              <br />
              FOR BITCOIN
              <br />
              LAYER-2
              <br />
              NETWORKS
            </span>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <span data-module-one="filter" className="text-sm md:text-lg">
                [✔️] Core
              </span>
              <span data-module-one="filter" className="text-sm md:text-lg">
                [] Inscriptions
              </span>
              <span data-module-one="filter" className="text-sm md:text-lg">
                [] Executive Layer
              </span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-7">
              <span data-module-one="filter" className="text-sm md:text-lg">
                [✔️] Grid
              </span>
              <span data-module-one="filter" className="text-sm md:text-lg">
                [] Linked Tree
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module list */}
      <div className="mx-4 mt-10 flex flex-col md:-mt-130 md:ml-220 md:mr-7">
        <div data-module-one-divider className="h-px w-full bg-black" />
        {modules.map((module, index) => (
          <div
            key={module.title}
            ref={(element) => {
              rowRefs.current[index] = element;
            }}
            data-module-one="row"
            className="rounded-sm px-0"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`module-one-panel-${index}`}
              data-module-one="row-button"
              className="group flex w-full items-center justify-between py-6 text-left md:py-10"
            >
              <span
                className="translate-x-0 text-lg font-bold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl"
              >
                {module.title.split(": ").map((part, partIndex) => (
                  <span key={part} className="block md:inline">
                    {part}
                    {partIndex === 0 ? ":" : ""}
                  </span>
                ))}
              </span>
              <span
                ref={(element) => {
                  arrowRefs.current[index] = element;
                }}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <GoArrowDown size={20} />
              </span>
            </button>

            <div
              id={`module-one-panel-${index}`}
              ref={(element) => {
                panelRefs.current[index] = element;
              }}
              className="overflow-hidden"
              style={{ height: 0 }}
            >
              <div
                ref={(element) => {
                  panelInnerRefs.current[index] = element;
                }}
                className="flex flex-col gap-4 pb-10 opacity-0 md:pb-12"
              >
                <p className="max-w-lg text-sm leading-relaxed md:text-lg">
                  {module.desc}
                </p>
                <div
                  ref={(element) => {
                    mediaRefs.current[index] = element;
                  }}
                  className="overflow-hidden"
                  style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                >
                  <img
                    src={bitcoin}
                    alt="bitcoin"
                    className="h-100 w-full object-cover md:h-120 md:w-120"
                  />
                </div>
              </div>
            </div>

            {index !== modules.length - 1 ? (
              <div data-module-one-divider className="h-px w-full bg-black" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Bottom line */}
      <div data-module-one-divider className="mx-4 mt-0 h-px bg-black md:mx-7" />
    </section>
  );
};

export default ModuleOne;
