'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ListTodo, FileText, Clock, Target, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskForm } from '@/components/tasks/TaskForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateTaskFormData, Task } from '@/schemas/task.schema';

// Mock data - replace with actual API call
const mockTasks: Record<string, Task> = {
    '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p': {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        name: 'Design homepage wireframes',
        description: 'Create initial wireframes for the new homepage redesign.',
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
        description: 'Set up JWT-based authentication with refresh tokens.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: '2025-01-03T00:00:00Z',
        projectId: 'p2',
        assignedToId: 'u1',
        project: { id: 'p2', name: 'Mobile App' },
        assignedTo: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
};

const editTips: Tip[] = [
    {
        icon: Target,
        title: 'Clear Goals',
        description: 'Define specific, measurable objectives.',
    },
    {
        icon: Clock,
        title: 'Set Due Dates',
        description: 'Add deadlines to stay on track.',
    },
    {
        icon: AlertTriangle,
        title: 'Priority Matters',
        description: 'High priority for urgent tasks.',
    },
];

interface EditTaskPageProps {
    params: Promise<{ id: string }>;
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (data: CreateTaskFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating task:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Task updated successfully!');
            router.push('/tasks');
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again.');
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

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
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
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Task Details"
                            description="Update the task information below"
                            icon={FileText}
                        />
                        <CardContent>
                            <TaskForm
                                defaultValues={task}
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
