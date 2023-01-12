export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  req.log.error(err);
  res.status(err.status || 500).send(err.message);
}
