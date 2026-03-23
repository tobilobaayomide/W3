import React, { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import CircularText from "./components/CircularText";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IntroOverlay from "./components/IntroOverlay";
import ModuleOne from "./components/ModuleOne";
import ModuleTwo from "./components/ModuleTwo";

const App: React.FC = () => {
  const [introRevealStarted, setIntroRevealStarted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const initialOverflowRef = useRef<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const moduleTwoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (initialOverflowRef.current === null) {
      initialOverflowRef.current = document.body.style.overflow;
    }

    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = initialOverflowRef.current ?? "";
    }

    return () => {
      document.body.style.overflow = initialOverflowRef.current ?? "";
    };
  }, [introComplete]);

  return (
    <div className="relative min-h-screen bg-[#e3dfd8]">
      {introComplete ? null : (
        <IntroOverlay
          heroRef={heroRef}
          onRevealStart={() => setIntroRevealStarted(true)}
          onComplete={() => setIntroComplete(true)}
        />
      )}
      <Hero introReady={introRevealStarted} sectionRef={heroRef} />
      <ModuleOne />
      <ModuleTwo sectionRef={moduleTwoRef} />
      <Blog pinTargetRef={moduleTwoRef} />
      <Footer />
      {introComplete ? <CircularText /> : null}
    </div>
  );
};

export default App;
