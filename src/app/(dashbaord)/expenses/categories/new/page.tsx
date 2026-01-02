'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlus, FileText, Target, ArrowUpRight, Lightbulb, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ExpenseCategoryForm } from '@/components/expenses/category/ExpenseCategoryForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ExpenseCategoryFormData } from '@/schemas/expense-category.schema';

const categoryTips: Tip[] = [
    {
        icon: Target,
        title: 'Clear Grouping',
        description: 'Group expenses logically (e.g., "Software", "Travel", "Office").',
    },
    {
        icon: CreditCard,
        title: 'Tax Purposes',
        description: 'Consider tax categories when creating expense groups.',
    },
    {
        icon: ArrowUpRight,
        title: 'Scalability',
        description: 'Create categories that can grow with your agency.',
    },
    {
        icon: Lightbulb,
        title: 'Descriptions',
        description: 'Explain what expenses belong in each category to avoid confusion.',
    },
];

export default function CreateExpenseCategoryPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: ExpenseCategoryFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating expense category:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Expense category created successfully!');
            router.push('/expenses/categories');
        } catch (error) {
            console.error('Error creating expense category:', error);
            toast.error('Failed to create category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Expense Category"
                backHref="/expenses/categories"
                icon={FolderPlus}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Category Details"
                            description="Define a new category for tracking expenses"
                            icon={FileText}
                        />
                        <CardContent>
                            <ExpenseCategoryForm
                                onSubmit={handleSubmit}
                                isSubmitting={isLoading}
                                mode="create"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Category Tips"
                    description="Best practices for expense categorization"
                    tips={categoryTips}
                />
            </div>
        </div>
    );
}
