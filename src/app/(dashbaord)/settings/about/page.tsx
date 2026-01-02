'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { AboutForm } from '@/components/settings/AboutForm';
import { AboutFormData } from '@/schemas/about.schema';
import { FormPageHeader } from '@/components/common/FormPageHeader';

const defaultAbout: Partial<AboutFormData> = {
    title: 'Software Agency',
    description: 'We are a leading software agency...',
    mission: 'To empower businesses through technology...',
    mission_ar: 'لتمكين الشركات من خلال التكنولوجيا...',
    vision: 'A world where software solves every problem...',
    vision_ar: 'عالم تحل فيه البرمجيات كل مشكلة...',
    values: [
        { value: 'Integrity', value_ar: 'النزاهة' },
        { value: 'Innovation', value_ar: 'الابتكار' },
        { value: 'Excellence', value_ar: 'التميز' }
    ],
};

export default function AboutSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: AboutFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('About settings updated:', data);
            toast.success('About settings updated successfully');
        } catch (error) {
            toast.error('Failed to update about settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="About Page Settings"
                description="Customize the content of your 'About Us' page."
                mode="edit"
                backHref="/"
                icon={Info}
            />

            <AboutForm
                defaultValues={defaultAbout}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
