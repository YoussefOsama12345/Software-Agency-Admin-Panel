'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { ProfileSettingsData } from '@/schemas/settings.schema';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { ProfileSettingsForm } from '@/components/profile/ProfileSettingsForm';

// Mock initial data
const defaultProfile: Partial<ProfileSettingsData> = {
    fullName: 'Admin User',
    email: 'admin@example.com',
    avatar: '',
};

export default function ProfileSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: ProfileSettingsData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Profile updated:', data);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Profile Settings"
                description="Manage your public profile and account security."
                mode="edit"
                backHref="/"
                icon={User}
            />
            <Separator />

            <ProfileSettingsForm
                defaultValues={defaultProfile}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
