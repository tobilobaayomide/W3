import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const text = "EXPLORE TOOLS • BITCOIN LAYER-2 • W3 PROTOCOL •";

const CircularText: React.FC = () => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const uniqueId = useId().replace(/:/g, "");
  const maskId = `donut-mask-${uniqueId}`;
  const mobilePathId = `circle-path-mobile-${uniqueId}`;
  const desktopPathId = `circle-path-desktop-${uniqueId}`;

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (reducedMotion) {
      gsap.set(containerRef.current, { x: 0, y: 0, opacity: 1, scale: 1 });
      return;
    }

    const entranceTween = gsap.fromTo(
      containerRef.current,
      {
        x: 96,
        y: 96,
        opacity: 0,
        scale: 0.72,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.05,
        delay: 0.9,
        ease: "power3.out",
      },
    );

    return () => {
      entranceTween.kill();
    };
  }, [reducedMotion]);

  const handleClick = () => {
    const target = document.getElementById("tools");

    if (target) {
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      ref={containerRef}
      type="button"
      aria-label="Explore tools"
      className="group fixed bottom-7 right-4 z-40 flex h-36 w-36 items-center justify-center md:bottom-8 md:right-15 md:h-56 md:w-56 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#e3dfd8]"
      onClick={handleClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-36 w-36 md:h-56 md:w-56"
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="50%" r="27%" fill="black" />
          </mask>
        </defs>
        <circle cx="50%" cy="50%" r="49%" fill="#c2b8a5" mask={`url(#${maskId})`} />
        <circle cx="50%" cy="50%" r="49%" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="27%" fill="none" stroke="black" strokeWidth="2" />
      </svg>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-36 w-36 md:h-56 md:w-56 ${reducedMotion ? "" : "animate-spin"}`}
        style={{
          animationDuration: "14s",
          animationTimingFunction: "linear",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <svg viewBox="0 0 144 144" className="h-full w-full md:hidden">
          <path
            id={mobilePathId}
            d="M 72,72 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
            fill="none"
          />
          <text fontSize="10" fill="#000" letterSpacing="1" fontWeight="800">
            <textPath href={`#${mobilePathId}`}>{text}</textPath>
          </text>
        </svg>

        <svg viewBox="0 0 256 256" className="hidden h-full w-full md:block">
          <path
            id={desktopPathId}
            d="M 128,128 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
            fill="none"
          />
          <text fontSize="18" fill="#000" letterSpacing="3" fontWeight="800">
            <textPath href={`#${desktopPathId}`}>{text}</textPath>
          </text>
        </svg>
      </div>

      <span className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-black bg-ink text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#e3dfd8] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 md:h-24 md:w-24 md:text-[10px]">
        <span className="leading-none">Explore</span>
        <span className="leading-none">Tools</span>
      </span>
    </button>
  );
};

export default CircularText;
