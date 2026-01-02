'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Folder } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { FAQStats } from '@/components/faq/FAQStats';
import { FAQToolbar } from '@/components/faq/FAQToolbar';
import { FAQTable } from '@/components/faq/FAQTable';
import { FAQGrid } from '@/components/faq/FAQGrid';
import { FAQ } from '@/components/faq/FAQCard';

// Mock data - replace with actual API call
const mockFAQs: FAQ[] = [
    {
        id: '1',
        question: 'How do I reset my password?',
        answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.',
        categoryId: '1',
        categoryName: 'Account',
        status: 'PUBLISHED',
        order: 1,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
        categoryId: '2',
        categoryName: 'Billing',
        status: 'PUBLISHED',
        order: 2,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-02-01T09:15:00Z'
    },
    {
        id: '3',
        question: 'Can I upgrade my plan later?',
        answer: 'Yes, you can upgrade your plan at any time from your account settings. The prorated amount will be charged immediately.',
        categoryId: '2',
        categoryName: 'Billing',
        status: 'DRAFT',
        order: 3,
        createdAt: '2024-03-10T11:20:00Z',
        updatedAt: '2024-03-10T11:20:00Z'
    },
    {
        id: '4',
        question: 'How do I contact support?',
        answer: 'You can contact our support team via email at support@example.com or use the live chat widget in the bottom right corner of the dashboard.',
        categoryId: '3',
        categoryName: 'Support',
        status: 'PUBLISHED',
        order: 4,
        createdAt: '2024-02-05T16:45:00Z',
        updatedAt: '2024-02-05T16:45:00Z'
    },
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredFAQs = mockFAQs.filter(faq => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || faq.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const publishedCount = mockFAQs.filter(f => f.status === 'PUBLISHED').length;
    const draftCount = mockFAQs.filter(f => f.status === 'DRAFT').length;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="FAQ"
                description="Manage frequently asked questions for your users."
            >
                <div className="flex gap-2">
                    <Link href="/faq/categories">
                        <Button variant="outline">
                            <Folder className="mr-2 h-4 w-4" />
                            Manage Categories
                        </Button>
                    </Link>
                    <Link href="/faq/new">
                        <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            <Plus className="h-4 w-4" />
                            New FAQ
                        </Button>
                    </Link>
                </div>
            </PageHeader>

            {/* Stats Overview */}
            <FAQStats
                totalFAQs={mockFAQs.length}
                publishedCount={publishedCount}
                draftCount={draftCount}
                totalViews={12500} // Mock data
            />

            {/* Filters */}
            <FAQToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                view={view}
                onViewChange={setView}
            />

            {/* FAQ List/Grid */}
            {view === 'grid' ? (
                <FAQGrid faqs={filteredFAQs} />
            ) : (
                <FAQTable faqs={filteredFAQs} />
            )}
        </div>
    );
}
