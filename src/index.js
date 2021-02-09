const express = require('express');
const { readFile } = require('./utils/manageFiles');

const app = express();
const SUCCESS = 200;

const port = 3000;
// const crushes = require('./files/crush.json');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use((req, res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    route: req.originalUrl,
  });
  next();
});

app.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const myCrushes = await readFile(fileName);
  if (myCrushes.length > 0) {
    res.status(SUCCESS).send(JSON.parse(myCrushes));
  } else {
    res.status(SUCCESS).send([]);
  }
});

app.listen(port, () => console.log('Running Project Crush Manager!'));
