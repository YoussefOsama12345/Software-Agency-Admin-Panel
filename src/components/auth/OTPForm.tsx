'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

import { otpSchema, type OTPFormData } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

interface OTPFormProps {
    email?: string;
    onSubmit: (data: OTPFormData) => Promise<void>;
    onResend?: () => Promise<void>;
}

export function OTPForm({ email, onSubmit, onResend }: OTPFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const form = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtpValues = [...otpValues];

        // Handle paste of full OTP
        if (value.length > 1) {
            const digits = value.slice(0, 6).split('');
            digits.forEach((digit, i) => {
                if (i < 6) newOtpValues[i] = digit;
            });
            setOtpValues(newOtpValues);
            form.setValue('otp', newOtpValues.join(''));
            inputRefs.current[Math.min(digits.length, 5)]?.focus();
            return;
        }

        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        form.setValue('otp', newOtpValues.join(''));

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < 5) {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (data: OTPFormData) => {
        try {
            setIsLoading(true);
            await onSubmit(data);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('OTP verification error:', errorMessage);
            // Clear OTP inputs on error
            setOtpValues(Array(6).fill(''));
            form.setValue('otp', '');
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!onResend || countdown > 0) return;

        try {
            setIsResending(true);
            await onResend();
            setCountdown(60); // 60 second cooldown
        } catch (error) {
            console.error('Resend OTP error:', error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <CardHeader className="space-y-4 pb-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <ShieldCheck className="w-7 h-7 text-primary-foreground" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
                    <CardDescription className="text-base">
                        We sent a 6-digit code to{' '}
                        {email ? (
                            <span className="font-medium text-foreground">{email}</span>
                        ) : (
                            'your email'
                        )}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="pb-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                        noValidate
                    >
                        {/* OTP Input */}
                        <FormField
                            control={form.control}
                            name="otp"
                            render={() => (
                                <FormItem className="space-y-4">
                                    <FormControl>
                                        <div className="flex justify-center gap-2 sm:gap-3">
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <Input
                                                    key={index}
                                                    ref={(el) => { inputRefs.current[index] = el; }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={index === 0 ? 6 : 1}
                                                    value={otpValues[index]}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                    disabled={isLoading}
                                                />
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />

                        {/* Resend Code */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Didn&apos;t receive the code?{' '}
                                {countdown > 0 ? (
                                    <span className="text-muted-foreground">
                                        Resend in {countdown}s
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={isResending}
                                        className="text-primary hover:underline font-medium disabled:opacity-50"
                                    >
                                        {isResending ? 'Sending...' : 'Resend code'}
                                    </button>
                                )}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                            disabled={isLoading || otpValues.join('').length !== 6}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify code'
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
