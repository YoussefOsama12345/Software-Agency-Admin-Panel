import { z } from 'zod';

export const ArticleStatusEnum = z.enum([
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
]);

export const LanguageEnum = z.enum(['en', 'ar']);

const optionalUrl = z
    .string()
    .url('Invalid URL')
    .trim()
    .optional();

const slugSchema = z
    .string()
    .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase and URL-friendly'
    )
    .min(5)
    .max(100)
    .trim();


export const createArticleSchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(120, 'Title must be less than 120 characters')
        .trim(),

    title_ar: z
        .string()
        .min(5, 'Arabic Title must be at least 5 characters')
        .max(120, 'Arabic Title must be less than 120 characters')
        .trim()
        .optional(),

    slug: slugSchema.optional(),

    description: z
        .string()
        .min(20, 'Description must be at least 20 characters')
        .max(300, 'Description must be less than 300 characters')
        .trim(),

    description_ar: z
        .string()
        .min(20, 'Arabic Description must be at least 20 characters')
        .max(300, 'Arabic Description must be less than 300 characters')
        .trim()
        .optional(),

    content: z
        .string()
        .min(50, 'Content must be at least 50 characters')
        .max(50_000, 'Content is too long')
        .trim(),

    content_ar: z
        .string()
        .min(50, 'Arabic Content must be at least 50 characters')
        .max(50_000, 'Arabic Content is too long')
        .trim()
        .optional(),

    image: z
        .string()
        .url('Invalid image URL')
        .trim(),

    status: ArticleStatusEnum,

    language: LanguageEnum.default('en'),

    categoryId: z
        .string()
        .uuid('Invalid category id'),

    tags: z
        .array(
            z
                .string()
                .min(2)
                .max(30)
                .trim()
        )
        .max(10, 'Max 10 tags')
        .optional(),

    relatedArticles: z
        .array(z.string().uuid())
        .optional(),

    metaTitle: z
        .string()
        .max(60, 'Max 60 characters')
        .trim()
        .optional(),

    metaTitle_ar: z
        .string()
        .max(60, 'Max 60 characters')
        .trim()
        .optional(),

    metaDescription: z
        .string()
        .max(160, 'Max 160 characters')
        .trim()
        .optional(),

    metaDescription_ar: z
        .string()
        .max(160, 'Max 160 characters')
        .trim()
        .optional(),

    canonicalUrl: optionalUrl,

    noIndex: z.boolean(),
    noFollow: z.boolean(),

    ogTitle: z
        .string()
        .max(95)
        .trim()
        .optional(),

    ogTitle_ar: z
        .string()
        .max(95)
        .trim()
        .optional(),

    ogDescription: z
        .string()
        .max(200)
        .trim()
        .optional(),

    ogDescription_ar: z
        .string()
        .max(200)
        .trim()
        .optional(),

    ogImage: optionalUrl,

    twitterTitle: z
        .string()
        .max(70)
        .trim()
        .optional(),

    twitterTitle_ar: z
        .string()
        .max(70)
        .trim()
        .optional(),

    twitterDescription: z
        .string()
        .max(200)
        .trim()
        .optional(),

    twitterDescription_ar: z
        .string()
        .max(200)
        .trim()
        .optional(),

    twitterImage: optionalUrl,
});

export const updateArticleSchema = z
    .object({
        id: z
            .string('Article id is required')
            .uuid('Invalid article id'),

        title: z
            .string()
            .min(5)
            .max(120)
            .trim()
            .optional(),

        title_ar: z
            .string()
            .min(5)
            .max(120)
            .trim()
            .optional(),

        slug: slugSchema.optional(),

        description: z
            .string()
            .min(20)
            .max(300)
            .trim()
            .optional(),

        description_ar: z
            .string()
            .min(20)
            .max(300)
            .trim()
            .optional(),

        content: z
            .string()
            .min(50)
            .max(50_000)
            .trim()
            .optional(),

        content_ar: z
            .string()
            .min(50)
            .max(50_000)
            .trim()
            .optional(),

        image: z
            .string()
            .url()
            .trim()
            .optional(),

        status: ArticleStatusEnum.optional(),

        language: LanguageEnum.optional(),

        categoryId: z
            .string()
            .uuid()
            .optional(),

        tags: z
            .array(
                z
                    .string()
                    .min(2)
                    .max(30)
                    .trim()
            )
            .max(10)
            .optional(),

        relatedArticles: z
            .array(z.string().uuid())
            .optional(),

        metaTitle: z.string().max(60).trim().optional(),
        metaTitle_ar: z.string().max(60).trim().optional(),
        metaDescription: z.string().max(160).trim().optional(),
        metaDescription_ar: z.string().max(160).trim().optional(),
        canonicalUrl: optionalUrl,

        noIndex: z.boolean().optional(),
        noFollow: z.boolean().optional(),

        ogTitle: z.string().max(95).trim().optional(),
        ogTitle_ar: z.string().max(95).trim().optional(),
        ogDescription: z.string().max(200).trim().optional(),
        ogDescription_ar: z.string().max(200).trim().optional(),
        ogImage: optionalUrl,

        twitterTitle: z.string().max(70).trim().optional(),
        twitterTitle_ar: z.string().max(70).trim().optional(),
        twitterDescription: z.string().max(200).trim().optional(),
        twitterDescription_ar: z.string().max(200).trim().optional(),
        twitterImage: optionalUrl,
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

export type CreateArticleFormData = z.infer<typeof createArticleSchema>;
export type UpdateArticleFormData = z.infer<typeof updateArticleSchema>;


export interface Article extends CreateArticleFormData {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    category?: {
        id: string;
        name: string;
    };
}
