'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MessageSquareQuote, AlertCircle, Eye, Edit } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TestimonialForm } from '@/components/testimonials/TestimonialForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { UpdateTestimonialFormData } from '@/schemas/testimonial.schema';

// Mock data
const mockTestimonials: Record<string, UpdateTestimonialFormData & { id: string, clientName: string }> = {
    '1': {
        id: '1',
        clientName: 'Sarah Connor',
        role: 'Marketing VP',
        company: 'SkyNet Systems',
        content: 'The team delivered an exceptional platform that transformed our digital presence. The attention to detail and performance optimization was outstanding.',
        rating: 5,
        isActive: true,
        image: '',
    },
    '2': {
        id: '2',
        clientName: 'John McClane',
        role: 'Security Consultant',
        company: 'Nakatomi Inc.',
        content: 'Reliable, secure, and fast. Exactly what we needed for our internal systems. Support was always available when we had questions.',
        rating: 5,
        isActive: true,
        image: '',
    },
};

const editTips: Tip[] = [
    {
        icon: Eye,
        title: 'Visibility',
        description: 'Toggling "Active Status" immediately hides/shows the review on the live site.',
    },
    {
        icon: Edit,
        title: 'Updates',
        description: 'Avoid changing the core sentiment of the review when editing for clarity.',
    },
];

export default function EditTestimonialPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [testimonial, setTestimonial] = useState<(UpdateTestimonialFormData & { id: string, clientName: string }) | null>(null);

    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = mockTestimonials[id];
                if (data) {
                    setTestimonial(data);
                } else {
                    toast.error('Testimonial not found');
                    router.push('/testimonials');
                }
            } catch (error) {
                console.error('Error fetching testimonial:', error);
                toast.error('Failed to load testimonial');
            } finally {
                setIsFetching(false);
            }
        };

        fetchTestimonial();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            console.log('Updating Testimonial:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Testimonial updated successfully!');
            router.push('/testimonials');
        } catch (error) {
            console.error('Error updating testimonial:', error);
            toast.error('Failed to update testimonial. Please try again.');
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

    if (!testimonial) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Testimonial not found</p>
                <Link href="/testimonials" className="mt-4">
                    <Button>Back to List</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Testimonial"
                editingName={testimonial.clientName}
                backHref="/testimonials"
                icon={MessageSquareQuote}
                stats={{
                    label1: 'Rating',
                    value1: `${testimonial.rating}/5`,
                    label2: 'Status',
                    value2: testimonial.isActive ? 'Active' : 'Hidden',
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Edit Testimonial"
                            description="Refine client feedback and visibility"
                            icon={Edit}
                        />
                        <CardContent>
                            <TestimonialForm
                                mode="edit"
                                defaultValues={testimonial}
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Save Changes"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Edit Tips"
                    description="Managing reviews"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
