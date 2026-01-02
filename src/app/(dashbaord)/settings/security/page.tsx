'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { Separator } from '@/components/ui/separator';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { SecurityForm } from '@/components/settings/SecurityForm';
import { SecuritySettingsData } from '@/schemas/settings.schema';

const defaultSecurity: SecuritySettingsData = {
    twoFactorEnabled: false,
};

export default function SecuritySettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: SecuritySettingsData) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Security settings updated:', data);
            toast.success('Security settings updated successfully');
        } catch (error) {
            toast.error('Failed to update security settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Security"
                description="Manage your account security and password."
                mode="edit"
                backHref="/"
                icon={ShieldCheck}
            />
            <Separator />

            <SecurityForm
                defaultValues={defaultSecurity}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
