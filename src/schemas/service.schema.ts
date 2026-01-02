import { z } from 'zod';

import { LanguageEnum } from './shared.schema';

export const serviceSchema = z.object({
    name: z.string().min(2, { message: 'Service name must be at least 2 characters.' }),
    name_ar: z.string().min(2, { message: 'Arabic Service name must be at least 2 characters.' }).optional(),
    description: z.string().optional(),
    description_ar: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
    language: LanguageEnum.default('en'),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export interface Service extends ServiceFormData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const SERVICE_STATUSES = ['ACTIVE', 'INACTIVE'] as const;
