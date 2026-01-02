'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, FolderKanban, Target, Users, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateProjectFormData } from '@/schemas/project.schema';

const projectTips: Tip[] = [
    {
        icon: Target,
        title: 'Set Clear Milestones',
        description: 'Break your project into phases with measurable goals.',
    },
    {
        icon: Users,
        title: 'Assign Team Early',
        description: 'Identify key team members before kickoff.',
    },
    {
        icon: DollarSign,
        title: 'Budget Buffer',
        description: 'Include 10-15% contingency in your budget.',
    },
    {
        icon: Calendar,
        title: 'Realistic Deadlines',
        description: 'Factor in review cycles and dependencies.',
    },
];

export default function NewProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateProjectFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating project:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Project created successfully!');
            router.push('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Project"
                backHref="/projects"
                icon={FolderKanban}
                stats={{
                    label1: 'Active Projects',
                    value1: 24,
                    label2: 'This Month',
                    value2: 8,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Project Details"
                            description="Fill in the information to create your project"
                            icon={FileText}
                        />
                        <CardContent>
                            <ProjectForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Create Project"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Project Tips"
                    description="Best practices for successful projects"
                    tips={projectTips}
                />
            </div>
        </div>
    );
}
