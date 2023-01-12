import { config } from '../config';

export default function apiToken(req, res, next) {
  const token = req.headers['x-api-token'];

  if (token === config.apiToken) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
