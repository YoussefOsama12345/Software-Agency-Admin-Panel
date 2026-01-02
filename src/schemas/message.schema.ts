import { z } from 'zod';

export const messageSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required').max(200),
    message: z.string().min(1, 'Message is required'),
    isRead: z.boolean().default(false),
    createdAt: z.string().datetime().optional(),
});

export type Message = z.infer<typeof messageSchema>;
