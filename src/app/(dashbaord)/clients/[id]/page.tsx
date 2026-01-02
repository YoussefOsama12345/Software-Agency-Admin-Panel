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
    Mail,
    Phone,
    MapPin,
    Building,
    FileText,
    Plus,
    Download,
    Eye,
    Briefcase,
    CreditCard,
    CheckSquare,
    Globe,
    MessageSquare,
    Users,
    Ticket,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';

import { StatusBadge } from '@/components/common/StatusBadge';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock Data
const mockClient = {
    id: '1',
    name: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Blvd, Silicon Valley, CA',
    website: 'https://techcorp.com',
    industry: 'Technology',
    status: 'ACTIVE',
    totalRevenue: 150000,
    outstandingInvoices: 5,
    activeProjects: 3,
    createdAt: '2024-01-15',
    accountManager: {
        name: 'Alice Johnson',
        avatar: '/avatars/01.png',
        email: 'alice@agency.com'
    },
    activity: [
        { id: '1', action: 'started new project "E-Commerce Platform"', date: '2024-01-01', type: 'project' },
        { id: '2', action: 'completed payment for Invoice #1023', date: '2024-12-15', type: 'payment' },
        { id: '3', action: 'updated contact information', date: '2024-11-20', type: 'info' },
    ]
};

const mockProjects = [
    { id: '1', name: 'E-Commerce Platform', status: 'ACTIVE', budget: 50000, deadline: '2025-01-15', progress: 75 },
    { id: '2', name: 'Mobile App Redesign', status: 'PLANNING', budget: 25000, deadline: '2025-03-01', progress: 10 },
    { id: '3', name: 'Internal Dashboard', status: 'COMPLETED', budget: 75000, deadline: '2024-12-01', progress: 100 },
];

const mockInvoices = [
    { id: 'INV-001', amount: 12500, status: 'PAID', date: '2024-12-01', dueDate: '2024-12-15' },
    { id: 'INV-002', amount: 8000, status: 'PENDING', date: '2025-01-01', dueDate: '2025-01-15' },
    { id: 'INV-003', amount: 4500, status: 'OVERDUE', date: '2024-11-15', dueDate: '2024-11-30' },
];

const mockTickets = [
    { id: '1', title: 'Login page authentication error', status: 'OPEN', priority: 'HIGH', date: '2024-12-30' },
    { id: '2', title: 'Dashboard loading slow', status: 'IN_PROGRESS', priority: 'MEDIUM', date: '2024-12-28' },
    { id: '3', title: 'Update invoice template', status: 'RESOLVED', priority: 'LOW', date: '2024-12-15' },
];

const mockDocuments = [
    { id: '1', name: 'Service Agreement.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2024-01-15' },
    { id: '2', name: 'NDA_Signed.pdf', type: 'PDF', size: '1.2 MB', uploadedAt: '2024-01-10' },
];

function getProjectStatusColor(status: string) {
    switch (status) {
        case 'ACTIVE': return 'bg-blue-500';
        case 'COMPLETED': return 'bg-green-500';
        case 'PLANNING': return 'bg-yellow-500';
        default: return 'bg-gray-400';
    }
}

function getInvoiceStatusBadge(status: string) {
    switch (status) {
        case 'PAID': return <Badge className="bg-green-500">Paid</Badge>;
        case 'PENDING': return <Badge className="bg-yellow-500">Pending</Badge>;
        case 'OVERDUE': return <Badge className="bg-red-500">Overdue</Badge>;
        default: return <Badge variant="secondary">Draft</Badge>;
    }
}

interface ClientDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(true);
    const [client, setClient] = useState<typeof mockClient | null>(null);
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
        };

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

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteDocument = (docId: string) => {
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
        toast.success('Document deleted successfully');
    };

    useEffect(() => {
        const fetchClient = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                setClient(mockClient);
            } catch (error) {
                console.error('Error fetching client:', error);
                toast.error('Failed to load client');
            } finally {
                setIsFetching(false);
            }
        };
        fetchClient();
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

    if (!client) return <div>Client not found</div>;

    const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(client.totalRevenue);

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="view"
                title="Client"
                editingName={client.name}
                backHref="/clients"
                icon={Building}
                stats={{
                    label1: 'Status',
                    value1: client.status,
                    label2: 'Industry',
                    value2: client.industry,
                }}
            />

            <StatsGrid>
                <StatsCard
                    title="Total Revenue"
                    value={formattedRevenue}
                    icon={DollarSign}
                    color="green"
                    subtitle="Lifetime value"
                />
                <StatsCard
                    title="Active Projects"
                    value={client.activeProjects}
                    icon={Briefcase}
                    color="blue"
                    subtitle="Currently running"
                />
                <StatsCard
                    title="Outstanding"
                    value={client.outstandingInvoices}
                    icon={FileText}
                    color="orange"
                    subtitle="Unpaid invoices"
                />
                <StatsCard
                    title="Member Since"
                    value={new Date(client.createdAt).getFullYear()}
                    icon={Calendar}
                    color="purple"
                    subtitle={`Joined ${new Date(client.createdAt).toLocaleDateString()}`}
                />
            </StatsGrid>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                        <CardContent className="p-6">
                            <Tabs defaultValue="projects" className="space-y-6">
                                <TabsList className="bg-muted/50 p-1 w-full justify-start">
                                    <TabsTrigger value="projects" className="gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        Projects
                                    </TabsTrigger>
                                    <TabsTrigger value="invoices" className="gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Invoices
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

                                {/* Projects Tab */}
                                <TabsContent value="projects" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Client Projects</h3>
                                        <Link href="/projects/new">
                                            <Button size="sm" className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                New Project
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {mockProjects.map((project) => (
                                            <Card key={project.id} className="hover:shadow-md transition-all">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`h-3 w-3 rounded-full ${getProjectStatusColor(project.status)}`} />
                                                            <div>
                                                                <Link href={`/projects/${project.id}`} className="font-medium hover:text-primary transition-colors hover:underline">
                                                                    {project.name}
                                                                </Link>
                                                                <p className="text-sm text-muted-foreground">Deadline: {project.deadline}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-24">
                                                                <Progress value={project.progress} className="h-2" />
                                                            </div>
                                                            <Badge variant="outline">{project.status}</Badge>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Invoices Tab */}
                                <TabsContent value="invoices" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Invoices</h3>
                                        <Link href="/invoices/new">
                                            <Button size="sm" className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                Create Invoice
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {mockInvoices.map((invoice) => (
                                            <Card key={invoice.id}>
                                                <CardContent className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="font-medium">{invoice.id}</p>
                                                            <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
                                                        {getInvoiceStatusBadge(invoice.status)}
                                                        <Button variant="ghost" size="icon">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Tickets Tab */}
                                <TabsContent value="tickets" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Support Tickets</h3>

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
                                                                <p className="text-sm text-muted-foreground">Created: {ticket.date}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={ticket.priority === 'HIGH' ? 'destructive' : 'secondary'}>
                                                                {ticket.priority}
                                                            </Badge>
                                                            <Badge variant={ticket.status === 'RESOLVED' ? 'default' : 'outline'}>
                                                                {ticket.status}
                                                            </Badge>
                                                            <Button variant="ghost" size="icon">
                                                                <Edit className="h-4 w-4 text-muted-foreground" />
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
                                        <h3 className="text-lg font-semibold">Documents</h3>
                                        <div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <Button size="sm" className="gap-2" onClick={handleUploadClick}>
                                                <Plus className="h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {documents.map((doc) => (
                                            <Card key={doc.id}>
                                                <CardContent className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-blue-500" />
                                                        <div>
                                                            <p className="font-medium">{doc.name}</p>
                                                            <p className="text-sm text-muted-foreground">{doc.size} • {doc.uploadedAt}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
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
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Activity Tab */}
                                <TabsContent value="activity">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Recent History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-6">
                                                {client.activity.map((item, index) => (
                                                    <div key={item.id} className="flex gap-4">
                                                        <div className="relative">
                                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-background">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                            {index < client.activity.length - 1 && (
                                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" />
                                                            )}
                                                        </div>
                                                        <div className="pb-6">
                                                            <p className="text-sm">
                                                                <span className="font-medium text-foreground">TopAdmin</span>{' '}
                                                                {item.action}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {new Date(item.date).toLocaleDateString('en-US', {
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Contact Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium truncate">{client.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Phone:</span>
                                    <span className="font-medium">{client.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Website:</span>
                                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">{client.website.replace('https://', '')}</a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span className="text-muted-foreground">Address:</span>
                                    <span className="font-medium">{client.address}</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Link href={`/clients/${client.id}/edit`} className="flex-1">
                                    <Button className="w-full gap-2" size="sm">
                                        <Edit className="h-4 w-4" />
                                        Edit Client
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Account Manager
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={client.accountManager.avatar} />
                                    <AvatarFallback>{client.accountManager.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{client.accountManager.name}</p>
                                    <p className="text-xs text-muted-foreground">{client.accountManager.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
