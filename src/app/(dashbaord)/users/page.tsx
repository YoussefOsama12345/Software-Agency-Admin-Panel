'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { UserStats } from '@/components/users/UserStats';
import { UserToolbar } from '@/components/users/UserToolbar';
import { UserTable, User } from '@/components/users/UserTable';
import { UserGrid } from '@/components/users/UserGrid';

// Mock data - replace with actual API call
const mockUsers: User[] = [
    {
        id: '1',
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: '2023-01-01T00:00:00Z',
    },
    {
        id: '2',
        fullName: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2023-05-15T10:30:00Z',
    },
    {
        id: '3',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        createdAt: '2023-06-20T14:15:00Z',
    },
    {
        id: '4',
        fullName: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'user',
        createdAt: '2023-07-05T09:00:00Z',
    },
    {
        id: '5',
        fullName: 'Alice Williams',
        email: 'alice@example.com',
        role: 'admin',
        createdAt: '2023-08-12T16:45:00Z',
    },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Users"
                description="Manage system users and access roles."
            >
                <Link href="/users/new">
                    <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="h-4 w-4" />
                        Create User
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats Overview */}
            <UserStats
                totalUsers={mockUsers.length}
                activeUsers={mockUsers.length} // Mock
                newUsers={2} // Mock
                adminsCount={mockUsers.filter(u => u.role === 'admin').length}
            />

            {/* Toolbar */}
            <UserToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                roleFilter={roleFilter}
                onRoleFilterChange={setRoleFilter}
                view={view}
                onViewChange={setView}
            />

            {/* User Grid/Table */}
            {view === 'grid' ? (
                <UserGrid users={filteredUsers} />
            ) : (
                <UserTable users={filteredUsers} />
            )}
        </div>
    );
}

