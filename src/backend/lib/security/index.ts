import { JWT_SECRET } from '@/backend/config';
import { SerializeOptions } from 'cookie';
import crypto from 'crypto';
import { getIronSession, SessionOptions } from 'iron-session';
import { JWTPayload, JWTVerifyOptions, SignJWT, jwtVerify } from 'jose';
import { DateTime, Duration } from 'luxon';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface CookieStore {
    get: (name: string) => {
        name: string;
        value: string;
    } | undefined;
    set: {
        (name: string, value: string, cookie?: Partial<ResponseCookie>): void;
        (options: ResponseCookie): void;
    };
}

export const computeIronCookie = async <T extends object>(cookies: CookieStore, cookieName: string, options?: Omit<SerializeOptions, "encode">) => {
    const sessionOptions: SessionOptions = {
        password: "*4^/(e)CJ4al12w7p7L£OC(I2vL<&p~>",
        cookieName,
        ttl: options?.maxAge || Duration.fromObject({ days: 20 }).as('seconds'),
        cookieOptions: options
    }

    const cookie = await getIronSession<T>(cookies, sessionOptions);
    return cookie;
}

export const getIronSessionFromCookie = async <T extends object>(cookies: CookieStore, cookieName: string) => {
    const sessionOptions: SessionOptions = {
        password: "*4^/(e)CJ4al12w7p7L£OC(I2vL<&p~>",
        cookieName,
    }

    const session = await getIronSession<T>(cookies, sessionOptions);
    return session;
}

export const encryptJWT = async (payload: JWTPayload, duration: Duration = Duration.fromObject({ minutes: 15 })): Promise<string> => {
    const now = DateTime.now();
    const durationAsUnix = now.plus(duration).toSeconds();

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setJti(crypto.randomUUID())
        .setAudience('tupintorcba.com.ar')
        .setIssuer('tupintorcba.com.ar')
        .setExpirationTime(durationAsUnix)
        .sign(new TextEncoder().encode(JWT_SECRET));
}

export const decryptJWT = async (jwt: string, options?: JWTVerifyOptions) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET), { ...options, algorithms: ['HS256'] });
    return payload;
}