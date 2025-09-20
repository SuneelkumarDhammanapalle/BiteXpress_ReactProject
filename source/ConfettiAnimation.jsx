import React, { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

export default function ConfettiAnimation({ trigger }) {
  const [init, setInit] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (init && trigger > 0) {
      setShowParticles(true);
      const timer = setTimeout(() => {
        setShowParticles(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [init, trigger]);

  const options = {
    preset: "fireworks",
    // Set fullScreen to false
    fullScreen: {
      enable: false,
    },
    sounds: {
      enable: false,
    },
    // The following properties may not be necessary, but can be added to be explicit
    background: {
      color: {
        value: "transparent",
      },
    },
  };

  // Manually apply styles to the Particles component
  const style = {
    position: 'fixed', // Position it relative to the viewport
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999, // Ensure it's on top
    pointerEvents: 'none', // Allow clicks to pass through to the elements below
  };

  if (showParticles) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        style={style} // Apply the custom style
      />
    );
  }

  return null;
}