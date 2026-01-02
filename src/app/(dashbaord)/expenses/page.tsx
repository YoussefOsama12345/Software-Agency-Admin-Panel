'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Folder } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ExpenseStats } from '@/components/expenses/ExpenseStats';
import { ExpenseToolbar } from '@/components/expenses/ExpenseToolbar';
import { ExpenseGrid } from '@/components/expenses/ExpenseGrid';
import { ExpenseTable } from '@/components/expenses/ExpenseTable';
import { Expense } from '@/schemas/expense.schema';

// Mock Data
const mockExpenses: Expense[] = [
    {
        id: '1',
        title: 'AWS Monthly Bill',
        amount: 450.00,
        date: new Date('2024-03-01'),
        category: 'Software',
        description: 'Monthly cloud infrastructure costs',
        status: 'PAID',
        receipt: 'https://example.com/receipt1.pdf',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01'
    },
    {
        id: '2',
        title: 'Office Snacks',
        amount: 85.50,
        date: new Date('2024-03-05'),
        category: 'Office',
        description: 'Weekly snack refill for the team',
        status: 'APPROVED',
        receipt: 'https://example.com/receipt2.jpg',
        createdAt: '2024-03-05',
        updatedAt: '2024-03-05'
    },
    {
        id: '3',
        title: 'Client Meeting Lunch',
        amount: 120.00,
        date: new Date('2024-03-10'),
        category: 'Travel',
        description: 'Lunch with TechCorp client',
        status: 'PENDING',
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10'
    },
    {
        id: '4',
        title: 'Figma Subscription',
        amount: 15.00,
        date: new Date('2024-03-01'),
        category: 'Software',
        description: 'Design tool license',
        status: 'PAID',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01'
    },
];



export default function ExpensesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredExpenses = mockExpenses.filter(expense => {
        const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Expenses"
                description="Track and manage agency spending."
            >
                <Link href="/expenses/categories">
                    <Button variant="outline" className="gap-2">
                        <Folder className="h-4 w-4" />
                        Manage Categories
                    </Button>
                </Link>
                <Link href="/expenses/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Expense
                    </Button>
                </Link>
            </PageHeader>

            <ExpenseStats />

            <div className="space-y-4">
                <ExpenseToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    view={view}
                    onViewChange={setView}
                />

                {view === 'grid' ? (
                    <ExpenseGrid expenses={filteredExpenses} />
                ) : (
                    <ExpenseTable expenses={filteredExpenses} />
                )}
            </div>
        </div>
    );
}
