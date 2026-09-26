import React, { useState } from 'react';
import { Award, Compass, Sparkles, Flame, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ritual' | 'sourcing' | 'roasting'>('ritual');

  const stats = [
    { value: '12+', label: 'Coffee Origins', sub: 'Direct trade micro-lots' },
    { value: '8', label: 'Signature Brews', sub: 'House craft formulations' },
    { value: '6', label: 'Years of Craft', sub: 'Dedicated Pune sanctuary' },
    { value: '94.5', label: 'Cupping Standard', sub: 'Specialty Coffee grade' },
  ];

  return (
    <section id="philosophy" className="relative py-28 md:py-36 bg-[#f5f0e6] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      {/* Subtle lighting accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Top Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 01</span>
              <span aria-hidden="true">·</span>
              <span>Our Philosophy</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713] [text-wrap:balance]">
              MORE THAN A CUP.
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-[#5c5044] font-light leading-relaxed">
            "We believe great coffee is more than a drink. It is a ritual, a conversation, a pause between moments."
          </p>
        </div>

        {/* Editorial Grid: Imagery + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          {/* Main Visual: Roasting Craft */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#ded3c2] shadow-xl bg-[#ede5d8]">
              <img
                src="/src/assets/images/coffee_roasting_craft_1790354096982.jpg"
                alt="Artisanal cast-iron coffee bean roasting at NOIR & BEAN"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/90 via-[#120f0d]/20 to-transparent" />
              
              {/* Bottom image caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white">
                <div>
                  <p className="font-serif-luxury text-base text-white tracking-wide">Cast-Iron Drum Roasting</p>
                  <p className="text-[#ded3c2] text-[11px] tracking-wider uppercase mt-0.5">Small batches under 5kg for thermal precision</p>
                </div>
                <div className="text-right font-mono tabular-nums text-[#e8c785] text-xs font-semibold">
                  204°C First Crack
                </div>
              </div>
            </div>

            {/* Floating Overlapping Interior Badge */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 aspect-[4/3] rounded-lg overflow-hidden border border-[#ffffff] shadow-2xl bg-[#ede5d8]">
              <img
                src="/src/assets/images/cafe_interior_ambiance_1790354083709.jpg"
                alt="NOIR & BEAN Pune interior seating atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] tracking-wider uppercase text-[#e8c785] font-semibold">The Pune Sanctuary</span>
              </div>
            </div>
          </div>

          {/* Philosophy Pillars & Interactive Tabs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Pillar Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#ede5d8] border border-[#ded3c2] rounded-lg">
              <button
                onClick={() => setActiveTab('ritual')}
                className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
                  activeTab === 'ritual'
                    ? 'bg-[#ffffff] text-[#1c1713] shadow-sm'
                    : 'text-[#736556] hover:text-[#1c1713]'
                }`}
              >
                The Ritual
              </button>
              <button
                onClick={() => setActiveTab('sourcing')}
                className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
                  activeTab === 'sourcing'
                    ? 'bg-[#ffffff] text-[#1c1713] shadow-sm'
                    : 'text-[#736556] hover:text-[#1c1713]'
                }`}
              >
                Ethical Origin
              </button>
              <button
                onClick={() => setActiveTab('roasting')}
                className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
                  activeTab === 'roasting'
                    ? 'bg-[#ffffff] text-[#1c1713] shadow-sm'
                    : 'text-[#736556] hover:text-[#1c1713]'
                }`}
              >
                The Roaster
              </button>
            </div>

            {/* Tab Narrative */}
            <div className="p-6 rounded-lg bg-[#ffffff] border border-[#e8dfd1] shadow-sm">
              {activeTab === 'ritual' && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-xl text-[#1c1713] font-bold">An Antidote to Haste</h3>
                  <p className="text-sm text-[#5c5044] leading-relaxed">
                    In a world racing toward automated efficiency, NOIR & BEAN preserves the conscious art of slow extraction. Every pour-over is weighed to the tenth of a gram, water mineralized to exact TDS standards, and served at the peak temperature for sensory bouquet unfoldment.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#9e7938] pt-2 font-medium">
                    <span>93.5°C Optimal Extraction</span>
                    <span aria-hidden="true">·</span>
                    <span>1:16 Brew Ratio</span>
                  </div>
                </div>
              )}

              {activeTab === 'sourcing' && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-xl text-[#1c1713] font-bold">Direct Producer Partnerships</h3>
                  <p className="text-sm text-[#5c5044] leading-relaxed">
                    We bypass multi-tiered commodity auctions to work directly with generational growers across Yirgacheffe, Huila, and Cerrado. We pay premiums of 80% to 120% above Fair Trade baselines to ensure regenerative soil health and worker equity.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#9e7938] pt-2 font-medium">
                    <span>100% Traceable</span>
                    <span aria-hidden="true">·</span>
                    <span>Shade-Grown Canopy</span>
                  </div>
                </div>
              )}

              {activeTab === 'roasting' && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-xl text-[#1c1713] font-bold">Small-Batch Thermal Profiles</h3>
                  <p className="text-sm text-[#5c5044] leading-relaxed">
                    Our customized vintage drum roasters allow convective and conductive heat balancing that highlights delicate floral terpenes and stone fruit esters without scorch or smoky masking. Freshly roasted every Tuesday and Friday morning in Pune.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#9e7938] pt-2 font-medium">
                    <span>Roasted In-House</span>
                    <span aria-hidden="true">·</span>
                    <span>Nitrogen-Flushed Degas</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quote attribution */}
            <div className="text-xs text-[#8c7e70] italic">
              "Coffee is liquid architecture. If the foundation is true, every sip elevates."
            </div>
          </div>
        </div>

        {/* Animated Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#ded3c2]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#ffffff] border border-[#e8dfd1] hover:border-[#9e7938]/60 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1713] group-hover:text-[#9e7938] transition-colors font-mono tabular-nums mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#9e7938] mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#736556]">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
