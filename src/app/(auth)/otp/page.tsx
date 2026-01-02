'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { OTPForm } from '@/components/auth/OTPForm';
import { OTPFormData } from '@/schemas/auth.schema';

import { Suspense } from 'react';

function OTPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const handleVerifyOTP = async (data: OTPFormData) => {
        try {
            // TODO: Replace with actual auth service call
            // await authService.verifyOTP({ email, otp: data.otp });

            console.log('OTP verification:', { email, otp: data.otp });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Code verified!', {
                description: 'Redirecting to reset password...',
            });

            // Redirect to reset password page with email
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);

        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error('Invalid code', {
                description: 'Please check your code and try again.',
            });
            throw error;
        }
    };

    const handleResendOTP = async () => {
        try {
            // TODO: Replace with actual auth service call
            // await authService.resendOTP({ email });

            console.log('Resend OTP to:', email);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Code sent!', {
                description: 'A new verification code has been sent to your email.',
            });

        } catch (error) {
            console.error('Resend OTP failed:', error);
            toast.error('Failed to resend code', {
                description: 'Please try again later.',
            });
            throw error;
        }
    };

    return (
        <OTPForm
            email={email}
            onSubmit={handleVerifyOTP}
            onResend={handleResendOTP}
        />
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OTPContent />
        </Suspense>
    );
}
