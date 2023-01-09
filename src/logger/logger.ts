import { createLogger } from './create-logger';

const pinoLogger = createLogger();

export const logger = {
  error: (error: Error) => {
    pinoLogger.error(error);
  },
  debug: (msg: string, args?: Record<string, unknown>) => {
    pinoLogger.debug({ ...args }, msg);
  },
  info: (msg: string, args?: Record<string, unknown>) => {
    pinoLogger.info({ ...args }, msg);
  },
};
