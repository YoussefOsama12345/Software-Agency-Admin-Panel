import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash2, PenSquare, Calendar, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Post, platformIcons, platformColors } from './shared';

interface PostDetailsSidebarProps {
    post: Post;
    onDelete: () => Promise<void>;
}

export function PostDetailsSidebar({ post, onDelete }: PostDetailsSidebarProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <PenSquare className="h-4 w-4" />
                        Post Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant={
                            post.status === 'published' ? 'default' :
                                post.status === 'scheduled' ? 'secondary' : 'outline'
                        }>
                            {post.status}
                        </Badge>
                        <Badge variant="outline">{post.authorName}</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                            {post.platforms.map((platform) => {
                                const Icon = platformIcons[platform];
                                const color = platformColors[platform];
                                return (
                                    <div key={platform} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs ${color}`}>
                                        <Icon className="h-3 w-3" />
                                        <span className="capitalize">{platform}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Scheduled:</span>
                            <span className="font-medium">
                                {post.scheduledAt ? format(new Date(post.scheduledAt), 'PPP') : '-'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium">
                                {post.scheduledAt ? format(new Date(post.scheduledAt), 'p') : '-'}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                        <Link href={`/social/${post.id}/edit`} className="flex-1">
                            <Button className="w-full gap-2" size="sm">
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <ConfirmDeleteModal
                            trigger={
                                <Button variant="outline" size="icon" className="text-destructive hover:text-destructive shrink-0">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            }
                            title="Delete Post"
                            description="Are you sure you want to delete this post? This action cannot be undone."
                            onConfirm={onDelete}
                            variant="destructive"
                            confirmText="Delete Post"
                        />
                    </div>
                </CardContent>
            </Card>

            {post.hashtags && post.hashtags.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            Hashtags
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {post.hashtags.map((tag) => (
                                <Badge key={tag} variant="secondary">#{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
