'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlus, FileText, Target, Search, ArrowUpRight, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { CategoryForm } from '@/components/blog/category/CategoryForm';
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
        title: 'SEO Friendly',
        description: 'Optimize titles and descriptions for search engines.',
    },
    {
        icon: ArrowUpRight,
        title: 'Hierarchy',
        description: 'Plan your category structure before creating.',
    },
    {
        icon: Lightbulb,
        title: 'Descriptions',
        description: 'Add descriptions to help users understand the content.',
    },
];

export default function NewCategoryPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateCategoryFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating category:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Category created successfully!');
            router.push('/blog/categories');
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
                title="Category"
                backHref="/blog/categories"
                icon={FolderPlus}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <CategoryForm
                        onSubmit={handleSubmit}
                        isSubmitting={isLoading}
                        mode="create"
                        headerTitle="Category Details"
                        headerDescription="Fill in the information to create a new category"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Category Tips"
                    description="Best practices for categories"
                    tips={categoryTips}
                />
            </div>
        </div>
    );
}
