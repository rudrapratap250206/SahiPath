import { z } from 'zod';
import xss from 'xss';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
  profile: z.any().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const testRecordSchema = z.object({
  name: z.string().min(1).max(200),
  score: z.number().min(0).max(100),
  date: z.string().optional(),
  notes: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  title: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(200).optional(),
});

export const mediaSchema = z.object({
  type: z.enum(['image', 'podcast', 'video', 'ppt']),
  prompt: z.string().min(1).max(5000),
});

export const mentorProfileSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  age: z.number().int().min(0).max(120).optional(),
  email: z.string().email().optional(),
  location: z.string().max(200).optional(),
  educationLevel: z.string().max(200).optional(),
  currentRole: z.string().max(200).optional(),
  yearsOfExperience: z.number().int().min(0).max(80).optional(),
  skills: z.array(z.string().max(200)).optional(),
  careerInterests: z.array(z.string().max(200)).optional(),
  currentGoals: z.string().max(4000).optional(),
  challenges: z.string().max(4000).optional(),
  availableHoursPerWeek: z.number().int().min(0).max(168).optional(),
  preferredLearningStyle: z.string().max(200).optional(),
  language: z.string().max(50).optional(),
}).partial();

export const mentorChatSchema = z.object({
  message: z.string().min(1).max(4000),
  mode: z.enum(['text', 'voice']).default('text'),
  profile: mentorProfileSchema.optional(),
});

export function sanitizeInput<T extends Record<string, any>>(obj: T): T {
  const out: any = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string') out[k] = xss(v.trim());
    else out[k] = v;
  }
  return out as T;
}
