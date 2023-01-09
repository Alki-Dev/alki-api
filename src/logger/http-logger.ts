import crypto from 'crypto';

import pinoHttp from 'pino-http';

import { createLogger } from './create-logger';

const blacklistedRoutes = ['/health'];

export const httpLogger = pinoHttp({
  logger: createLogger(),
  autoLogging: {
    ignore: (req) => blacklistedRoutes.includes(req.url ?? ''),
  },
  redact: {
    paths: ['res.headers.authorization'],
    remove: true,
  },
  genReqId: (req, res) => {
    if (req.id) {
      return req.id as string;
    } else if (req.headers['x-request-id']) {
      return req.headers['x-request-id'] as string;
    } else {
      const id = crypto.randomUUID();

      res.setHeader('x-request-id', id);

      return id;
    }
  },
});
