const express = require('express');

const appRoutes = require('./routes/index.js');
const handleErrors = require('./middlewares/handleErrors.js');

const app = express();

app.use(express.json());

app.use(appRoutes);

app.use(handleErrors);

app.listen(3333, () => console.log('Server Started'));
