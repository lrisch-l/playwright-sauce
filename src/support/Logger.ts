export const log = {
  debug: (message: string) => console.debug(`[DEBUG] ${message}`),
  info: (message: string) => console.info(`[INFO] ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`)
};