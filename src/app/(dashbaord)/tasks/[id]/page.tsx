'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ListTodo,
    Edit,
    Circle,
    Clock,
    CheckCircle2,
    Calendar,
    User,
    Folder,
    FileText,
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
import { Task } from '@/schemas/task.schema';

// Mock data - replace with actual API call
const mockTasks: Record<string, Task> = {
    '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p': {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        name: 'Design homepage wireframes',
        description: 'Create initial wireframes for the new homepage redesign. Focus on mobile-first approach and ensure accessibility standards are met.',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: '2025-01-05T00:00:00Z',
        projectId: 'p1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        assignedTo: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        createdAt: '2024-12-28T10:00:00Z',
        updatedAt: '2024-12-28T10:00:00Z',
    },
    '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q': {
        id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
        name: 'Implement user authentication',
        description: 'Set up JWT-based authentication with refresh tokens. Include password hashing, session management, and OAuth integration.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: '2025-01-03T00:00:00Z',
        projectId: 'p2',
        project: { id: 'p2', name: 'Mobile App' },
        assignedTo: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'TODO': return <Circle className="h-4 w-4" />;
        case 'IN_PROGRESS': return <Clock className="h-4 w-4" />;
        case 'DONE': return <CheckCircle2 className="h-4 w-4" />;
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

const viewTips: Tip[] = [
    {
        icon: Edit,
        title: 'Quick Edit',
        description: 'Click Edit to update task details.',
    },
    {
        icon: User,
        title: 'Assignment',
        description: 'Assign to a team member.',
    },
    {
        icon: Clock,
        title: 'Track Progress',
        description: 'Update status as work progresses.',
    },
];

interface TaskDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(true);
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = mockTasks[id];
                if (data) {
                    setTask(data);
                } else {
                    toast.error('Task not found');
                    router.push('/tasks');
                }
            } catch (error) {
                console.error('Error fetching task:', error);
                toast.error('Failed to load task');
            } finally {
                setIsFetching(false);
            }
        };

        fetchTask();
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

    if (!task) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <ListTodo className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Task not found</p>
                <Link href="/tasks" className="mt-4">
                    <Button>Back to Tasks</Button>
                </Link>
            </div>
        );
    }

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="view"
                title="Task"
                editingName={task.name}
                backHref="/tasks"
                icon={ListTodo}
                stats={{
                    label1: 'Status',
                    value1: task.status.replace('_', ' '),
                    label2: 'Priority',
                    value2: task.priority,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Content Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Task Information"
                            description={task.project?.name || 'No project'}
                            icon={FileText}
                        />
                        <CardContent className="space-y-6">
                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-3">
                                <Badge className={`gap-1 ${getStatusColor(task.status)}`}>
                                    {getStatusIcon(task.status)}
                                    {task.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                    {task.priority} Priority
                                </Badge>
                                {isOverdue && (
                                    <Badge variant="destructive">Overdue</Badge>
                                )}
                            </div>

                            <Separator />

                            {/* Description */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                    {task.description || 'No description provided.'}
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
                                        <p className="font-medium">{task.project?.name || '-'}</p>
                                    </div>
                                </div>

                                {/* Assigned To */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Assigned To</p>
                                        {task.assignedTo ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarFallback className="text-xs">
                                                        {task.assignedTo.fullName.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{task.assignedTo.fullName}</span>
                                            </div>
                                        ) : (
                                            <p className="font-medium text-muted-foreground">Unassigned</p>
                                        )}
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Due Date</p>
                                        <p className={`font-medium ${isOverdue ? 'text-red-500' : ''}`}>
                                            {task.dueDate
                                                ? new Date(task.dueDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })
                                                : 'No due date'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Created */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created</p>
                                        <p className="font-medium">
                                            {new Date(task.createdAt).toLocaleDateString('en-US', {
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
                                <Link href={`/tasks/${task.id}/edit`}>
                                    <Button className="gap-2">
                                        <Edit className="h-4 w-4" />
                                        Edit Task
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Quick Actions"
                    description="Common actions for this task"
                    tips={viewTips}
                />
            </div>
        </div>
    );
}
