import crypto from 'crypto';

import pinoHttp from 'pino-http';

import { createLogger } from './create-logger';

export const httpLogger = pinoHttp({
  logger: createLogger(),
  redact: {
    paths: [
      'res.headers.authorization',
      'req.headers.authorization',
      'req.headers["x-api-token"]',
      'res.headers["x-api-token"]',
    ],
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
