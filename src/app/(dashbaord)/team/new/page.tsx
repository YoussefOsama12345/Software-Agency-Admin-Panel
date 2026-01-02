'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, User, Share2, Camera, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { TeamForm } from '@/components/team/TeamForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateTeamFormData } from '@/schemas/team.schema';

const teamTips: Tip[] = [
    {
        icon: User,
        title: 'Professional Bio',
        description: 'Keep bios concise (under 200 words) and professional.',
    },
    {
        icon: Camera,
        title: 'Clear Photo',
        description: 'Use a high-quality, friendly, and professional headshot.',
    },
    {
        icon: Share2,
        title: 'Social Links',
        description: 'Add relevant professional social media links.',
    },
    {
        icon: Users,
        title: 'Role Clarity',
        description: 'Clearly define the position and department.',
    },
];

export default function NewTeamPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateTeamFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating Team Member:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Team member added successfully!');
            router.push('/team');
        } catch (error) {
            console.error('Error adding team member:', error);
            toast.error('Failed to add team member. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Team Member"
                backHref="/team"
                icon={UserPlus}
                stats={{
                    label1: 'Current Team',
                    value1: 12, // Mock data
                    label2: 'Open Roles',
                    value2: 3, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Member Details"
                            description="Add a new member to the team roster"
                            icon={User}
                        />
                        <CardContent>
                            <TeamForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Add Member"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Profile Tips"
                    description="Creating a great team profile"
                    tips={teamTips}
                />
            </div>
        </div>
    );
}
