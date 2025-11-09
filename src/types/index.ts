
export type MealLabel = 'healthy' | 'veggie' | 'protein' | 'family';

export interface Meal {
  id: string;
  name: string;
  description: string;
  supplier: string;
  labels: MealLabel[];
  calories: number;
  allergens: string[];
  priceCents: number;
  imageUrl: string;
  dlcDays: number;
  day?: string;
}

export interface StockItem {
  machineId: string;
  mealId: string;
  lot: string;
  dlc: string;
  qty: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'PREP' | 'STOCKE' | 'PRET' | 'RETIRE';

export interface OrderItem {
  mealId: string;
  meal?: Meal;
  qty: number;
  unitPriceCents: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalCents: number;
  machineId: string;
  slotDate: string;
  status: OrderStatus;
  qrCode?: string;
  createdAt: string;
}

export type SubscriptionPlan = 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';

export interface Subscription {
  plan: SubscriptionPlan;
  balance: number;
  renewAt: string;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'sodexo' | 'edenred' | 'monizze';
  last4?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  locale: 'fr' | 'nl' | 'en';
  paymentMethods?: PaymentMethod[];
}

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Menu: undefined;
  MealDetails: { meal: Meal };
  Cart: undefined;
  Checkout: undefined;
  Orders: undefined;
  QRScan: undefined;
  Subscription: undefined;
  Profile: undefined;
  FAQ: undefined;
};
