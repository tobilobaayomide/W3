import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

const chartBars = [
  { height: "30%", color: "#f3eee7" },
  { height: "54%", color: "#c2b8a5" },
  { height: "42%", color: "#9eb1a0" },
  { height: "68%", color: "#f3eee7" },
  { height: "48%", color: "#c2b8a5" },
  { height: "76%", color: "#9eb1a0" },
  { height: "58%", color: "#f3eee7" },
];

const HeroProtocolPanel: React.FC = () => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      if (prefersReducedMotion) {
        return;
      }

      gsap.set('[data-protocol="bar"]', { transformOrigin: "center bottom" });

      const barTweens = gsap.utils
        .toArray<HTMLElement>('[data-protocol="bar"]')
        .map((bar, index) =>
          gsap.to(bar, {
            scaleY: 0.52 + ((index + 1) % 4) * 0.14,
            duration: 1.25 + index * 0.12,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }),
        );

      const routeTween = gsap.to('[data-protocol="route-active"]', {
        strokeDashoffset: -420,
        duration: 3.4,
        repeat: -1,
        ease: "none",
      });

      const pulseTween = gsap.fromTo(
        '[data-protocol="pulse"]',
        { scale: 0.5, autoAlpha: 0.48 },
        {
          scale: 2.5,
          autoAlpha: 0,
          duration: 1.6,
          repeat: -1,
          ease: "power1.out",
        },
      );

      return () => {
        barTweens.forEach((tween) => tween.kill());
        routeTween.kill();
        pulseTween.kill();
      };
    },
    { scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      className="relative h-full w-full overflow-hidden bg-ink text-[#e3dfd8]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,238,231,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(243,238,231,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-2.5 border border-card/8 md:inset-4.5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 24%, rgba(158,177,160,0.12), transparent 22%), radial-gradient(circle at 18% 82%, rgba(194,184,165,0.1), transparent 24%)",
        }}
      />

      <div className="absolute left-3 top-3 md:left-5 md:top-5">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-[#d7cdbf] md:text-[10px]">
          Signal Relay
        </span>
      </div>

      <div className="absolute right-3 top-3 text-right md:right-5 md:top-5">
        <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-[#8f8a84] md:text-[10px]">
          Block 887431
        </span>
        <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-[#9eb1a0] md:text-[10px]">
          Stable
        </span>
      </div>

      <svg
        viewBox="0 0 508 480"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M 64 140 L 212 140 L 286 206 L 444 206"
          fill="none"
          stroke="#f3eee7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
        />
        <path
          d="M 286 206 L 286 110 L 386 110"
          fill="none"
          stroke="#f3eee7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.14"
        />
        <path
          data-protocol="route-active"
          d="M 64 140 L 212 140 L 286 206 L 444 206"
          fill="none"
          stroke="#9eb1a0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: "110 320", strokeDashoffset: 0 }}
        />
      </svg>

      <div className="absolute left-[55%] top-[43%]">
        <span
          data-protocol="pulse"
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9eb1a0]/60"
        />
        <span className="relative block h-3 w-3 rounded-full bg-[#9eb1a0]" />
      </div>

      <div className="absolute bottom-4 left-3 w-46 md:bottom-5 md:left-5 md:w-72">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.26em] text-[#8f8a84] md:text-[10px]">
            Throughput
          </span>
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.26em] text-[#d7cdbf] md:text-[10px]">
            Live
          </span>
        </div>

        <div className="relative h-22 border-b border-card/12 md:h-26">
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end gap-1.5 md:gap-2">
            {chartBars.map((bar, index) => (
              <span
                key={`${bar.color}-${index}`}
                data-protocol="bar"
                className="w-2 rounded-t-full"
                style={{ height: bar.height, backgroundColor: bar.color }}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-[34%] border-t border-card/10" />
        </div>
      </div>

      <div className="absolute bottom-4 right-3 text-right md:bottom-5 md:right-5">
        <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-[#8f8a84] md:text-[10px]">
          Latency 05ms
        </span>
        <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-[#d7cdbf] md:text-[10px]">
          Relay stable
        </span>
      </div>
    </div>
  );
};

export default HeroProtocolPanel;
