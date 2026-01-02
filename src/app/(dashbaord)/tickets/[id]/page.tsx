'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Ticket,
    Edit,
    Bug,
    Lightbulb,
    HelpCircle,
    AlertCircle,
    Clock,
    CheckCircle2,
    XCircle,
    Calendar,
    User,
    Folder,
    FileText,
    Info,
    Trash2
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { Ticket as TicketType } from '@/schemas/ticket.schema';

// Mock data - replace with actual API call
const mockTickets: Record<string, TicketType> = {
    '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p': {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        subject: 'Login page not loading on mobile',
        description: 'Users are reporting that the login page shows a blank screen on iOS devices running version 16+. This issue started after the last deployment and affects approximately 30% of our mobile users.\n\nSteps to reproduce:\n1. Open the app on iOS 16+\n2. Navigate to login page\n3. Screen shows blank white',
        status: 'OPEN',
        priority: 'HIGH',
        type: 'BUG',
        projectId: 'p1',
        reportedById: 'u1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        reportedBy: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        assignedTo: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        createdAt: '2024-12-28T10:00:00Z',
        updatedAt: '2024-12-28T10:00:00Z',
    },
    '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q': {
        id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
        subject: 'Add dark mode support',
        description: 'Implement system-wide dark mode toggle that respects system preferences. This feature has been requested by multiple users and would greatly improve the user experience, especially for users who work at night.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        type: 'FEATURE',
        projectId: 'p2',
        reportedById: 'u3',
        assignedToId: 'u4',
        project: { id: 'p2', name: 'Mobile App' },
        reportedBy: { id: 'u3', fullName: 'Mike Johnson', email: 'mike@example.com' },
        assignedTo: { id: 'u4', fullName: 'Sarah Wilson', email: 'sarah@example.com' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'OPEN': return <AlertCircle className="h-4 w-4" />;
        case 'IN_PROGRESS': return <Clock className="h-4 w-4" />;
        case 'RESOLVED': return <CheckCircle2 className="h-4 w-4" />;
        case 'CLOSED': return <XCircle className="h-4 w-4" />;
        default: return null;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'OPEN': return 'bg-blue-500 hover:bg-blue-600';
        case 'IN_PROGRESS': return 'bg-yellow-500 hover:bg-yellow-600';
        case 'RESOLVED': return 'bg-green-500 hover:bg-green-600';
        case 'CLOSED': return 'bg-gray-500 hover:bg-gray-600';
        default: return '';
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
        case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'LOW': return 'bg-green-100 text-green-700 border-green-200';
        default: return '';
    }
};

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'BUG': return <Bug className="h-5 w-5 text-red-500" />;
        case 'FEATURE': return <Lightbulb className="h-5 w-5 text-purple-500" />;
        case 'SUPPORT': return <HelpCircle className="h-5 w-5 text-blue-500" />;
        default: return null;
    }
};

const viewTips: Tip[] = [
    {
        icon: Edit,
        title: 'Quick Edit',
        description: 'Click Edit to update ticket details.',
    },
    {
        icon: User,
        title: 'Assignment',
        description: 'Assign to a team member for faster resolution.',
    },
    {
        icon: Clock,
        title: 'Track Progress',
        description: 'Update status as work progresses.',
    },
];

interface TicketDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function TicketDetailPage({ params }: TicketDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
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

    if (isFetching) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                    </div>
                    <div className="lg:col-span-4">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
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
                mode="view"
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
                {/* Content Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Ticket Information"
                            description={`#${ticket.id.slice(0, 8)} • ${ticket.type}`}
                            icon={FileText}
                        />
                        <CardContent className="space-y-6">
                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-3">
                                <Badge className={`gap-1 ${getStatusColor(ticket.status)}`}>
                                    {getStatusIcon(ticket.status)}
                                    {ticket.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                    {ticket.priority} Priority
                                </Badge>
                                <Badge variant="secondary" className="gap-1">
                                    {getTypeIcon(ticket.type)}
                                    {ticket.type}
                                </Badge>
                            </div>

                            <Separator />

                            {/* Description */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                    {ticket.description || 'No description provided.'}
                                </p>
                            </div>

                            <Separator />

                            {/* Details Grid */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Project */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Folder className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Project</p>
                                        <p className="font-medium">{ticket.project?.name || '-'}</p>
                                    </div>
                                </div>

                                {/* Reported By */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Reported By</p>
                                        {ticket.reportedBy ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarFallback className="text-xs">
                                                        {ticket.reportedBy.fullName.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{ticket.reportedBy.fullName}</span>
                                            </div>
                                        ) : (
                                            <p className="font-medium">-</p>
                                        )}
                                    </div>
                                </div>

                                {/* Assigned To */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Assigned To</p>
                                        {ticket.assignedTo ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarFallback className="text-xs">
                                                        {ticket.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{ticket.assignedTo.fullName}</span>
                                            </div>
                                        ) : (
                                            <p className="font-medium text-muted-foreground">Unassigned</p>
                                        )}
                                    </div>
                                </div>

                                {/* Created */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created</p>
                                        <p className="font-medium">
                                            {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Actions */}
                            <div className="flex justify-end gap-4">
                                <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                                <Link href={`/tickets/${ticket.id}/edit`}>
                                    <Button className="gap-2">
                                        <Edit className="h-4 w-4" />
                                        Edit Ticket
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Quick Actions"
                    description="Common actions for this ticket"
                    tips={viewTips}
                />
            </div>
        </div>
    );
}
