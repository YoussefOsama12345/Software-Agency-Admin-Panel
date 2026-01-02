'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { SocialStats, SocialToolbar, SocialPostsGrid, SocialPostsTable } from '@/components/social';
import { SocialPost } from '@/schemas/social.schema';

// Mock data
const mockPosts: SocialPost[] = [
    {
        id: '1',
        content: 'Excited to announce our new product launch! 🚀 Stay tuned for more updates.',
        platforms: ['facebook', 'instagram', 'twitter'],
        hashtags: ['launch', 'product', 'innovation'],
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        authorId: '1',
        authorName: 'Marketing Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        content: 'Behind the scenes look at our development process.',
        platforms: ['instagram', 'tiktok'],
        hashtags: ['behindthescenes', 'development'],
        status: 'pending_approval',
        scheduledAt: new Date(Date.now() + 172800000).toISOString(),
        authorId: '2',
        authorName: 'John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        content: 'Happy Monday! Start your week with motivation. 💪',
        platforms: ['linkedin', 'twitter'],
        hashtags: ['motivation', 'monday'],
        status: 'published',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        authorId: '1',
        authorName: 'Marketing Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        content: 'We are hiring! Join our amazing team.',
        platforms: ['linkedin', 'facebook'],
        hashtags: ['hiring', 'jobs'],
        status: 'draft',
        authorId: '3',
        authorName: 'HR Department',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function SocialPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredPosts = mockPosts.filter((post) => {
        const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        const matchesPlatform = platformFilter === 'all' || post.platforms.includes(platformFilter as never);
        return matchesSearch && matchesStatus && matchesPlatform;
    });

    const scheduledCount = mockPosts.filter((p) => p.status === 'scheduled').length;
    const pendingCount = mockPosts.filter((p) => p.status === 'pending_approval').length;
    const publishedCount = mockPosts.filter((p) => p.status === 'published').length;
    const draftCount = mockPosts.filter((p) => p.status === 'draft').length;

    const handleDelete = (id: string) => {
        console.log('Delete post:', id);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Social Media"
                description="Manage and schedule your social media posts."
            >
                <Link href="/social/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </PageHeader>

            <SocialStats
                scheduledCount={scheduledCount}
                pendingCount={pendingCount}
                publishedCount={publishedCount}
                draftCount={draftCount}
            />

            <SocialToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                platformFilter={platformFilter}
                onPlatformFilterChange={setPlatformFilter}
                view={view}
                onViewChange={setView}
            />

            {view === 'grid' ? (
                <SocialPostsGrid posts={filteredPosts} onDelete={handleDelete} />
            ) : (
                <SocialPostsTable posts={filteredPosts} onDelete={handleDelete} />
            )}
        </div>
    );
}
