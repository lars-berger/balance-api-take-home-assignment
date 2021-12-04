const express = require('express');
const app = express();

const { healthCheckController } = require('./controllers/health-check.controller');

const port = 3000;

app.get('/', healthCheckController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
