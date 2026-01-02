"use client"

import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Calendar, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/schemas/article.schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
    article: Article;
    onDelete?: (id: string) => void;
}

export function ArticleCard({ article, onDelete }: ArticleCardProps) {
    // Calculate estimated reading time
    const wordCount = article.content ? article.content.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <Card className="flex flex-col h-full group hover:shadow-xl transition-all duration-300 border-border/50 overflow-visible relative py-0 gap-0">
            {/* Image Header with Overlapping Avatar */}
            <div className="relative">
                <div className="aspect-[16/10] w-full bg-muted rounded-t-xl overflow-hidden relative">
                    <Link href={`/blog/${article.id}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>
                    <div className="absolute top-2 right-2 flex gap-2">
                        {article.status !== 'PUBLISHED' && (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "backdrop-blur-md shadow-sm font-medium text-[10px] h-5 px-2",
                                    article.status === 'DRAFT' && "bg-yellow-500/90 text-white",
                                    article.status === 'ARCHIVED' && "bg-gray-500/90 text-white"
                                )}
                            >
                                {article.status}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Floating Avatar */}
                <div className="absolute -bottom-5 right-5 z-10">
                    <Avatar className="h-10 w-10 border-4 border-background shadow-md">
                        <AvatarImage src="/avatars/01.png" alt="Author" />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">AD</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <CardContent className="p-4 pt-6 flex-grow">
                {/* Meta Header */}
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-[10px] h-5 px-2">
                        {article.category?.name || 'General'}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {readingTime} min read
                    </span>
                </div>

                <Link href={`/blog/${article.id}`} className="group/title block mb-2">
                    <h3 className="font-bold text-lg leading-tight group-hover/title:text-primary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                </Link>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-3">
                    {article.description}
                </p>

                <Link
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
            </CardContent>

            <CardFooter className="p-3 pt-0 text-[10px] text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/5 mt-auto">
                <div className="flex items-center gap-3 py-2">
                    <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        No Comments
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.createdAt ? format(new Date(article.createdAt), 'yyyy-MM-dd') : '-'}
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                            <MoreHorizontal className="h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/blog/${article.id}/edit`}>
                                <Edit className="mr-2 h-3 w-3" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                onDelete?.(article.id);
                            }}
                            title={`Delete Article ${article.title}?`}
                            description="Are you sure you want to delete this article? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Trash2 className="mr-2 h-3 w-3" />
                                    Delete
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
}
