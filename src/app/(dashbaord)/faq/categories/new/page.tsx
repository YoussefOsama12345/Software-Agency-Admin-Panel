'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlus, FileText, Target, Search, ArrowUpRight, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { FAQCategoryForm } from '@/components/faq/category/FAQCategoryForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateCategoryFormData } from '@/schemas/category.schema';

const categoryTips: Tip[] = [
    {
        icon: Target,
        title: 'Clear Naming',
        description: 'Use concise, descriptive names for your categories.',
    },
    {
        icon: Search,
        title: 'User Focus',
        description: 'Think about what users are searching for when naming categories.',
    },
    {
        icon: ArrowUpRight,
        title: 'Organization',
        description: 'Group related FAQs together for better navigation.',
    },
    {
        icon: Lightbulb,
        title: 'Descriptions',
        description: 'Add descriptions to help users understand what the category covers.',
    },
];

export default function NewFAQCategoryPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateCategoryFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating FAQ category:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Category created successfully!');
            router.push('/faq/categories');
        } catch (error) {
            console.error('Error creating category:', error);
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
                title="FAQ Category"
                backHref="/faq/categories"
                icon={FolderPlus}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <FAQCategoryForm
                        onSubmit={handleSubmit}
                        isSubmitting={isLoading}
                        mode="create"
                        headerTitle="Category Details"
                        headerDescription="Fill in the information to create a new FAQ category"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Category Tips"
                    description="Best practices for FAQ categories"
                    tips={categoryTips}
                />
            </div>
        </div>
    );
}
