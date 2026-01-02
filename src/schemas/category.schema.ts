import { z } from 'zod';


import { LanguageEnum } from './shared.schema';

const slugSchema = z
    .string()
    .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase and URL-friendly'
    )
    .min(2, 'Slug is too short')
    .max(60, 'Slug must be less than 60 characters')
    .trim();


export const createCategorySchema = z.object({
    language: LanguageEnum.default('en'),
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .trim(),

    name_ar: z
        .string()
        .min(2, 'Arabic Name must be at least 2 characters')
        .max(50, 'Arabic Name must be less than 50 characters')
        .trim()
        .optional(),

    slug: slugSchema.optional(),

    description: z.string().optional(),
    description_ar: z.string().optional(),
    image: z.string().url('Invalid URL').optional().or(z.literal('')),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),

    // SEO
    metaTitle: z.string().optional(),
    metaTitle_ar: z.string().optional(),
    metaDescription: z.string().optional(),
    metaDescription_ar: z.string().optional(),
});


export const updateCategorySchema = z
    .object({
        id: z
            .string('Category id is required')
            .uuid('Invalid category id'),

        language: LanguageEnum.optional(),

        name: z
            .string()
            .min(2)
            .max(50)
            .trim()
            .optional(),

        name_ar: z
            .string()
            .min(2)
            .max(50)
            .trim()
            .optional(),

        slug: slugSchema.optional(),

        description: z.string().optional(),
        description_ar: z.string().optional(),
        image: z.string().url('Invalid URL').optional().or(z.literal('')),
        status: z.enum(['ACTIVE', 'INACTIVE']).optional(),

        metaTitle: z.string().optional(),
        metaTitle_ar: z.string().optional(),
        metaDescription: z.string().optional(),
        metaDescription_ar: z.string().optional(),
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


export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
