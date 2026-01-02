'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Folder, CheckCircle2, XCircle, FileText } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { FAQCategoryToolbar } from '@/components/faq/category/FAQCategoryToolbar';
import { FAQCategoryCard } from '@/components/faq/category/FAQCategoryCard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock Data
const categories = [
    {
        id: '1',
        name: 'Account',
        slug: 'account',
        description: 'Account related questions',
        count: 5,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '2',
        name: 'Billing',
        slug: 'billing',
        description: 'Billing and payment inquiries',
        count: 3,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '3',
        name: 'Support',
        slug: 'support',
        description: 'General support queries',
        count: 7,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
    },
];

export default function FAQCategoriesPage() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    // Filter Logic
    const filteredCategories = categories.filter(category => {
        const matchesSearch =
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || category.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate stats
    const totalCategories = categories.length;
    const activeCategories = categories.filter(c => c.status === 'ACTIVE').length;
    const inactiveCategories = categories.filter(c => c.status === 'INACTIVE').length;
    const totalPosts = categories.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <div className="space-y-6">
            <PageHeader
                title="FAQ Categories"
                description="Manage your FAQ categories."
            >
                <Link href="/faq/categories/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </Link>
            </PageHeader>

            <StatsGrid>
                <StatsCard
                    title="Total Categories"
                    value={totalCategories}
                    subtitle="All FAQ categories"
                    icon={Folder}
                    color="blue"
                />
                <StatsCard
                    title="Active"
                    value={activeCategories}
                    subtitle="Visible on FAQ"
                    icon={CheckCircle2}
                    color="green"
                />
                <StatsCard
                    title="Inactive"
                    value={inactiveCategories}
                    subtitle="Hidden from FAQ"
                    icon={XCircle}
                    color="red"
                />
                <StatsCard
                    title="Total FAQs"
                    value={totalPosts}
                    subtitle="Across all categories"
                    icon={FileText}
                    color="purple"
                />
            </StatsGrid>

            <div className="space-y-4">
                <FAQCategoryToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    view={view}
                    onViewChange={setView}
                />

                {view === 'list' ? (
                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>FAQs</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCategories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                            <TableCell className="max-w-[300px] truncate text-muted-foreground">
                                                {category.description}
                                            </TableCell>
                                            <TableCell>{category.count}</TableCell>
                                            <TableCell>
                                                <Badge variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                                    {category.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-1">
                                                    <Link href={`/faq/categories/${category.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCategories.map((category) => (
                            <FAQCategoryCard key={category.id} category={category} />
                        ))}
                        {filteredCategories.length === 0 && (
                            <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
                                No categories found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
