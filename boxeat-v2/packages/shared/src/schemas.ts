import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  acceptTerms: z.boolean().refine((val) => val, { message: 'Terms required' })
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().min(1)
});

export const createOrderSchema = z.object({
  machineId: z.string().min(1),
  items: z.array(orderItemSchema).min(1)
});
