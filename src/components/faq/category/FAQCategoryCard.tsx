'use client';

import Link from 'next/link';
import { Folder, FileText, Pencil, Trash2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface FAQCategoryCardProps {
    category: {
        id: string;
        name: string;
        slug: string;
        description: string;
        count: number;
        status: string;
        image?: string;
    };
}

export function FAQCategoryCard({ category }: FAQCategoryCardProps) {
    return (
        <Card className="relative overflow-hidden hover:shadow-md transition-all group p-0 m-0">
            {/* Visual Header / Image */}
            <div className="aspect-video bg-muted relative overflow-hidden">
                {category.image ? (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Folder className="h-10 w-10 opacity-20" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    <Badge variant={category.status === 'ACTIVE' ? 'default' : 'secondary'} className="shadow-sm">
                        {category.status}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <h3 className="font-semibold truncate pr-2 max-w-[180px] cursor-help">
                                            {category.name}
                                        </h3>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{category.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <p className="text-xs text-muted-foreground truncate font-mono">
                            /{category.slug}
                        </p>
                    </div>
                </div>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[40px]" title={category.description}>
                    {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        {category.count} FAQs
                    </div>
                    <div className="flex gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`/faq/categories/${category.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>Edit Category</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete category', category.id);
                            }}
                            title={`Delete Category ${category.name}?`}
                            description="Are you sure you want to delete this category? This action cannot be undone."
                            trigger={
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
