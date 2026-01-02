import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PriorityType = 'LOW' | 'MEDIUM' | 'HIGH' | string;

interface PriorityBadgeProps {
    priority: PriorityType;
    className?: string;
}

const priorityStyles: Record<string, string> = {
    LOW: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    MEDIUM: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    HIGH: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const style = priorityStyles[priority] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';

    return (
        <Badge
            variant="outline"
            className={cn(style, className)}
        >
            {priority}
        </Badge>
    );
}
