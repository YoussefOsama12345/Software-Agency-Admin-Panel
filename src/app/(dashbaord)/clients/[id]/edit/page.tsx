'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Users, AlertCircle, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientForm } from '@/components/clients/ClientForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateClientFormData } from '@/schemas/client.schema';

const mockClient = {
    id: '1',
    name: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    industry: 'Technology',
    projectsCount: 3,
};

const editTips: Tip[] = [
    {
        icon: RefreshCw,
        title: 'Update Info Regularly',
        description: 'Keep contact details and key stakeholders up to date.',
    },
    {
        icon: FileText,
        title: 'Review Contracts',
        description: 'Ensure all agreements align with current terms.',
    },
    {
        icon: CheckCircle,
        title: 'Verify Details',
        description: 'Double check email and phone numbers for accuracy.',
    },
];

export default function EditClientPage() {
    const router = useRouter();
    const params = useParams();
    const clientId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [client, setClient] = useState<typeof mockClient | null>(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setClient(mockClient);
            } catch (error) {
                console.error('Error fetching client:', error);
                toast.error('Failed to load client');
            } finally {
                setIsFetching(false);
            }
        };

        fetchClient();
    }, [clientId]);

    const handleSubmit = async (data: CreateClientFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating client:', clientId, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Client updated successfully!');
            router.push('/clients');
        } catch (error) {
            console.error('Error updating client:', error);
            toast.error('Failed to update client. Please try again.');
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

    if (!client) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Client not found</p>
                <Link href="/clients" className="mt-4">
                    <Button>Back to Clients</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Client"
                editingName={client.name}
                backHref="/clients"
                icon={Users}
                stats={{
                    label1: 'Projects',
                    value1: client.projectsCount,
                    label2: 'Status',
                    value2: 'Active',
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Client Details"
                            description="Update client information below"
                            icon={Users}
                        />
                        <CardContent>
                            <ClientForm
                                defaultValues={{
                                    name: client.name,
                                    email: client.email,
                                    phone: client.phone,
                                    industry: client.industry,
                                }}
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
                    description="Best practices for client updates"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
