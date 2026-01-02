import { Header } from '@/components/common/Header';
import { AppSidebar } from '@/components/common/Sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content Area */}
            <SidebarInset>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
