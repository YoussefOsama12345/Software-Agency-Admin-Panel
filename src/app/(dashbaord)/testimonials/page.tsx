'use client';

import { useState } from 'react';
import Link from 'next/link';;

import { PageHeader } from '@/components/common/PageHeader';
import { TestimonialStats } from '@/components/testimonials/TestimonialStats';
import { TestimonialList, Testimonial } from '@/components/testimonials/TestimonialList';
import { TestimonialTable } from '@/components/testimonials/TestimonialTable';
import { TestimonialToolbar } from '@/components/testimonials/TestimonialToolbar';

// Mock data
const mockTestimonials: Testimonial[] = [
    {
        id: '1',
        clientName: 'Sarah Connor',
        role: 'Marketing VP',
        company: 'SkyNet Systems',
        content: 'The team delivered an exceptional platform that transformed our digital presence. The attention to detail and performance optimization was outstanding.',
        rating: 5,
        isActive: true,
        createdAt: '2023-11-01T00:00:00Z',
    },
    {
        id: '2',
        clientName: 'John McClane',
        role: 'Security Consultant',
        company: 'Nakatomi Inc.',
        content: 'Reliable, secure, and fast. Exactly what we needed for our internal systems. Support was always available when we had questions.',
        rating: 5,
        isActive: true,
        createdAt: '2023-10-15T00:00:00Z',
    },
    {
        id: '3',
        clientName: 'Ellen Ripley',
        role: 'Operations Director',
        company: 'Weyland-Yutani',
        content: 'Great design work, though we had some initial delays in the timeline. The final product is solid and works well across all devices.',
        rating: 4,
        isActive: false, // Hidden
        createdAt: '2023-09-20T00:00:00Z',
    },
];

export default function TestimonialsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);

    const filteredTestimonials = testimonials.filter(t => {
        const matchesSearch = t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.company.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'true' && t.isActive) ||
            (statusFilter === 'false' && !t.isActive);

        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Testimonials"
                description="Manage client feedback and reviews."
            >

            </PageHeader>

            {/* Stats Overview */}
            <TestimonialStats
                total={testimonials.length}
                averageRating={testimonials.reduce((acc, curr) => acc + curr.rating, 0) / (testimonials.length || 1)}
                activeCount={testimonials.filter(t => t.isActive).length}
                fiveStarCount={testimonials.filter(t => t.rating === 5).length}
                hiddenCount={testimonials.filter(t => !t.isActive).length}
            />

            {/* Toolbar */}
            <TestimonialToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                view={view}
                onViewChange={setView}
            />

            {/* Testimonials Grid / Table */}
            {view === 'grid' ? (
                <TestimonialList
                    testimonials={filteredTestimonials}
                    onDelete={handleDelete}
                />
            ) : (
                <TestimonialTable
                    testimonials={filteredTestimonials}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
