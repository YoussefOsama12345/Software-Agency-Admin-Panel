'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ListTodo, FileText, Clock, Target, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { TaskForm } from '@/components/tasks/TaskForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateTaskFormData } from '@/schemas/task.schema';

const createTips: Tip[] = [
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

export default function NewTaskPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateTaskFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating task:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Task created successfully!');
            router.push('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
            toast.error('Failed to create task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Task"
                backHref="/tasks"
                icon={ListTodo}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Task Details"
                            description="Fill in the task information below"
                            icon={FileText}
                        />
                        <CardContent>
                            <TaskForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Create Task"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Tips for Tasks"
                    description="Best practices for task creation"
                    tips={createTips}
                />
            </div>
        </div>
    );
}
