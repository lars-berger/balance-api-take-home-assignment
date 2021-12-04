const errorHandlerMiddleware = (err, _req, res, _next) => {
  res.status(err.code || 500);
  res.send(err.message || 'An unknown error occurred.');
};

module.exports = {
  errorHandlerMiddleware,
};
