/**
 * General purpose logger
 * @param {string} service - Service name
 * @return {Logger}
 */
 export default function createLogger(service: string): any {
    return {
        log: (...args: any) => console.log(`[${service}]`, ...args),
        debug: (...args: any) => console.debug(`[${service}]`, ...args),
        error: (...args: any) => console.error(`[${service}] ❌`, ...args),
        info: (...args: any) => console.info(`[${service}] 🔎`, ...args),
        warn: (...args: any) => console.warn(`[${service}] ⚠️`, ...args),
        trace: (...args: any) => console.trace(`[${service}]`, ...args),
    };
}
