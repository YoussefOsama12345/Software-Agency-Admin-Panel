'use client';

import { useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { TicketStats } from '@/components/tickets/TicketStats';
import { TicketToolbar } from '@/components/tickets/TicketToolbar';
import { TicketGrid } from '@/components/tickets/TicketGrid';
import { TicketTable } from '@/components/tickets/TicketTable';
import { Ticket } from '@/schemas/ticket.schema';

// Mock data - replace with actual API call
const mockTickets: Ticket[] = [
    {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        subject: 'Login page not loading on mobile',
        description: 'Users are reporting that the login page shows a blank screen on iOS devices running version 16+.',
        status: 'OPEN',
        priority: 'HIGH',
        type: 'BUG',
        projectId: 'p1',
        reportedById: 'u1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        reportedBy: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        assignedTo: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        createdAt: '2024-12-28T10:00:00Z',
        updatedAt: '2024-12-28T10:00:00Z',
    },
    {
        id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
        subject: 'Add dark mode support',
        description: 'Implement system-wide dark mode toggle that respects system preferences.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        type: 'FEATURE',
        projectId: 'p2',
        reportedById: 'u3',
        project: { id: 'p2', name: 'Mobile App' },
        reportedBy: { id: 'u3', fullName: 'Mike Johnson', email: 'mike@example.com' },
        assignedTo: { id: 'u4', fullName: 'Sarah Wilson', email: 'sarah@example.com' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
    {
        id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
        subject: 'How to reset password?',
        description: 'Customer cannot find the password reset option in the app.',
        status: 'RESOLVED',
        priority: 'LOW',
        type: 'SUPPORT',
        projectId: 'p1',
        reportedById: 'u1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        reportedBy: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        assignedTo: null,
        createdAt: '2024-12-26T08:45:00Z',
        updatedAt: '2024-12-27T11:20:00Z',
    },
    {
        id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
        subject: 'API rate limiting issues',
        description: 'The API is returning 429 errors too frequently during peak hours.',
        status: 'OPEN',
        priority: 'HIGH',
        type: 'BUG',
        projectId: 'p4',
        reportedById: 'u2',
        project: { id: 'p4', name: 'API Development' },
        reportedBy: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        assignedTo: { id: 'u3', fullName: 'Mike Johnson', email: 'mike@example.com' },
        createdAt: '2024-12-30T16:00:00Z',
        updatedAt: '2024-12-30T16:00:00Z',
    },
    {
        id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
        subject: 'Dashboard performance optimization',
        description: 'The dashboard takes too long to load with large datasets.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        type: 'FEATURE',
        projectId: 'p3',
        reportedById: 'u4',
        project: { id: 'p3', name: 'Admin Dashboard' },
        reportedBy: { id: 'u4', fullName: 'Sarah Wilson', email: 'sarah@example.com' },
        assignedTo: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-12-25T12:00:00Z',
        updatedAt: '2024-12-29T18:30:00Z',
    },
    {
        id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
        subject: 'Payment gateway integration complete',
        description: 'Successfully integrated Stripe payment gateway with the checkout flow.',
        status: 'CLOSED',
        priority: 'HIGH',
        type: 'FEATURE',
        projectId: 'p1',
        reportedById: 'u1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        reportedBy: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        assignedTo: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        createdAt: '2024-12-20T10:00:00Z',
        updatedAt: '2024-12-24T15:45:00Z',
    },
];

export default function TicketsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredTickets = mockTickets.filter(ticket => {
        const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (ticket.description && ticket.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
        const matchesType = typeFilter === 'all' || ticket.type === typeFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });

    // Calculate stats
    const openCount = mockTickets.filter(t => t.status === 'OPEN').length;
    const inProgressCount = mockTickets.filter(t => t.status === 'IN_PROGRESS').length;
    const resolvedCount = mockTickets.filter(t => t.status === 'RESOLVED').length;
    const closedCount = mockTickets.filter(t => t.status === 'CLOSED').length;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Tickets"
                description="Manage support tickets, bug reports, and feature requests."
            >
            </PageHeader>

            {/* Stats Overview */}
            <TicketStats
                openCount={openCount}
                inProgressCount={inProgressCount}
                resolvedCount={resolvedCount}
                closedCount={closedCount}
            />

            {/* Toolbar */}
            <TicketToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                view={view}
                onViewChange={setView}
            />

            {/* Tickets Grid/Table */}
            {view === 'grid' ? (
                <TicketGrid tickets={filteredTickets} />
            ) : (
                <TicketTable tickets={filteredTickets} />
            )}
        </div>
    );
}
