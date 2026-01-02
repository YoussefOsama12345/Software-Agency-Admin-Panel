import { HelpCircle, CheckCircle2, FileText, Eye } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface FAQStatsProps {
    totalFAQs: number;
    publishedCount: number;
    draftCount: number;
    totalViews: number;
}

export function FAQStats({ totalFAQs, publishedCount, draftCount, totalViews }: FAQStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total FAQs"
                value={totalFAQs}
                subtitle="All questions"
                icon={HelpCircle}
                color="blue"
            />
            <StatsCard
                title="Published"
                value={publishedCount}
                subtitle="Live on site"
                icon={CheckCircle2}
                color="green"
            />
            <StatsCard
                title="Drafts"
                value={draftCount}
                subtitle="Pending review"
                icon={FileText}
                color="purple"
            />
            <StatsCard
                title="Total Views"
                value={totalViews.toLocaleString()}
                subtitle="Lifetime views"
                icon={Eye}
                color="orange"
            />
        </StatsGrid>
    );
}
