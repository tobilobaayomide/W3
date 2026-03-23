import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bitcoin from "../assets/bitcoin.jpeg";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const posts = [
  {
    date: "Mar 12, 2026",
    desc: "How Bitcoin Layer-2 networks are redefining the boundaries of on-chain execution and trustless computation.",
  },
  {
    date: "Feb 05, 2026",
    desc: "A deep dive into ordinal inscription filtering and why ZeroScope changes the game for Bitcoin-native indexers.",
  },
  {
    date: "Jan 18, 2026",
    desc: "Block timestamp synchronization at scale — lessons learned from running PulseSync across 40 nodes.",
  },
];

type BlogProps = {
  pinTargetRef: RefObject<HTMLElement | null>;
};

const Blog: React.FC<BlogProps> = ({ pinTargetRef }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      const pinTarget = pinTargetRef.current;

      if (!section || !inner || !pinTarget) {
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(inner, { yPercent: 0, clearProps: "transform" });
        return;
      }

      const isDesktop = window.innerWidth >= 768;
      gsap.set(inner, { yPercent: 100 });
      const pinStart = isDesktop ? "top top-=120" : "top top";
      const pinEnd = "top top";

      ScrollTrigger.create({
        trigger: pinTarget,
        start: pinStart,
        endTrigger: section,
        end: pinEnd,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      gsap.to(inner, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: pinTarget,
          start: pinStart,
          endTrigger: section,
          end: pinEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const guide = section.querySelector<HTMLElement>('[data-blog="guide"]');
      const heading = section.querySelector<HTMLElement>('[data-blog="heading"]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-blog="card"]');
      const playedCards = new Set<HTMLElement>();
      let introPlayed = false;

      if (guide) {
        gsap.set(guide, { scaleY: 0, transformOrigin: "top center" });
      }

      if (heading) {
        gsap.set(heading, { y: 36, autoAlpha: 0 });
      }

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>('[data-blog="image"]');
        const imageInner = card.querySelector<HTMLElement>('[data-blog="image-inner"]');
        const divider = card.querySelector<HTMLElement>('[data-blog="card-divider"]');
        const meta = card.querySelector<HTMLElement>('[data-blog="meta"]');

        if (image) {
          gsap.set(image, { clipPath: "inset(0% 0% 100% 0%)" });
        }

        if (imageInner) {
          gsap.set(imageInner, { scale: 1.08 });
        }

        if (divider) {
          gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
        }

        if (meta) {
          gsap.set(meta, { y: 24, autoAlpha: 0 });
        }
      });

      const playIntro = () => {
        if (introPlayed || !heading) {
          return;
        }

        introPlayed = true;

        const introTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (guide) {
          introTimeline.to(guide, { scaleY: 1, duration: 0.9 });
        }

        const eyebrow = section.querySelector<HTMLElement>('[data-blog="eyebrow"]');

        if (eyebrow) {
          introTimeline.to(
            eyebrow,
            { y: 0, autoAlpha: 1, duration: 0.55 },
            guide ? "-=0.55" : 0,
          );
        }

        introTimeline.to(
          heading,
          { y: 0, autoAlpha: 1, duration: 0.72 },
          eyebrow || guide ? "-=0.35" : 0,
        );
      };

      const cardTimingProfiles = [
        { imageMask: 1.1, imageScale: 0.95, divider: 0.36, meta: 0.58 },
        { imageMask: 1.55, imageScale: 1.2, divider: 0.46, meta: 0.72 },
        { imageMask: 2.05, imageScale: 1.55, divider: 0.58, meta: 0.88 },
      ];
      const mobileTimingProfile = {
        imageMask: 1.05,
        imageScale: 0.95,
        divider: 0.36,
        meta: 0.58,
      };

      const playCard = (card: HTMLElement, index: number) => {
        if (playedCards.has(card)) {
          return;
        }

        playedCards.add(card);
        const timing = isDesktop
          ? cardTimingProfiles[index] ?? cardTimingProfiles[cardTimingProfiles.length - 1]
          : mobileTimingProfile;

        const image = card.querySelector<HTMLElement>('[data-blog="image"]');
        const imageInner = card.querySelector<HTMLElement>('[data-blog="image-inner"]');
        const divider = card.querySelector<HTMLElement>('[data-blog="card-divider"]');
        const meta = card.querySelector<HTMLElement>('[data-blog="meta"]');

        const cardTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (image) {
          cardTimeline.to(image, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: timing.imageMask,
            ease: "power2.inOut",
          });
        }

        if (imageInner) {
          cardTimeline.to(
            imageInner,
            {
              scale: 1,
              duration: timing.imageScale,
              ease: "power2.out",
            },
            0,
          );
        }

        if (divider) {
          cardTimeline.to(
            divider,
            { scaleX: 1, duration: timing.divider, ease: "power2.out" },
            image ? "-=0.5" : 0,
          );
        }

        if (meta) {
          cardTimeline.to(
            meta,
            { y: 0, autoAlpha: 1, duration: timing.meta },
            divider || image ? "-=0.2" : 0,
          );
        }
      };

      const checkVisibility = () => {
        const viewportHeight = window.innerHeight;

        if (heading) {
          const rect = heading.getBoundingClientRect();

          if (rect.top <= viewportHeight * 0.92 && rect.bottom >= 0) {
            playIntro();
          }
        }

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();

          if (rect.top <= viewportHeight && rect.bottom >= 0) {
            playCard(card, index);
          }
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onEnter: checkVisibility,
        onEnterBack: checkVisibility,
        onUpdate: checkVisibility,
        onRefresh: checkVisibility,
      });

      checkVisibility();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative z-20 overflow-hidden">
      <div ref={innerRef} className="relative flex flex-col bg-[#c2b8a5] will-change-transform">
        <div
          data-blog="guide"
          className="absolute top-0 right-120 block h-142 w-px -translate-x-1/2 bg-black opacity-20"
        />

        {/* Header */}
        <div className="flex flex-col items-start gap-6 px-4 pt-16 md:gap-30 md:px-7 md:pt-40 max-w-300">
          <span data-blog="eyebrow" className="shrink-0 text-base font-medium md:text-lg">
            <span className="text-[#9c9b98]">[03]</span> Blog
          </span>
          <span
            data-blog="heading"
            className="text-4xl font-extrabold leading-tight md:text-7xl"
          >
            FRESH INSIGHTS AND CHAIN-LEVEL WALKTHROUGHS
          </span>
        </div>

        <div className="mt-6" />

        {/* 3 columns */}
        <div className="mx-4 mb-40 grid grid-cols-1 gap-10 md:mx-7 md:grid-cols-3">
          {posts.map((post) => (
            <div key={post.date} data-blog="card" className="flex flex-col gap-4">
              <div data-blog="image" className="overflow-hidden">
                <img
                  data-blog="image-inner"
                  src={bitcoin}
                  alt="bitcoin"
                  className="h-100 w-full object-cover md:h-150"
                />
              </div>
              <div data-blog="meta" className="flex flex-col">
                <div data-blog="card-divider" className="mt-2 md:mt-4 h-px w-full bg-black" />
                <span className="mt-8 text-sm md:text-lg text-[#5b5b5b]">
                  {post.date}
                </span>
                <p className="text-sm md:text-xl leading-relaxed">{post.desc}</p>
                <a href="#" className="mt-2 text-sm md:text-xl font-bold">
                  [Read More]
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
