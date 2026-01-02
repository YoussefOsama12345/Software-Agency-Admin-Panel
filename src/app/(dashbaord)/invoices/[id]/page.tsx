'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import {
    Printer,
    Download,
    Mail,
    Building2,
    Calendar,
    CreditCard,
    FileText,
    CheckSquare,
    DollarSign,
    Briefcase,
    Edit,
    Trash2,
    Receipt,
    Target
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { MOCK_INVOICES } from '@/lib/mock-data';

const statusColorMap: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
    SENT: "bg-blue-100 text-blue-700 border-blue-200",
    PAID: "bg-green-100 text-green-700 border-green-200",
    OVERDUE: "bg-red-100 text-red-700 border-red-200",
    CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function InvoiceViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const invoice = MOCK_INVOICES.find((inv) => inv.id === id);

    if (!invoice) {
        notFound();
    }

    const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const tax = subtotal * 0.1; // Mock 10% tax
    const total = subtotal + tax;

    // Derived stats for the StatsGrid
    const isOverdue = invoice.status === 'OVERDUE';
    const daysOverdue = isOverdue ? Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 3600 * 24)) : 0;

    return (
        <div className="space-y-6">
            {/* Standard Header */}
            <FormPageHeader
                mode="view"
                title={`Invoice ${invoice.invoiceNumber}`}
                backHref="/invoices"
                icon={Receipt}
                stats={{
                    label1: 'Status',
                    value1: invoice.status,
                    label2: 'Issue Date',
                    value2: format(invoice.issueDate, 'MMM d, yyyy'),
                }}
            />

            {/* Stats Grid */}
            <StatsGrid>
                <StatsCard
                    title="Total Amount"
                    value={`$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    color="green"
                    subtitle="Including tax"
                />
                <StatsCard
                    title="Balance Due"
                    value={`$${invoice.status === 'PAID' ? '0.00' : total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    icon={CreditCard}
                    color={isOverdue ? "red" : "blue"}
                    subtitle={invoice.status === 'PAID' ? "Paid in full" : "Pending payment"}
                />
                <StatsCard
                    title="Due Date"
                    value={format(invoice.dueDate, 'MMM d, yyyy')}
                    icon={Calendar}
                    color={isOverdue ? "red" : "purple"}
                    subtitle={isOverdue ? `${daysOverdue} days overdue` : "Upcoming"}
                    subtitleClassName={isOverdue ? "text-red-600 font-medium" : ""}
                />
                <StatsCard
                    title="Items"
                    value={invoice.items.length}
                    icon={CheckSquare}
                    color="orange"
                    subtitle="Line items"
                />
            </StatsGrid>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Column (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Invoice Render Card */}
                    <Card className="overflow-hidden bg-background shadow-sm border">
                        <CardHeader className="border-b pb-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-xl">Invoice {invoice.invoiceNumber}</CardTitle>
                                        <Badge variant="outline" className={statusColorMap[invoice.status]}>
                                            {invoice.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{invoice.project}</p>
                                </div>
                                <div className="text-right space-y-0.5">
                                    <p className="text-sm font-medium text-muted-foreground">Amount Due</p>
                                    <p className="text-3xl font-bold text-primary">
                                        ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Addresses */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bill To</p>
                                        <div className="flex items-start gap-3">
                                            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-lg">{invoice.client}</p>
                                                <p className="text-sm text-muted-foreground">client@example.com</p>
                                                <p className="text-sm text-muted-foreground">123 Business Rd, Tech City</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issued</p>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{format(invoice.issueDate, 'MMM d, yyyy')}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</p>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className={invoice.status === 'OVERDUE' ? 'text-red-600 font-bold' : 'font-medium'}>
                                                    {format(invoice.dueDate, 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Items Table */}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold mb-4">Line Items</h3>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead className="w-[100px] text-right">Qty</TableHead>
                                                <TableHead className="w-[120px] text-right">Price</TableHead>
                                                <TableHead className="w-[120px] text-right">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoice.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{item.description}</TableCell>
                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        ${(item.quantity * item.price).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col items-end gap-2 border-t">
                                <div className="flex justify-between w-full max-w-xs text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between w-full max-w-xs text-sm">
                                    <span className="text-muted-foreground">Tax (10%)</span>
                                    <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <Separator className="my-2 w-full max-w-xs" />
                                <div className="flex justify-between w-full max-w-xs text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            {/* Notes */}
                            {invoice.notes && (
                                <>
                                    <Separator />
                                    <div className="p-6 bg-slate-50/50">
                                        <h4 className="text-sm font-semibold mb-2">Notes & Terms</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column (4 cols) - Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Actions Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start" onClick={() => toast.success('Sent to client!')}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Invoice
                            </Button>
                            <Button className="w-full justify-start" variant="outline" onClick={() => toast.success('Payment recorded!')}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Record Payment
                            </Button>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Button variant="outline" size="sm" onClick={() => toast.info('Downloading PDF...')}>
                                    <Download className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => window.print()}>
                                    <Printer className="mr-2 h-4 w-4" />
                                    Print
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Link href={`/invoices/${invoice.id}/edit`} className="flex-1">
                                    <Button className="w-full gap-2" size="sm">
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                Invoice Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Client:</span>
                                    <span className="font-medium">{invoice.client}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Project:</span>
                                    <span className="font-medium">{invoice.project}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Receipt className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Number:</span>
                                    <span className="font-medium">{invoice.invoiceNumber}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
