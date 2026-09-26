import React from 'react';
import { MenuItem } from '../types';
import { X, Trash2, Coffee, Sparkles, ArrowRight } from 'lucide-react';

interface TastingFlightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  flightItems: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearFlight: () => void;
  onProceedToReservation: () => void;
}

export const TastingFlightDrawer: React.FC<TastingFlightDrawerProps> = ({
  isOpen,
  onClose,
  flightItems,
  onRemoveItem,
  onClearFlight,
  onProceedToReservation,
}) => {
  if (!isOpen) return null;

  const totalPrice = flightItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1c1713]/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] border-l border-[#ded3c2] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative text-[#231b15]">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e8dfd1]">
              <div className="flex items-center gap-2.5">
                <Coffee className="w-5 h-5 text-[#9e7938]" />
                <h3 className="font-serif-luxury text-xl font-bold text-[#1c1713]">
                  Tasting Flight
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#736556] hover:text-[#1c1713] rounded-md transition-colors"
                aria-label="Close tasting flight drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flight Count & Capacity Info */}
            <div className="py-4 flex items-center justify-between text-xs text-[#5c5044]">
              <span>Capacity: {flightItems.length}/3 selections</span>
              {flightItems.length > 0 && (
                <button
                  onClick={onClearFlight}
                  className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* List of items in flight */}
            <div className="space-y-3 mt-2 overflow-y-auto max-h-[50vh] pr-1">
              {flightItems.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-[#ded3c2] rounded-lg space-y-3 my-6 bg-[#fcfaf7]">
                  <Coffee className="w-8 h-8 text-[#9e7938] mx-auto" />
                  <p className="text-sm font-medium text-[#1c1713]">Your flight is currently empty.</p>
                  <p className="text-xs text-[#736556]">
                    Browse our menu and select up to 3 single-origins or signature brews to taste together.
                  </p>
                </div>
              ) : (
                flightItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg bg-[#f8f5ee] border border-[#e8dfd1] flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#ede5d8] border border-[#d8cdbe] flex items-center justify-center text-xs font-mono font-bold text-[#9e7938]">
                        0{index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1c1713]">{item.name}</h4>
                        <p className="text-[11px] text-[#736556]">{item.category} · {item.notes}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono tabular-nums text-sm font-bold text-[#1c1713]">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#8c7e70] hover:text-rose-600 transition-colors p-1"
                        aria-label={`Remove ${item.name} from flight`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Paddle Experience note */}
            {flightItems.length > 0 && (
              <div className="mt-6 p-4 rounded-lg bg-[#f8f5ee] border border-[#e8dfd1] text-xs text-[#5c5044] space-y-1">
                <div className="text-[#9e7938] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Teak Paddle Presentation</span>
                </div>
                <p className="text-[11px] text-[#736556] leading-relaxed">
                  Served with sparkling mineral palate cleansers, tasting notebook, and single-origin profile cards.
                </p>
              </div>
            )}
          </div>

          {/* Bottom actions & reservation link */}
          <div className="pt-6 border-t border-[#e8dfd1] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#736556] font-medium">Flight Total</span>
              <span className="font-mono tabular-nums text-xl font-bold text-[#1c1713]">
                ₹{totalPrice}
              </span>
            </div>

            <button
              disabled={flightItems.length === 0}
              onClick={() => {
                onClose();
                onProceedToReservation();
              }}
              className="w-full py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              <span>Attach Flight to Table Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] tracking-wider uppercase text-[#8c7e70]">
              Pay at Table upon presentation · Freshly ground per flight
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
