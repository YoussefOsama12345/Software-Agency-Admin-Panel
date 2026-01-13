'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DollarSign, FileText } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { Card, CardContent } from '@/components/ui/card';
import { ExpenseFormData } from '@/schemas/expense.schema';

// Mock fetcher
const getExpense = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        title: 'Office Snacks',
        amount: 85.50,
        date: new Date('2024-03-05'),
        category: 'Office' as const,
        description: 'Weekly snack refill for the team',
        status: 'APPROVED' as const,
        receipt: '',
    };
};

interface EditExpensePageProps {
    params: Promise<{ id: string }>;
}

// Tips data
const expenseTips = [
    {
        icon: DollarSign,
        title: 'Review Amount',
        description: 'Ensure the amount matches the receipt exactly.',
    },
    {
        icon: FileText,
        title: 'Categories',
        description: 'Update the category if the expense nature has changed.',
    },
];

export default function EditExpensePage({ params }: EditExpensePageProps) {
    const router = useRouter();
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState(true);
    const [expense, setExpense] = useState<ExpenseFormData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadExpense = async () => {
            try {
                const data = await getExpense(id);
                setExpense(data);
            } catch (error) {
                toast.error('Failed to load expense');
                router.push('/expenses');
            } finally {
                setIsLoading(false);
            }
        };
        loadExpense();
    }, [id, router]);

    const handleUpdate = async (data: ExpenseFormData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Updating expense:', id, data);
        toast.success('Expense updated successfully');
        router.push('/expenses');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!expense) {
        return null;
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="edit"
                title="Expense"
                editingName={expense.title}
                backHref="/expenses"
                icon={DollarSign}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <Card>
                        <FormCardHeader
                            title="Expense Details"
                            description="Update expense information"
                            icon={FileText}
                        />
                        <CardContent>
                            <ExpenseForm
                                mode="edit"
                                defaultValues={expense}
                                onSubmit={handleUpdate}
                                onDelete={async () => {
                                    setIsSubmitting(true);
                                    try {
                                        await new Promise(resolve => setTimeout(resolve, 1000));
                                        console.log('Deleting Expense:', id);
                                        toast.success('Expense deleted successfully');
                                        router.push('/expenses');
                                    } finally {
                                        setIsSubmitting(false);
                                    }
                                }}
                                isSubmitting={isSubmitting}
                            />
                        </CardContent>
                    </Card>
                </div>

                <FormPageSidebar tips={expenseTips} />
            </div>
        </div>
    );
}
