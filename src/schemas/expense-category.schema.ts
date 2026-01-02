import { z } from 'zod';

export const EXPENSE_CATEGORY_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

export const expenseCategorySchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    description: z.string().optional(),
    status: z.enum(EXPENSE_CATEGORY_STATUSES).default('ACTIVE'),
});

export type ExpenseCategoryFormData = z.infer<typeof expenseCategorySchema>;

export interface ExpenseCategory extends ExpenseCategoryFormData {
    id: string;
    count: number; // Number of expenses in this category
    createdAt: string;
    updatedAt: string;
}
