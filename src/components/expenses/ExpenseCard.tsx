'use client';

import Link from 'next/link';
import { Calendar, DollarSign, Pencil, Trash2, Receipt } from 'lucide-react';
import { format } from 'date-fns';
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
import { Expense } from '@/schemas/expense.schema';

interface ExpenseCardProps {
    expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
    const statusColor =
        expense.status === 'APPROVED' ? 'default' :
            expense.status === 'PAID' ? 'outline' : // or success if available
                expense.status === 'REJECTED' ? 'destructive' :
                    'secondary';

    return (
        <Card className="hover:shadow-md transition-all border shadow-sm relative overflow-hidden group">
            {/* Visual Top Bar */}


            <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="mb-1">
                                {expense.category}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-lg line-clamp-1" title={expense.title}>
                            {expense.title}
                        </h3>
                    </div>
                    <Badge variant={statusColor} className="capitalize">
                        {expense.status.toLowerCase()}
                    </Badge>
                </div>

                {/* Amount */}
                <div className="flex items-baseline text-3xl font-bold text-primary mb-4">
                    ${expense.amount.toFixed(2)}
                </div>

                {/* Details */}
                <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(expense.date), 'MMM d, yyyy')}</span>
                    </div>
                    {expense.description && (
                        <p className="line-clamp-2 text-xs pt-1">
                            {expense.description}
                        </p>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <div className="flex gap-1">
                        {expense.receipt && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                            <Receipt className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View Receipt</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>

                    <div className="flex gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`/expenses/${expense.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete expense', expense.id);
                            }}
                            title={`Delete Expense ${expense.title}?`}
                            description="Are you sure you want to delete this expense? This action cannot be undone."
                            trigger={
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
