'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Edit,
    Trash2,
    Calendar,
    DollarSign,
    User,
    Clock,
    CheckSquare,
    AlertCircle,
    Users,
    TrendingUp,
    Folder,
    Briefcase,
    Target,
    FileText,
    Ticket,
    Plus,
    Download,
    Eye
} from 'lucide-react';
import { toast } from 'sonner';

import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/types/project.types';

// Mock data
const mockProject: Project & {
    team: { id: string; name: string; role: string; avatar?: string; status: string }[];
} = {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Complete e-commerce solution with payment integration, inventory management, and customer portal.',
    clientId: 'client-1',
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
    team: [
        { id: '1', name: 'John Doe', role: 'Lead Developer', status: 'online' },
        { id: '2', name: 'Jane Smith', role: 'UI/UX Designer', status: 'online' },
        { id: '3', name: 'Mike Johnson', role: 'Backend Developer', status: 'away' },
        { id: '4', name: 'Sarah Wilson', role: 'Frontend Developer', status: 'offline' },
    ],
};

const mockMilestones = [
    { id: '1', name: 'Project Kickoff', status: 'COMPLETED', dueDate: '2024-10-15', progress: 100 },
    { id: '2', name: 'Design Phase', status: 'COMPLETED', dueDate: '2024-11-01', progress: 100 },
    { id: '3', name: 'Frontend Development', status: 'IN_PROGRESS', dueDate: '2024-12-15', progress: 80 },
    { id: '4', name: 'Backend Integration', status: 'IN_PROGRESS', dueDate: '2025-01-01', progress: 60 },
    { id: '5', name: 'Testing & QA', status: 'PENDING', dueDate: '2025-01-10', progress: 0 },
];

function getMilestoneStatusColor(status: string) {
    switch (status) {
        case 'COMPLETED': return 'bg-green-500';
        case 'IN_PROGRESS': return 'bg-blue-500';
        default: return 'bg-gray-400';
    }
}

const mockTasks = [
    { id: '1', name: 'Setup project structure', status: 'DONE', priority: 'HIGH', assignee: 'John Doe' },
    { id: '2', name: 'Design homepage mockup', status: 'DONE', priority: 'HIGH', assignee: 'Jane Smith' },
    { id: '3', name: 'Implement authentication', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Mike Johnson' },
    { id: '4', name: 'Create product catalog', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee: 'Sarah Wilson' },
    { id: '5', name: 'Payment integration', status: 'TODO', priority: 'HIGH', assignee: 'Mike Johnson' },
    { id: '6', name: 'Mobile responsive design', status: 'TODO', priority: 'MEDIUM', assignee: 'Jane Smith' },
];

const mockDocuments = [
    { id: '1', name: 'Project Requirements.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2024-10-05', uploadedBy: 'John Doe' },
    { id: '2', name: 'Design Mockups.fig', type: 'Figma', size: '15.8 MB', uploadedAt: '2024-10-20', uploadedBy: 'Jane Smith' },
    { id: '3', name: 'API Documentation.md', type: 'Markdown', size: '156 KB', uploadedAt: '2024-11-15', uploadedBy: 'Mike Johnson' },
    { id: '4', name: 'Database Schema.sql', type: 'SQL', size: '45 KB', uploadedAt: '2024-11-20', uploadedBy: 'Mike Johnson' },
];

const mockTickets = [
    { id: '1', title: 'Login page not responsive on mobile', status: 'OPEN', priority: 'HIGH', createdAt: '2024-12-28' },
    { id: '2', title: 'Payment gateway timeout issue', status: 'IN_PROGRESS', priority: 'HIGH', createdAt: '2024-12-27' },
    { id: '3', title: 'Product images not loading', status: 'RESOLVED', priority: 'MEDIUM', createdAt: '2024-12-25' },
    { id: '4', title: 'Add search functionality', status: 'OPEN', priority: 'LOW', createdAt: '2024-12-20' },
];

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusColor(status: string) {
    switch (status) {
        case 'online': return 'bg-green-500';
        case 'away': return 'bg-yellow-500';
        default: return 'bg-gray-400';
    }
}

function getTaskStatusBadge(status: string) {
    switch (status) {
        case 'DONE': return <Badge className="bg-green-500">Done</Badge>;
        case 'IN_PROGRESS': return <Badge className="bg-blue-500">In Progress</Badge>;
        default: return <Badge variant="secondary">To Do</Badge>;
    }
}

function getTicketStatusBadge(status: string) {
    switch (status) {
        case 'RESOLVED': return <Badge className="bg-green-500">Resolved</Badge>;
        case 'IN_PROGRESS': return <Badge className="bg-blue-500">In Progress</Badge>;
        default: return <Badge className="bg-orange-500">Open</Badge>;
    }
}

const viewTips: Tip[] = [
    { icon: Edit, title: 'Quick Edit', description: 'Click Edit to update project details.' },
    { icon: Users, title: 'Team Management', description: 'Add or remove team members.' },
    { icon: CheckSquare, title: 'Track Progress', description: 'Monitor milestones and tasks.' },
];

interface ProjectDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(true);
    const [project, setProject] = useState<typeof mockProject | null>(null);
    const [documents, setDocuments] = useState(mockDocuments);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const newDoc = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type || 'Unknown',
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            uploadedAt: new Date().toISOString().split('T')[0],
            uploadedBy: 'Current User', // Replace with actual user
        };

        // Simulate upload delay
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Uploading file...',
                success: () => {
                    setDocuments((prev) => [newDoc, ...prev]);
                    return 'File uploaded successfully';
                },
                error: 'Failed to upload file',
            }
        );

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteDocument = (docId: string) => {
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
        toast.success('Document deleted successfully');
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setProject(mockProject);
            } catch (error) {
                console.error('Error fetching project:', error);
                toast.error('Failed to load project');
            } finally {
                setIsFetching(false);
            }
        };
        fetchProject();
    }, [id]);

    if (isFetching) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid gap-4 md:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-xl" />
                    ))}
                </div>
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Project not found</p>
                <Link href="/projects" className="mt-4">
                    <Button>Back to Projects</Button>
                </Link>
            </div>
        );
    }

    const formattedBudget = project.budget
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.budget)
        : 'Not set';

    const daysRemaining = project.deadline
        ? Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="view"
                title="Project"
                editingName={project.name}
                backHref="/projects"
                icon={Folder}
                stats={{
                    label1: 'Status',
                    value1: project.status,
                    label2: 'Priority',
                    value2: project.priority,
                }}
            />

            {/* Stats Row */}
            <StatsGrid>
                <StatsCard
                    title="Progress"
                    value={`${project.progress}%`}
                    icon={TrendingUp}
                    color="blue"
                    progress={project.progress}
                />
                <StatsCard
                    title="Tasks"
                    value={`${project.completedTasksCount || 0}/${project.tasksCount || 0}`}
                    subtitle={`${(project.tasksCount || 0) - (project.completedTasksCount || 0)} remaining`}
                    icon={CheckSquare}
                    color="green"
                />
                <StatsCard
                    title="Budget"
                    value={formattedBudget}
                    subtitle="Total project budget"
                    icon={DollarSign}
                    color="purple"
                />
                <StatsCard
                    title="Days Left"
                    value={daysRemaining ?? 'N/A'}
                    subtitle={daysRemaining && daysRemaining <= 7 ? 'Deadline approaching!' : 'Until deadline'}
                    subtitleClassName={daysRemaining && daysRemaining <= 7 ? 'text-orange-500 font-medium' : ''}
                    icon={Clock}
                    color="orange"
                />
            </StatsGrid>

            {/* Main Content with Tabs */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Content Section */}
                <div className="lg:col-span-8">
                    <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <CardContent className="p-6">
                            <Tabs defaultValue="milestones" className="space-y-6">
                                <TabsList className="bg-muted/50 p-1 w-full justify-start">
                                    <TabsTrigger value="milestones" className="gap-2">
                                        <Target className="h-4 w-4" />
                                        Milestones
                                    </TabsTrigger>
                                    <TabsTrigger value="tasks" className="gap-2">
                                        <CheckSquare className="h-4 w-4" />
                                        Tasks
                                    </TabsTrigger>
                                    <TabsTrigger value="documents" className="gap-2">
                                        <FileText className="h-4 w-4" />
                                        Documents
                                    </TabsTrigger>
                                    <TabsTrigger value="tickets" className="gap-2">
                                        <Ticket className="h-4 w-4" />
                                        Tickets
                                    </TabsTrigger>
                                </TabsList>

                                {/* Milestones Tab */}
                                <TabsContent value="milestones" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Project Milestones</h3>
                                        <Link href={`/projects/${id}/milestones/new`}>
                                            <Button size="sm" className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                Add Milestone
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {mockMilestones.map((milestone) => (
                                            <Card key={milestone.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`h-3 w-3 rounded-full ${getMilestoneStatusColor(milestone.status)}`} />
                                                            <div>
                                                                <span className="font-medium">
                                                                    {milestone.name}
                                                                </span>
                                                                <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-32 mb-4">
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span>Progress</span>
                                                                    <span>{milestone.progress}%</span>
                                                                </div>
                                                                <Progress value={milestone.progress} className="h-2" />
                                                            </div>
                                                            <Badge variant={milestone.status === 'COMPLETED' ? 'default' : 'secondary'}>
                                                                {milestone.status.replace('_', ' ')}
                                                            </Badge>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                                                <Edit className="h-4 w-4 text-muted-foreground" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 group">
                                                                <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-red-600" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Tasks Tab */}
                                <TabsContent value="tasks" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Project Tasks</h3>
                                        <Link href="/tasks/new">
                                            <Button size="sm" className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                Add Task
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {mockTasks.map((task) => (
                                            <Card key={task.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <CheckSquare className={`h-5 w-5 ${task.status === 'DONE' ? 'text-green-500' : 'text-muted-foreground'}`} />
                                                            <div>
                                                                <Link href={`/tasks/${task.id}`} className={`font-medium hover:text-primary transition-colors hover:underline block ${task.status === 'DONE' ? 'line-through text-muted-foreground' : ''}`}>
                                                                    {task.name}
                                                                </Link>
                                                                <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <PriorityBadge priority={task.priority} />
                                                            {getTaskStatusBadge(task.status)}
                                                            <Link href={`/tasks/${task.id}/edit`}>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                                                </Button>
                                                            </Link>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 group">
                                                                <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-red-600" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Documents Tab */}
                                <TabsContent value="documents" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Project Documents</h3>
                                        <div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <Button size="sm" className="gap-2" onClick={handleUploadClick}>
                                                <Plus className="h-4 w-4" />
                                                Upload Document
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {documents.map((doc) => (
                                            <Card key={doc.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-muted rounded-lg">
                                                                <FileText className="h-5 w-5 text-muted-foreground" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{doc.name}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary">{doc.type}</Badge>
                                                            <Button size="icon" variant="ghost">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="icon" variant="ghost">
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                                                onClick={() => handleDeleteDocument(doc.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Tickets Tab */}
                                <TabsContent value="tickets" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Project Tickets</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {mockTickets.map((ticket) => (
                                            <Card key={ticket.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <Ticket className={`h-5 w-5 ${ticket.status === 'RESOLVED' ? 'text-green-500' : 'text-orange-500'}`} />
                                                            <div>
                                                                <Link href={`/tickets/${ticket.id}`} className="font-medium hover:text-primary transition-colors hover:underline">
                                                                    {ticket.title}
                                                                </Link>
                                                                <p className="text-sm text-muted-foreground">Created: {ticket.createdAt}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <PriorityBadge priority={ticket.priority} />
                                                            {getTicketStatusBadge(ticket.status)}
                                                            <Link href={`/tickets/${ticket.id}/edit`}>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                                                </Button>
                                                            </Link>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 group">
                                                                <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-red-600" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-4 space-y-6">
                    {/* Project Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                Project Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <StatusBadge status={project.status} />
                                <PriorityBadge priority={project.priority} />
                            </div>
                            <Separator />
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Client:</span>
                                    <span className="font-medium">{project.clientName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <span className="font-medium">
                                        {project.deadline ? new Date(project.deadline).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        }) : 'No deadline'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Budget:</span>
                                    <span className="font-medium">{formattedBudget}</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Link href={`/projects/${project.id}/edit`} className="flex-1">
                                    <Button className="w-full gap-2" size="sm">
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Team Members
                                </div>
                                <Link href="/team/new">
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {project.team.map((member) => (
                                <div key={member.id} className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
