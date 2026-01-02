'use client';

import {
    Users,
    TrendingUp,
    TrendingDown,
    Eye,
    Heart,
    Music2,
} from 'lucide-react';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { cn } from '@/lib/utils';
import { Platform } from '@/schemas/social.schema';

const platformConfig: Record<Platform, { name: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
    facebook: { name: 'Facebook', icon: RiFacebookFill, color: 'bg-blue-600' },
    instagram: { name: 'Instagram', icon: RiInstagramFill, color: 'bg-pink-500' },
    twitter: { name: 'X', icon: RiTwitterXFill, color: 'bg-black' },
    linkedin: { name: 'LinkedIn', icon: RiLinkedinFill, color: 'bg-blue-700' },
    tiktok: { name: 'TikTok', icon: Music2, color: 'bg-black' },
    youtube: { name: 'YouTube', icon: RiYoutubeFill, color: 'bg-red-600' },
};

const mockData = [
    { platform: 'facebook' as Platform, followers: 45200, change: 5.2, engagement: 12500 },
    { platform: 'instagram' as Platform, followers: 62800, change: 12.4, engagement: 28900 },
    { platform: 'twitter' as Platform, followers: 28500, change: 3.8, engagement: 8200 },
    { platform: 'linkedin' as Platform, followers: 18900, change: 8.9, engagement: 5600 },
    { platform: 'youtube' as Platform, followers: 15200, change: 6.5, engagement: 42000 },
    { platform: 'tiktok' as Platform, followers: 8900, change: 45.2, engagement: 65000 },
];

const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

export default function AnalyticsPage() {
    const totalFollowers = mockData.reduce((acc, d) => acc + d.followers, 0);
    const totalEngagement = mockData.reduce((acc, d) => acc + d.engagement, 0);
    const maxFollowers = Math.max(...mockData.map((d) => d.followers));

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics"
                description="Track your social media performance."
            />

            <StatsGrid>
                <StatsCard
                    title="Total Followers"
                    value={formatNumber(totalFollowers)}
                    subtitle="Across all platforms"
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Total Engagement"
                    value={formatNumber(totalEngagement)}
                    subtitle="This month"
                    icon={Heart}
                    color="pink"
                />
                <StatsCard
                    title="Avg. Growth"
                    value="+13.7%"
                    subtitle="This month"
                    icon={TrendingUp}
                    color="green"
                />
                <StatsCard
                    title="Total Reach"
                    value="1.2M"
                    subtitle="This month"
                    icon={Eye}
                    color="purple"
                />
            </StatsGrid>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {mockData.map((item) => {
                        const config = platformConfig[item.platform];
                        const Icon = config.icon;
                        const isPositive = item.change >= 0;

                        return (
                            <div key={item.platform} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn('h-8 w-8 rounded-full flex items-center justify-center text-white', config.color)}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{config.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatNumber(item.followers)} followers
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cn('flex items-center gap-1 text-sm', isPositive ? 'text-green-600' : 'text-red-600')}>
                                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        {isPositive ? '+' : ''}{item.change}%
                                    </div>
                                </div>
                                <Progress value={(item.followers / maxFollowers) * 100} className="h-2" />
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
