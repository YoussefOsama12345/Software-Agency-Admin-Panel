'use client';

import { ExpenseCard } from '@/components/expenses/ExpenseCard';
import { Expense } from '@/schemas/expense.schema';

interface ExpenseGridProps {
    expenses: Expense[];
}

export function ExpenseGrid({ expenses }: ExpenseGridProps) {
    if (expenses.length === 0) {
        return (
            <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground border rounded-md border-dashed">
                No expenses found.
            </div>
        );
    }
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
            ))}
        </div>
    );
}
