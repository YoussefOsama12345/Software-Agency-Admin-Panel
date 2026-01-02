'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket, FileText, Bug, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TicketForm } from '@/components/tickets/TicketForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateTicketFormData, Ticket as TicketType } from '@/schemas/ticket.schema';

// Mock data - replace with actual API call
const mockTickets: Record<string, TicketType> = {
    '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p': {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        subject: 'Login page not loading on mobile',
        description: 'Users are reporting that the login page shows a blank screen on iOS devices running version 16+.',
        status: 'OPEN',
        priority: 'HIGH',
        type: 'BUG',
        projectId: 'p1',
        reportedById: 'u1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        createdAt: '2024-12-28T10:00:00Z',
        updatedAt: '2024-12-28T10:00:00Z',
    },
    '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q': {
        id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
        subject: 'Add dark mode support',
        description: 'Implement system-wide dark mode toggle that respects system preferences.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        type: 'FEATURE',
        projectId: 'p2',
        reportedById: 'u3',
        assignedToId: 'u4',
        project: { id: 'p2', name: 'Mobile App' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
};

const editTips: Tip[] = [
    {
        icon: Bug,
        title: 'Update Status',
        description: 'Keep ticket status current.',
    },
    {
        icon: Clock,
        title: 'Add Progress Notes',
        description: 'Document any progress made.',
    },
    {
        icon: AlertTriangle,
        title: 'Reassign if Needed',
        description: 'Update assignee based on workload.',
    },
];

interface EditTicketPageProps {
    params: Promise<{ id: string }>;
}

export default function EditTicketPage({ params }: EditTicketPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [ticket, setTicket] = useState<TicketType | null>(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = mockTickets[id];
                if (data) {
                    setTicket(data);
                } else {
                    toast.error('Ticket not found');
                    router.push('/tickets');
                }
            } catch (error) {
                console.error('Error fetching ticket:', error);
                toast.error('Failed to load ticket');
            } finally {
                setIsFetching(false);
            }
        };

        fetchTicket();
    }, [id, router]);

    const handleSubmit = async (data: CreateTicketFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating ticket:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Ticket updated successfully!');
            router.push('/tickets');
        } catch (error) {
            console.error('Error updating ticket:', error);
            toast.error('Failed to update ticket. Please try again.');
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

    if (!ticket) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Ticket not found</p>
                <Link href="/tickets" className="mt-4">
                    <Button>Back to Tickets</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Ticket"
                editingName={ticket.subject}
                backHref="/tickets"
                icon={Ticket}
                stats={{
                    label1: 'Status',
                    value1: ticket.status.replace('_', ' '),
                    label2: 'Priority',
                    value2: ticket.priority,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Ticket Details"
                            description="Update the ticket information below"
                            icon={FileText}
                        />
                        <CardContent>
                            <TicketForm
                                defaultValues={ticket}
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
                    description="Things to consider when editing"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
