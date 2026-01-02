'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { PortfolioItem } from './PortfolioCard';

interface PortfolioTableProps {
    items: PortfolioItem[];
}

export function PortfolioTable({ items }: PortfolioTableProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p>No portfolio items found</p>
                <p className="text-sm mt-1">Try adjusting your filters or create a new project</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-14 rounded overflow-hidden bg-muted shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <Link href={`/portfolio/${item.id}/edit`} className="font-medium hover:underline">
                                        {item.title}
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[300px]">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {item.description || '-'}
                                </p>
                            </TableCell>
                            <TableCell>
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        View
                                    </a>
                                ) : (
                                    <span className="text-muted-foreground">-</span>
                                )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                        <Link href={`/portfolio/${item.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/portfolio/${item.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete portfolio item', item.id);
                                        }}
                                        title={`Delete ${item.title}?`}
                                        description="Are you sure you want to delete this project? This action cannot be undone."
                                        trigger={
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
