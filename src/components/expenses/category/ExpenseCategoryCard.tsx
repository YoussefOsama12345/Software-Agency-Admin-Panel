'use client';

import Link from 'next/link';
import { Folder, FileText, Pencil, Trash2, Layout } from 'lucide-react';
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
import { ExpenseCategory } from '@/schemas/expense-category.schema';

interface ExpenseCategoryCardProps {
    category: ExpenseCategory;
}

export function ExpenseCategoryCard({ category }: ExpenseCategoryCardProps) {
    return (
        <Card className="relative overflow-hidden hover:shadow-md transition-all group p-0 m-0 border shadow-sm">
            {/* Header Section */}
            <div className="bg-blue-50/50 p-6 pb-4 relative">
                <div className="absolute top-4 right-4">
                    <Badge variant={category.status === 'ACTIVE' ? 'default' : 'secondary'} className="shadow-sm">
                        {category.status}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <Folder className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold text-lg leading-none tracking-tight">
                        {category.name}
                    </h3>
                </div>
            </div>

            {/* Body Section */}
            <CardContent className="p-6 pt-4">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] mb-8" title={category.description}>
                    {category.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-2 h-4 w-4 opacity-70" />
                        {category.count} Expenses
                    </div>
                    <div className="flex gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`/expenses/categories/${category.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
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
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
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
