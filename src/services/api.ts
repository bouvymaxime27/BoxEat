
import axios from 'axios';
import { Meal, Order, StockItem } from '../types';

const USE_MOCK = process.env.USE_MOCK === 'true';
const BASE_URL = process.env.BASE_URL || 'https://api.boxeat.app';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Mock data
const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Chili sin carne',
    description: 'Chili végétarien aux haricots rouges',
    supplier: 'BoxEat Kitchen',
    labels: ['veggie', 'healthy'],
    calories: 420,
    allergens: [],
    priceCents: 890,
    imageUrl: 'https://via.placeholder.com/300x200/3FAE49/FFFFFF?text=Chili',
    dlcDays: 3,
    day: 'Lundi',
  },
  {
    id: '2',
    name: 'Curry de poulet',
    description: 'Poulet tendre au curry avec riz basmati',
    supplier: 'BoxEat Kitchen',
    labels: ['protein', 'healthy'],
    calories: 580,
    allergens: ['gluten'],
    priceCents: 890,
    imageUrl: 'https://via.placeholder.com/300x200/F47C20/FFFFFF?text=Curry',
    dlcDays: 2,
    day: 'Lundi',
  },
  {
    id: '3',
    name: 'Pâtes au pesto',
    description: 'Penne au pesto maison et tomates cerises',
    supplier: 'BoxEat Kitchen',
    labels: ['veggie'],
    calories: 520,
    allergens: ['gluten', 'nuts'],
    priceCents: 890,
    imageUrl: 'https://via.placeholder.com/300x200/3FAE49/FFFFFF?text=Pesto',
    dlcDays: 2,
    day: 'Mardi',
  },
];

export const getMealsWeek = async (machineId: string): Promise<Meal[]> => {
  if (USE_MOCK) {
    return Promise.resolve(mockMeals);
  }
  const { data } = await api.get(`/meals/week?machineId=${machineId}`);
  return data;
};

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  if (USE_MOCK) {
    return Promise.resolve({
      id: `order-${Date.now()}`,
      ...orderData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    } as Order);
  }
  const { data } = await api.post('/orders', orderData);
  return data;
};

export const payOrder = async (orderId: string): Promise<Order> => {
  if (USE_MOCK) {
    return Promise.resolve({
      id: orderId,
      status: 'PAID',
      qrCode: `QR-${orderId}`,
    } as Order);
  }
  const { data } = await api.post(`/orders/${orderId}/pay`);
  return data;
};

export const getOrderQR = async (orderId: string): Promise<string> => {
  if (USE_MOCK) {
    return Promise.resolve(`data:image/png;base64,QR-${orderId}`);
  }
  const { data } = await api.get(`/orders/${orderId}/qr`);
  return data;
};

export const pickOrder = async (orderId: string): Promise<void> => {
  if (USE_MOCK) {
    return Promise.resolve();
  }
  await api.post(`/orders/${orderId}/pick`);
};

export const getStock = async (machineId: string): Promise<StockItem[]> => {
  if (USE_MOCK) {
    return Promise.resolve([]);
  }
  const { data } = await api.get(`/stock/${machineId}`);
  return data;
};

export const openMachine = async (machineId: string, orderId: string): Promise<boolean> => {
  if (USE_MOCK) {
    return Promise.resolve(true);
  }
  const { data } = await api.post('/machine/open', { machineId, orderId });
  return data.ok;
};
