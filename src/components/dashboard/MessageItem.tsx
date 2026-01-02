import Link from 'next/link';
import { MessageSquare, FileText } from 'lucide-react';

interface MessageItemProps {
    id: string;
    name: string;
    subject: string;
    time: string;
    isRead: boolean;
}

export function MessageItem({ id, name, subject, time, isRead }: MessageItemProps) {
    return (
        <Link href={`/messages/${id}`} className="block">
            <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors ${!isRead ? 'bg-primary/5' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        {!isRead && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className={`text-sm ${!isRead ? 'font-semibold' : 'font-medium'}`}>
                                {name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                                {time}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{subject}</p>
                    </div>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
        </Link>
    );
}
