'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SocialPost, Platform, PostStatus } from '@/schemas/social.schema';

interface SocialPostsTableProps {
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

const statusConfig: Record<PostStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    draft: { label: 'Draft', variant: 'secondary' },
    scheduled: { label: 'Scheduled', variant: 'default' },
    pending_approval: { label: 'Pending', variant: 'outline' },
    approved: { label: 'Approved', variant: 'default' },
    published: { label: 'Published', variant: 'default' },
    failed: { label: 'Failed', variant: 'destructive' },
    rejected: { label: 'Rejected', variant: 'destructive' },
};

export function SocialPostsTable({ posts, onDelete }: SocialPostsTableProps) {
    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-card">
                <p className="text-muted-foreground">No posts found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try creating a new post to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Platforms</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => {
                        const status = statusConfig[post.status];
                        return (
                            <TableRow key={post.id}>
                                <TableCell className="max-w-[300px]">
                                    <Link href={`/social/${post.id}`} className="hover:underline">
                                        <p className="truncate font-medium">{post.content}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex -space-x-1">
                                        {post.platforms.map((platform) => {
                                            const Icon = platformIcons[platform];
                                            return (
                                                <div
                                                    key={platform}
                                                    className="h-6 w-6 rounded-full bg-muted flex items-center justify-center ring-1 ring-background"
                                                >
                                                    <Icon className="h-3 w-3" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={status.variant}>{status.label}</Badge>
                                </TableCell>
                                <TableCell>
                                    {post.scheduledAt
                                        ? format(new Date(post.scheduledAt), 'MMM d, yyyy')
                                        : '-'}
                                </TableCell>
                                <TableCell>{post.authorName || '-'}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                            <Link href={`/social/${post.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                            <Link href={`/social/${post.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <ConfirmDeleteModal
                                            onConfirm={() => {
                                                onDelete?.(post.id);
                                            }}
                                            title="Delete Post"
                                            description="Are you sure you want to delete this post? This action cannot be undone."
                                            trigger={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

