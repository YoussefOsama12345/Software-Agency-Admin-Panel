'use client';

import { useState } from 'react';
import { Mail, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/common/PageHeader';
import { MessageList, MessageDetail } from '@/components/messages/MessageList';
import { Message } from '@/schemas/message.schema';
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

// Mock data
const mockMessages: Message[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        subject: 'Project Inquiry',
        message: 'Hi, I am interested in your web development services. Can we schedule a call to discuss my project?',
        isRead: false,
        createdAt: '2023-10-25T09:00:00Z',
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        subject: 'Partnership Opportunity',
        message: 'Hello, I represent a digital marketing agency and we are looking for a tech partner. Would you be open to a collaboration?',
        isRead: true,
        createdAt: '2023-10-24T14:30:00Z',
    },
    {
        id: '3',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        subject: 'Bug Report',
        message: 'I found a small issue on your portfolio page. The image gallery doesn\'t load on mobile vertically.',
        isRead: true,
        createdAt: '2023-10-23T11:15:00Z',
    },
];

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectMessage = (message: Message) => {
        setSelectedMessage(message);
        // Mark as read logic would go here
        if (!message.isRead) {
            setMessages(prev => prev.map(m => m.id === message.id ? { ...m, isRead: true } : m));
        }
    };

    const handleDeleteMessage = (id: string) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage?.id === id) {
            setSelectedMessage(null);
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex items-center justify-between px-2">
                <PageHeader
                    title="Messages"
                    description="View and manage contact form submissions."
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 border rounded-lg overflow-hidden bg-background shadow-sm">
                <div className="flex h-full">
                    {/* Sidebar List (Mobile/Desktop adaptable) */}
                    <div className="w-full md:w-[350px] lg:w-[400px] border-r flex flex-col bg-muted/10">
                        <div className="p-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search messages..."
                                    className="pl-9 bg-background"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <MessageList
                            messages={filteredMessages}
                            selectedId={selectedMessage?.id}
                            onSelect={handleSelectMessage}
                            onDelete={handleDeleteMessage}
                        />
                    </div>

                    {/* Detail View (Hidden on mobile if list shown - handled by CSS usually, but here fixed for desktop) */}
                    <div className="flex-1 hidden md:block h-full bg-background/50">
                        <MessageDetail
                            message={selectedMessage}
                            onDelete={handleDeleteMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
