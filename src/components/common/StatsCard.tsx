import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export type StatsCardColor = 'green' | 'blue' | 'purple' | 'orange' | 'gray' | 'yellow' | 'red' | 'pink' | 'primary';

export interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    subtitleClassName?: string;
    icon: LucideIcon;
    color?: StatsCardColor;
    progress?: number;
    href?: string;
    className?: string;
}

const colorConfig: Record<StatsCardColor, { gradient: string; iconBg: string; iconColor: string }> = {
    green: {
        gradient: 'from-green-500/20 to-transparent',
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-600',
    },
    blue: {
        gradient: 'from-blue-500/20 to-transparent',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-600',
    },
    purple: {
        gradient: 'from-purple-500/20 to-transparent',
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-600',
    },
    orange: {
        gradient: 'from-orange-500/20 to-transparent',
        iconBg: 'bg-orange-500/10',
        iconColor: 'text-orange-600',
    },
    gray: {
        gradient: 'from-gray-500/20 to-transparent',
        iconBg: 'bg-gray-500/10',
        iconColor: 'text-gray-600',
    },
    yellow: {
        gradient: 'from-yellow-500/20 to-transparent',
        iconBg: 'bg-yellow-500/10',
        iconColor: 'text-yellow-600',
    },
    red: {
        gradient: 'from-red-500/20 to-transparent',
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-600',
    },
    pink: {
        gradient: 'from-pink-500/20 to-transparent',
        iconBg: 'bg-pink-500/10',
        iconColor: 'text-pink-600',
    },
    primary: {
        gradient: 'from-primary/20 to-transparent',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
    },
};

export function StatsCard({
    title,
    value,
    subtitle,
    subtitleClassName,
    icon: Icon,
    color = 'primary',
    progress,
    href,
    className,
}: StatsCardProps) {
    const colors = colorConfig[color];

    const content = (
        <Card className={cn(
            'relative overflow-hidden hover:shadow-md transition-all',
            href && 'cursor-pointer hover:border-primary/20',
            className
        )}>
            {/* Colorful gradient circle in top-right corner */}
            <div className={cn(
                'absolute top-0 right-0 w-20 h-20 bg-gradient-to-br rounded-bl-full',
                colors.gradient
            )} />

            <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground font-medium">{title}</p>
                        <p className="text-3xl font-bold tracking-tight">{value}</p>
                    </div>
                    <div className={cn(
                        'h-12 w-12 rounded-xl flex items-center justify-center shrink-0',
                        colors.iconBg
                    )}>
                        <Icon className={cn('h-6 w-6', colors.iconColor)} />
                    </div>
                </div>

                {progress !== undefined && (
                    <Progress value={progress} className="h-1.5 mt-4" />
                )}

                {subtitle && (
                    <p className={cn(
                        'text-xs text-muted-foreground mt-4',
                        subtitleClassName
                    )}>
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}

// Helper component for stats grid layout
export function StatsGrid({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4', className)}>
            {children}
        </div>
    );
}
