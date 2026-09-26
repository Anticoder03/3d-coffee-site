import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const steps = [
    'Sourcing Ethiopian Heirloom Beans',
    'Igniting Cast-Iron Drum Roaster',
    'Synthesizing 3D Crema & Steam',
    'Calibrating Atmospheric Light',
    'Welcome to NOIR & BEAN',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Organic progress curve
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12));
        const next = Math.min(100, prev + increment);
        if (next > 20 && next <= 45) setStepIndex(1);
        else if (next > 45 && next <= 70) setStepIndex(2);
        else if (next > 70 && next <= 90) setStepIndex(3);
        else if (next > 90) setStepIndex(4);
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 350);

      const removeTimeout = setTimeout(() => {
        setIsRemoved(true);
        onLoaded?.();
      }, 950);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [progress, onLoaded]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf7f2] text-[#231b15] transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy={progress < 100}
    >
      {/* Subtle radial ambient warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Brand Monogram & Rotating Ring */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer slow ring */}
        <div className="w-24 h-24 rounded-full border border-[#9e7938]/25 border-t-[#9e7938] animate-spin [animation-duration:3s]" />
        
        {/* Inner reverse slow ring */}
        <div className="absolute w-16 h-16 rounded-full border border-dashed border-[#9e7938]/35 animate-spin [animation-duration:6s] [animation-direction:reverse]" />

        {/* Center Coffee Bean Icon */}
        <div className="absolute flex items-center justify-center text-[#9e7938]">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z" />
          </svg>
        </div>
      </div>

      {/* Brand Typographic Lockup */}
      <div className="text-center px-4 mb-8">
        <h1 className="font-serif-luxury text-2xl md:text-3xl tracking-[0.25em] text-[#1c1713] font-semibold">
          NOIR & BEAN
        </h1>
        <p className="text-xs md:text-sm text-[#9e7938] tracking-[0.3em] uppercase mt-2 font-medium">
          Where Coffee Meets Craft
        </p>
      </div>

      {/* Progress Bar & Numerical Counter */}
      <div className="w-64 max-w-[85vw] space-y-3">
        <div className="h-[2px] w-full bg-[#e8e0d2] overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#9e7938] via-[#c5a059] to-[#dfc083] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[#736556]">
          <span className="text-[11px] tracking-wider uppercase text-[#9e7938] truncate max-w-[190px]">
            {steps[stepIndex]}
          </span>
          <span className="font-semibold text-[#1c1713]">{progress}%</span>
        </div>
      </div>

      {/* Subtle sensory note */}
      <p className="absolute bottom-8 text-[11px] tracking-widest uppercase text-[#9e9081]">
        Handcrafted in Pune · Est. 2020
      </p>
    </div>
  );
};
