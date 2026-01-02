'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { SiteSettingsData } from '@/schemas/settings.schema';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { GeneralSettingsForm } from '@/components/settings/GeneralSettingsForm';

// Mock initial data
const defaultSettings: SiteSettingsData = {
    siteName: 'Software Agency',
    siteDescription: 'Premium software development services for modern businesses.',
    contactEmail: 'contact@agency.com',
    maintenanceMode: false,
    socialLinks: {
        twitter: 'https://twitter.com/agency',
        facebook: '',
        instagram: '',
        linkedin: 'https://linkedin.com/company/agency',
    },
};

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: SiteSettingsData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Settings updated:', data);
            toast.success('Site settings updated successfully');
        } catch (error) {
            toast.error('Failed to update settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="General Settings"
                description="Configure general site information and preferences."
                mode="edit"
                backHref="/"
                icon={Settings}
            />
            <Separator />

            <GeneralSettingsForm
                defaultValues={defaultSettings}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
