import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu as MenuIcon, X, Sparkles, Coffee } from 'lucide-react';
import { cafeAudio } from '../utils/audio';

interface NavbarProps {
  onReserveClick: () => void;
  flightCount?: number;
  onOpenFlight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReserveClick,
  flightCount = 0,
  onOpenFlight,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAtmosphereAudio = () => {
    const playing = cafeAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Origins', href: '#beans' },
    { label: 'Menu', href: '#menu' },
    { label: 'The Noir', href: '#signature' },
    { label: 'Experience', href: '#experience' },
    { label: 'Sanctuary', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#e8dfd1] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-luxury text-lg md:text-xl font-bold tracking-[0.2em] text-[#1c1713] hover:text-[#9e7938] transition-colors whitespace-nowrap"
          >
            NOIR & BEAN
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-[0.15em] uppercase text-[#66584a]">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#1c1713] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#9e7938] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Ambient sound toggle */}
            <button
              onClick={toggleAtmosphereAudio}
              className={`p-2 rounded-full border transition-all duration-200 text-xs flex items-center justify-center ${
                isAudioPlaying
                  ? 'border-[#9e7938] text-[#9e7938] bg-[#9e7938]/10'
                  : 'border-[#d8ccbc] text-[#6b5d50] hover:text-[#1c1713] hover:border-[#9e7938] bg-white/70'
              }`}
              title={isAudioPlaying ? 'Mute café vinyl ambience' : 'Enable vinyl atmosphere audio'}
              aria-label="Toggle cafe ambiance audio"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Flight tray indicator if items added */}
            {flightCount > 0 && onOpenFlight && (
              <button
                onClick={onOpenFlight}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#9e7938] bg-[#9e7938]/10 border border-[#9e7938]/30 rounded-md hover:bg-[#9e7938]/20 transition-colors"
                title="View your customized tasting flight"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Flight ({flightCount})</span>
              </button>
            )}

            {/* Primary Action: Reserve Table */}
            <button
              onClick={onReserveClick}
              className="px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#322921] rounded-md shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap active:scale-[0.98]"
            >
              Reserve Table
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#66584a] hover:text-[#1c1713] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#faf7f2]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn border-b border-[#e8dfd1]">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#9e7938] border-b border-[#e8dfd1] pb-2 font-medium">
              Navigation
            </p>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-serif-luxury tracking-wider text-[#1c1713] hover:text-[#9e7938] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#e8dfd1] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReserveClick();
              }}
              className="w-full py-3 text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#faf7f2] bg-[#1c1713] rounded-md"
            >
              Reserve A Table
            </button>

            {flightCount > 0 && onOpenFlight && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFlight();
                }}
                className="w-full py-3 text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#9e7938] border border-[#9e7938]/40 rounded-md"
              >
                View Tasting Flight ({flightCount})
              </button>
            )}

            <div className="flex items-center justify-between text-xs text-[#8c7e70] pt-2">
              <span>Pune, Maharashtra</span>
              <button
                onClick={toggleAtmosphereAudio}
                className="flex items-center gap-1.5 text-[#9e7938]"
              >
                {isAudioPlaying ? 'Mute Sound' : 'Play Vinyl Ambient'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
