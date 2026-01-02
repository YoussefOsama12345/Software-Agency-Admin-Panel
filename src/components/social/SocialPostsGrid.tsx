'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { Music2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { SocialPost, Platform, PostStatus } from '@/schemas/social.schema';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';


interface SocialPostsGridProps {
    readonly posts: SocialPost[];
    readonly onDelete?: (id: string) => void;
}

const platformIcons: Record<Platform, React.ComponentType<{ className?: string }>> = {
    facebook: RiFacebookFill,
    instagram: RiInstagramFill,
    twitter: RiTwitterXFill,
    linkedin: RiLinkedinFill,
    tiktok: Music2,
    youtube: RiYoutubeFill,
};

const platformColors: Record<Platform, string> = {
    facebook: 'bg-blue-600',
    instagram: 'bg-pink-500',
    twitter: 'bg-black',
    linkedin: 'bg-blue-700',
    tiktok: 'bg-black',
    youtube: 'bg-red-600',
};

const statusConfig: Record<PostStatus, { label: string; color: string }> = {
    draft: { label: 'Draft', color: 'bg-gray-500' },
    scheduled: { label: 'Scheduled', color: 'bg-blue-500' },
    pending_approval: { label: 'Pending', color: 'bg-yellow-500' },
    approved: { label: 'Approved', color: 'bg-green-500' },
    published: { label: 'Published', color: 'bg-emerald-600' },
    failed: { label: 'Failed', color: 'bg-red-500' },
    rejected: { label: 'Rejected', color: 'bg-red-400' },
};

export function SocialPostsGrid({ posts, onDelete }: SocialPostsGridProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No posts found
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
                const status = statusConfig[post.status];
                return (
                    <Card key={post.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-1">
                                    {post.platforms.map((platform) => {
                                        const Icon = platformIcons[platform];
                                        return (
                                            <div
                                                key={platform}
                                                className={cn(
                                                    'h-7 w-7 rounded-full flex items-center justify-center text-white',
                                                    platformColors[platform]
                                                )}
                                            >
                                                <Icon className="h-3.5 w-3.5" />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={cn(status.color, 'text-white')}>
                                        {status.label}
                                    </Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/social/${post.id}`}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/social/${post.id}/edit`}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <ConfirmDeleteModal
                                                trigger={
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                }
                                                title="Delete Post"
                                                description="Are you sure you want to delete this post? This action cannot be undone."
                                                onConfirm={() => onDelete?.(post.id)}
                                                variant="destructive"
                                                confirmText="Delete Post"
                                            />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/social/${post.id}`} className="hover:underline">
                                <p className="text-sm line-clamp-3 font-medium">{post.content}</p>
                            </Link>
                            {post.hashtags && post.hashtags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {post.hashtags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground">
                            {post.scheduledAt ? (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {format(new Date(post.scheduledAt), 'MMM d, yyyy')}
                                </div>
                            ) : (
                                <span>Not scheduled</span>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

