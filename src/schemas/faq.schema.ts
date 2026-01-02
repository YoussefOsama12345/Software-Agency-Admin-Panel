import { z } from 'zod';

import { LanguageEnum } from './shared.schema';

export const FAQStatusEnum = z.enum([
    'DRAFT',
    'PUBLISHED',
]);


export const createFaqSchema = z.object({
    language: LanguageEnum.default('en'),
    question: z
        .string()
        .min(5, 'Question must be at least 5 characters')
        .max(200, 'Question must be less than 200 characters')
        .trim(),

    question_ar: z
        .string()
        .min(5, 'Arabic Question must be at least 5 characters')
        .max(200, 'Arabic Question must be less than 200 characters')
        .trim()
        .optional(),

    answer: z
        .string()
        .min(10, 'Answer must be at least 10 characters')
        .max(2000, 'Answer must be less than 2000 characters')
        .trim(),

    answer_ar: z
        .string()
        .min(10, 'Arabic Answer must be at least 10 characters')
        .max(2000, 'Arabic Answer must be less than 2000 characters')
        .trim()
        .optional(),

    categoryId: z
        .string()
        .uuid('Invalid category id'),

    status: FAQStatusEnum,

    order: z
        .number()
        .int()
        .min(0)
        .optional(),
});


export const updateFaqSchema = z
    .object({
        id: z
            .string('FAQ id is required')
            .uuid('Invalid FAQ id'),

        language: LanguageEnum.optional(),

        question: z
            .string()
            .min(5)
            .max(200)
            .trim()
            .optional(),

        question_ar: z
            .string()
            .min(5)
            .max(200)
            .trim()
            .optional(),

        answer: z
            .string()
            .min(10)
            .max(2000)
            .trim()
            .optional(),

        answer_ar: z
            .string()
            .min(10)
            .max(2000)
            .trim()
            .optional(),

        categoryId: z
            .string()
            .uuid()
            .optional(),

        status: FAQStatusEnum.optional(),

        order: z
            .number()
            .int()
            .min(0)
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


export type CreateFaqFormData = z.infer<typeof createFaqSchema>;
export type UpdateFaqFormData = z.infer<typeof updateFaqSchema>;
