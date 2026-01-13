import Link from 'next/link';
import { format } from 'date-fns';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { SocialPost } from '@/schemas/social.schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { Music2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

interface SocialPostsGridProps {
    readonly posts: SocialPost[];
    readonly onDelete: (id: string) => void;
}

const PlatformIcon = ({ platform, className }: { platform: string; className?: string }) => {
    switch (platform) {
        case 'facebook': return <RiFacebookFill className={className} />;
        case 'instagram': return <RiInstagramFill className={className} />;
        case 'twitter': return <RiTwitterXFill className={className} />;
        case 'linkedin': return <RiLinkedinFill className={className} />;
        case 'youtube': return <RiYoutubeFill className={className} />;
        case 'tiktok': return <Music2 className={className} />;
        default: return null;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'published': return <Badge className="bg-green-500">Published</Badge>;
        case 'scheduled': return <Badge className="bg-blue-500">Scheduled</Badge>;
        case 'draft': return <Badge variant="secondary">Draft</Badge>;
        case 'pending_approval': return <Badge className="bg-orange-500">Pending</Badge>;
        case 'failed': return <Badge variant="destructive">Failed</Badge>;
        default: return <Badge variant="outline">{status}</Badge>;
    }
};

export function SocialPostsGrid({ posts, onDelete }: SocialPostsGridProps) {
    if (posts.length === 0) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
                <h3 className="text-lg font-semibold">No posts found</h3>
                <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or create a new post.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Card key={post.id} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex -space-x-1">
                            {post.platforms.map((platform) => (
                                <div
                                    key={platform}
                                    className="flex h-7 w-7 items-center justify-center rounded-full border bg-background text-muted-foreground"
                                >
                                    <PlatformIcon platform={platform} className="h-4 w-4" />
                                </div>
                            ))}
                        </div>
                        <StatusBadge status={post.status} />
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="line-clamp-3 text-sm">{post.content}</p>
                        {post.scheduledAt && (
                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span className="mr-3">
                                    {format(new Date(post.scheduledAt), 'MMM d, yyyy')}
                                </span>
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{format(new Date(post.scheduledAt), 'h:mm a')}</span>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
                        <div className="text-xs text-muted-foreground">
                            {post.authorName && <span>By {post.authorName}</span>}
                        </div>
                        <div className="flex gap-1">
                            <Link href={`/social/${post.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                            </Link>
                            <ConfirmDeleteModal
                                onConfirm={() => onDelete(post.id)}
                                title="Delete Post"
                                description="Are you sure you want to delete this post? This action cannot be undone."
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
