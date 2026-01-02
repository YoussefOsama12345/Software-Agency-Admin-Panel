'use client';

import Link from 'next/link';
import { Pencil, Trash2, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Expense } from '@/schemas/expense.schema';

interface ExpenseTableProps {
    expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
    if (expenses.length === 0) {
        return (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
                No expenses found matching your criteria.
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Receipt</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell className="font-medium whitespace-nowrap">
                                {format(new Date(expense.date), 'MMM d, yyyy')}
                            </TableCell>
                            <TableCell>
                                <div className="max-w-[200px] truncate font-medium">
                                    {expense.title}
                                </div>
                                {expense.description && (
                                    <div className="max-w-[200px] truncate text-xs text-muted-foreground">
                                        {expense.description}
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{expense.category}</Badge>
                            </TableCell>
                            <TableCell className="font-bold">
                                ${expense.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        expense.status === 'APPROVED' ? 'default' :
                                            expense.status === 'PAID' ? 'outline' :
                                                expense.status === 'REJECTED' ? 'destructive' : 'secondary'
                                    }
                                >
                                    {expense.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {expense.receipt ? (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                        <Receipt className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <span className="text-muted-foreground text-xs">-</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/expenses/${expense.id}/edit`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete expense', expense.id);
                                        }}
                                        title={`Delete Expense ${expense.title}?`}
                                        description="Are you sure you want to delete this expense? This action cannot be undone."
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
