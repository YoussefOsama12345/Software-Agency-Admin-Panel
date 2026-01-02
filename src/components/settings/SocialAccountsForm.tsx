'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
    Music2,
    RefreshCw,
    Unplug,
    Link2,
    CheckCircle2,
    XCircle,
    Clock,
} from 'lucide-react';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialAccount } from '@/schemas/settings.schema';

interface SocialAccountsFormProps {
    readonly accounts: SocialAccount[];
    readonly onConnect: (platform: SocialAccount['platform']) => Promise<void>;
    readonly onDisconnect: (accountId: string) => Promise<void>;
    readonly onSync: (accountId: string) => Promise<void>;
    readonly isLoading?: boolean;
}

const platformConfig = {
    facebook: {
        name: 'Facebook',
        icon: RiFacebookFill,
        color: 'bg-blue-600',
        description: 'Connect your Facebook Page to schedule posts and view analytics.',
    },
    instagram: {
        name: 'Instagram',
        icon: RiInstagramFill,
        color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
        description: 'Connect your Instagram Business account for content management.',
    },
    twitter: {
        name: 'X',
        icon: RiTwitterXFill,
        color: 'bg-black',
        description: 'Connect your X account to schedule posts and track engagement.',
    },
    linkedin: {
        name: 'LinkedIn',
        icon: RiLinkedinFill,
        color: 'bg-blue-700',
        description: 'Connect your LinkedIn Page to manage and share professional content.',
    },
    tiktok: {
        name: 'TikTok',
        icon: Music2,
        color: 'bg-black',
        description: 'Connect your TikTok Business account to manage video content.',
    },
    youtube: {
        name: 'YouTube',
        icon: RiYoutubeFill,
        color: 'bg-red-600',
        description: 'Connect your YouTube channel for video publishing and analytics.',
    },
};

const platforms: SocialAccount['platform'][] = ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube'];

export function SocialAccountsForm({
    accounts,
    onConnect,
    onDisconnect,
    onSync,
    isLoading = false,
}: SocialAccountsFormProps) {
    const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

    const getAccountByPlatform = (platform: SocialAccount['platform']) => {
        return accounts.find((acc) => acc.platform === platform);
    };

    const handleConnect = async (platform: SocialAccount['platform']) => {
        setLoadingPlatform(platform);
        try {
            await onConnect(platform);
            toast.success(`${platformConfig[platform].name} connected successfully`);
        } catch (error) {
            console.error(`Failed to connect ${platformConfig[platform].name}:`, error);
            toast.error(`Failed to connect ${platformConfig[platform].name}`);
        } finally {
            setLoadingPlatform(null);
        }
    };

    const handleDisconnect = async (accountId: string, platform: SocialAccount['platform']) => {
        setLoadingPlatform(platform);
        try {
            await onDisconnect(accountId);
            toast.success(`${platformConfig[platform].name} disconnected`);
        } catch (error) {
            console.error(`Failed to disconnect ${platformConfig[platform].name}:`, error);
            toast.error(`Failed to disconnect ${platformConfig[platform].name}`);
        } finally {
            setLoadingPlatform(null);
        }
    };

    const handleSync = async (accountId: string, platform: SocialAccount['platform']) => {
        setLoadingPlatform(platform);
        try {
            await onSync(accountId);
            toast.success(`${platformConfig[platform].name} synced successfully`);
        } catch (error) {
            console.error(`Failed to sync ${platformConfig[platform].name}:`, error);
            toast.error(`Failed to sync ${platformConfig[platform].name}`);
        } finally {
            setLoadingPlatform(null);
        }
    };

    const formatLastSync = (lastSync?: string) => {
        if (!lastSync) return 'Never synced';
        const date = new Date(lastSync);
        return date.toLocaleString();
    };

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {platforms.map((platform) => {
                const config = platformConfig[platform];
                const account = getAccountByPlatform(platform);
                const Icon = config.icon;
                const isPlatformLoading = loadingPlatform === platform;

                return (
                    <Card key={platform} className="relative overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${config.color}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{config.name}</CardTitle>
                                        {account?.isConnected && account.accountName && (
                                            <p className="text-sm text-muted-foreground">
                                                @{account.accountName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Badge
                                    variant={account?.isConnected ? 'default' : 'secondary'}
                                    className="gap-1"
                                >
                                    {account?.isConnected ? (
                                        <>
                                            <CheckCircle2 className="h-3 w-3" />
                                            Connected
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-3 w-3" />
                                            Not Connected
                                        </>
                                    )}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <CardDescription>{config.description}</CardDescription>

                            {account?.isConnected && account.lastSync && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    Last synced: {formatLastSync(account.lastSync)}
                                </div>
                            )}

                            <div className="flex gap-2">
                                {account?.isConnected ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSync(account.id, platform)}
                                            disabled={isLoading || isPlatformLoading}
                                        >
                                            <RefreshCw
                                                className={`mr-2 h-4 w-4 ${isPlatformLoading ? 'animate-spin' : ''}`}
                                            />
                                            Sync
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDisconnect(account.id, platform)}
                                            disabled={isLoading || isPlatformLoading}
                                        >
                                            <Unplug className="mr-2 h-4 w-4" />
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={() => handleConnect(platform)}
                                        disabled={isLoading || isPlatformLoading}
                                    >
                                        <Link2 className="mr-2 h-4 w-4" />
                                        Connect {config.name}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

