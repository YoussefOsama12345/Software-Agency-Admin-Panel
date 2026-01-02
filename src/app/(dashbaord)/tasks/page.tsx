'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/PageHeader';
import { TaskStats } from '@/components/tasks/TaskStats';
import { TaskToolbar } from '@/components/tasks/TaskToolbar';
import { TaskGrid } from '@/components/tasks/TaskGrid';
import { TaskTable } from '@/components/tasks/TaskTable';
import { Task } from '@/schemas/task.schema';

// Mock data - replace with actual API call
const mockTasks: Task[] = [
    {
        id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        name: 'Design homepage wireframes',
        description: 'Create initial wireframes for the new homepage redesign.',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: '2025-01-05T00:00:00Z',
        projectId: 'p1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        assignedTo: { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com' },
        createdAt: '2024-12-28T10:00:00Z',
        updatedAt: '2024-12-28T10:00:00Z',
    },
    {
        id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
        name: 'Implement user authentication',
        description: 'Set up JWT-based authentication with refresh tokens.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: '2025-01-03T00:00:00Z',
        projectId: 'p2',
        project: { id: 'p2', name: 'Mobile App' },
        assignedTo: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-12-27T14:30:00Z',
        updatedAt: '2024-12-29T09:15:00Z',
    },
    {
        id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
        name: 'Write API documentation',
        description: 'Document all endpoints using OpenAPI/Swagger.',
        status: 'DONE',
        priority: 'MEDIUM',
        projectId: 'p4',
        project: { id: 'p4', name: 'API Development' },
        assignedTo: { id: 'u3', fullName: 'Mike Johnson', email: 'mike@example.com' },
        createdAt: '2024-12-26T08:45:00Z',
        updatedAt: '2024-12-27T11:20:00Z',
    },
    {
        id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
        name: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '2025-01-10T00:00:00Z',
        projectId: 'p3',
        project: { id: 'p3', name: 'Admin Dashboard' },
        assignedTo: null,
        createdAt: '2024-12-30T16:00:00Z',
        updatedAt: '2024-12-30T16:00:00Z',
    },
    {
        id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
        name: 'Review pull requests',
        description: 'Review and merge pending PRs from the team.',
        status: 'IN_PROGRESS',
        priority: 'LOW',
        projectId: 'p1',
        project: { id: 'p1', name: 'E-Commerce Platform' },
        assignedTo: { id: 'u4', fullName: 'Sarah Wilson', email: 'sarah@example.com' },
        createdAt: '2024-12-25T12:00:00Z',
        updatedAt: '2024-12-29T18:30:00Z',
    },
    {
        id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
        name: 'Database optimization',
        description: 'Optimize slow queries and add necessary indexes.',
        status: 'DONE',
        priority: 'HIGH',
        projectId: 'p4',
        project: { id: 'p4', name: 'API Development' },
        assignedTo: { id: 'u1', fullName: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-12-20T10:00:00Z',
        updatedAt: '2024-12-24T15:45:00Z',
    },
];

export default function TasksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [view, setView] = useState<'grid' | 'list'>('list');

    const filteredTasks = mockTasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Calculate stats
    const todoCount = mockTasks.filter(t => t.status === 'TODO').length;
    const inProgressCount = mockTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const doneCount = mockTasks.filter(t => t.status === 'DONE').length;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <PageHeader
                title="Tasks"
                description="Manage and track your project tasks."
            >
                <Link href="/tasks/new">
                    <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="h-4 w-4" />
                        New Task
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats Overview */}
            <TaskStats
                todoCount={todoCount}
                inProgressCount={inProgressCount}
                doneCount={doneCount}
                totalCount={mockTasks.length}
            />

            {/* Toolbar */}
            <TaskToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                view={view}
                onViewChange={setView}
            />

            {/* Tasks Grid/Table */}
            {view === 'grid' ? (
                <TaskGrid tasks={filteredTasks} />
            ) : (
                <TaskTable tasks={filteredTasks} />
            )}
        </div>
    );
}
