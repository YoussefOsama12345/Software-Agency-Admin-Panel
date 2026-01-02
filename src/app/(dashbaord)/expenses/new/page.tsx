'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, FileText, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ExpenseFormData } from '@/schemas/expense.schema';

const expenseTips: Tip[] = [
    {
        icon: Upload,
        title: 'Receipts',
        description: 'Always upload a clear receipt for expenses over $50.',
    },
    {
        icon: FileText,
        title: 'Descriptions',
        description: 'Be specific. "Client Lunch" is better than "Food".',
    },
    {
        icon: AlertCircle,
        title: 'Policy',
        description: 'Expenses must be submitted within 30 days of purchase.',
    },
];

export default function NewExpensePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: ExpenseFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating expense:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Expense submitted successfully');
            router.push('/expenses');
        } catch (error) {
            console.error('Error creating expense:', error);
            toast.error('Failed to submit expense');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="create"
                title="Expense"
                backHref="/expenses"
                icon={DollarSign}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <Card>
                        <FormCardHeader
                            title="Expense Details"
                            description="Submit a new expense for approval"
                            icon={DollarSign}
                        />
                        <CardContent>
                            <ExpenseForm
                                onSubmit={handleSubmit}
                                isSubmitting={isLoading}
                                mode="create"
                            />
                        </CardContent>
                    </Card>
                </div>

                <FormPageSidebar
                    title="Expense Policy"
                    description="Guidelines for submitting expenses"
                    tips={expenseTips}
                />
            </div>
        </div>
    );
}
