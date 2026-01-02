import { Eye, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { PlatformStats } from './shared';

interface SocialStatsGridProps {
    stats: PlatformStats;
    platformName: string;
}

export function SocialStatsGrid({ stats, platformName }: SocialStatsGridProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Reach"
                value={stats.reach.toLocaleString()}
                subtitle={`${platformName} reach`}
                icon={Eye}
                color="orange"
            />
            <StatsCard
                title="Likes"
                value={stats.likes}
                subtitle="Platform reactions"
                icon={ThumbsUp}
                color="blue"
            />
            <StatsCard
                title="Comments"
                value={stats.comments}
                subtitle="Platform engagement"
                icon={MessageSquare}
                color="green"
            />
            <StatsCard
                title="Shares"
                value={stats.shares}
                subtitle="Platform shares"
                icon={Share2}
                color="purple"
            />
        </StatsGrid>
    );
}
