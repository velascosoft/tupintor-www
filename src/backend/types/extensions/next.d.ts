// next.d.ts
import { NextRequest } from 'next/server';

declare module 'next/server' {
    interface NextRequest {
        __validatedQuery?: T;
        __validatedBody?: T;
        __validatedAuth?: SessionData;
        __cart?: CartData;
    }
}