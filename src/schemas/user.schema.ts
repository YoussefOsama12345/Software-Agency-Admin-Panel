import { z } from 'zod';

const fullNameSchema = z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long');

const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address');

const phoneSchema = z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .optional();


const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');

const roleSchema = z.enum(['admin', 'user']);


export const createUserSchema = z.object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    phone: phoneSchema,
    role: roleSchema.default('user'),
});

export const updateUserSchema = z.object({
    fullName: fullNameSchema.optional(),
    email: emailSchema.optional(),
    phone: phoneSchema,
    role: roleSchema.optional(),
});


export type CreateUserFormData = z.infer<typeof createUserSchema>
export type UpdateUserFormData = z.infer<typeof updateUserSchema>
