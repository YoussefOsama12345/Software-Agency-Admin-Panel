'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Loader2, Mail, ArrowLeft, KeyRound } from 'lucide-react';

import { forgetPasswordSchema, type ForgetPasswordFormData } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

interface ForgetPasswordFormProps {
    onSubmit: (data: ForgetPasswordFormData) => Promise<void>;
}

export function ForgetPasswordForm({ onSubmit }: ForgetPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgetPasswordFormData>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const handleSubmit = async (data: ForgetPasswordFormData) => {
        try {
            setIsLoading(true);
            await onSubmit(data);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('Forget password error:', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <CardHeader className="space-y-4 pb-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <KeyRound className="w-7 h-7 text-primary-foreground" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
                    <CardDescription className="text-base">
                        Enter your email and we&apos;ll send you a verification code.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="pb-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-5"
                        noValidate
                    >
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">Email address</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Mail
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                                                aria-hidden="true"
                                            />
                                            <Input
                                                type="email"
                                                placeholder="name@company.com"
                                                autoComplete="email"
                                                className="pl-11 h-12 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                disabled={isLoading}
                                                aria-describedby="email-error"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage id="email-error" />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Sending code...
                                </>
                            ) : (
                                'Send verification code'
                            )}
                        </Button>

                        {/* Back to Login */}
                        <Link href="/login" className="block">
                            <Button variant="ghost" className="w-full h-11 text-muted-foreground">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to login
                            </Button>
                        </Link>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
