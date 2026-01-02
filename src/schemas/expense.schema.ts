import { z } from 'zod';

export const EXPENSE_CATEGORIES = [
    'Software',
    'Office',
    'Travel',
    'Marketing',
    'Salaries',
    'Freelancers',
    'Other',
] as const;

export const EXPENSE_STATUSES = ['PENDING', 'APPROVED', 'PAID', 'REJECTED'] as const;

export const expenseSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    date: z.date(),
    category: z.enum([...EXPENSE_CATEGORIES] as [string, ...string[]], {
        errorMap: () => ({ message: 'Category is required' }),
    }),
    description: z.string().optional(),
    receipt: z.string().url('Invalid URL').optional().or(z.literal('')),
    status: z.enum([...EXPENSE_STATUSES] as [string, ...string[]]).default('PENDING'),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

export interface Expense extends ExpenseFormData {
    id: string;
    createdAt: string;
    updatedAt: string;
}
