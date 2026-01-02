'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FileText, FolderKanban, Target, Users, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateProjectFormData } from '@/schemas/project.schema';

const mockProject = {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Complete e-commerce solution with payment integration, inventory management, and customer portal.',
    clientId: 'client-1',
    budget: 50000,
    status: 'ACTIVE' as const,
    priority: 'HIGH' as const,
    deadline: '2025-01-15T00:00:00Z',
    tasksCount: 24,
    completedTasksCount: 18,
};

const editTips: Tip[] = [
    {
        icon: Target,
        title: 'Review Milestones',
        description: 'Ensure milestones align with updated project scope.',
    },
    {
        icon: Users,
        title: 'Update Team',
        description: 'Inform team members of any changes.',
    },
    {
        icon: DollarSign,
        title: 'Track Budget',
        description: 'Verify budget adjustments are documented.',
    },
    {
        icon: Calendar,
        title: 'Check Deadlines',
        description: 'Confirm timeline changes with stakeholders.',
    },
];

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [project, setProject] = useState<typeof mockProject | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setProject(mockProject);
            } catch (error) {
                console.error('Error fetching project:', error);
                toast.error('Failed to load project');
            } finally {
                setIsFetching(false);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleSubmit = async (data: CreateProjectFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating project:', projectId, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Project updated successfully!');
            router.push(`/projects/${projectId}`);
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project. Please try again.');
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

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Project not found</p>
                <Link href="/projects" className="mt-4">
                    <Button>Back to Projects</Button>
                </Link>
            </div>
        );
    }

    const progress = Math.round((project.completedTasksCount / project.tasksCount) * 100);

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Project"
                editingName={project.name}
                backHref={`/projects/${projectId}`}
                icon={FolderKanban}
                stats={{
                    label1: 'Complete',
                    value1: `${progress}%`,
                    label2: 'Tasks',
                    value2: project.tasksCount,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Project Details"
                            description="Update the project information below"
                            icon={FileText}
                        />
                        <CardContent>
                            <ProjectForm
                                defaultValues={{
                                    name: project.name,
                                    description: project.description,
                                    clientId: project.clientId,
                                    budget: project.budget,
                                    status: project.status,
                                    priority: project.priority,
                                    deadline: project.deadline,
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
                    description="Things to consider when editing"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
