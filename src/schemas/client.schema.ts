import { z } from 'zod';

export const createClientSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .trim(),

    email: z
        .string()
        .email('Invalid email address')
        .trim()
        .toLowerCase()
        .optional(),

    phone: z
        .string()
        .regex(/^[0-9+()\- ]{10,20}$/, 'Invalid phone number'),

    industry: z
        .string()
        .max(100, 'Industry must be less than 100 characters')
        .trim()
        .optional(),
});


export const updateClientSchema = z
    .object({
        id: z
            .string('Client id is required')
            .uuid('Invalid client id'),

        name: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(100, 'Name must be less than 100 characters')
            .trim()
            .optional(),

        email: z
            .string()
            .email('Invalid email address')
            .trim()
            .toLowerCase()
            .optional(),

        phone: z
            .string()
            .regex(/^[0-9+()\- ]{10,20}$/, 'Invalid phone number')
            .optional(),

        industry: z
            .string()
            .max(100, 'Industry must be less than 100 characters')
            .trim()
            .optional(),
    })
    .refine(
        (data) => {
            const { id, ...rest } = data;
            return Object.keys(rest).length > 0;
        },
        {
            message: 'At least one field must be updated',
        }
    );

export type CreateClientFormData = z.infer<typeof createClientSchema>;
export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
