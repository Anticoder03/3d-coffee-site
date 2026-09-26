import React from 'react';
import { ArrowDown, Compass, Coffee } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';

interface HeroSectionProps {
  onReserveClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReserveClick }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#faf7f2] pt-20">
      {/* 3D Scene Layer */}
      <Hero3DScene />

      {/* Atmospheric Subtle Vignette & Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,89,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Subtle Tagline kicker */}
          <div className="flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-6 font-semibold">
            <span className="w-6 h-[1px] bg-[#9e7938]" />
            <span>Artisanal Micro-Roastery & Slow Bar</span>
          </div>

          {/* Large Cinematic Heading */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1713] leading-[1.08] mb-6 [text-wrap:balance]">
            COFFEE, <br />
            <span className="italic font-normal bg-gradient-to-r from-[#1c1713] via-[#5c402c] to-[#9e7938] bg-clip-text text-transparent">
              REIMAGINED.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#5c5044] leading-relaxed mb-10 max-w-xl font-light">
            Handcrafted coffee, carefully sourced beans, and an experience designed to slow time down. Where modern precision meets ancient ritual.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              Explore Menu
            </a>

            <a
              href="#location"
              className="px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#1c1713] border border-[#d8cdbe] hover:border-[#9e7938] hover:text-[#9e7938] rounded-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center bg-white/80 backdrop-blur-sm shadow-sm"
            >
              Visit Us
            </a>

            <button
              onClick={onReserveClick}
              className="px-4 py-3.5 text-xs tracking-[0.14em] uppercase text-[#6b5d50] hover:text-[#1c1713] transition-colors flex items-center gap-2 group font-medium"
            >
              <span>Book Tasting Table</span>
              <span className="text-[#9e7938] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Bottom Trust Indicators & Live Roast Batch */}
          <div className="mt-14 pt-8 border-t border-[#e8dfd1] flex flex-wrap items-center gap-6 text-xs text-[#736556]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[#9e7938] font-semibold">Batch #48 Roast Active</span>
            </div>
            <span className="text-[#c8beaf]" aria-hidden="true">·</span>
            <div>Single Origin Ethiopia & Colombia</div>
            <span className="text-[#c8beaf]" aria-hidden="true">·</span>
            <div>Pune Sanctuary Open</div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <a
        href="#philosophy"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#8c7e70] hover:text-[#9e7938] transition-colors"
        aria-label="Scroll down to philosophy"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
