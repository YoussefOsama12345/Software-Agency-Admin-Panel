'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Folder } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { PortfolioStats } from '@/components/portfolio/PortfolioStats';
import { PortfolioToolbar } from '@/components/portfolio/PortfolioToolbar';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PortfolioTable } from '@/components/portfolio/PortfolioTable';
import { PortfolioItem } from '@/components/portfolio/PortfolioCard';

// Mock data - replace with actual API call
const mockPortfolio: PortfolioItem[] = [
    {
        id: '1',
        title: 'FinTech Dashboard',
        description: 'A comprehensive financial dashboard for analyzing market trends and managing assets.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        link: 'https://example.com/fintech',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        title: 'Travel Agency Website',
        description: 'Modern travel booking platform with real-time flight data and hotel reservations.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        link: 'https://example.com/travel',
        createdAt: '2024-02-10T14:30:00Z',
        updatedAt: '2024-02-10T14:30:00Z'
    },
    {
        id: '3',
        title: 'Healthcare App',
        description: 'Patient management system for clinics to streamline appointments and records.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
        createdAt: '2024-03-05T09:15:00Z',
        updatedAt: '2024-03-05T09:15:00Z'
    },
    {
        id: '4',
        title: 'E-Learning Platform',
        description: 'Interactive learning management system with video courses and quizzes.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop',
        link: 'https://example.com/elearning',
        createdAt: '2024-03-20T11:20:00Z',
        updatedAt: '2024-03-20T11:20:00Z'
    },
];

export default function PortfolioPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredItems = mockPortfolio.filter(item => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Portfolio"
                description="Manage your project showcase and case studies."
            >
                <Link href="/portfolio/categories">
                    <Button variant="outline" className="gap-2">
                        <Folder className="h-4 w-4" />
                        Manage Categories
                    </Button>
                </Link>
                <Link href="/portfolio/new">
                    <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="h-4 w-4" />
                        New Project
                    </Button>
                </Link>

            </PageHeader>

            {/* Stats Overview */}
            <PortfolioStats
                totalProjects={mockPortfolio.length}
                totalViews={45000} // Mock data
            />

            {/* Toolbar */}
            <PortfolioToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                view={view}
                onViewChange={setView}
            />

            {/* Portfolio Grid/Table */}
            {view === 'grid' ? (
                <PortfolioGrid items={filteredItems} />
            ) : (
                <PortfolioTable items={filteredItems} />
            )}
        </div>
    );
}

