import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

const introGlyphs = ["W", "3", "."] as const;

const introTiming = (() => {
  const glyphRevealStart = 0.12;
  const glyphRevealDuration = 0.9;
  const glyphRevealStagger = 0.9;
  const holdAfterGlyphReveal = 0.8;
  const revealDelayAfterScale = 0.26;
  const backdropFadeDelay = 0.6;
  const markShellFadeDelay = 0.84;
  const overlayFadeDelay = 1.42;
  const glyphRevealEnd =
    glyphRevealStart +
    glyphRevealDuration +
    glyphRevealStagger * (introGlyphs.length - 1);
  const markScaleStart = glyphRevealEnd + holdAfterGlyphReveal;
  const revealStartTime = markScaleStart + revealDelayAfterScale;

  return {
    glyphRevealStart,
    glyphRevealDuration,
    glyphRevealStagger,
    holdAfterGlyphReveal,
    markScaleStart,
    revealStartTime,
    backdropFadeStart: revealStartTime + backdropFadeDelay,
    markShellFadeStart: revealStartTime + markShellFadeDelay,
    overlayFadeStart: revealStartTime + overlayFadeDelay,
  };
})();

type IntroOverlayProps = {
  heroRef: RefObject<HTMLElement | null>;
  onRevealStart: () => void;
  onComplete: () => void;
};

const IntroOverlay: React.FC<IntroOverlayProps> = ({
  heroRef,
  onRevealStart,
  onComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const revealStartedRef = useRef(false);
  const completedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const hero = heroRef.current;

      if (!overlay) {
        return;
      }

      const startReveal = () => {
        if (revealStartedRef.current) {
          return;
        }

        revealStartedRef.current = true;
        onRevealStart();
      };

      const finish = () => {
        if (completedRef.current) {
          return;
        }

        completedRef.current = true;
        onComplete();
      };

      if (prefersReducedMotion) {
        if (hero) {
          gsap.set(hero, { clearProps: "clipPath" });
        }

        startReveal();
        gsap.set(overlay, { autoAlpha: 0 });
        finish();
        return;
      }

      if (hero) {
        gsap.set(hero, {
          clipPath: "circle(0% at 50% 50%)",
          willChange: "clip-path",
        });
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        onComplete: () => {
          if (hero) {
            gsap.set(hero, { clearProps: "willChange" });
          }

          finish();
        },
      });

      timeline
        .fromTo(
          '[data-intro="backdrop"]',
          { autoAlpha: 0.98 },
          { autoAlpha: 1, duration: 0.18, ease: "none" },
        )
        .fromTo(
          '[data-intro="mark-shell"]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.34, ease: "none" },
          0.06,
        )
        .fromTo(
          '[data-intro="glyph-mask"]',
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: introTiming.glyphRevealDuration,
            stagger: introTiming.glyphRevealStagger,
            ease: "power2.out",
          },
          introTiming.glyphRevealStart,
        )
        .fromTo(
          '[data-intro="glyph"]',
          { scaleY: 0.72, scaleX: 0.94, transformOrigin: "center bottom" },
          {
            scaleY: 1,
            scaleX: 1,
            duration: introTiming.glyphRevealDuration,
            stagger: introTiming.glyphRevealStagger,
            ease: "power2.out",
          },
          introTiming.glyphRevealStart,
        )
        .add(() => {
          startReveal();
        }, introTiming.revealStartTime)
        .to(
          '[data-intro="mark"]',
          {
            scale: 34,
            duration: 1.95,
            ease: "power4.inOut",
          },
          introTiming.markScaleStart,
        )

      if (hero) {
        timeline.to(
          hero,
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.95,
            ease: "power4.inOut",
          },
          introTiming.revealStartTime,
        );
      }

      timeline
        .to(
          '[data-intro="backdrop"]',
          { autoAlpha: 0, duration: 0.68, ease: "power2.out" },
          introTiming.backdropFadeStart,
        )
        .to(
          '[data-intro="mark-shell"]',
          { autoAlpha: 0, duration: 0.3, ease: "power2.out" },
          introTiming.markShellFadeStart,
        )
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.08,
            ease: "none",
          },
          introTiming.overlayFadeStart,
        );
    },
    { scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-120 overflow-hidden"
      style={{ width: "100%", height: "100%" }}
    >
      <div data-intro="backdrop" className="absolute inset-0 w-full h-full bg-[#080605]" />
      <div className="relative flex h-full w-full items-center justify-center">
        <div data-intro="mark-shell" className="relative flex items-center justify-center">
          <div
            data-intro="mark"
            className="flex select-none items-end -space-x-3 font-extrabold leading-none text-[#e3dfd8] will-change-transform md:-space-x-6"
          >
            {introGlyphs.map((glyph) => (
              <span key={glyph} data-intro="glyph-mask" className="overflow-hidden">
                <span data-intro="glyph" className="block text-[6.5rem] md:text-[14rem]">
                  {glyph}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;