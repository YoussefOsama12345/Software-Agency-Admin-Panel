'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, AlertCircle, Edit, Key } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TeamForm } from '@/components/team/TeamForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateTeamFormData } from '@/schemas/team.schema';

// Mock data - replace with actual API call
const mockTeam: Record<string, CreateTeamFormData & { id: string }> = {
    '1': {
        id: '1',
        name: 'Alex Johnson',
        position: 'Lead Frontend Developer',
        bio: 'Passionate about React ecosystem and creating intuitive user experiences. 5+ years of experience in modern web development.',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        x: 'https://x.com',
    },
    '2': {
        id: '2',
        name: 'Sarah Williams',
        position: 'Product Designer',
        bio: 'Creative designer with a focus on accessibility and clean UI patterns. Loves typography and micro-interactions.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
    },
};

const editTips: Tip[] = [
    {
        icon: Edit,
        title: 'Keep Updated',
        description: 'Update role changes and new skills regularly.',
    },
    {
        icon: Key,
        title: 'Permissions',
        description: 'Role changes may affect system access permissions.',
    },
];

export default function EditTeamPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [member, setMember] = useState<(CreateTeamFormData & { id: string }) | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const data = mockTeam[id];
                if (data) {
                    setMember(data);
                } else {
                    toast.error('Team member not found');
                    router.push('/team');
                }
            } catch (error) {
                console.error('Error fetching team member:', error);
                toast.error('Failed to load profile');
            } finally {
                setIsFetching(false);
            }
        };

        fetchMember();
    }, [id, router]);

    const handleSubmit = async (data: CreateTeamFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating Team Member:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Profile updated successfully!');
            router.push('/team');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
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

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Profile not found</p>
                <Link href="/team" className="mt-4">
                    <Button>Back to Team</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Team Member"
                editingName={member.name}
                backHref="/team"
                icon={User}
                stats={{
                    label1: 'Projects',
                    value1: 5,
                    label2: 'Tenure',
                    value2: '2y',
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="Member Details"
                            description="Update profile information below"
                            icon={User}
                        />
                        <CardContent>
                            <TeamForm
                                defaultValues={member}
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
