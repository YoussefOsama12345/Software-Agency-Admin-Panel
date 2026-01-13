import { FileClock, CheckCircle, Clock, FileText } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface SocialStatsProps {
    scheduledCount: number;
    pendingCount: number;
    publishedCount: number;
    draftCount: number;
}

export function SocialStats({
    scheduledCount,
    pendingCount,
    publishedCount,
    draftCount,
}: SocialStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Scheduled"
                value={scheduledCount.toString()}
                subtitle="Posts waiting"
                icon={Clock}
                color="blue"
            />
            <StatsCard
                title="Pending Approval"
                value={pendingCount.toString()}
                subtitle="Needs review"
                icon={FileClock}
                color="orange"
            />
            <StatsCard
                title="Published"
                value={publishedCount.toString()}
                subtitle="Total published"
                icon={CheckCircle}
                color="green"
            />
            <StatsCard
                title="Drafts"
                value={draftCount.toString()}
                subtitle="In progress"
                icon={FileText}
                color="gray"
            />
        </StatsGrid>
    );
}
