export interface BeanOrigin {
  id: string;
  name: string;
  country: string;
  region: string;
  altitude: string;
  process: string;
  variety: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium-Dark' | 'Dark';
  description: string;
  notes: string[];
  radar: {
    acidity: number;
    sweetness: number;
    body: number;
    aroma: number;
    aftertaste: number;
  };
  accentColor: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Espresso' | 'Signature Coffee' | 'Cold Brew' | 'Tea' | 'Pastries' | 'Desserts';
  description: string;
  price: number;
  notes?: string;
  tags?: string[];
  image?: string;
  calories?: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: 'Espresso Bar' | 'Library Lounge' | 'Sunlit Patio' | 'Cupping Table';
  specialNotes?: string;
}
