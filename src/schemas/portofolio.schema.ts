import { z } from 'zod';

const optionalUrl = z
    .string()
    .url('Invalid URL')
    .trim()
    .optional();

export const createPortfolioSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must be less than 100 characters')
        .trim(),

    title_ar: z
        .string()
        .min(2, 'Arabic Title must be at least 2 characters')
        .max(100, 'Arabic Title must be less than 100 characters')
        .trim()
        .optional(),

    language: z.enum(['en', 'ar']).optional(),

    description: z
        .string()
        .min(20, 'Description must be at least 20 characters')
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),

    description_ar: z
        .string()
        .min(20, 'Arabic Description must be at least 20 characters')
        .max(500, 'Arabic Description must be less than 500 characters')
        .trim()
        .optional(),

    image: z
        .string()
        .url('Invalid image URL')
        .trim(),

    link: optionalUrl,
});


export const updatePortfolioSchema = z
    .object({
        id: z
            .string('Portfolio id is required')
            .uuid('Invalid portfolio id'),

        title: z
            .string()
            .min(2)
            .max(100)
            .trim()
            .optional(),

        title_ar: z
            .string()
            .min(2)
            .max(100)
            .trim()
            .optional(),

        description: z
            .string()
            .min(20)
            .max(500)
            .trim()
            .optional(),

        description_ar: z
            .string()
            .min(20)
            .max(500)
            .trim()
            .optional(),

        image: z
            .string()
            .url()
            .trim()
            .optional(),

        link: optionalUrl,
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


export type CreatePortfolioFormData = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioFormData = z.infer<typeof updatePortfolioSchema>;
