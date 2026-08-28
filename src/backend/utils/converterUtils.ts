import { z, ZodSchema } from "zod";
import { logger } from "../lib/logger";

const log = logger.child({ module: 'converter-utils'});

export const convertFromSchema =<S extends ZodSchema<any>>(value: unknown, schema: S): z.infer<S> => {
    const { data, error } = schema.safeParse(value);
    if(error) {
        log.error(error.errors);
        throw error;
    }

    return data;
}