import { FolderKanban, CheckSquare, Ticket, Users } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import {
    RecentProjects,
    UpcomingDeadlines,
    RecentMessages
} from '@/components/dashboard';

// Mock data for dashboard
const recentProjects = [
    { id: '1', name: 'E-Commerce Platform', client: 'TechCorp Inc.', status: 'ACTIVE', progress: 75 },
    { id: '2', name: 'Mobile Banking App', client: 'FinanceHub', status: 'ACTIVE', progress: 45 },
    { id: '3', name: 'CRM Dashboard', client: 'SalesForce Pro', status: 'ON_HOLD', progress: 30 },
    { id: '4', name: 'Healthcare Portal', client: 'MediCare+', status: 'PLANNED', progress: 10 },
];

const recentMessages = [
    { id: '1', name: 'John Smith', subject: 'Project Inquiry', time: '2 hours ago', isRead: false },
    { id: '2', name: 'Sarah Johnson', subject: 'Partnership Proposal', time: '5 hours ago', isRead: false },
    { id: '3', name: 'Mike Davis', subject: 'Website Quote', time: '1 day ago', isRead: true },
];

const upcomingDeadlines = [
    { id: '1', name: 'E-Commerce Launch', date: 'Jan 15, 2025', daysLeft: 15 },
    { id: '2', name: 'Mobile App Beta', date: 'Jan 20, 2025', daysLeft: 20 },
    { id: '3', name: 'CRM Phase 1', date: 'Feb 1, 2025', daysLeft: 32 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Welcome back! Here's an overview of your agency."
            />

            <StatsGrid>
                <StatsCard
                    title="Active Projects"
                    value="12"
                    subtitle="+2 from last month"
                    icon={FolderKanban}
                    color="blue"
                    href="/projects"
                />
                <StatsCard
                    title="Open Tasks"
                    value="48"
                    subtitle="-5 completed today"
                    icon={CheckSquare}
                    color="green"
                    href="/tasks"
                />
                <StatsCard
                    title="Total Clients"
                    value="24"
                    subtitle="+1 this month"
                    icon={Users}
                    color="purple"
                    href="/clients"
                />
                <StatsCard
                    title="Pending Tickets"
                    value="8"
                    subtitle="+3 new tickets"
                    icon={Ticket}
                    color="orange"
                    href="/tickets"
                />
            </StatsGrid>

            <div className="grid gap-6 lg:grid-cols-3">
                <RecentProjects projects={recentProjects} className="lg:col-span-2" />
                <UpcomingDeadlines deadlines={upcomingDeadlines} />
            </div>

            <RecentMessages messages={recentMessages} />
        </div>
    );
}
