import { z } from 'zod';


const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .trim();

export const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .trim()
});


export const forgetPasswordSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .trim()
        .max(128, 'Email must be less than 128 characters')
        .toLowerCase(),
});

export const otpSchema = z.object({
    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/),
});


export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });


export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),

    newPassword: passwordSchema,

    confirmPassword: z.string().min(1, 'Confirm password is required'),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });


export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ChangeProfileFormData = z.infer<typeof changePasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;