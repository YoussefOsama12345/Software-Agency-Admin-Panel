'use client';

import Link from 'next/link';
import { MoreHorizontal, Pencil, Trash2, Eye, Download, Calendar, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Invoice } from '@/schemas/invoice.schema';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface InvoiceCardProps {
    invoice: Invoice;
}

const statusColorMap: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
    SENT: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    PAID: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    OVERDUE: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
    CANCELLED: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
};

export function InvoiceCard({ invoice }: InvoiceCardProps) {
    return (
        <Card className="hover:shadow-md transition-all duration-300 group border shadow-sm bg-card hover:border-primary/50">
            <CardHeader className="p-4 pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Link href={`/invoices/${invoice.id}`} className="font-bold text-lg hover:text-primary transition-colors">
                            {invoice.invoiceNumber}
                        </Link>
                        <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5 tracking-wide", statusColorMap[invoice.status])}>
                            {invoice.status}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none truncate max-w-[180px]">
                            {invoice.client}
                        </p>
                        {invoice.project && (
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Briefcase className="h-3 w-3 mr-1" />
                                <span className="truncate max-w-[160px]">{invoice.project}</span>
                            </div>
                        )}
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/invoices/${invoice.id}/edit`} className="flex items-center w-full">
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete invoice', invoice.id);
                            }}
                            title={`Delete Invoice ${invoice.invoiceNumber}?`}
                            description="Are you sure you want to delete this invoice? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Invoice
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-1">
                <div className="py-2">
                    <div className="text-2xl font-bold tracking-tight">
                        ${invoice.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">Issue Date</span>
                        <span className="font-medium text-foreground">{format(invoice.issueDate, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground/70">Due Date</span>
                        <span className={cn("font-medium text-foreground", invoice.status === 'OVERDUE' && 'text-red-600')}>
                            {format(invoice.dueDate, 'MMM d, yyyy')}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-2 px-4 flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px]">Updated recently</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Link href={`/invoices/${invoice.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:text-primary">
                            <Pencil className="h-3.5 w-3.5" />
                        </Button>
                    </Link>

                </div>
            </CardFooter>
        </Card>
    );
}
