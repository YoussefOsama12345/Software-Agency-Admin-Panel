'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Target, Rocket, MessageSquare, Handshake } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ClientForm } from '@/components/clients/ClientForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateClientFormData } from '@/schemas/client.schema';

const clientTips: Tip[] = [
    {
        icon: Handshake,
        title: 'Build Relationships',
        description: 'Focus on long-term partnership rather than just transactions.',
    },
    {
        icon: Target,
        title: 'Understand Needs',
        description: 'Clearly define client goals and expectations upfront.',
    },
    {
        icon: MessageSquare,
        title: 'Clear Communication',
        description: 'Establish preferred communication channels and frequency.',
    },
    {
        icon: Rocket,
        title: 'Set Expectations',
        description: 'Be transparent about timelines, deliverables, and costs.',
    },
];

export default function NewClientPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateClientFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating client:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Client created successfully!');
            router.push('/clients');
        } catch (error) {
            console.error('Error creating client:', error);
            toast.error('Failed to create client. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Client"
                backHref="/clients"
                icon={Users}
                stats={{
                    label1: 'Total Clients',
                    value1: 12,
                    label2: 'Active Now',
                    value2: 8,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Client Details"
                            description="Add a new client to your portfolio"
                            icon={Users}
                        />
                        <CardContent>
                            <ClientForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Create Client"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Client Relationship Tips"
                    description="Best practices for managing clients"
                    tips={clientTips}
                />
            </div>
        </div>
    );
}
