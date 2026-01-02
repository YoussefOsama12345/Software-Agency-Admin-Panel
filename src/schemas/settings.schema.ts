import { z } from 'zod';

// Profile Settings Schema (Personal Info only)
export const profileSettingsSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    avatar: z.string().optional(),
});

// Security Settings Schema (Password & Auth)
export const securitySettingsSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required').optional(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
    confirmPassword: z.string().optional(),
    twoFactorEnabled: z.boolean().optional(),
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new password",
    path: ["currentPassword"],
}).refine((data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Appearance Settings Schema
export const appearanceSettingsSchema = z.object({
    theme: z.enum(['light', 'dark', 'system']),
    fontSize: z.enum(['small', 'medium', 'large']),
    reduceMotion: z.boolean().default(false),
});

// General Site Settings Schema
export const siteSettingsSchema = z.object({
    siteName: z.string().min(1, 'Site name is required'),
    siteDescription: z.string().max(300, 'Description too long').optional(),
    contactEmail: z.string().email('Invalid contact email'),
    logo: z.string().url().optional().or(z.literal('')),
    socialLinks: z.object({
        twitter: z.string().url().optional().or(z.literal('')),
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
    }).optional(),
    maintenanceMode: z.boolean(),
});

// Social Account Schema
export const socialAccountSchema = z.object({
    id: z.string(),
    platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']),
    accountName: z.string().min(1, 'Account name is required'),
    accountId: z.string().optional(),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    isConnected: z.boolean().default(false),
    lastSync: z.string().optional(),
    expiresAt: z.string().optional(),
});

export const socialAccountsSettingsSchema = z.object({
    accounts: z.array(socialAccountSchema),
});

export type SocialAccount = z.infer<typeof socialAccountSchema>;
export type SocialAccountsSettingsData = z.infer<typeof socialAccountsSettingsSchema>;

export type ProfileSettingsData = z.infer<typeof profileSettingsSchema>;
export type SecuritySettingsData = z.infer<typeof securitySettingsSchema>;
export type AppearanceSettingsData = z.infer<typeof appearanceSettingsSchema>;
export type SiteSettingsData = z.infer<typeof siteSettingsSchema>;
