import { z } from 'zod';

// Enums
export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export type TaskStatus = z.infer<typeof TaskStatusEnum>;
export type TaskPriority = z.infer<typeof TaskPriorityEnum>;

// Create task schema
export const createTaskSchema = z.object({
    name: z.string().min(2, 'Task name must be at least 2 characters').max(150, 'Task name must be less than 150 characters'),
    description: z.string().max(2000).optional(),
    status: TaskStatusEnum,
    priority: TaskPriorityEnum,
    dueDate: z.string().optional(),
    projectId: z.string().uuid('Please select a project'),
    milestoneId: z.string().uuid().optional().nullable(),
    assignedToId: z.string().uuid().optional().nullable(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;

// Full task type (with additional fields from API)
export interface Task extends CreateTaskFormData {
    id: string;
    assignedTo?: {
        id: string;
        fullName: string;
        email: string;
    } | null;
    project?: {
        id: string;
        name: string;
    };
    milestone?: {
        id: string;
        name: string;
    } | null;
    createdAt: string;
    updatedAt: string;
}
