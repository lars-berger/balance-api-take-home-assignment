const express = require('express');
const app = express();

const { errorHandlerMiddleware } = require('./middleware/error-handler.middleware');
const { healthCheckController } = require('./controllers/health-check.controller');
const { userBalanceController } = require('./controllers/user-balance.controller');

const port = 3000;

app.get('/', healthCheckController);
app.get('/users/:userId/balance', userBalanceController);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
