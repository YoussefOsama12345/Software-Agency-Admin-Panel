'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { UserForm } from '@/components/users/UserForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateUserFormData } from '@/schemas/user.schema';

const userTips: Tip[] = [
    {
        icon: ShieldCheck,
        title: 'Role Management',
        description: 'Assign "Admin" role carefully. Admins have full access to all system features.',
    },
    {
        icon: Lock,
        title: 'Strong Passwords',
        description: 'Ensure passwords are at least 8 characters long and include a mix of character types.',
    },
    {
        icon: Mail,
        title: 'Valid Email',
        description: 'Use a valid email address as it will be used for account recovery and notifications.',
    },
];

export default function NewUserPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            console.log('Creating User:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('User created successfully!');
            router.push('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Failed to create user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="User"
                backHref="/users"
                icon={UserPlus}
                stats={{
                    label1: 'Active Users',
                    value1: 15, // Mock data
                    label2: 'Admins',
                    value2: 3, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <FormCardHeader
                            title="User Details"
                            description="Create a new user account"
                            icon={UserPlus}
                        />
                        <CardContent>
                            <UserForm
                                mode="create"
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                submitLabel="Create User"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Security Tips"
                    description="Best practices for user management"
                    tips={userTips}
                />
            </div>
        </div>
    );
}
