'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlus, FileText, Target, ArrowUpRight, Lightbulb, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ExpenseCategoryForm } from '@/components/expenses/category/ExpenseCategoryForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ExpenseCategoryFormData, EXPENSE_CATEGORY_STATUSES } from '@/schemas/expense-category.schema';

const categoryTips: Tip[] = [
    {
        icon: Target,
        title: 'Consistency',
        description: 'Keep category names consistent with your accounting software if applicable.',
    },
    {
        icon: CreditCard,
        title: 'Review',
        description: 'Periodically review categories to merge duplicates or remove unused ones.',
    },
    {
        icon: ArrowUpRight,
        title: 'Updates',
        description: 'Update descriptions if the scope of a category changes.',
    },
];

export default function EditExpenseCategoryPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<ExpenseCategoryFormData | undefined>(undefined);

    // Simulate fetching data
    useEffect(() => {
        const fetchCategory = async () => {
            // In a real app, fetch data using params.id
            console.log('Fetching category with ID:', params.id);

            // Simulating API delay and data retrieval
            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock data - normally this would come from the API
            setInitialData({
                name: 'Software',
                description: 'Software subscriptions and licenses for the agency.',
                status: 'ACTIVE',
            });
        };

        fetchCategory();
    }, [params.id]);

    const handleSubmit = async (data: ExpenseCategoryFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating expense category:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Expense category updated successfully!');
            router.push('/expenses/categories');
        } catch (error) {
            console.error('Error updating expense category:', error);
            toast.error('Failed to update category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!initialData) {
        return <div>Loading...</div>; // Or a proper skeleton loader
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Edit Category"
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
                            description="Update the information for this expense category"
                            icon={FileText}
                        />
                        <CardContent>
                            <ExpenseCategoryForm
                                defaultValues={initialData}
                                onSubmit={handleSubmit}
                                onDelete={async () => {
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                    console.log('Deleting Expense Category:', params.id);
                                    toast.success('Category deleted successfully');
                                    router.push('/expenses/categories');
                                }}
                                isSubmitting={isLoading}
                                mode="edit"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Editing Tips"
                    description="Best practices for maintaining categories"
                    tips={categoryTips}
                />
            </div>
        </div>
    );
}
