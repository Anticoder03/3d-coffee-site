import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Car, Train } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const openDirections = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Pune+Maharashtra+India',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="location" className="relative py-28 md:py-36 bg-[#faf7f2] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 07</span>
              <span aria-hidden="true">·</span>
              <span>Find Us</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713]">
              THE LOCATION.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#5c5044] font-light leading-relaxed">
            Nestled in the lush leafy avenues of Pune, crafted with warm limestone, bespoke walnut joinery, and an acoustic soundscape.
          </p>
        </div>

        {/* Location Details + Stylized Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Contact, Address, Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-8 rounded-2xl bg-[#ffffff] border border-[#ded3c2] shadow-md">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9e7938] font-bold block mb-1">
                  Sanctuary Flagship
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1c1713]">
                  NOIR & BEAN
                </h3>
                <p className="text-sm text-[#5c5044] mt-1 font-light leading-relaxed">
                  123 Coffee Street, Koregaon Park Enclave<br />
                  Pune, Maharashtra 411001, India
                </p>
              </div>

              {/* Operating Hours */}
              <div className="pt-6 border-t border-[#e8dfd1] space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9e7938] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Opening Hours</span>
                </div>
                <div className="space-y-1.5 text-xs text-[#231b15]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#736556]">Monday – Friday</span>
                    <span className="font-mono tabular-nums font-semibold">8:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#736556]">Saturday – Sunday</span>
                    <span className="font-mono tabular-nums font-semibold">8:00 AM – 11:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Contact lines */}
              <div className="pt-6 border-t border-[#e8dfd1] space-y-3 text-xs text-[#5c5044]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9e7938]" />
                  <a href="tel:+912066009988" className="hover:text-[#1c1713] transition-colors font-mono">
                    +91 (020) 6600 9988
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9e7938]" />
                  <a href="mailto:concierge@noirandbean.coffee" className="hover:text-[#1c1713] transition-colors">
                    concierge@noirandbean.coffee
                  </a>
                </div>
              </div>

              {/* Transit & Amenities */}
              <div className="pt-6 border-t border-[#e8dfd1] grid grid-cols-2 gap-3 text-[11px] text-[#736556]">
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-[#9e7938]" />
                  <span>Complimentary Valet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-[#9e7938]" />
                  <span>5 Min from Metro</span>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <button
              onClick={openDirections}
              className="w-full py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions in Google Maps</span>
            </button>
          </div>

          {/* Right: Stylized Light Architectural Map Canvas */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#ded3c2] bg-[#f5ede0] relative min-h-[380px] flex items-center justify-center group shadow-md">
            {/* Architectural SVG Map Graphics */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80 transition-opacity duration-700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(158,121,56,0.15)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-light)" />
              {/* Abstract Stylized River (Mula-Mutha river line in Pune) */}
              <path
                d="M -100 240 C 150 180, 300 320, 600 210 C 800 120, 1000 260, 1200 200"
                fill="none"
                stroke="rgba(158,121,56,0.3)"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M -100 240 C 150 180, 300 320, 600 210 C 800 120, 1000 260, 1200 200"
                fill="none"
                stroke="rgba(158,121,56,0.55)"
                strokeWidth="2"
                strokeDasharray="4 8"
              />
              {/* Stylized arterial avenues */}
              <line x1="120" y1="0" x2="380" y2="600" stroke="rgba(70,55,42,0.18)" strokeWidth="3" />
              <line x1="50" y1="420" x2="900" y2="280" stroke="rgba(70,55,42,0.14)" strokeWidth="2" />
              <line x1="280" y1="0" x2="680" y2="600" stroke="rgba(70,55,42,0.12)" strokeWidth="1.5" />
            </svg>

            {/* Glowing Map Pin for NOIR & BEAN */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {/* Radar pulse rings */}
                <div className="absolute w-20 h-20 rounded-full border border-[#9e7938]/40 animate-ping [animation-duration:2.5s]" />
                <div className="absolute w-12 h-12 rounded-full bg-[#9e7938]/20" />
                
                {/* Pin core */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#9e7938] to-[#c5a059] flex items-center justify-center text-white shadow-xl border-2 border-white">
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Pin Callout Box */}
              <div className="mt-3 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-md border border-[#ded3c2] shadow-xl text-center">
                <span className="font-serif-luxury text-sm font-bold text-[#1c1713] block">
                  NOIR & BEAN
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#9e7938] font-mono font-semibold">
                  18.5362° N, 73.8958° E · Pune
                </span>
              </div>
            </div>

            {/* Corner coordinate HUD */}
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#8c7e70]">
              Koregaon Park Sector 4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
