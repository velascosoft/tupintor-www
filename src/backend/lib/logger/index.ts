import { LOG_LEVEL } from "@/backend/config";
import pino, { Logger } from "pino";


const pretty = () => pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
    level: "debug",
});

const production = () => pino({ 
    level: LOG_LEVEL, 
    formatters: { 
        level: (label) => ({ level: label })
    } 
});

export const logger: Logger = process.env["NODE_ENV"] === "production" ? wrapLogger(production()) : wrapLogger(pretty())


function wrapLogger<T extends Logger>(logger: T): T {
    const originalError = logger.error.bind(logger) as (...args: any[]) => any;
    const originalChild = logger.child.bind(logger) as (...args: any[]) => any;

    function errorRearranger(this: Logger, ...args: any[]) {
        if (typeof args[0] === "string" && args.length > 1) {
            for (let i = 1; i < args.length; i++) {
                if (args[i] instanceof Error) {
                    const [err] = args.splice(i, 1);
                    args.unshift(err);
                    break;
                }
            }
        }
        return originalError(...args);
    }

    function childModifier(this: Logger, ...args: any[]) {
        const child = originalChild(...args) as Logger;

        const childOriginalError = child.error.bind(child) as (...a: any[]) => any;
        const childOriginalChild = child.child.bind(child) as (...a: any[]) => any;

        function childErrorRearranger(this: Logger, ...a: any[]) {
            if (typeof a[0] === "string" && a.length > 1) {
                for (let i = 1; i < a.length; i++) {
                    if (a[i] instanceof Error) {
                        const [err] = a.splice(i, 1);
                        a.unshift(err);
                        break;
                    }
                }
            }
            return childOriginalError(...a);
        }

        function childChildModifier(this: Logger, ...a: any[]) {
            const grandChild = childOriginalChild(...a) as Logger;
            (grandChild as any).error = childErrorRearranger.bind(grandChild);
            (grandChild as any).child = childChildModifier.bind(grandChild);
            return grandChild;
        }

        (child as any).error = childErrorRearranger.bind(child);
        (child as any).child = childChildModifier.bind(child);
        return child;
    }

    (logger as any).error = errorRearranger.bind(logger);
    (logger as any).child = childModifier.bind(logger);
    return logger;
}