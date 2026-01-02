'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { ClientStats } from '@/components/clients/ClientStats';
import { ClientToolbar } from '@/components/clients/ClientToolbar';
import { ClientTable } from '@/components/clients/ClientTable';
import { ClientGrid } from '@/components/clients/ClientGrid';

// Mock data - replace with actual API call
const mockClients = [
    {
        id: '1',
        name: 'TechCorp Inc.',
        email: 'contact@techcorp.com',
        phone: '+1 (555) 123-4567',
        industry: 'Technology',
        projectsCount: 3,
        totalBudget: 45000,
        status: 'Active'
    },
    {
        id: '2',
        name: 'FinanceHub',
        email: 'info@financehub.com',
        phone: '+1 (555) 987-6543',
        industry: 'Finance',
        projectsCount: 1,
        totalBudget: 15000,
        status: 'Active'
    },
    {
        id: '3',
        name: 'MediCare+',
        email: 'support@medicare.plus',
        phone: '+1 (555) 222-3333',
        industry: 'Healthcare',
        projectsCount: 0,
        totalBudget: 0,
        status: 'Inactive'
    },
];

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredClients = mockClients.filter(client => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Clients"
                description="Manage your client relationships and their projects."
            >
                <Link href="/clients/new">
                    <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="h-4 w-4" />
                        New Client
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats Overview */}
            <ClientStats
                totalClients={mockClients.length}
                activeProjects={4} // This would come from real data
                totalRevenue={60000} // This would come from real data
                growthRate={15} // This would come from real data
            />

            {/* Filters */}
            <ClientToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                view={view}
                onViewChange={setView}
            />

            {/* Clients List/Grid */}
            {view === 'grid' ? (
                <ClientGrid clients={filteredClients} />
            ) : (
                <ClientTable clients={filteredClients} />
            )}
        </div>
    );
}
