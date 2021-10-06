
declare module 'gulplog' {
    export type LoggerFn = (...parts) => void;
    export type LoggerLevel = 'debug'|'info'|'warn'|'error'
    export type Logger = Record<LoggerLevel,LoggerFn>
    const logger:Logger
    export default logger;
}
