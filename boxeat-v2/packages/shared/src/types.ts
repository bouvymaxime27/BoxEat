export type Role = 'CUSTOMER' | 'COMPANY_ADMIN' | 'OPERATOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Machine {
  id: string;
  name: string;
  locationLabel: string;
  address: string;
  lat: number;
  lng: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE';
  companyId?: string | null;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  allergens: string[];
  priceCents: number;
  vatRate: number;
  imageUrl?: string | null;
  active: boolean;
}

export interface Order {
  id: string;
  userId: string;
  machineId: string;
  status: 'CREATED' | 'PAID' | 'READY' | 'PICKED_UP' | 'CANCELLED' | 'REFUNDED';
  totalCents: number;
  createdAt: string;
}
