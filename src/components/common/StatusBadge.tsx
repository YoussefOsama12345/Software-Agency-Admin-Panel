import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'ACTIVE' | 'ON_HOLD' | 'PLANNED' | 'COMPLETED' | 'PENDING' | 'IN_PROGRESS' | 'CANCELLED' | string;

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const statusStyles: Record<string, string> = {
    ACTIVE: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    IN_PROGRESS: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    ON_HOLD: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    PENDING: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    PLANNED: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    COMPLETED: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
    CANCELLED: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const style = statusStyles[status] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    const displayText = status.replace(/_/g, ' ');

    return (
        <Badge
            variant="outline"
            className={cn(style, className)}
        >
            {displayText}
        </Badge>
    );
}
