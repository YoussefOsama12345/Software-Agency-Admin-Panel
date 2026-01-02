import Link from 'next/link';
import { Edit, Trash2, Eye, CheckCircle2, Clock, Circle, Calendar } from 'lucide-react';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/schemas/task.schema';

interface TaskTableProps {
    tasks: Task[];
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

export function TaskTable({ tasks }: TaskTableProps) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mb-4 opacity-50" />
                <p>No tasks found</p>
                <p className="text-sm mt-1">Try adjusting your filters or create a new task</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => {
                        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';
                        return (
                            <TableRow key={task.id} className="hover:bg-muted/50">
                                <TableCell>
                                    <Checkbox checked={task.status === 'DONE'} />
                                </TableCell>
                                <TableCell>
                                    <Link href={`/tasks/${task.id}`} className="font-medium hover:underline">
                                        {task.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`gap-1 ${getStatusColor(task.status)}`}>
                                        {getStatusIcon(task.status)}
                                        {task.status.replace('_', ' ')}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {task.assignedTo ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                                    {task.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{task.assignedTo.fullName}</span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Unassigned</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {task.dueDate ? (
                                        <div className={`flex items-center gap-1.5 text-sm ${isOverdue ? 'text-red-500' : ''}`}>
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{task.project?.name || '-'}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                            <Link href={`/tasks/${task.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                            <Link href={`/tasks/${task.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <ConfirmDeleteModal
                                            onConfirm={() => {
                                                console.log('Delete task', task.id);
                                            }}
                                            title={`Delete Task #${task.id.substring(0, 8)}?`}
                                            description="Are you sure you want to delete this task? This action cannot be undone."
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
