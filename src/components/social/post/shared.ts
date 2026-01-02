import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { Music2 } from 'lucide-react';
import { Platform } from '@/schemas/social.schema';

export interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    replies?: Comment[];
}

export interface PlatformStats {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
}

export const platformIcons: Record<Platform, React.ComponentType<{ className?: string }>> = {
    facebook: RiFacebookFill,
    instagram: RiInstagramFill,
    twitter: RiTwitterXFill,
    linkedin: RiLinkedinFill,
    tiktok: Music2,
    youtube: RiYoutubeFill,
};

export const platformColors: Record<Platform, string> = {
    facebook: 'bg-blue-600',
    instagram: 'bg-pink-500',
    twitter: 'bg-black',
    linkedin: 'bg-blue-700',
    tiktok: 'bg-black',
    youtube: 'bg-red-600',
};

export const platformTextColors: Record<Platform, string> = {
    facebook: 'text-blue-600',
    instagram: 'text-pink-500',
    twitter: 'text-black',
    linkedin: 'text-blue-700',
    tiktok: 'text-black',
    youtube: 'text-red-600',
};

export interface Post {
    id: string;
    content: string;
    platforms: Platform[];
    hashtags: string[];
    status: string;
    scheduledAt: string;
    authorName: string;
    createdAt: string;
    platformData: Record<string, { stats: PlatformStats; comments: Comment[] }>;
}
