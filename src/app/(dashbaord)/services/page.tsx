'use client';

import { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ServicesTable } from '@/components/services/ServicesTable';
import { ServiceToolbar } from '@/components/services/ServiceToolbar';
import { ServicesStats } from '@/components/services/ServicesStats';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Service } from '@/schemas/service.schema';
import { MOCK_SERVICES } from '@/lib/mock-data';

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredServices = MOCK_SERVICES.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Services"
                description="Manage the services you offer to clients."
            >
                <Link href="/services/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </PageHeader>

            <ServicesStats services={MOCK_SERVICES} />

            <ServiceToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                view={view}
                onViewChange={setView}
            />

            {view === 'list' ? (
                <ServicesTable services={filteredServices} />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
