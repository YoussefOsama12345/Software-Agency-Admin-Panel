import Link from 'next/link';
import { Edit, Trash2, Eye } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/schemas/article.schema';
import { format } from 'date-fns';

interface ArticleTableProps {
    articles: Article[];
    onDelete?: (id: string) => void;
}

export function ArticleTable({ articles, onDelete }: ArticleTableProps) {
    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
                <p className="text-muted-foreground">No articles found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try creating a new article to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell>
                                <Link href={`/blog/${article.id}`} className="hover:underline">
                                    <div className="font-medium">{article.title}</div>
                                </Link>
                                <div className="text-xs text-muted-foreground hidden md:block">
                                    {article.slug}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{article.category?.name || 'Uncategorized'}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        article.status === 'PUBLISHED'
                                            ? 'default'
                                            : article.status === 'ARCHIVED'
                                                ? 'secondary'
                                                : 'outline'
                                    }
                                >
                                    {article.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {article.createdAt ? format(new Date(article.createdAt), 'PPP') : '-'}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                        <Link href={`/blog/${article.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/blog/${article.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            onDelete?.(article.id);
                                        }}
                                        title={`Delete ${article.title}?`}
                                        description="Are you sure you want to delete this article? This action cannot be undone."
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
                    ))
                    }
                </TableBody >
            </Table >
        </div >
    );
}
