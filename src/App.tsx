import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { Beans3DSection } from './components/Beans3DSection';
import { SignatureDrink3D } from './components/SignatureDrink3D';
import { MenuSection } from './components/MenuSection';
import { TastingFlightDrawer } from './components/TastingFlightDrawer';
import { ExperienceSection } from './components/ExperienceSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MenuItem } from './types';

export default function App() {
  const [flightItems, setFlightItems] = useState<MenuItem[]>([]);
  const [isFlightDrawerOpen, setIsFlightDrawerOpen] = useState(false);

  const handleAddToFlight = (item: MenuItem) => {
    if (flightItems.some((f) => f.id === item.id)) return;
    if (flightItems.length >= 3) {
      setIsFlightDrawerOpen(true);
      return;
    }
    setFlightItems([...flightItems, item]);
  };

  const handleRemoveFromFlight = (itemId: string) => {
    setFlightItems(flightItems.filter((f) => f.id !== itemId));
  };

  const handleClearFlight = () => {
    setFlightItems([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#231b15] selection:bg-[#9e7938]/25 selection:text-[#1c1713] relative">
      {/* Brand-aligned Loading Screen */}
      <LoadingScreen />

      {/* Floating Transparent/Blur Navbar */}
      <Navbar
        onReserveClick={scrollToReservation}
        flightCount={flightItems.length}
        onOpenFlight={() => setIsFlightDrawerOpen(true)}
      />

      <main>
        {/* Full-Screen Immersive 3D Hero */}
        <HeroSection onReserveClick={scrollToReservation} />

        {/* Philosophy & Craft */}
        <AboutSection />

        {/* Interactive 3D Coffee Bean Origins */}
        <Beans3DSection />

        {/* The Signature Drink 3D Assembly */}
        <SignatureDrink3D />

        {/* Interactive Menu Collection */}
        <MenuSection
          flightItems={flightItems}
          onAddToFlight={handleAddToFlight}
          onRemoveFromFlight={handleRemoveFromFlight}
          onOpenFlight={() => setIsFlightDrawerOpen(true)}
        />

        {/* Physical Café Experience */}
        <ExperienceSection />

        {/* Table Reservation & Flight Ordering */}
        <ReservationSection
          flightItems={flightItems}
          onClearFlight={handleClearFlight}
        />

        {/* Sanctuary Location & Dark Map */}
        <LocationSection />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer />

      {/* Tasting Flight Slide-Out Drawer */}
      <TastingFlightDrawer
        isOpen={isFlightDrawerOpen}
        onClose={() => setIsFlightDrawerOpen(false)}
        flightItems={flightItems}
        onRemoveItem={handleRemoveFromFlight}
        onClearFlight={handleClearFlight}
        onProceedToReservation={scrollToReservation}
      />
    </div>
  );
}
