import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface DeadlineItemProps {
    id: string;
    name: string;
    date: string;
    daysLeft: number;
}

export function DeadlineItem({ name, date, daysLeft }: DeadlineItemProps) {
    const isUrgent = daysLeft <= 7;

    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{name}</p>
                <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <Badge
                variant="outline"
                className={isUrgent ? 'border-red-500 text-red-500' : ''}
            >
                {daysLeft} days
            </Badge>
        </div>
    );
}
