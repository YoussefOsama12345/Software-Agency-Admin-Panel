'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderPlus, FileText, Target, Search, ArrowUpRight, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

import { PortfolioCategoryForm } from '@/components/portfolio/category/PortfolioCategoryForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { CreateCategoryFormData } from '@/schemas/category.schema';

const categoryTips: Tip[] = [
    {
        icon: Target,
        title: 'Industry Standards',
        description: 'Use clear, industry-standard names for your project categories.',
    },
    {
        icon: Search,
        title: 'Discoverability',
        description: 'Think about how clients search for services when naming categories.',
    },
    {
        icon: ArrowUpRight,
        title: 'Showcase',
        description: 'Group your best work together under relevant categories.',
    },
    {
        icon: Lightbulb,
        title: 'Clarity',
        description: 'Add brief descriptions to explain what kind of projects fall under each category.',
    },
];

export default function NewPortfolioCategoryPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateCategoryFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating Portfolio category:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Category created successfully!');
            router.push('/portfolio/categories');
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
                title="Portfolio Category"
                backHref="/portfolio/categories"
                icon={FolderPlus}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <PortfolioCategoryForm
                        onSubmit={handleSubmit}
                        isSubmitting={isLoading}
                        mode="create"
                        headerTitle="Category Details"
                        headerDescription="Fill in the information to create a new portfolio category"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Category Tips"
                    description="Best practices for portfolio categories"
                    tips={categoryTips}
                />
            </div>
        </div>
    );
}
