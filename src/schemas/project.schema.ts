import { z } from 'zod';


export const ProjectStatusEnum = z.enum([
    'PLANNED',
    'ACTIVE',
    'ON_HOLD',
    'COMPLETED',
    'CANCELLED',
]);

export const ProjectPriorityEnum = z.enum([
    'LOW',
    'MEDIUM',
    'HIGH',
]);


export const createProjectSchema = z.object({
    name: z
        .string('Project name is required')
        .min(3, 'Project name must be at least 3 characters')
        .max(100, 'Project name must be less than 100 characters')
        .trim(),

    description: z
        .string()
        .max(1000, 'Description must be less than 1000 characters')
        .trim()
        .optional(),

    clientId: z
        .string('Client is required')
        .uuid('Invalid client id'),

    budget: z
        .number()
        .min(0, 'Budget cannot be negative')
        .max(1_000_000_000, 'Budget is too large')
        .optional(),

    status: ProjectStatusEnum,

    priority: ProjectPriorityEnum,

    deadline: z
        .string()
        .datetime('Invalid date format')
        .optional(),
});


export const updateProjectSchema = z.object({
    id: z
        .string('Project id is required')
        .uuid('Invalid project id'),

    name: z
        .string()
        .min(3, 'Project name must be at least 3 characters')
        .max(100, 'Project name must be less than 100 characters')
        .trim()
        .optional(),

    description: z
        .string()
        .max(1000, 'Description must be less than 1000 characters')
        .trim()
        .optional(),

    clientId: z
        .string()
        .uuid('Invalid client id')
        .optional(),

    budget: z
        .number()
        .min(0, 'Budget cannot be negative')
        .max(1_000_000_000, 'Budget is too large')
        .optional(),

    status: ProjectStatusEnum.optional(),

    priority: ProjectPriorityEnum.optional(),

    deadline: z
        .string()
        .datetime('Invalid date format')
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


export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
