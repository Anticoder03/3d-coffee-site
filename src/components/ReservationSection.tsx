import React, { useState } from 'react';
import { MenuItem, ReservationData } from '../types';
import { Calendar, Clock, Users, Coffee, CheckCircle, Sparkles, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationSectionProps {
  flightItems: MenuItem[];
  onClearFlight: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  flightItems,
  onClearFlight,
}) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '11:00',
    guests: 2,
    seating: 'Library Lounge',
    specialNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<{
    data: ReservationData;
    bookingId: string;
    flight: MenuItem[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = 'NB-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedReservation({
        data: { ...formData },
        bookingId,
        flight: [...flightItems],
      });

      // Fire elegant gold celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#e8d3a7', '#8a682c', '#ffffff'],
      });
    }, 700);
  };

  const seatingOptions: ReservationData['seating'][] = [
    'Library Lounge',
    'Espresso Bar',
    'Sunlit Patio',
    'Cupping Table',
  ];

  const timeSlots = [
    '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
    '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM',
    '07:00 PM', '08:30 PM',
  ];

  return (
    <section id="reservation" className="relative py-28 md:py-36 bg-[#f5f0e6] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
            <span>Chapter 06</span>
            <span aria-hidden="true">·</span>
            <span>Table Hospitality</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#1c1713] mb-4">
            YOUR TABLE IS WAITING.
          </h2>
          <p className="text-sm md:text-base text-[#5c5044] font-light leading-relaxed">
            Reserve a dedicated enclave for your coffee ritual, sensory cupping session, or quiet creative contemplation.
          </p>
        </div>

        {/* Reservation Form Container */}
        <div className="max-w-3xl mx-auto bg-[#ffffff] border border-[#ded3c2] rounded-2xl p-8 sm:p-12 shadow-xl relative">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 bg-[radial-gradient(ellipse_at_top,rgba(180,136,59,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Attached Tasting Flight Banner if user has items */}
          {flightItems.length > 0 && (
            <div className="mb-8 p-4 rounded-xl bg-[#fcfaf7] border border-[#ded3c2] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-[#9e7938]" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9e7938] font-bold block">
                    Custom Tasting Flight Attached ({flightItems.length}/3)
                  </span>
                  <span className="text-xs text-[#5c5044]">
                    {flightItems.map((f) => f.name).join(' · ')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClearFlight}
                className="text-xs text-[#8c7e70] hover:text-rose-600 underline font-medium"
              >
                Remove Flight
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] placeholder-[#8c7e70] focus:outline-none focus:border-[#9e7938] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] placeholder-[#8c7e70] focus:outline-none focus:border-[#9e7938] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Phone & Number of Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] placeholder-[#8c7e70] focus:outline-none focus:border-[#9e7938] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] focus:outline-none focus:border-[#9e7938] transition-colors"
                >
                  <option value={1}>1 Guest (Solo Quiet Contemplation)</option>
                  <option value={2}>2 Guests (Table for Two)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Standard Lounge)</option>
                  <option value={6}>6 Guests (Cupping Table Group)</option>
                  <option value={8}>8+ Guests (Private Tasting Suite)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] focus:outline-none focus:border-[#9e7938] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                  Seating Zone
                </label>
                <select
                  value={formData.seating}
                  onChange={(e) => setFormData({ ...formData, seating: e.target.value as ReservationData['seating'] })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] focus:outline-none focus:border-[#9e7938] transition-colors"
                >
                  {seatingOptions.map((seat) => (
                    <option key={seat} value={seat}>
                      {seat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots Grid */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                Preferred Seating Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, time: slot })}
                    className={`py-2 text-xs font-mono tabular-nums rounded border transition-colors ${
                      formData.time === slot
                        ? 'bg-[#1c1713] text-[#faf7f2] font-bold border-[#1c1713] shadow-sm'
                        : 'bg-[#faf7f2] text-[#5c5044] border-[#ded3c2] hover:border-[#9e7938] hover:text-[#1c1713]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5c5044] mb-2 font-semibold">
                Special Requests / Dietary Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Oat milk preference, anniversary celebration, window seating..."
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ded3c2] rounded-lg text-sm text-[#1c1713] placeholder-[#8c7e70] focus:outline-none focus:border-[#9e7938] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Sanctuary Reservation...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#e8c785]" />
                  <span>Reserve a Table</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal Voucher */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1713]/50 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#ffffff] border border-[#ded3c2] rounded-2xl p-8 sm:p-10 shadow-2xl text-left">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="absolute top-4 right-4 p-2 text-[#736556] hover:text-[#1c1713] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#9e7938] font-bold block">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1c1713]">
                  NOIR & BEAN Sanctuary
                </h3>
              </div>
            </div>

            {/* Voucher Details */}
            <div className="p-6 rounded-xl bg-[#faf7f2] border border-[#e8dfd1] space-y-4 mb-6 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8dfd1]">
                <span className="text-[#736556] uppercase tracking-wider font-medium">Booking ID</span>
                <span className="font-mono text-sm font-bold text-[#1c1713]">
                  {confirmedReservation.bookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#e8dfd1]">
                <div>
                  <span className="text-[#736556] block uppercase text-[10px] tracking-wider mb-1 font-medium">Guest</span>
                  <span className="text-[#1c1713] font-semibold">{confirmedReservation.data.name}</span>
                </div>
                <div>
                  <span className="text-[#736556] block uppercase text-[10px] tracking-wider mb-1 font-medium">Party Size</span>
                  <span className="text-[#1c1713] font-semibold">{confirmedReservation.data.guests} Guests</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#e8dfd1]">
                <div>
                  <span className="text-[#736556] block uppercase text-[10px] tracking-wider mb-1 font-medium">Date & Time</span>
                  <span className="text-[#1c1713] font-mono font-medium">{confirmedReservation.data.date} · {confirmedReservation.data.time}</span>
                </div>
                <div>
                  <span className="text-[#736556] block uppercase text-[10px] tracking-wider mb-1 font-medium">Enclave</span>
                  <span className="text-[#9e7938] font-bold">{confirmedReservation.data.seating}</span>
                </div>
              </div>

              {confirmedReservation.flight.length > 0 && (
                <div>
                  <span className="text-[#736556] block uppercase text-[10px] tracking-wider mb-1 font-medium">
                    Pre-Ordered Tasting Flight
                  </span>
                  <span className="text-[#5c5044] font-medium">
                    {confirmedReservation.flight.map((f) => f.name).join(' · ')}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-md transition-colors shadow-sm"
              >
                Close & Return to Sanctuary
              </button>
              <p className="text-center text-[10px] uppercase tracking-wider text-[#736556]">
                A confirmation has been dispatched to {confirmedReservation.data.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
