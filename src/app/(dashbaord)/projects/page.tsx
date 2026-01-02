'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ProjectToolbar, ProjectGrid, ProjectStats, ProjectTable } from '@/components/projects';
import { Project } from '@/types/project.types';

// Mock data for projects
const mockProjects: Project[] = [
    {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Complete e-commerce solution with payment integration, inventory management, and customer portal.',
        clientId: '1',
        clientName: 'TechCorp Inc.',
        budget: 50000,
        status: 'ACTIVE',
        priority: 'HIGH',
        deadline: '2025-01-15T00:00:00Z',
        progress: 75,
        tasksCount: 24,
        completedTasksCount: 18,
        createdAt: '2024-10-01T00:00:00Z',
        updatedAt: '2024-12-30T00:00:00Z',
    },
    {
        id: '2',
        name: 'Mobile Banking App',
        description: 'Cross-platform mobile application for banking services with biometric authentication.',
        clientId: '2',
        clientName: 'FinanceHub',
        budget: 120000,
        status: 'ACTIVE',
        priority: 'HIGH',
        deadline: '2025-01-20T00:00:00Z',
        progress: 45,
        tasksCount: 40,
        completedTasksCount: 18,
        createdAt: '2024-09-15T00:00:00Z',
        updatedAt: '2024-12-28T00:00:00Z',
    },
    {
        id: '3',
        name: 'CRM Dashboard',
        description: 'Customer relationship management dashboard with analytics and reporting features.',
        clientId: '3',
        clientName: 'SalesForce Pro',
        budget: 35000,
        status: 'ON_HOLD',
        priority: 'MEDIUM',
        deadline: '2025-02-01T00:00:00Z',
        progress: 30,
        tasksCount: 20,
        completedTasksCount: 6,
        createdAt: '2024-11-01T00:00:00Z',
        updatedAt: '2024-12-15T00:00:00Z',
    },
    {
        id: '4',
        name: 'Healthcare Portal',
        description: 'Patient portal with appointment scheduling, medical records, and telemedicine features.',
        clientId: '4',
        clientName: 'MediCare+',
        budget: 80000,
        status: 'PLANNED',
        priority: 'MEDIUM',
        deadline: '2025-03-01T00:00:00Z',
        progress: 10,
        tasksCount: 35,
        completedTasksCount: 3,
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-20T00:00:00Z',
    },
    {
        id: '5',
        name: 'Inventory Management System',
        description: 'Warehouse inventory tracking with barcode scanning and real-time stock updates.',
        clientId: '5',
        clientName: 'LogiTech Solutions',
        budget: 25000,
        status: 'COMPLETED',
        priority: 'LOW',
        deadline: '2024-12-01T00:00:00Z',
        progress: 100,
        tasksCount: 15,
        completedTasksCount: 15,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-11-30T00:00:00Z',
    },
    {
        id: '6',
        name: 'Social Media Analytics',
        description: 'Dashboard for tracking social media metrics and campaign performance.',
        clientId: '6',
        clientName: 'MarketingPro',
        budget: 18000,
        status: 'ACTIVE',
        priority: 'LOW',
        deadline: '2025-01-30T00:00:00Z',
        progress: 60,
        tasksCount: 12,
        completedTasksCount: 7,
        createdAt: '2024-11-15T00:00:00Z',
        updatedAt: '2024-12-29T00:00:00Z',
    },
];

export default function ProjectsPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    // Filter projects
    const filteredProjects = mockProjects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        console.log('Delete project:', id);
    };

    // Compute stats
    const totalProjects = mockProjects.length;
    const activeProjects = mockProjects.filter(p => p.status === 'ACTIVE').length;
    const completedProjects = mockProjects.filter(p => p.status === 'COMPLETED').length;
    const onHoldProjects = mockProjects.filter(p => p.status === 'ON_HOLD').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader
                title="Projects"
                description="Manage and track all your projects"
            >
                <Link href="/projects/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats Cards */}
            <ProjectStats
                totalProjects={totalProjects}
                activeProjects={activeProjects}
                completedProjects={completedProjects}
                onHoldProjects={onHoldProjects}
            />

            {/* Toolbar with Filters & View Toggle */}
            <ProjectToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                view={view}
                onViewChange={setView}
            />

            {/* Projects List */}
            {view === 'grid' ? (
                <ProjectGrid projects={filteredProjects} onDelete={handleDelete} />
            ) : (
                <ProjectTable projects={filteredProjects} onDelete={handleDelete} />
            )}
        </div>
    );
}
