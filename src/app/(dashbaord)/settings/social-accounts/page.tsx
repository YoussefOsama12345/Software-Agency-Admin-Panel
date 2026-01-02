'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { SocialAccountsForm } from '@/components/settings/SocialAccountsForm';
import { SocialAccount } from '@/schemas/settings.schema';

// Mock data for connected accounts
const mockAccounts: SocialAccount[] = [
    {
        id: '1',
        platform: 'facebook',
        accountName: 'SoftwareAgency',
        accountId: '123456789',
        isConnected: true,
        lastSync: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
        id: '2',
        platform: 'linkedin',
        accountName: 'software-agency',
        accountId: '987654321',
        isConnected: true,
        lastSync: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
];

export default function SocialAccountsPage() {
    const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts);
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async (platform: SocialAccount['platform']) => {
        setIsLoading(true);
        try {
            // Simulate OAuth flow - in real app, redirect to OAuth provider
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newAccount: SocialAccount = {
                id: Date.now().toString(),
                platform,
                accountName: `agency_${platform}`,
                accountId: Math.random().toString(36).substr(2, 9),
                isConnected: true,
                lastSync: new Date().toISOString(),
            };

            setAccounts((prev) => [...prev, newAccount]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async (accountId: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSync = async (accountId: string) => {
        setIsLoading(true);
        try {
            // Simulate sync operation
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setAccounts((prev) =>
                prev.map((acc) =>
                    acc.id === accountId
                        ? { ...acc, lastSync: new Date().toISOString() }
                        : acc
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Social Accounts"
                description="Connect and manage your social media accounts for content publishing and analytics."
                mode="edit"
                backHref="/"
                icon={Share2}
            />
            <Separator />

            <SocialAccountsForm
                accounts={accounts}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onSync={handleSync}
                isLoading={isLoading}
            />
        </div>
    );
}

