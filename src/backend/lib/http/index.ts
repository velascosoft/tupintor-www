import { NextRequest } from "next/server";

const BODY_SYMBOL = Symbol.for("__parsed_body");
const QUERY_SYMBOL = Symbol.for("__parsed_query");

export const getParsedBody = async <T = unknown>(req: NextRequest): Promise<T> => {
    const anyReq = req as any;

    if (anyReq[BODY_SYMBOL])
        return anyReq[BODY_SYMBOL] as T;

    const body = await req.json();
    const parsed = body as T;
    anyReq[BODY_SYMBOL] = parsed;
    return parsed;
}

export const getParsedQuery = async <T = unknown>(req: NextRequest): Promise<T> => {
    const anyReq = req as any;
    if (anyReq[QUERY_SYMBOL]) return anyReq[QUERY_SYMBOL] as T;
    const parsed = Object.fromEntries(req.nextUrl.searchParams.entries()) as T;
    anyReq[QUERY_SYMBOL] = parsed;
    return Promise.resolve(parsed);
}