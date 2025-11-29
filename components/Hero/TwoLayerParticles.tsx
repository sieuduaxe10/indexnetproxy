"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const baseOptions = (imageSrc: string): ISourceOptions => ({
  background: { color: { value: "transparent" } }, // backdrop
  fpsLimit: 60,
  detectRetina: true,

  particles: {
    number: {
      value: 35,
      density: { enable: false },
    },
    color: { value: "#080707" },
    links: { enable: false }, // no link lines
    size: { value: { min: 2, max: 10 } },
    opacity: { value: { min: 0.2, max: 0.5 } },

    move: {
      enable: true,
      direction: "none", // "random" path → use none with low speed for random-ish spread
      random: false,
      straight: false,
      speed: 0.3,
      outModes: { default: "out" },
      vibrate: false,
      gravity: { enable: false },
      trail: { enable: false },
      spin: { enable: false },
      attract: { enable: false },
    },

    shape: {
      type: "image",
      image: {
        src: imageSrc,
        width: 300,
        height: 300,
      },
    },

    rotate: {
      value: 0,
      direction: "random",
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
  },

  interactivity: {
    events: {
      onHover: { enable: false, mode: [] },
      onClick: { enable: false, mode: [] },
      resize: true,
    },
    modes: {
      // included for parity with your Framer config (even if hover/click are disabled)
      connect: { distance: 100, radius: 50, links: { opacity: 0.2 } },
      grab: { distance: 100, links: { opacity: 0.2 } },
      bubble: { distance: 100, size: 40, duration: 0.4 },
      repulse: { distance: 200, duration: 1.2 },
      push: { quantity: 4 },
      remove: { quantity: 4 },
      trail: { delay: 0.1, quantity: 10 },
    },
  },
});

export default function TwoLayerParticles() {
  // load the slim bundle (images + basic movers)
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-10 flex-none">
        {/* Layer 1 - Cross icon */}
        <div className="relative w-full h-full overflow-hidden bg-transparent translate-z-0 rounded-none">
          <Particles
            id="One"
            init={init}
            options={baseOptions("/images/hero/background-cross-icon.png")}
          />
        </div>

        {/* Your foreground content here */}
      </div>
      <div className="absolute inset-0 z-10 flex-none">
        <div className="relative w-full h-full overflow-hidden bg-transparent translate-z-0 rounded-none">
          {/* Layer 2 - Round icon */}
          <Particles
            id="Two"
            init={init}
            options={baseOptions("/images/hero/background-round-icon.png")}
          />
        </div>
      </div>
    </>
  );
}
