'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import {
    Edit,
    Trash2,
    Newspaper,
    Globe,
    Share2,
    Eye,
    MessageSquare,
    Clock,
    Tag,
    CheckCircle2,
    ThumbsUp,
    MessageCircle,
    MoreHorizontal,
    Check,
    CircleCheck,
    Search,
    Twitter
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
// Removed DropdownMenu related imports as they were moved to the Sidebar actions
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useArticle, useArticles } from '@/hooks/useArticles';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ArticleViewPageProps {
    params: Promise<{ id: string }>;
}

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    status: 'approved' | 'pending' | 'rejected';
    replies?: Comment[];
}

const initialComments: Comment[] = [
    {
        id: 1,
        author: 'John Doe',
        avatar: 'JD',
        content: 'Great article! Really helped me understand the concepts better. Looking forward to more content like this.',
        time: '2 hours ago',
        likes: 12,
        status: 'approved',
        replies: []
    },
    {
        id: 2,
        author: 'Alice Smith',
        avatar: 'AS',
        content: 'I think there is a typo in the second paragraph. Other than that, solid post.',
        time: '5 hours ago',
        likes: 0,
        status: 'pending',
        replies: []
    },
    {
        id: 3,
        author: 'Mike K.',
        avatar: 'MK',
        content: 'Is source code available for this example?',
        time: '1 day ago',
        likes: 3,
        status: 'approved',
        replies: []
    }
];

export default function ArticleViewPage({ params }: ArticleViewPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { article, isLoading } = useArticle(id);
    const { deleteArticle } = useArticles();

    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleDelete = async () => {
        try {
            await deleteArticle(id);
            toast.success('Article deleted successfully');
            router.push('/blog');
        } catch (error) {
            toast.error('Failed to delete article');
            console.error(error);
        }
    };

    const handleSendReply = (parentId: number) => {
        if (!replyText.trim()) return;

        const newReply: Comment = {
            id: Date.now(),
            author: 'You',
            avatar: 'ME',
            content: replyText,
            time: 'Just now',
            likes: 0,
            status: 'approved',
            replies: []
        };

        const updatedComments = comments.map(comment => {
            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            // Check nested replies if needed (currently 1 level deep for demo)
            return comment;
        });

        setComments(updatedComments);
        setReplyText('');
        setReplyingTo(null);
        toast.success('Reply added');
    };

    const handleDeleteComment = (commentId: number, parentId?: number) => {
        if (parentId) {
            // Delete reply
            const updatedComments = comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: comment.replies?.filter(reply => reply.id !== commentId)
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            toast.success('Reply deleted');
        } else {
            // Delete top-level comment
            setComments(comments.filter(c => c.id !== commentId));
            toast.success('Comment deleted');
        }
    };

    const renderComment = (comment: Comment, isReply = false, parentId?: number) => (
        <div key={comment.id} className={cn("flex flex-col gap-2 p-4 rounded-lg", isReply ? "bg-muted/50 ml-12 mt-2" : "bg-muted/30 border")}>
            <div className="flex gap-4">
                <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-background shadow-sm shrink-0",
                    comment.status === 'pending' ? "bg-orange-100 text-orange-600" :
                        comment.author === 'You' ? "bg-primary/10 text-primary" : "bg-gradient-to-br from-primary/10 to-primary/30 text-primary"
                )}>
                    {comment.avatar}
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{comment.author}</p>
                            {comment.status === 'approved' && <CircleCheck className="h-3 w-3 text-blue-500" fill="currentColor" stroke="white" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>

                    <p className="text-sm text-foreground/90">{comment.content}</p>

                    <div className="flex items-center gap-4 pt-2">
                        <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> {comment.likes}
                        </button>

                        {!isReply && (
                            <button
                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            >
                                <MessageCircle className="h-3 w-3" /> Reply
                            </button>
                        )}

                        {comment.status === 'pending' && (
                            <button className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1 font-medium">
                                <Check className="h-3 w-3" /> Approve
                            </button>
                        )}

                        <ConfirmDeleteModal
                            trigger={
                                <button className="text-xs text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            }
                            title="Delete Comment"
                            description="Are you sure you want to delete this comment?"
                            onConfirm={() => handleDeleteComment(comment.id, parentId)}
                            variant="destructive"
                            confirmText="Delete"
                        />
                    </div>
                </div>
            </div>

            {/* Reply Input */}
            {!isReply && replyingTo === comment.id && (
                <div className="ml-12 mt-2 flex gap-2 animate-in fade-in slide-in-from-top-2">
                    <Input
                        placeholder={`Reply to ${comment.author}...`}
                        className="h-9 text-sm"
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendReply(comment.id);
                        }}
                    />
                    <Button size="sm" className="h-9" onClick={() => handleSendReply(comment.id)}>Send</Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-9"
                        onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-2 mt-2">
                    {comment.replies.map(reply => renderComment(reply, true, comment.id))}
                </div>
            )}
        </div>
    );

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8 space-y-6">
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                    <div className="lg:col-span-4 space-y-6">
                        <Skeleton className="h-[300px] w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Newspaper className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">Article not found</h2>
                <p className="text-muted-foreground mt-1 mb-4">The article you are looking for does not exist.</p>
                <Link href="/blog">
                    <Button variant="outline">Back to Blog</Button>
                </Link>
            </div>
        );
    }

    // Calculate reading time
    const wordCount = article.content ? article.content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className="space-y-4">
            {/* Hero Header */}
            <FormPageHeader
                mode="view"
                title="Article"
                editingName={article.title}
                description={article.description}
                backHref="/blog"
                icon={Newspaper}
                stats={{
                    label1: 'Status',
                    value1: article.status,
                    label2: 'Category',
                    value2: article.category?.name || 'General',
                }}
            />

            {/* Stats Row */}
            <StatsGrid>
                <StatsCard
                    title="Reading Time"
                    value={`${readingTime} min`}
                    subtitle="Estimated reading time"
                    icon={Clock}
                    color="blue"
                />
                <StatsCard
                    title="Views"
                    value="2,543"
                    subtitle="+12% from last month"
                    icon={Eye}
                    color="green"
                />
                <StatsCard
                    title="Engagement"
                    value="8.5%"
                    subtitle="Very high engagement"
                    icon={MessageSquare}
                    color="purple"
                />
                <StatsCard
                    title="Shares"
                    value="142"
                    subtitle="Across all platforms"
                    icon={Share2}
                    color="orange"
                />
            </StatsGrid>

            <div className="grid gap-4 lg:grid-cols-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-4">
                    <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <CardContent className="p-4 sm:p-6">
                            <Tabs defaultValue="content" className="space-y-4">
                                <TabsList className="bg-muted/50 p-1">
                                    <TabsTrigger value="content" className="gap-2">
                                        <Newspaper className="h-4 w-4" />
                                        Content & Media
                                    </TabsTrigger>
                                    <TabsTrigger value="seo" className="gap-2">
                                        <Search className="h-4 w-4" />
                                        SEO & Metadata
                                    </TabsTrigger>
                                    <TabsTrigger value="comments" className="gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="social" className="gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Social Previews
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="space-y-4">
                                    {/* Featured Image */}
                                    {article.image && (
                                        <div className="aspect-video relative bg-muted rounded-lg overflow-hidden border shadow-sm">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Main Content */}
                                    <div className="prose prose-sm max-w-none dark:prose-invert">
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="text-muted-foreground leading-relaxed mb-6">
                                            {article.description}
                                        </p>
                                        <h3 className="text-lg font-semibold mb-2">Content</h3>
                                        <div className="p-4 rounded-lg bg-background border">
                                            <p className="whitespace-pre-wrap leading-relaxed">{article.content}</p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="comments" className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5 text-primary" />
                                            Comments <span className="text-muted-foreground font-normal text-base">({comments.length})</span>
                                        </h3>
                                        <div className="flex bg-muted/50 p-1 rounded-lg">
                                            <Button size="sm" variant="ghost" className="h-7 text-xs bg-background shadow-sm text-foreground">Top</Button>
                                            <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-foreground">Newest</Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {comments.length > 0 ? (
                                            comments.map(comment => renderComment(comment))
                                        ) : (
                                            <p className="text-center text-muted-foreground py-8">No comments yet.</p>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="seo" className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Meta Title</label>
                                            <div className="p-3 rounded-md bg-background border text-sm">
                                                {article.metaTitle || article.title}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Canonical URL</label>
                                            <div className="p-3 rounded-md bg-background border text-sm font-mono truncate">
                                                {article.canonicalUrl || '-'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                                        <div className="p-3 rounded-md bg-background border text-sm">
                                            {article.metaDescription || article.description}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <Badge variant={article.noIndex ? 'destructive' : 'secondary'}>
                                            {article.noIndex ? 'No Index' : 'Index Allowed'}
                                        </Badge>
                                        <Badge variant={article.noFollow ? 'destructive' : 'secondary'}>
                                            {article.noFollow ? 'No Follow' : 'Follow Allowed'}
                                        </Badge>
                                    </div>
                                </TabsContent>

                                <TabsContent value="social" className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Open Graph Preview */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium flex items-center gap-2">
                                                <Globe className="h-4 w-4" /> Open Graph
                                            </h4>
                                            <div className="border rounded-lg overflow-hidden bg-background">
                                                <div className="aspect-[1.91/1] bg-muted relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={article.ogImage || article.image}
                                                        alt="OG Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="p-3 space-y-1">
                                                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">website.com</p>
                                                    <h4 className="font-bold text-sm truncate">{article.ogTitle || article.title}</h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {article.ogDescription || article.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Twitter Preview */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium flex items-center gap-2">
                                                <Twitter className="h-4 w-4" /> Twitter Card
                                            </h4>
                                            <div className="border rounded-xl overflow-hidden bg-background">
                                                <div className="aspect-[2/1] bg-muted relative">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={article.twitterImage || article.image}
                                                        alt="Twitter Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="p-3 space-y-1">
                                                    <h4 className="font-bold text-sm truncate">{article.twitterTitle || article.title}</h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {article.twitterDescription || article.description}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground mt-1">website.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    {/* Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Newspaper className="h-4 w-4" />
                                Article Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={
                                    article.status === 'PUBLISHED' ? 'default' :
                                        article.status === 'ARCHIVED' ? 'secondary' : 'outline'
                                }>
                                    {article.status}
                                </Badge>
                                <Badge variant="outline">{article.category?.name || 'Uncategorized'}</Badge>
                            </div>
                            <Separator />
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Slug:</span>
                                    <span className="font-mono text-xs truncate max-w-[150px]" title={article.slug}>/{article.slug}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Published:</span>
                                    <span className="font-medium">
                                        {article.createdAt ? format(new Date(article.createdAt), 'PPP') : '-'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Updated:</span>
                                    <span className="font-medium">
                                        {article.updatedAt ? format(new Date(article.updatedAt), 'PPP') : '-'}
                                    </span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Link href={`/blog/${article.id}/edit`} className="flex-1">
                                    <Button className="w-full gap-2" size="sm">
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tags Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Tags
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {article.tags && article.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="gap-1">
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No tags added</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
