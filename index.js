const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
// app.use((req, res, next) => {
//   console.log({date: new Date(), method: req.method, endpoint: req.originalUrl});
//   next();
// })
app.use(routes);

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
