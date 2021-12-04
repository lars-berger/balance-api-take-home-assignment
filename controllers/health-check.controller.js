const healthCheckController = (_req, res) => {
  res.send('API is live and ready to expect requests.');
};

module.exports = {
  healthCheckController,
};
