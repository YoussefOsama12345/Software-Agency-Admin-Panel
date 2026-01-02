import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';

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
import { FAQ } from './FAQCard';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

interface FAQTableProps {
    faqs: FAQ[];
}

export function FAQTable({ faqs }: FAQTableProps) {
    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Question</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Order</TableHead>

                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {faqs.map((faq) => (
                        <TableRow key={faq.id}>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <Link href={`/faq/${faq.id}/edit`} className="font-medium hover:underline line-clamp-1">
                                        {faq.question}
                                    </Link>
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                        {faq.answer}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">
                                    {faq.categoryName || 'General'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={faq.status === 'PUBLISHED' ? 'default' : 'secondary'}
                                    className={faq.status === 'PUBLISHED' ? 'bg-green-500 hover:bg-green-600' : ''}
                                >
                                    {faq.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                                {faq.order}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/faq/${faq.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete FAQ', faq.id);
                                        }}
                                        title="Delete FAQ?"
                                        description="Are you sure you want to delete this FAQ? This action cannot be undone."
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
