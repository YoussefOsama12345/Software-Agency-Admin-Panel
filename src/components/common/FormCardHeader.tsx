'use client';

import { LucideIcon } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCardHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export function FormCardHeader({ title, description, icon: Icon, children }: FormCardHeaderProps & { children?: React.ReactNode }) {
    return (
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </div>
                </div>
                {children}
            </div>
        </CardHeader>
    );
}
