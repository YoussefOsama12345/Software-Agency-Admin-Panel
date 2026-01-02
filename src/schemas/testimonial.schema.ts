import { z } from 'zod';

export const createTestimonialSchema = z.object({
    clientName: z.string().min(2, 'Client name is required').max(100),
    role: z.string().min(2, 'Role is required').max(100),
    company: z.string().min(2, 'Company is required').max(100),
    content: z.string().min(10, 'Content must be at least 10 characters').max(500),
    rating: z.coerce.number().min(1).max(5).default(5),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    isActive: z.boolean().default(true),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialFormData = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialFormData = z.infer<typeof updateTestimonialSchema>;
