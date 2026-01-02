import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeadlineItem } from './DeadlineItem';

interface Deadline {
    id: string;
    name: string;
    date: string;
    daysLeft: number;
}

interface UpcomingDeadlinesProps {
    deadlines: Deadline[];
    className?: string;
}

export function UpcomingDeadlines({ deadlines, className }: UpcomingDeadlinesProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don&apos;t miss these dates</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {deadlines.map((deadline) => (
                        <DeadlineItem key={deadline.id} {...deadline} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
