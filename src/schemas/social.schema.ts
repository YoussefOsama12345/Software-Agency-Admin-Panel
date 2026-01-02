import { z } from 'zod';

// Platform types
export const platformEnum = z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']);
export type Platform = z.infer<typeof platformEnum>;

// Post status types
export const postStatusEnum = z.enum(['draft', 'scheduled', 'pending_approval', 'approved', 'published', 'failed', 'rejected']);
export type PostStatus = z.infer<typeof postStatusEnum>;

// Social Post Schema
export const socialPostSchema = z.object({
    id: z.string(),
    content: z.string().min(1, 'Content is required'),
    platforms: z.array(platformEnum).min(1, 'Select at least one platform'),
    mediaUrls: z.array(z.string()).optional(),
    hashtags: z.array(z.string()).optional(),
    scheduledAt: z.string().optional(),
    publishedAt: z.string().optional(),
    status: postStatusEnum,
    authorId: z.string(),
    authorName: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
    rejectionReason: z.string().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Create Post Schema (for forms)
export const createPostSchema = z.object({
    content: z.string().min(1, 'Content is required').max(2200, 'Content too long'),
    platforms: z.array(platformEnum).min(1, 'Select at least one platform'),
    mediaUrls: z.array(z.string()).optional(),
    hashtags: z.array(z.string()).optional(),
    scheduledAt: z.string().optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
});

// Social Analytics Schema
export const socialAnalyticsSchema = z.object({
    platform: platformEnum,
    followers: z.number(),
    followersChange: z.number(),
    engagement: z.number(),
    engagementChange: z.number(),
    reach: z.number(),
    reachChange: z.number(),
    impressions: z.number(),
    impressionsChange: z.number(),
    posts: z.number(),
    clicks: z.number(),
    period: z.string(),
});

// Calendar Event Schema (for calendar view)
export const calendarEventSchema = z.object({
    id: z.string(),
    title: z.string(),
    start: z.string(),
    end: z.string().optional(),
    platform: platformEnum,
    status: postStatusEnum,
    postId: z.string(),
});

export type SocialPost = z.infer<typeof socialPostSchema>;
export type CreatePostData = z.infer<typeof createPostSchema>;
export type SocialAnalytics = z.infer<typeof socialAnalyticsSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;

