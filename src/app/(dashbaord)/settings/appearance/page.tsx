'use client';

import { useState } from 'react';
import { Palette } from 'lucide-react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { AppearanceForm } from '@/components/settings/AppearanceForm';
import { AppearanceSettingsData } from '@/schemas/settings.schema';

const defaultAppearance: AppearanceSettingsData = {
    theme: 'light',
    fontSize: 'medium',
    reduceMotion: false,
};

export default function AppearanceSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: AppearanceSettingsData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Appearance settings updated:', data);
            toast.success('Appearance settings updated successfully');
        } catch (error) {
            toast.error('Failed to update appearance settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Appearance"
                description="Customize the look and feel of the application."
                mode="edit"
                backHref="/"
                icon={Palette}
            />
            <Separator />

            <AppearanceForm
                defaultValues={defaultAppearance}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
