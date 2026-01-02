'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Folder, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { PortfolioCategoryToolbar } from '@/components/portfolio/category/PortfolioCategoryToolbar';
import { PortfolioCategoryCard } from '@/components/portfolio/category/PortfolioCategoryCard';
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
        name: 'Web Development',
        slug: 'web-development',
        description: 'Websites and web applications',
        count: 12,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '2',
        name: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'iOS and Android applications',
        count: 8,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: '3',
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'User interface and experience design',
        count: 5,
        status: 'ACTIVE',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    },
];

export default function PortfolioCategoriesPage() {
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
    const totalProjects = categories.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Portfolio Categories"
                description="Manage your portfolio project categories."
            >
                <Link href="/portfolio/categories/new">
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
                    subtitle="All portfolio categories"
                    icon={Folder}
                    color="blue"
                />
                <StatsCard
                    title="Active"
                    value={activeCategories}
                    subtitle="Visible on Portfolio"
                    icon={CheckCircle2}
                    color="green"
                />
                <StatsCard
                    title="Inactive"
                    value={inactiveCategories}
                    subtitle="Hidden from Portfolio"
                    icon={XCircle}
                    color="red"
                />
                <StatsCard
                    title="Total Projects"
                    value={totalProjects}
                    subtitle="Across all categories"
                    icon={FileText}
                    color="purple"
                />
            </StatsGrid>

            <div className="space-y-4">
                <PortfolioCategoryToolbar
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
                                    <TableHead>Projects</TableHead>
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
                                                    <Link href={`/portfolio/categories/${category.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <ConfirmDeleteModal
                                                        onConfirm={() => {
                                                            console.log('Delete category', category.id);
                                                        }}
                                                        title={`Delete ${category.name}?`}
                                                        description="Are you sure you want to delete this category? This action cannot be undone."
                                                        trigger={
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        }
                                                    />
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
                            <PortfolioCategoryCard key={category.id} category={category} />
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
