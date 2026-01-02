'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    ExternalLink,
    MoreHorizontal,
    Share2,
    Briefcase,
    Globe,
    Eye,
    Tag,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PortfolioItem } from '@/components/portfolio/PortfolioCard';

// Mock data - replace with actual API call
const mockPortfolio: Record<string, PortfolioItem & { stats: any, tags: string[], client: string }> = {
    '1': {
        id: '1',
        title: 'FinTech Dashboard',
        description: `
            A full-scale FinTech dashboard designed to provide real-time insights into financial markets and asset performance.
            The platform enables users to monitor portfolios, analyze market trends, and track key financial metrics through interactive and highly performant data visualizations.

            The project involved building a real-time data visualization engine using D3.js integrated with React for dynamic chart rendering.
            A modular frontend architecture was implemented to support scalability and maintainability, with reusable components and a clean state management approach.

            On the backend, secure REST APIs were developed to aggregate and normalize data from multiple banking and financial data providers.
            The system includes authentication and authorization mechanisms, role-based access control, and secure token handling to meet financial compliance requirements.

            Performance optimization techniques such as memoization, lazy loading, and efficient data caching were applied to ensure smooth user experience even with large datasets.
            Special attention was given to security, data integrity, and error handling, making the platform suitable for enterprise-level financial applications.
  `,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        link: 'https://example.com/fintech',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        client: 'FinCorp Global',
        tags: [
            'React',
            'TypeScript',
            'D3.js',
            'Node.js',
            'Express',
            'REST APIs',
            'Authentication',
            'Role-Based Access Control',
            'Data Visualization',
            'FinTech',
            'Security'
        ],
        stats: {
            views: 12450,
            likes: 856,
            duration: '3 months'
        }
    },
    '2': {
        id: '2',
        title: 'Travel Agency Website',
        description: 'Modern travel booking platform with real-time flight data and hotel reservations. Features include a custom booking engine, interactive maps, and a user-friendly itinerary planner.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        link: 'https://example.com/travel',
        createdAt: '2024-02-10T14:30:00Z',
        updatedAt: '2024-02-10T14:30:00Z',
        client: 'Wanderlust Travels',
        tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'Maps API'],
        stats: {
            views: 8900,
            likes: 642,
            duration: '2 months'
        }
    },
};

export default function PortfolioViewPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [isFetching, setIsFetching] = useState(true);
    const [item, setItem] = useState<(typeof mockPortfolio)[string] | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = mockPortfolio[id];
                setItem(data || null);
            } catch (error) {
                console.error('Error fetching project:', error);
                toast.error('Failed to load project');
            } finally {
                setIsFetching(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            toast.success('Project deleted successfully');
            router.push('/portfolio');
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-[300px] w-full rounded-2xl" />
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-40 w-full rounded-xl" />
                        <Skeleton className="h-20 w-full rounded-xl" />
                    </div>
                    <div>
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Project not found</p>
                <Link href="/portfolio" className="mt-4">
                    <Button>Back to Portfolio</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Image Section */}
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/portfolio">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background text-foreground">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
                    <div className="text-white space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                {item.client}
                            </Badge>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(item.createdAt).getFullYear()}
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        {item.link && (
                            <Button asChild variant="secondary" className="gap-2 shadow-lg">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4" />
                                    Visit Live Site
                                </a>
                            </Button>
                        )}
                        <Link href={`/portfolio/${id}/edit`}>
                            <Button size="icon" variant="secondary" className="shadow-lg">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="secondary" className="shadow-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Project</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4">
                                {item.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Screenshots or Details could go here */}
                </div>

                {/* Right: Sidebar Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Project Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Eye className="h-4 w-4" />
                                    <span>Total Views</span>
                                </div>
                                <span className="font-medium">{item.stats.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Briefcase className="h-4 w-4" />
                                    <span>Client</span>
                                </div>
                                <span className="font-medium">{item.client}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Duration</span>
                                </div>
                                <span className="font-medium">{item.stats.duration}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <ArrowUpRight className="h-4 w-4 text-primary" />
                                Pro Tip
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Sharing your portfolio projects on social media can increase views by 40%.
                            </p>
                            <Button variant="outline" size="sm" className="w-full mt-4 bg-background">
                                Share Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
