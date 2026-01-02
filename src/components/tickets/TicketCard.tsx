import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Eye, Bug, Lightbulb, HelpCircle, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Ticket } from '@/schemas/ticket.schema';

interface TicketCardProps {
    ticket: Ticket;
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

export function TicketCard({ ticket }: TicketCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-muted">
                        {getTypeIcon(ticket.type)}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                        <Link href={`/tickets/${ticket.id}`} className="hover:underline block">
                            <h3 className="font-semibold line-clamp-1">{ticket.subject}</h3>
                        </Link>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                                #{ticket.id.slice(0, 8)}
                            </span>
                        </div>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/tickets/${ticket.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/tickets/${ticket.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Ticket
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete ticket', ticket.id);
                            }}
                            title={`Delete Ticket #${ticket.id.substring(0, 8)}?`}
                            description="Are you sure you want to delete this ticket? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Ticket
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
                {ticket.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {ticket.description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {ticket.assignedTo ? (
                            <>
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                        {ticket.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                    {ticket.assignedTo.fullName}
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-muted-foreground">Unassigned</span>
                        )}
                    </div>
                    <Badge className={`gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace('_', ' ')}
                    </Badge>
                </div>

                {ticket.project && (
                    <div className="pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                            Project: <span className="font-medium text-foreground">{ticket.project.name}</span>
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
