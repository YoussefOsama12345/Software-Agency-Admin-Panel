import { z } from 'zod';


const optionalUrl = z
    .string()
    .url('Invalid URL')
    .trim()
    .optional();

const optionalEmail = z
    .string()
    .email('Invalid email address')
    .trim()
    .toLowerCase()
    .optional();

const optionalPhone = z
    .string()
    .min(7, 'Invalid phone number')
    .max(20, 'Invalid phone number')
    .trim()
    .optional();


export const aboutSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must be less than 100 characters')
        .trim(),

    website: optionalUrl,

    logo: optionalUrl,

    description: z
        .string()
        .min(20, 'Description must be at least 20 characters')
        .max(2000, 'Description must be less than 2000 characters')
        .trim()
        .optional(),

    mission: z
        .string()
        .min(10, 'Mission must be at least 10 characters')
        .max(1000, 'Mission must be less than 1000 characters')
        .trim()
        .optional(),

    mission_ar: z
        .string()
        .min(10, 'Arabic Mission must be at least 10 characters')
        .max(1000, 'Arabic Mission must be less than 1000 characters')
        .trim()
        .optional(),

    vision: z
        .string()
        .min(10, 'Vision must be at least 10 characters')
        .max(1000, 'Vision must be less than 1000 characters')
        .trim()
        .optional(),

    vision_ar: z
        .string()
        .min(10, 'Arabic Vision must be at least 10 characters')
        .max(1000, 'Arabic Vision must be less than 1000 characters')
        .trim()
        .optional(),

    values: z
        .array(
            z.object({
                value: z
                    .string()
                    .min(2, 'Value is too short')
                    .max(50, 'Value must be less than 50 characters')
                    .trim(),
                value_ar: z
                    .string()
                    .min(2, 'Arabic Value is too short')
                    .max(50, 'Arabic Value must be less than 50 characters')
                    .trim()
                    .optional()
            })
        )
        .max(10, 'Maximum 10 values allowed')
        .optional(),

    facebook: optionalUrl,
    x: optionalUrl,
    linkedin: optionalUrl,
    instagram: optionalUrl,
    youtube: optionalUrl,
    tiktok: optionalUrl,
    threads: optionalUrl,


    email: optionalEmail,
    phone: optionalPhone,
});


export type AboutFormData = z.infer<typeof aboutSchema>;
