'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoginForm } from '@/components/auth/LoginForm';
import { LoginFormData } from '@/schemas/auth.schema';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (data: LoginFormData) => {
        try {
            // TODO: Replace with actual auth service call
            // const response = await authService.login(data);

            console.log('Login attempt:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            toast.success('Login successful!', {
                description: 'Redirecting to dashboard...',
            });

            // Redirect to dashboard
            router.push('/');

        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed', {
                description: 'Invalid email or password. Please try again.',
            });
            throw error;
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
}
