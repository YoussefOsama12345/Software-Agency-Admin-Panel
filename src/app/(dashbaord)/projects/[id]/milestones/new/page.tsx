'use client';

import React, { use } from 'react';
import { Target, Info, Calendar } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { MilestoneForm } from '@/components/projects/MilestoneForm';
import { Card, CardContent } from '@/components/ui/card';

const projectMilestoneTips: Tip[] = [
    {
        icon: Target,
        title: 'Define Clear Goals',
        description: 'Set specific, measurable objectives for this milestone.',
    },
    {
        icon: Calendar,
        title: 'Realistic Timeline',
        description: 'Ensure the due date takes into account potential blockers.',
    },
    {
        icon: Info,
        title: 'Track Progress',
        description: 'Update the progress percentage regularly to keep stakeholders informed.',
    }
];

interface NewMilestonePageProps {
    params: Promise<{ id: string }>;
}

export default function NewMilestonePage({ params }: NewMilestonePageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="create"
                title="Milestone"
                backHref={`/projects/${id}`}
                icon={Target}
                stats={{
                    label1: 'Project ID',
                    value1: id,
                    label2: 'New',
                    value2: 'Milestone',
                }}
            />

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card>
                        <FormCardHeader
                            title="Milestone Details"
                            description="Break down the project into manageable phases."
                            icon={Target}
                        />
                        <CardContent>
                            <MilestoneForm projectId={id} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <FormPageSidebar
                        title="Milestone Guide"
                        description="Tips for effective milestone planning."
                        tips={projectMilestoneTips}
                    />
                </div>
            </div>
        </div>
    );
}
