'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, FileText, Target, Users, Search, List } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { FAQForm } from '@/components/faq/FAQForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateFaqFormData } from '@/schemas/faq.schema';

const faqTips: Tip[] = [
    {
        icon: Search,
        title: 'Be Concise',
        description: 'Keep questions short and to the point for better readability.',
    },
    {
        icon: Target,
        title: 'Use Plain Language',
        description: 'Avoid jargon so users of all levels can understand.',
    },
    {
        icon: List,
        title: 'Categorize Correctly',
        description: 'Group related questions to help users browse effectively.',
    },
    {
        icon: Users,
        title: 'Anticipate Needs',
        description: 'Answer questions users are actually asking.',
    },
];

export default function NewFAQPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateFaqFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating FAQ:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('FAQ created successfully!');
            router.push('/faq');
        } catch (error) {
            console.error('Error creating FAQ:', error);
            toast.error('Failed to create FAQ. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="FAQ"
                backHref="/faq"
                icon={HelpCircle}
                stats={{
                    label1: 'Total FAQs',
                    value1: 12, // Mock data
                    label2: 'Drafts',
                    value2: 3, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <FAQForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        submitLabel="Create FAQ"
                        headerTitle="FAQ Details"
                        headerDescription="Fill in the information to create a new FAQ"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Writing Tips"
                    description="Best practices for helpful FAQs"
                    tips={faqTips}
                />
            </div>
        </div>
    );
}
