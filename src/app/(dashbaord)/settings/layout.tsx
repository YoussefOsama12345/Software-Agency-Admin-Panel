'use client';

import { Separator } from '@/components/ui/separator';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

// Header removed to allow individual pages to have their own PageHeader
export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6  max-w-7xl mx-auto md:block">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SettingsSidebar />
                </aside>
                <div className="flex-1 max-w-4xl">{children}</div>
            </div>
        </div>
    );
}
