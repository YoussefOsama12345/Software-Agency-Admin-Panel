import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

// Define the shape of our FAQ data
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    categoryId: string;
    categoryName?: string; // Mock extended property
    status: 'PUBLISHED' | 'DRAFT';
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface FAQCardProps {
    faq: FAQ;
}

export function FAQCard({ faq }: FAQCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1 pr-2">
                    <Badge variant="outline" className="font-normal text-xs mb-2">
                        {faq.categoryName || 'General'}
                    </Badge>
                    <Link href={`/faq/${faq.id}/edit`} className="hover:underline block">
                        <h3 className="font-semibold line-clamp-2">{faq.question}</h3>
                    </Link>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/faq/${faq.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit FAQ
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete FAQ', faq.id);
                            }}
                            title="Delete FAQ?"
                            description="Are you sure you want to delete this FAQ? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete FAQ
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {faq.answer}
                </p>

                <div className="flex items-center justify-between pt-4 border-t mt-auto">
                    <Badge
                        variant={faq.status === 'PUBLISHED' ? 'default' : 'secondary'}
                        className={faq.status === 'PUBLISHED' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                        {faq.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(faq.updatedAt).toLocaleDateString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
