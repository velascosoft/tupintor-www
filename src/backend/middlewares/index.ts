import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { Middleware } from "@velascosoftware/next-api-router";
import { ZodSchema } from "zod";
import { cookies } from "next/headers";
import { getIronSessionFromCookie } from "@/backend/lib/security";
import { getParsedBody, getParsedQuery } from "@/backend/lib/http";
import { logger } from "@/backend/lib/logger";

const log = logger.child({ module: "middlewares" });

export const SESSION_COOKIE = "tp_session" as const;

export type SessionData = {
    user?: {
        id: string,
        sub: string,
        role: 'guest' | 'admin'
    }
}

export const requireAuthentication = (): Middleware => {
    return async (req, _ctx, next) => {
        const cookiez = await cookies();
        if (!cookiez.has(SESSION_COOKIE)) {
            return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED });
        }

        try {
            const { user } = await getIronSessionFromCookie<SessionData>(cookiez, SESSION_COOKIE);

            if (!user) {
                return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED });
            }

            const { id: sessionId, sub: userId, role: userRole } = user;

            req.__validatedAuth = {
                id: sessionId,
                user: {
                    id: userId,
                    role: userRole
                }
            };

            return next();

        } catch (err: unknown) {
            log.error("m=requireAuthentication : A error occurred ", err);
            cookiez.delete(SESSION_COOKIE);
            return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED });
        }
    }
}

export const validateRequestBody = <T>(schema: ZodSchema<T>): Middleware => {
    return async (req, _ctx, next) => {
        try {
            const body = await getParsedBody<T>(req);
            const parsed = await schema.safeParseAsync(body);

            if (!parsed.success) {
                return NextResponse.json(
                    { success: false, message: parsed.error.errors },
                    { status: StatusCodes.BAD_REQUEST }
                );
            }
            req.__validatedBody = parsed.data;
            return next();
        } catch (err: unknown) {
            return NextResponse.json({ success: false, message: "Invalid or empty request body" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }
    }
};

export const validateRequestQuery = <T>(schema: ZodSchema<T>): Middleware => async (req, _ctx, next) => {
    try {
        const query = await getParsedQuery<T>(req);
        const parsed = await schema.safeParseAsync(query);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, message: parsed.error.errors },
                { status: StatusCodes.BAD_REQUEST }
            );
        }
        req.__validatedQuery = parsed.data;
        return next();
    } catch (err: unknown) {
        return NextResponse.json({ success: false, message: "Invalid or empty request params" },
            { status: StatusCodes.BAD_REQUEST }
        );
    }
}