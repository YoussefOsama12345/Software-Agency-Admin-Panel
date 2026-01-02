import Link from 'next/link';
import { Edit, Trash2, Eye, Bug, Lightbulb, HelpCircle, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Ticket } from '@/schemas/ticket.schema';

interface TicketTableProps {
    tickets: Ticket[];
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'OPEN': return <AlertCircle className="h-3.5 w-3.5" />;
        case 'IN_PROGRESS': return <Clock className="h-3.5 w-3.5" />;
        case 'RESOLVED': return <CheckCircle2 className="h-3.5 w-3.5" />;
        case 'CLOSED': return <XCircle className="h-3.5 w-3.5" />;
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
        case 'BUG': return <Bug className="h-4 w-4 text-red-500" />;
        case 'FEATURE': return <Lightbulb className="h-4 w-4 text-purple-500" />;
        case 'SUPPORT': return <HelpCircle className="h-4 w-4 text-blue-500" />;
        default: return null;
    }
};

export function TicketTable({ tickets }: TicketTableProps) {
    if (tickets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Bug className="h-12 w-12 mb-4 opacity-50" />
                <p>No tickets found</p>
                <p className="text-sm mt-1">Try adjusting your filters or create a new ticket</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="hover:bg-muted/50">
                            <TableCell>
                                <div className="flex flex-col gap-0.5">
                                    <Link href={`/tickets/${ticket.id}`} className="font-medium hover:underline">
                                        {ticket.subject}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">
                                        #{ticket.id.slice(0, 8)}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {getTypeIcon(ticket.type)}
                                    <span className="text-sm">{ticket.type}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                    {ticket.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={`gap-1 ${getStatusColor(ticket.status)}`}>
                                    {getStatusIcon(ticket.status)}
                                    {ticket.status.replace('_', ' ')}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {ticket.assignedTo ? (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                                {ticket.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{ticket.assignedTo.fullName}</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground">Unassigned</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className="text-sm">{ticket.project?.name || '-'}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                        <Link href={`/tickets/${ticket.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/tickets/${ticket.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete ticket', ticket.id);
                                        }}
                                        title={`Delete Ticket #${ticket.id.substring(0, 8)}?`}
                                        description="Are you sure you want to delete this ticket? This action cannot be undone."
                                        trigger={
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
