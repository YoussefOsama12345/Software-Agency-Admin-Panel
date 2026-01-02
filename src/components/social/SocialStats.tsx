'use client';

import { Calendar, FileCheck, Clock, Send } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface SocialStatsProps {
    readonly scheduledCount: number;
    readonly pendingCount: number;
    readonly publishedCount: number;
    readonly draftCount: number;
}

export function SocialStats({ scheduledCount, pendingCount, publishedCount, draftCount }: SocialStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Scheduled"
                value={scheduledCount.toString()}
                subtitle="Posts ready to publish"
                icon={Calendar}
                color="blue"
            />
            <StatsCard
                title="Pending Approval"
                value={pendingCount.toString()}
                subtitle="Awaiting review"
                icon={Clock}
                color="orange"
            />
            <StatsCard
                title="Published"
                value={publishedCount.toString()}
                subtitle="This month"
                icon={Send}
                color="green"
            />
            <StatsCard
                title="Drafts"
                value={draftCount.toString()}
                subtitle="Work in progress"
                icon={FileCheck}
                color="purple"
            />
        </StatsGrid>
    );
}

