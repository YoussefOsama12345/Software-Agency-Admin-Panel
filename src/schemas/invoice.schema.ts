import { z } from 'zod';

export const INVOICE_STATUSES = ['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED'] as const;

export const invoiceItemSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be non-negative'),
});

export const invoiceSchema = z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required'),
    client: z.string().min(1, 'Client name is required'),
    project: z.string().min(1, 'Project is required'),
    issueDate: z.date(),
    dueDate: z.date(),
    items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
    status: z.enum(INVOICE_STATUSES).default('DRAFT'),
    notes: z.string().optional(),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export interface Invoice extends InvoiceFormData {
    id: string;
    totalAmount: number;
}
