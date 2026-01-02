'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Loader2, Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { ServiceForm } from '@/components/services/ServiceForm';
import { ServiceFormData } from '@/schemas/service.schema';
import { MOCK_SERVICES } from '@/lib/mock-data';

const serviceTips: Tip[] = [
    {
        icon: Target,
        title: 'Clear Naming',
        description: 'Use descriptive names that clearly communicate the service value.',
    },
    {
        icon: Lightbulb,
        title: 'Detailed Descriptions',
        description: 'Outline exactly what is included in the service to manage expectations.',
    },
];

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [initialData, setInitialData] = useState<Partial<ServiceFormData> | undefined>(undefined);

    useEffect(() => {
        const fetchService = async () => {
            setIsFetching(true);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));

                const service = MOCK_SERVICES.find(s => s.id === id);

                if (service) {
                    setInitialData({
                        name: service.name,
                        description: service.description,
                        status: service.status,
                    });
                } else {
                    toast.error('Service not found');
                    router.push('/services');
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                toast.error('Failed to load service details');
            } finally {
                setIsFetching(false);
            }
        };

        fetchService();
    }, [id, router]);

    const handleSubmit = async (data: ServiceFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating service:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Service updated successfully!');
            router.push('/services');
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('Failed to update service');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="edit"
                title="Service"
                backHref="/services"
                icon={Briefcase}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <ServiceForm
                        defaultValues={initialData}
                        onSubmit={handleSubmit}
                        isSubmitting={isLoading}
                        mode="edit"
                        headerTitle="Edit Service"
                        headerDescription="Modify service details"
                    />
                </div>

                <FormPageSidebar
                    title="Service Tips"
                    description="Best practices for service listings"
                    tips={serviceTips}
                />
            </div>
        </div>
    );
}
