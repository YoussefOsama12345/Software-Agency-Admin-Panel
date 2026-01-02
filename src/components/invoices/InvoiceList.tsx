'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { Invoice } from "@/schemas/invoice.schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InvoiceListProps {
    invoices: Invoice[];
}

const statusColorMap: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    SENT: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    PAID: "bg-green-100 text-green-700 hover:bg-green-200",
    OVERDUE: "bg-red-100 text-red-700 hover:bg-red-200",
    CANCELLED: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

export function InvoiceList({ invoices }: InvoiceListProps) {
    if (invoices.length === 0) {
        return (
            <div className="text-center py-10 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No invoices found.</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                                <Link href={`/invoices/${invoice.id}`} className="hover:underline text-primary">
                                    {invoice.invoiceNumber}
                                </Link>
                            </TableCell>
                            <TableCell>{invoice.client}</TableCell>
                            <TableCell>{invoice.project}</TableCell>
                            <TableCell>{format(invoice.issueDate, 'MMM d, yyyy')}</TableCell>
                            <TableCell>{format(invoice.dueDate, 'MMM d, yyyy')}</TableCell>
                            <TableCell className="font-semibold">
                                ${invoice.totalAmount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className={cn("font-medium", statusColorMap[invoice.status])}>
                                    {invoice.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                        <Link href={`/invoices/${invoice.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/invoices/${invoice.id}/edit`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete invoice', invoice.id);
                                        }}
                                        title={`Delete Invoice ${invoice.invoiceNumber}?`}
                                        description="Are you sure you want to delete this invoice? This action cannot be undone."
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
