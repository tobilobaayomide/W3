import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const rows = [
  {
    title: "ACCESS RAW NETWORK DATA ACROSS BITCOINS ECOSYSTEM",
    desc: "Scan, trace and filter ordinal entries with deep precision. Perfect for indexing immutable content layers on Bitcoin.",
    stat: "214K Tx",
  },
  {
    title: "AUTOMATE REACTIONS FROM VERIFIED CHAIN EVENTS",
    desc: "Deploy condition based automation that listens to network behavior. Configure event outputs from stacks or ordinal events and sync logic instantly on.",
    stat: "5.2s",
  },
  {
    title: "VERIFY TRANSACTION SETTLEMENT WITHOUT THIRD PARTY",
    desc: "Gain proof of execution without trust assumptions. Track confirmation depth and anchoring, from stack level actions to Bitcoin block inclusion.",
    stat: "100% Verified",
  },
];

type ModuleTwoProps = {
  sectionRef?: RefObject<HTMLElement | null>;
};

const ModuleTwo: React.FC<ModuleTwoProps> = ({ sectionRef: externalSectionRef }) => {
  const internalSectionRef = useRef<HTMLElement | null>(null);
  const sectionRef = externalSectionRef ?? internalSectionRef;
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const headerTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      headerTimeline
        .from('[data-module-two="eyebrow"]', {
          y: 24,
          autoAlpha: 0,
          duration: 0.68,
        })
        .from(
          '[data-module-two="heading"]',
          {
            y: 40,
            autoAlpha: 0,
            duration: 1,
          },
          "-=0.3",
        )
        .fromTo(
          '[data-module-two="top-divider"]',
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.05, ease: "power1.inOut" },
          "-=0.05",
        );

      gsap.utils
        .toArray<HTMLElement>('[data-module-two="row"]')
        .forEach((row) => {
          const marker = row.querySelector<HTMLElement>('[data-module-two="marker"]');
          const title = row.querySelector<HTMLElement>('[data-module-two="title"]');
          const desc = row.querySelector<HTMLElement>('[data-module-two="desc"]');
          const stat = row.querySelector<HTMLElement>('[data-module-two="stat"]');
          const divider = row.nextElementSibling as HTMLElement | null;

          const rowTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: row,
              start: "top 76%",
              once: true,
            },
          });

          if (divider?.hasAttribute("data-module-two-divider")) {
            rowTimeline.fromTo(
              divider,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 1.15, ease: "power1.inOut" },
            );
          }

          if (marker) {
            rowTimeline.from(
              marker,
              { scale: 0, autoAlpha: 0, duration: 0.46, ease: "back.out(1.8)" },
              divider ? 0.34 : 0,
            );
          }

          if (title) {
            rowTimeline.from(
              title,
              { y: 26, autoAlpha: 0, duration: 0.76 },
              divider ? 0.56 : 0.14,
            );
          }

          if (desc) {
            rowTimeline.from(
              desc,
              { y: 18, autoAlpha: 0, duration: 0.66 },
              divider ? 0.84 : 0.34,
            );
          }

          if (stat) {
            rowTimeline.from(
              stat,
              { y: 14, autoAlpha: 0, duration: 0.6 },
              divider ? 0.96 : 0.42,
            );
          }
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col bg-[#e3dfd8]"
    >
      {/* Header */}
      <div className="flex flex-col items-start gap-6 px-4 pt-16 md:flex-row md:gap-50 md:px-7 md:pt-40">
        <span
          data-module-two="eyebrow"
          className="shrink-0 text-base font-medium md:text-lg"
        >
          <span className="text-[#9c9b98]">[02]</span> Infra Modules
        </span>
        <span
          data-module-two="heading"
          className="text-4xl font-extrabold leading-tight md:ml-40 md:text-7xl"
        >
          TOOLS FOR BITCOIN-
          <br />
          NATIVE WEB3 SYSTEM
        </span>
      </div>

      <div className="mt-10 md:mt-20" />

      {/* Top divider */}
      <div
        data-module-two="top-divider"
        className="mx-4 h-px bg-black md:mx-7"
      />

      {/* Rows */}
      {rows.map((row, index) => (
        <div key={row.title}>
          <div
            data-module-two="row"
            className="flex flex-col gap-4 px-4 py-8 md:flex-row md:items-start md:gap-0 md:px-7 md:py-15"
          >
            <div
              data-module-two="marker"
              className="mt-1 hidden h-5 w-5 shrink-0 bg-black md:flex md:h-7 md:w-7"
            />
            <span
              data-module-two="title"
              className="text-xl font-extrabold md:ml-120 md:max-w-120 md:text-4xl"
            >
              {row.title}
            </span>
            <span
              data-module-two="desc"
              className="text-sm font-normal md:ml-20 md:max-w-100 md:text-xl"
            >
              {row.desc}
            </span>
            <span
              data-module-two="stat"
              className="shrink-0 text-sm font-normal md:ml-auto md:text-xl"
            >
              {row.stat}
            </span>
          </div>
          <div
            data-module-two-divider=""
            className={`mx-4 h-px bg-black md:mx-7 ${index === rows.length - 1 ? "mb-60" : ""}`}
          />
        </div>
      ))}
    </section>
  );
};

export default ModuleTwo;
