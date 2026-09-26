import React, { useState } from 'react';
import { Coffee, Sprout, Flame, Music, Laptop, Volume2, VolumeX, Wifi, Sun } from 'lucide-react';
import { cafeAudio } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAtmosphere = () => {
    const active = cafeAudio.toggle();
    setIsPlayingAudio(active);
  };

  const features = [
    {
      icon: Coffee,
      title: 'Specialty Coffee',
      desc: 'Top 1% harvest Arabica graded by certified Q-graders, extracted on custom dual-boiler Kees van der Westen machines.',
    },
    {
      icon: Sprout,
      title: 'Ethically Sourced Beans',
      desc: 'Direct farm contracts paying 100%+ over Fair Trade minimums to promote regenerative soil ecology in Ethiopia & Colombia.',
    },
    {
      icon: Flame,
      title: 'Small-Batch Roasting',
      desc: 'Roasting in vintage cast-iron drums under 5kg per batch to retain volatile floral terpenes and stone fruit sweetness.',
    },
    {
      icon: Music,
      title: 'Curated Atmosphere',
      desc: 'Analogue vinyl turntable rotation: Japanese jazz kissaten, warm lo-fi soul, and ambient modular soundscapes.',
    },
    {
      icon: Laptop,
      title: 'Work-Friendly Sanctuary',
      desc: 'Dedicated quiet library lounge with recessed brass power ports, ergonomic oak armchairs, and 500Mbps symmetrical fiber.',
    },
    {
      icon: Sun,
      title: 'Sunlit Courtyard',
      desc: 'Open-air shaded brick patio surrounded by fragrant coffee trees, native ferns, and evening warm lantern glow.',
    },
  ];

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#faf7f2] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 05</span>
              <span aria-hidden="true">·</span>
              <span>The Sanctuary</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713]">
              CAFÉ EXPERIENCE.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAtmosphere}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md border text-xs font-semibold tracking-wider uppercase transition-all ${
                isPlayingAudio
                  ? 'border-[#9e7938] bg-[#9e7938]/15 text-[#9e7938]'
                  : 'border-[#ded3c2] bg-[#ffffff] text-[#6b5d50] hover:text-[#1c1713] hover:border-[#9e7938] shadow-sm'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Ambient Sound Active' : 'Experience Audio'}</span>
            </button>
          </div>
        </div>

        {/* Large Immersive Image Banner */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#ded3c2] shadow-xl mb-16 group">
          <img
            src="/src/assets/images/cafe_interior_ambiance_1790354083709.jpg"
            alt="Interior architectural atmosphere of NOIR & BEAN in Pune"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/90 via-[#120f0d]/25 to-transparent" />

          {/* Floating Audio / Atmosphere Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="max-w-lg">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#e8c785]">
                Architectural Acoustic Space
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                Designed for Presence & Unhurried Hours
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#ded3c2] font-mono">
              <span className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-[#e8c785]" />
                <span>500 Mbps Fiber</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>120 Seating Capacity</span>
            </div>
          </div>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-[#ffffff] border border-[#e8dfd1] hover:border-[#b3883b]/60 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f8f5ee] border border-[#ded3c2] flex items-center justify-center text-[#9e7938] group-hover:border-[#9e7938] transition-colors mb-6">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#1c1713] mb-2 group-hover:text-[#9e7938] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-[#5c5044] leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
