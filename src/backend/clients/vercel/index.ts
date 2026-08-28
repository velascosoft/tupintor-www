import { VERCEL_TOKEN } from '@/backend/config';
import { Vercel } from '@vercel/sdk';

export const vercel = new Vercel({
    bearerToken: VERCEL_TOKEN
})