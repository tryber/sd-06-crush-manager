const { getData } = require('./getData');

const getCrushById = async (req, res) => {
  const response = await getData();
  const id = req.params.id;
  const selectedCrush = JSON.parse(response).find(crush => crush.id === parseInt(id));
  if (!selectedCrush) {
    throw new Error('crush not found');
  }
  res.send(selectedCrush);
}

app.use(function (err, _req, res, _next) {
  res.status(404).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = getCrushById;
