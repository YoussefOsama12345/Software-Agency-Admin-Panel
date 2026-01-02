'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { HelpCircle, FileText, AlertCircle, Edit, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FAQForm } from '@/components/faq/FAQForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateFaqFormData } from '@/schemas/faq.schema';

// Mock data - replace with actual API call
const mockFAQs: Record<string, CreateFaqFormData & { id: string }> = {
    '1': {
        id: '1',
        question: 'How do I reset my password?',
        answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.',
        categoryId: '1',
        status: 'PUBLISHED',
        language: 'en',
        order: 1,
    },
    '2': {
        id: '2',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
        categoryId: '2',
        status: 'PUBLISHED',
        language: 'en',
        order: 2,
    },
};

const editTips: Tip[] = [
    {
        icon: Edit,
        title: 'Review for Clarity',
        description: 'Ensure the answer is still accurate and easy to understand.',
    },
    {
        icon: CheckCircle2,
        title: 'Check Status',
        description: 'Remember to publish if it was in draft mode.',
    },
];

export default function EditFAQPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [faq, setFaq] = useState<(CreateFaqFormData & { id: string }) | null>(null);

    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const data = mockFAQs[id];
                if (data) {
                    setFaq(data);
                } else {
                    toast.error('FAQ not found');
                    router.push('/faq');
                }
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                toast.error('Failed to load FAQ');
            } finally {
                setIsFetching(false);
            }
        };

        fetchFAQ();
    }, [id, router]);

    const handleSubmit = async (data: CreateFaqFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating FAQ:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('FAQ updated successfully!');
            router.push('/faq');
        } catch (error) {
            console.error('Error updating FAQ:', error);
            toast.error('Failed to update FAQ. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Skeleton className="h-[500px] w-full rounded-xl" />
                    </div>
                    <div className="lg:col-span-4">
                        <Skeleton className="h-[500px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!faq) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">FAQ not found</p>
                <Link href="/faq" className="mt-4">
                    <Button>Back to FAQ</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="FAQ"
                editingName={faq.question}
                backHref="/faq"
                icon={HelpCircle}
                stats={{
                    label1: 'Status',
                    value1: faq.status,
                    label2: 'Views',
                    value2: 154, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <FAQForm
                        defaultValues={faq}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        submitLabel="Save Changes"
                        headerTitle="FAQ Details"
                        headerDescription="Update the FAQ information below"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Edit Tips"
                    description="Things to consider when editing"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
