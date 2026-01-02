'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { ServiceForm } from '@/components/services/ServiceForm';
import { ServiceFormData } from '@/schemas/service.schema';

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

export default function CreateServicePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: ServiceFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating service:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Service created successfully!');
            router.push('/services');
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error('Failed to create service');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="create"
                title="Service"
                backHref="/services"
                icon={Briefcase}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <ServiceForm
                        onSubmit={handleSubmit}
                        isSubmitting={isLoading}
                        mode="create"
                        headerTitle="Service Details"
                        headerDescription="Add a new service to your catalog"
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
