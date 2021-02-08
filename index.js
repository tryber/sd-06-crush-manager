const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', (err, data) => {
    res.status(200).send(JSON.parse(data.toString()));
  });
});

app.get('/crush/:id', (req, res) => {
  fs.readFile('./crush.json', (err, data) => {
    const { id } = req.params;
    const crushID = parseInt(id, 10);
    const dataJSON = JSON.parse(data);
    const index = dataJSON.findIndex((person) => person.id === crushID);

    if (index === -1) return res.status(404).send({ message: 'Crush não encontrado' });

    res.status(200).send(dataJSON[index]);
  });
});

app.listen(port);
