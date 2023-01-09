import cors from 'cors';
import express from 'express';

import { httpLogger } from './logger';

const app = express();

app.use(httpLogger);

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.use(express.json() as express.RequestHandler);
app.use(cors());

app.use('/', (req, res) => {
  res.status(404).send(`Not found: ${req.url}`);
});

export default app;
