import Link from 'next/link';
import { format } from 'date-fns';
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { SocialPost } from '@/schemas/social.schema';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { Music2 } from 'lucide-react';

interface SocialPostsTableProps {
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

export function SocialPostsTable({ posts, onDelete }: SocialPostsTableProps) {
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
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Platforms</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="max-w-[400px]">
                                <p className="truncate font-medium">{post.content}</p>
                                {post.hashtags && post.hashtags.length > 0 && (
                                    <p className="text-xs text-muted-foreground truncate">
                                        {post.hashtags.map(t => `#${t}`).join(' ')}
                                    </p>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex -space-x-1">
                                    {post.platforms.map((platform) => (
                                        <div
                                            key={platform}
                                            className="flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground"
                                        >
                                            <PlatformIcon platform={platform} className="h-3 w-3" />
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={post.status} />
                            </TableCell>
                            <TableCell>
                                {post.scheduledAt ? (
                                    <div className="flex flex-col text-sm">
                                        <span>{format(new Date(post.scheduledAt), 'MMM d, yyyy')}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(post.scheduledAt), 'h:mm a')}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground">-</span>
                                )}
                            </TableCell>
                            <TableCell className="text-sm">
                                {post.authorName || '-'}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <Link href={`/social/${post.id}`}>
                                            <DropdownMenuItem>
                                                <Edit2 className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                        </Link>
                                        <ConfirmDeleteModal
                                            onConfirm={() => onDelete(post.id)}
                                            title="Delete Post"
                                            description="Are you sure you want to delete this post?"
                                            trigger={
                                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive w-full">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </div>
                                            }
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
