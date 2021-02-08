const express = require('express');
const { readFile, writeFile } = require('./utils/manageFiles');

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
  // res.status(200).send(myCrushes);
  if (myCrushes.length > 0) {
    res.status(200).send(myCrushes);
  } else {
    res.status(200).send([]);
  }
});

app.listen(port, () => console.log('Running Project Crush Manager!'));
