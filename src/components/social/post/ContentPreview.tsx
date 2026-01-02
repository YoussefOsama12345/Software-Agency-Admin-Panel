import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Platform } from '@/schemas/social.schema';
import { Post, platformColors, platformTextColors, platformIcons } from './shared';

interface ContentPreviewProps {
    post: Post;
    selectedPlatform: Platform;
}

export function ContentPreview({ post, selectedPlatform }: ContentPreviewProps) {
    const CurrentPlatformIcon = platformIcons[selectedPlatform];
    const color = platformColors[selectedPlatform];
    const textColor = platformTextColors[selectedPlatform];

    return (
        <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-center gap-3 mb-4">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white", color)}>
                    <CurrentPlatformIcon className="h-5 w-5" />
                </div>
                <div>
                    <p className="font-medium text-sm">Software Agency</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(post.createdAt), 'PPP')}</p>
                </div>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>

            {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                    {post.hashtags.map((tag) => (
                        <span key={tag} className={cn("text-sm hover:underline cursor-pointer", textColor)}>
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
