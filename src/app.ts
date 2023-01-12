import cors from 'cors';
import express from 'express';

import { httpLogger } from './logger';
import { apiToken } from './middleware';

const app = express();

app.use(express.json() as express.RequestHandler);
app.use(
  cors({
    allowedHeaders: ['x-auth-token', 'x-refresh-token', 'x-api-token'],
    exposedHeaders: ['x-auth-token', 'x-refresh-token'],
  }),
);
app.use(httpLogger);

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.use(apiToken);

app.use('/', (req, res) => {
  res.status(404).send(`Not found: ${req.url}`);
});

export default app;
