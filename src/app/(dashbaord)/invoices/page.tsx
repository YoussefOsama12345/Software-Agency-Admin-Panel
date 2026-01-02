'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { InvoiceStats } from '@/components/invoices/InvoiceStats';
import { InvoiceToolbar } from '@/components/invoices/InvoiceToolbar';
import { InvoiceList } from '@/components/invoices/InvoiceList';
import { InvoiceCard } from '@/components/invoices/InvoiceCard';
import { MOCK_INVOICES } from '@/lib/mock-data';


export default function InvoicesPage() {
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredInvoices = MOCK_INVOICES.filter((invoice) => {
        const matchesSearch =
            invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.client.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Invoices"
                description="Manage client billing and payments."
            >
                <Link href="/invoices/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Invoice
                    </Button>
                </Link>
            </PageHeader>

            <InvoiceStats />

            <InvoiceToolbar
                view={view}
                onViewChange={setView}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {view === 'list' ? (
                <InvoiceList invoices={filteredInvoices} />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))}
                </div>
            )}
        </div>
    );
}
