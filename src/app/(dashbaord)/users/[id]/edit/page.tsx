'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, AlertCircle, Shield, Edit } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserForm } from '@/components/users/UserForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { UpdateUserFormData } from '@/schemas/user.schema';

// Mock data - replace with actual API call
const mockUsers: Record<string, UpdateUserFormData & { id: string }> = {
    '1': {
        id: '1',
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        phone: '+1 555 123 4567',
    },
    '2': {
        id: '2',
        fullName: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        phone: '+1 555 987 6543',
    },
};

const editTips: Tip[] = [
    {
        icon: Shield,
        title: 'Privilege Check',
        description: 'Changing a role to "Admin" grants high-level access.',
    },
    {
        icon: Edit,
        title: 'Profile Updates',
        description: 'Updating email may require re-verification.',
    },
];

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [user, setUser] = useState<(UpdateUserFormData & { id: string }) | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const data = mockUsers[id];
                if (data) {
                    setUser(data);
                } else {
                    toast.error('User not found');
                    router.push('/users');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Failed to load user profile');
            } finally {
                setIsFetching(false);
            }
        };

        fetchUser();
    }, [id, router]);

    const handleUpdate = async (data: UpdateUserFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating User:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('User updated successfully!');
            router.push('/users');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user. Please try again.');
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

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">User not found</p>
                <Link href="/users" className="mt-4">
                    <Button>Back to Users</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="User"
                editingName={user.fullName}
                backHref="/users"
                icon={User}
                stats={{
                    label1: 'Projects',
                    value1: 2,
                    label2: 'Role',
                    value2: user.role === 'admin' ? 'Admin' : 'User',
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="User Details"
                            description="Update the user information below."
                            icon={Edit}
                        />
                        <CardContent>
                            <UserForm
                                mode="edit"
                                defaultValues={user}
                                onSubmit={handleUpdate}
                                onDelete={async () => {
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                    console.log('Deleting User:', id);
                                    toast.success('User deleted successfully');
                                    router.push('/users');
                                }}
                                isLoading={isLoading}
                                submitLabel="Save Changes"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Edit Tips"
                    description="Managing existing users"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
