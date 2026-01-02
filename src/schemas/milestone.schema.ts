import { z } from 'zod';

export const milestoneSchema = z.object({
    name: z.string().min(1, 'Milestone name is required'),
    description: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).default('PENDING'),
    dueDate: z.date(),
    progress: z.coerce.number().min(0).max(100).default(0),
    projectId: z.string().min(1, 'Project ID is required'),
});

export type MilestoneFormData = z.infer<typeof milestoneSchema>;
