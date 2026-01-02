'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { TeamStats } from '@/components/team/TeamStats';
import { TeamToolbar } from '@/components/team/TeamToolbar';
import { TeamGrid } from '@/components/team/TeamGrid';
import { TeamMember } from '@/components/team/TeamCard';

// Mock data - replace with actual API call
const mockTeam: TeamMember[] = [
    {
        id: '1',
        name: 'Alex Johnson',
        position: 'Lead Frontend Developer',
        bio: 'Passionate about React ecosystem and creating intuitive user experiences. 5+ years of experience in modern web development.',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        x: 'https://x.com',
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: '2023-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Sarah Williams',
        position: 'Product Designer',
        bio: 'Creative designer with a focus on accessibility and clean UI patterns. Loves typography and micro-interactions.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
        createdAt: '2023-03-10T14:30:00Z',
        updatedAt: '2023-03-10T14:30:00Z'
    },
    {
        id: '3',
        name: 'Michael Brown',
        position: 'Backend Engineer',
        bio: 'Specialized in scalable architecture and cloud infrastructure. Expert in Node.js, Python, and AWS.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
        github: 'https://github.com',
        createdAt: '2023-02-05T09:15:00Z',
        updatedAt: '2023-02-05T09:15:00Z'
    },
    {
        id: '4',
        name: 'Emily Davis',
        position: 'Project Manager',
        bio: 'Organized and detail-oriented PM ensuring timely delivery and team happiness. Agile enthusiast.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop',
        linkedin: 'https://linkedin.com',
        x: 'https://twitter.com',
        createdAt: '2023-04-20T11:20:00Z',
        updatedAt: '2023-04-20T11:20:00Z'
    },
];

import { TeamTable } from '@/components/team/TeamTable';

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredMembers = mockTeam.filter(member => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.bio.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Team"
                description="Manage your team members and their roles."
            >
                <Link href="/team/new">
                    <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="h-4 w-4" />
                        Add Member
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats Overview */}
            <TeamStats
                totalMembers={mockTeam.length}
                activeMembers={3} // Mock data
                newMembers={1} // Mock data
                departments={4} // Mock data
            />

            {/* Toolbar */}
            <TeamToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                view={view}
                onViewChange={setView}
            />

            {/* Team Grid / Table */}
            {view === 'grid' ? (
                <TeamGrid members={filteredMembers} />
            ) : (
                <TeamTable members={filteredMembers} />
            )}
        </div>
    );
}
