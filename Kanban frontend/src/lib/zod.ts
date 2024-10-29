import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterDto = z.infer<typeof registerSchema>;


export const taskSchema = z.object({
  title: z.string().min(1).max(100, "Title must be between 1 and 100 characters"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1).max(1000, "Description must be between 1 and 1000 characters"),
  linkUrl: z.string().url().optional(),
  linkName: z.string().min(1).max(100, "Link name must be between 1 and 100 characters").optional(),
});

export type TaskDto = z.infer<typeof taskSchema>;


export const boardSchema = z.object({
  title: z.string().min(1).max(100, "Title must be between 1 and 100 characters"),
  description: z.string().min(1).max(500, "Description must be between 1 and 500 characters"),
});

export type BoardDto = z.infer<typeof boardSchema>;


export const profileSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  email: z.string().email(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
