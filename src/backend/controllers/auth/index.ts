import { ApiRouteController, RequestMapping, Use } from "@velascosoftware/next-api-router";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { logger } from "@/backend/lib/logger";
import { requireAuthentication, SESSION_COOKIE } from "@/backend/middlewares";
import { computeIronCookie, getIronSessionFromCookie } from "@/backend/lib/security";
import { isNullOrEmpty } from "@/backend/utils/stringUtils";
import { Duration } from "luxon";
import { uuidv7 } from "uuidv7";
import { loginUser, updatePassword } from "@/backend/services/auth";

type SessionData = {
    user?: {
        id: string,
        sub: string,
        role: 'guest' | 'admin'
    }
}

const log = logger.child({ module: "auth-controller " });

export class AuthController implements ApiRouteController {

    @RequestMapping("/login", "POST")
    async login(req: NextRequest): Promise<NextResponse<ApiResponse<void>>> {
        try {
            const cookiez = await cookies();

            if (cookiez.has(SESSION_COOKIE)) {
                const session = await getIronSessionFromCookie<SessionData>(cookiez, SESSION_COOKIE);

                if (!session.user || isNullOrEmpty(session.user.id) || isNullOrEmpty(session.user.sub)) {
                    session.destroy();
                    cookiez.delete(SESSION_COOKIE);

                    return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED })
                }

                return NextResponse.json({ success: true }, { status: StatusCodes.OK });
            }

            const body = await req.json() as { password: string };

            if (!body || !body.password)
                return NextResponse.json({ success: false }, { status: StatusCodes.BAD_REQUEST });

            const logged = await loginUser(body.password);

            if (!logged)
                return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED });

            const session = await computeIronCookie<SessionData>(cookiez, SESSION_COOKIE, {
                httpOnly: true,
                secure: true,
                sameSite: "lax" as const,
                path: "/",
                maxAge: Duration.fromObject({ days: 20 }).as('seconds')
            });

            session.user = {
                id: uuidv7(),
                sub: uuidv7(),
                role: 'admin'
            }

            await session.save();

            return NextResponse.json({ success: true }, { status: StatusCodes.OK });
        } catch (error) {

            log.error(error);

            return NextResponse.json(
                { success: false },
                { status: StatusCodes.INTERNAL_SERVER_ERROR }
            );
        }
    }

    @RequestMapping("/password", "PATCH")
    @Use(requireAuthentication())
    async update(req: NextRequest): Promise<NextResponse<ApiResponse<void>>> {
        try {
            const cookiez = await cookies();
            const body = await req.json() as { password: string };

            if (!body || !body.password)
                return NextResponse.json({ success: false }, { status: StatusCodes.BAD_REQUEST });

            const updated = await updatePassword(body.password);

            if (updated) {
                const logged = await loginUser(body.password);

                if (!logged)
                    return NextResponse.json({ success: false }, { status: StatusCodes.UNAUTHORIZED });

                const session = await computeIronCookie<SessionData>(cookiez, SESSION_COOKIE, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax" as const,
                    path: "/",
                    maxAge: Duration.fromObject({ days: 20 }).as('seconds')
                });

                session.user = {
                    id: uuidv7(),
                    sub: uuidv7(),
                    role: 'admin'
                }

                await session.save();

                return NextResponse.json({ success: true }, { status: StatusCodes.OK });
            }

            return NextResponse.json({ success: false }, { status: StatusCodes.NOT_MODIFIED });

        } catch (error) {

            log.error(error);

            return NextResponse.json(
                { success: false },
                { status: StatusCodes.INTERNAL_SERVER_ERROR }
            );
        }
    }

    @RequestMapping("/logout", "POST")
    @Use(requireAuthentication())
    async logout(_: NextRequest): Promise<NextResponse<ApiResponse<void>>> {
        try {
            const cookiez = await cookies();

            if (!cookiez.has(SESSION_COOKIE)) {
                return NextResponse.json({ success: false }, { status: StatusCodes.BAD_REQUEST });
            }

            const session = await computeIronCookie<SessionData>(cookiez, SESSION_COOKIE);

            session.destroy();
            cookiez.delete(SESSION_COOKIE);

            return NextResponse.json({ success: true, message: 'logout' }, { status: StatusCodes.OK });
        } catch (error) {

            log.error(error);

            return NextResponse.json(
                { success: false },
                { status: StatusCodes.INTERNAL_SERVER_ERROR }
            );
        }
    }
}