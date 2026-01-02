'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ForgetPasswordForm } from '@/components/auth/ForgetPasswordForm';
import { ForgetPasswordFormData } from '@/schemas/auth.schema';

export default function ForgetPasswordPage() {
    const router = useRouter();

    const handleForgetPassword = async (data: ForgetPasswordFormData) => {
        try {
            // TODO: Replace with actual auth service call
            // await authService.sendOTP(data);

            console.log('Sending OTP to:', data.email);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('OTP sent!', {
                description: 'Check your email for the verification code.',
            });

            // Redirect to OTP page with email
            router.push(`/otp?email=${encodeURIComponent(data.email)}`);

        } catch (error) {
            console.error('Send OTP failed:', error);
            toast.error('Failed to send OTP', {
                description: 'Please check your email address and try again.',
            });
            throw error;
        }
    };

    return <ForgetPasswordForm onSubmit={handleForgetPassword} />;
}
