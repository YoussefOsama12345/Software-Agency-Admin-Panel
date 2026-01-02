import { z } from 'zod';

export const LanguageEnum = z.enum(['en', 'ar']);
export type LanguageType = z.infer<typeof LanguageEnum>;
