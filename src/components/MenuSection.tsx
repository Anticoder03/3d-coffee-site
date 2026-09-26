import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Check, Coffee, Sparkles } from 'lucide-react';

const MENU_ITEMS: MenuItem[] = [
  // Espresso
  {
    id: 'm1',
    name: 'NOIR DOUBLE RISTRETTO',
    category: 'Espresso',
    description: 'Extracted short for intense cacao sweetness, heavy viscosity, and crisp bergamot crema.',
    price: 180,
    notes: 'Huila Supremo & Yirgacheffe blend',
    calories: '5 kcal',
  },
  {
    id: 'm2',
    name: 'FLAT WHITE VELVET',
    category: 'Espresso',
    description: 'Double ristretto with micro-textured velvety whole milk, poured in a traditional tulip rosetta.',
    price: 220,
    notes: 'Whole milk / Oat milk alternative',
    calories: '120 kcal',
  },
  {
    id: 'm3',
    name: 'CORTADO OBSIDIAN',
    category: 'Espresso',
    description: 'Equal parts single-origin espresso and silky steamed milk in a 4.5oz Gibraltar glass.',
    price: 200,
    notes: 'Brazil Cerrado single estate',
    calories: '75 kcal',
  },
  {
    id: 'm4',
    name: 'POUR OVER RESERVE',
    category: 'Espresso',
    description: 'Slow hand-brewed V60 extraction showcasing delicate jasmine aromatics and candied peach nectar.',
    price: 240,
    notes: 'Ethiopian Heirloom washed lot',
    calories: '4 kcal',
  },

  // Signature Coffee
  {
    id: 'm5',
    name: 'NOIR LATTE',
    category: 'Signature Coffee',
    description: 'Espresso, steamed oat milk, pure Madagascar vanilla bean, single-origin 70% dark chocolate shavings.',
    price: 220,
    notes: 'House Signature · Hot or Iced',
    calories: '160 kcal',
  },
  {
    id: 'm6',
    name: 'CARAMEL CLOUD',
    category: 'Signature Coffee',
    description: 'Double espresso pulled over house-made salted panela caramel, topped with chilled vanilla bean cold foam.',
    price: 240,
    notes: 'Layered thermal contrast',
    calories: '190 kcal',
  },
  {
    id: 'm7',
    name: 'MOCHA NOIR',
    category: 'Signature Coffee',
    description: 'Dark melted single-estate cocoa ganache, double espresso, velvety steamed whole milk, flamed orange oil.',
    price: 260,
    notes: 'Belgian & Kerala Cacao blend',
    calories: '220 kcal',
  },
  {
    id: 'm8',
    name: 'SMOKED CARDAMOM AFFOGATO',
    category: 'Signature Coffee',
    description: 'Bespoke Tahitian vanilla bean gelato submerged in a shot of hot, cardamom-infused double espresso.',
    price: 270,
    notes: 'Artisanal Gelato & Spice',
    calories: '210 kcal',
  },

  // Cold Brew
  {
    id: 'm9',
    name: '24-HOUR NITRO NOIR',
    category: 'Cold Brew',
    description: 'Slow steeped in chilled mountain spring water for 24 hours, infused with pure nitrogen for Guinness-like crema.',
    price: 240,
    notes: 'Super creamy mouthfeel · Zero sugar',
    calories: '5 kcal',
  },
  {
    id: 'm10',
    name: 'YUZU TONIC ESPRESSO',
    category: 'Cold Brew',
    description: 'Chilled single-origin cold brew topped with Japanese yuzu cordial, sparkling Indian craft tonic, and rosemary spritz.',
    price: 260,
    notes: 'Effervescent & Citrus Forward',
    calories: '45 kcal',
  },
  {
    id: 'm11',
    name: 'COCONUT CREMA BREW',
    category: 'Cold Brew',
    description: 'Slow-drip cold brew topped with whipped organic coconut cream and toasted coconut flakes.',
    price: 250,
    notes: 'Plant-Based · Subtle Tropical',
    calories: '130 kcal',
  },

  // Tea
  {
    id: 'm12',
    name: 'FIRST FLUSH DARJEELING MUSCATEL',
    category: 'Tea',
    description: 'Spring harvest whole leaf tea from high-elevation Darjeeling slopes, carrying muscat grape sweetness.',
    price: 210,
    notes: 'Makaibari Organic Estate',
    calories: '2 kcal',
  },
  {
    id: 'm13',
    name: 'CEREMONIAL MATCHA CLOUD',
    category: 'Tea',
    description: 'Stone-ground Uji ceremonial matcha hand-whisked to jade foam with steamed oat milk and white blossom honey.',
    price: 250,
    notes: 'First harvest Kyoto matcha',
    calories: '110 kcal',
  },
  {
    id: 'm14',
    name: 'SMOKED KASHMIRI KAHWA',
    category: 'Tea',
    description: 'Green tea leaves brewed with Kashmiri saffron threads, cinnamon quill, green cardamom, and slivered almonds.',
    price: 230,
    notes: 'Pampore Saffron Harvest',
    calories: '60 kcal',
  },

  // Pastries
  {
    id: 'm15',
    name: 'ARTISANAL CROISSANT AU BEURRE',
    category: 'Pastries',
    description: 'Hand-laminated with 84% French cultured butter, baked fresh three times daily to crackling golden honeycomb layers.',
    price: 190,
    notes: 'Baked 8:00 AM, 12:00 PM, 4:00 PM',
    calories: '280 kcal',
  },
  {
    id: 'm16',
    name: 'SPICED CARDAMOM BRIOCHE KNOT',
    category: 'Pastries',
    description: 'Swedish style fluffy enriched dough twisted with freshly cracked green cardamom butter and pearl sugar crystals.',
    price: 210,
    notes: 'House Signature Bakery Item',
    calories: '260 kcal',
  },
  {
    id: 'm17',
    name: 'VALRHONA PAIN AU CHOCOLAT',
    category: 'Pastries',
    description: 'Dual batons of 66% Valrhona dark chocolate encased in flaky, buttery viennoiserie pastry.',
    price: 230,
    notes: 'Double French Chocolate Baton',
    calories: '310 kcal',
  },

  // Desserts
  {
    id: 'm18',
    name: 'NOIR TIRAMISU CLASSICO',
    category: 'Desserts',
    description: 'Savoiardi ladyfingers soaked in ristretto and dark rum, layered with whipped mascarpone cream and Dutch cocoa.',
    price: 280,
    notes: 'Freshly Assembled Daily',
    calories: '340 kcal',
  },
  {
    id: 'm19',
    name: 'BASQUE BURNT ESPRESSO CHEESECAKE',
    category: 'Desserts',
    description: 'Caramelized deeply scorched crown with an oozy, custard-rich cream cheese center infused with Ethiopian espresso.',
    price: 290,
    notes: 'Gluten-Friendly · Single Slice',
    calories: '380 kcal',
  },
];

interface MenuSectionProps {
  flightItems: MenuItem[];
  onAddToFlight: (item: MenuItem) => void;
  onRemoveFromFlight: (itemId: string) => void;
  onOpenFlight: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  flightItems,
  onAddToFlight,
  onRemoveFromFlight,
  onOpenFlight,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Signature Coffee');

  const categories: MenuItem['category'][] = [
    'Signature Coffee',
    'Espresso',
    'Cold Brew',
    'Tea',
    'Pastries',
    'Desserts',
  ];

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const isInFlight = (id: string) => flightItems.some((f) => f.id === id);

  return (
    <section id="menu" className="relative py-28 md:py-36 bg-[#faf7f2] text-[#231b15] overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#ded3c2]">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9e7938] mb-3 font-semibold">
              <span>Chapter 04</span>
              <span aria-hidden="true">·</span>
              <span>The Collection</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1713]">
              OUR MENU.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="max-w-sm text-sm text-[#5c5044] font-light leading-relaxed">
              Every beverage is tailored to your palate. Build a custom 3-brew tasting flight to enjoy at your table.
            </p>
            {flightItems.length > 0 && (
              <button
                onClick={onOpenFlight}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#faf7f2] bg-[#1c1713] rounded-md shadow-sm hover:bg-[#342921] transition-colors"
              >
                <span>Tasting Flight ({flightItems.length}/3)</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#1c1713] text-[#faf7f2] border border-[#1c1713] shadow-sm'
                  : 'bg-[#ffffff] text-[#736556] border border-[#e8dfd1] hover:text-[#1c1713] hover:border-[#b3883b]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Pastry Banner when Pastries selected */}
        {activeCategory === 'Pastries' && (
          <div className="mb-12 relative rounded-xl overflow-hidden border border-[#ded3c2] bg-[#ffffff] shadow-md group">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 aspect-[16/9] md:aspect-auto md:h-72 overflow-hidden">
                <img
                  src="/src/assets/images/artisan_pastries_bakery_1790354122747.jpg"
                  alt="Artisanal French pastries at NOIR & BEAN"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
              </div>
              <div className="md:col-span-5 p-8 space-y-3">
                <div className="text-xs uppercase tracking-widest text-[#9e7938] font-semibold">Bakehouse Daily Craft</div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1c1713]">Laminated French Viennoiserie</h3>
                <p className="text-sm text-[#5c5044] leading-relaxed font-light">
                  Hand-folded over three days using French cultured butter and stone-milled flour. Paired ideally with our Flat White Velvet or Double Ristretto.
                </p>
                <div className="pt-2 text-xs text-[#736556] font-mono">
                  Three Daily Bakes: 08:00 · 12:00 · 16:00
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const added = isInFlight(item.id);
            return (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[#ffffff] border border-[#e8dfd1] hover:border-[#b3883b]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-serif-luxury text-lg md:text-xl font-bold text-[#1c1713] group-hover:text-[#9e7938] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-right">
                      <span className="font-mono tabular-nums text-base md:text-lg font-bold text-[#1c1713]">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-[#5c5044] leading-relaxed mb-4 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0e8dc] flex items-center justify-between">
                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#736556]">
                    <span>{item.notes}</span>
                    {item.calories && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{item.calories}</span>
                      </>
                    )}
                  </div>

                  {/* Add to Flight action */}
                  <button
                    onClick={() => {
                      if (added) {
                        onRemoveFromFlight(item.id);
                      } else {
                        onAddToFlight(item);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors ${
                      added
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                        : 'bg-[#f8f5ee] border border-[#ded3c2] text-[#9e7938] hover:bg-[#1c1713] hover:text-[#faf7f2]'
                    }`}
                    title={added ? 'Remove from tasting flight' : 'Add to 3-cup tasting flight'}
                  >
                    {added ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Flight</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Flight</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flight Callout Prompt */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-[#f5efe4] to-[#ede4d4] border border-[#ded3c2] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif-luxury text-xl font-bold text-[#1c1713]">Curate Your Custom Tasting Flight</h4>
            <p className="text-xs md:text-sm text-[#5c5044] font-light">
              Select any 3 items above. Our baristas will present them simultaneously on a handcrafted teak paddle with sensory tasting cards.
            </p>
          </div>
          <button
            onClick={onOpenFlight}
            className="px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#faf7f2] bg-[#1c1713] hover:bg-[#342921] rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            Review Flight ({flightItems.length}/3)
          </button>
        </div>
      </div>
    </section>
  );
};
