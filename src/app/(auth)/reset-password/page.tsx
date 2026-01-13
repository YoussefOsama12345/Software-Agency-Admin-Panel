'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { ResetPasswordFormData } from '@/schemas/auth.schema';

import { Suspense } from 'react';

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        try {
            // TODO: Replace with actual auth service call
            // await authService.resetPassword({ email, password: data.password });

            console.log('Reset password:', { email, password: data.password });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Password reset successful!', {
                description: 'You can now login with your new password.',
            });

            // Redirect to login page
            router.push('/login');

        } catch (error) {
            console.error('Reset password failed:', error);
            toast.error('Failed to reset password', {
                description: 'Please try again later.',
            });
            throw error;
        }
    };

    return <ResetPasswordForm email={email} onSubmit={handleResetPassword} />;
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
