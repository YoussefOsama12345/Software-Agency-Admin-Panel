import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Eye, CheckCircle2, Clock, Circle, Calendar } from 'lucide-react';

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
import { Task } from '@/schemas/task.schema';

interface TaskCardProps {
    task: Task;
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'TODO': return <Circle className="h-3.5 w-3.5" />;
        case 'IN_PROGRESS': return <Clock className="h-3.5 w-3.5" />;
        case 'DONE': return <CheckCircle2 className="h-3.5 w-3.5" />;
        default: return null;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'TODO': return 'bg-gray-500 hover:bg-gray-600';
        case 'IN_PROGRESS': return 'bg-blue-500 hover:bg-blue-600';
        case 'DONE': return 'bg-green-500 hover:bg-green-600';
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

export function TaskCard({ task }: TaskCardProps) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1 flex-1 min-w-0">
                    <Link href={`/tasks/${task.id}`} className="hover:underline block">
                        <h3 className="font-semibold line-clamp-1">{task.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </Badge>
                        {task.project && (
                            <span className="text-xs text-muted-foreground">
                                {task.project.name}
                            </span>
                        )}
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
                            <Link href={`/tasks/${task.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/tasks/${task.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Task
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete task', task.id);
                            }}
                            title={`Delete Task #${task.id.substring(0, 8)}?`}
                            description="Are you sure you want to delete this task? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Task
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
                {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {task.assignedTo ? (
                            <>
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                        {task.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                    {task.assignedTo.fullName}
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-muted-foreground">Unassigned</span>
                        )}
                    </div>
                    <Badge className={`gap-1 ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {task.status.replace('_', ' ')}
                    </Badge>
                </div>

                {task.dueDate && (
                    <div className={`pt-2 border-t flex items-center gap-1.5 text-xs ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`}>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        {isOverdue && <Badge variant="destructive" className="text-xs px-1 py-0">Overdue</Badge>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
