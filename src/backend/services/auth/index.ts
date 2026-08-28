import { logger } from "@/backend/lib/logger";
import { GLOBAL_CONFIG, VERCEL_TOKEN } from "@/backend/config";
import { get } from '@vercel/global-config';

const log = logger.child({ module: 'auth-service' });

export const loginUser = async (password: string): Promise<boolean> => {
    try {
        const savedPassword = await get('password');

        return savedPassword === password;
    } catch (err) {
        log.error("m=createGuestUser : Error when try create guest user", err);

        return Promise.reject(err);
    }
}

export const updatePassword = async (password: string): Promise<boolean> => {
    if (!password) {
        throw new Error("Password is required");
    }

    if (!GLOBAL_CONFIG) {
        throw new Error("GLOBAL_CONFIG is not configured");
    }

    if (!VERCEL_TOKEN) {
        throw new Error("VERCEL_TOKEN is not configured");
    }

    const edgeConfigId: string = "ecfg_hlqrrmaezzwi9o9lbypvnpqbelpb";

    const url = `https://api.vercel.com/v1/global-config/${encodeURIComponent(edgeConfigId)}/items`;

    const response = await fetch(
        url,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${VERCEL_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [
                    {
                        operation: "upsert",
                        key: "password",
                        value: password,
                    },
                ],
            }),
        }
    );

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
            `Unable to update the global config password (${response.status}): ${errorMessage}`
        );
    }

    return true;
};