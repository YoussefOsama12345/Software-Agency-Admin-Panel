'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    PenSquare,
    LayoutGrid,
    Eye,
    ThumbsUp,
    MessageSquare,
    Share2
} from 'lucide-react';
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiLinkedinFill, RiYoutubeFill } from 'react-icons/ri';
import { Music2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { Platform } from '@/schemas/social.schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Import new sub-components
import { Post, Comment, PlatformStats, platformColors, platformIcons } from './post/shared';
import { PlatformSelector } from './post/PlatformSelector';
import { SocialStatsGrid } from './post/SocialStatsGrid';
import { ContentPreview } from './post/ContentPreview';
import { CommentSection } from './post/CommentSection';
import { PostDetailsSidebar } from './post/PostDetailsSidebar';

// Mock fetch function
const fetchPost = async (id: string): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock platform-specific data
    const platformData: Record<string, { stats: PlatformStats; comments: Comment[] }> = {
        facebook: {
            stats: { likes: 124, comments: 45, shares: 12, reach: 1250 },
            comments: [
                {
                    id: 1,
                    author: 'Jane Doe',
                    avatar: 'JD',
                    content: 'Can\'t wait to see it!',
                    time: '2 hours ago',
                    likes: 5,
                    replies: []
                },
                {
                    id: 2,
                    author: 'John Smith',
                    avatar: 'JS',
                    content: 'This looks amazing! 🔥',
                    time: '5 hours ago',
                    likes: 3,
                    replies: []
                }
            ]
        },
        instagram: {
            stats: { likes: 350, comments: 85, shares: 45, reach: 3500 },
            comments: [
                {
                    id: 3,
                    author: 'Sarah Wilson',
                    avatar: 'SW',
                    content: 'Love the aesthetics! 😍',
                    time: '1 hour ago',
                    likes: 12,
                    replies: []
                },
                {
                    id: 4,
                    author: 'Mike Brown',
                    avatar: 'MB',
                    content: 'Need this now!',
                    time: '30 mins ago',
                    likes: 8,
                    replies: []
                }
            ]
        },
        twitter: {
            stats: { likes: 89, comments: 23, shares: 42, reach: 980 },
            comments: [
                {
                    id: 5,
                    author: 'Tech Insider',
                    avatar: 'TI',
                    content: 'Big moves! 🚀',
                    time: '4 hours ago',
                    likes: 15,
                    replies: []
                }
            ]
        },
        linkedin: {
            stats: { likes: 210, comments: 56, shares: 34, reach: 4500 },
            comments: [
                {
                    id: 6,
                    author: 'Professional Network',
                    avatar: 'PN',
                    content: 'Great update for the industry.',
                    time: '1 day ago',
                    likes: 45,
                    replies: []
                }
            ]
        },
        tiktok: {
            stats: { likes: 1500, comments: 340, shares: 890, reach: 15000 },
            comments: [
                {
                    id: 7,
                    author: 'Creator123',
                    avatar: 'C',
                    content: 'Trends! ✨',
                    time: '30 mins ago',
                    likes: 120,
                    replies: []
                }
            ]
        },
        youtube: {
            stats: { likes: 450, comments: 120, shares: 67, reach: 8900 },
            comments: [
                {
                    id: 8,
                    author: 'Subscriber One',
                    avatar: 'SO',
                    content: 'First! 👍',
                    time: '10 mins ago',
                    likes: 2,
                    replies: []
                }
            ]
        }
    };

    return {
        id,
        content: 'Excited to announce our new product launch! 🚀 Stay tuned for more updates.',
        platforms: ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube'] as Platform[],
        hashtags: ['launch', 'product', 'innovation'],
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        authorName: 'Marketing Team',
        createdAt: new Date().toISOString(),
        platformData
    };
};

export default function ViewPostClient({ id }: { id: string }) {
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'overview'>('overview');

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
                if (data.platforms.length > 0) {
                    setSelectedPlatform(data.platforms[0]);
                }
            } catch (error) {
                console.error('Failed to load post:', error);
                toast.error('Failed to load post');
                router.push('/social');
            } finally {
                setIsLoading(false);
            }
        };
        loadPost();
    }, [id, router]);

    const handleSendReply = (parentId: number, text: string) => {
        if (!post || selectedPlatform === 'overview') return;

        const newReply: Comment = {
            id: Date.now(),
            author: 'You',
            avatar: 'ME',
            content: text,
            time: 'Just now',
            likes: 0,
            replies: []
        };

        const updatedPost = { ...post };
        const comments = updatedPost.platformData[selectedPlatform].comments;
        const parentComment = comments.find((c: Comment) => c.id === parentId);

        if (parentComment) {
            if (!parentComment.replies) parentComment.replies = [];
            parentComment.replies.push(newReply);
            // Update stats
            updatedPost.platformData[selectedPlatform].stats.comments += 1;
            setPost(updatedPost);
            toast.success('Reply added');
        }
    };

    const handleDeleteComment = (commentId: number, parentId?: number) => {
        if (!post || selectedPlatform === 'overview') return;

        const updatedPost = { ...post };
        const comments = updatedPost.platformData[selectedPlatform].comments;

        if (parentId) {
            // Delete reply
            const parent = comments.find((c: Comment) => c.id === parentId);
            if (parent && parent.replies) {
                parent.replies = parent.replies.filter((r: Comment) => r.id !== commentId);
                updatedPost.platformData[selectedPlatform].stats.comments -= 1;
                setPost(updatedPost);
                toast.success('Reply deleted');
            }
        } else {
            updatedPost.platformData[selectedPlatform].comments = comments.filter((c: Comment) => c.id !== commentId);
            updatedPost.platformData[selectedPlatform].stats.comments -= 1;
            setPost(updatedPost);
            toast.success('Comment deleted');
        }
    };

    const handleUpdateComment = (commentId: number, text: string, parentId?: number) => {
        if (!post || selectedPlatform === 'overview') return;

        const updatedPost = { ...post };
        const comments = updatedPost.platformData[selectedPlatform].comments;

        if (parentId) {
            const parent = comments.find((c: Comment) => c.id === parentId);
            if (parent && parent.replies) {
                const reply = parent.replies.find((r: Comment) => r.id === commentId);
                if (reply) reply.content = text;
            }
        } else {
            const comment = comments.find((c: Comment) => c.id === commentId);
            if (comment) comment.content = text;
        }

        setPost(updatedPost);
        toast.success('Updated');
    };

    const handleDeletePost = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('Post deleted');
            router.push('/social');
        } catch (error) {
            toast.error('Failed to delete post');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center py-10">Loading...</div>;
    }

    if (!post) {
        return <div className="text-center py-10">Post not found</div>;
    }

    const currentStats = selectedPlatform !== 'overview' && post.platformData[selectedPlatform]
        ? post.platformData[selectedPlatform].stats
        : { likes: 0, comments: 0, shares: 0, reach: 0 };

    const currentComments = selectedPlatform !== 'overview' && post.platformData[selectedPlatform]
        ? post.platformData[selectedPlatform].comments
        : [];

    const CurrentPlatformIcon = selectedPlatform !== 'overview' ? platformIcons[selectedPlatform] : LayoutGrid;

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="view"
                title="Post"
                description="View and manage social media post"
                backHref="/social"
                icon={PenSquare}
                stats={{
                    label1: 'Status',
                    value1: post.status,
                    label2: 'Platforms',
                    value2: post.platforms.length,
                }}
            />

            {/* Platform Selector */}
            <PlatformSelector
                platforms={post.platforms}
                selectedPlatform={selectedPlatform}
                onSelect={setSelectedPlatform}
            />

            {selectedPlatform === 'overview' ? (
                <StatsGrid>
                    <StatsCard title="Total Reach" value="25.5k" subtitle="Across all platforms" icon={Eye} color="orange" />
                    <StatsCard title="Total Likes" value="2,123" subtitle="Total reactions" icon={ThumbsUp} color="blue" />
                    <StatsCard title="Total Comments" value="546" subtitle="Total engagement" icon={MessageSquare} color="green" />
                    <StatsCard title="Total Shares" value="1,043" subtitle="Total shares" icon={Share2} color="purple" />
                </StatsGrid>
            ) : (
                <SocialStatsGrid stats={currentStats} platformName={selectedPlatform} />
            )}

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-lg text-white", selectedPlatform !== 'overview' ? platformColors[selectedPlatform] : "bg-primary")}>
                                    <CurrentPlatformIcon className="h-5 w-5" />
                                </div>
                                <CardTitle className="capitalize">{selectedPlatform} Content</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Tabs defaultValue="preview" className="space-y-4">
                                <TabsList>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="comments" disabled={selectedPlatform === 'overview'}>
                                        Comments ({currentStats.comments})
                                    </TabsTrigger>
                                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                </TabsList>

                                <TabsContent value="preview" className="space-y-4">
                                    {selectedPlatform !== 'overview' ? (
                                        <ContentPreview post={post} selectedPlatform={selectedPlatform} />
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            Select a platform to view content preview.
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="comments" className="space-y-4">
                                    <CommentSection
                                        comments={currentComments}
                                        onSendReply={handleSendReply}
                                        onDeleteComment={handleDeleteComment}
                                        onUpdateComment={handleUpdateComment}
                                    />
                                </TabsContent>

                                <TabsContent value="analytics">
                                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground space-y-2">
                                        <p>Detailed analytics for <span className="capitalize font-semibold text-foreground">{selectedPlatform}</span> will appear here.</p>
                                        <p className="text-xs">Impressions, Clicks, and Demographics data.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <PostDetailsSidebar post={post} onDelete={handleDeletePost} />
                </div>
            </div>
        </div>
    );
}
