import { z } from 'zod';

// Enums
export const TicketStatusEnum = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']);
export const TicketPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const TicketTypeEnum = z.enum(['BUG', 'FEATURE', 'SUPPORT']);

export type TicketStatus = z.infer<typeof TicketStatusEnum>;
export type TicketPriority = z.infer<typeof TicketPriorityEnum>;
export type TicketType = z.infer<typeof TicketTypeEnum>;

// Create ticket schema
export const createTicketSchema = z.object({
    subject: z.string().min(1, 'Subject is required').max(255, 'Subject must be less than 255 characters'),
    description: z.string().optional(),
    status: TicketStatusEnum.default('OPEN'),
    priority: TicketPriorityEnum.default('MEDIUM'),
    type: TicketTypeEnum.default('BUG'),
    projectId: z.string().uuid('Please select a project'),
    assignedToId: z.string().uuid().optional().nullable(),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

// Full ticket type (with additional fields from API)
export interface Ticket extends CreateTicketFormData {
    id: string;
    reportedById: string;
    reportedBy?: {
        id: string;
        fullName: string;
        email: string;
    };
    assignedTo?: {
        id: string;
        fullName: string;
        email: string;
    } | null;
    project?: {
        id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}
