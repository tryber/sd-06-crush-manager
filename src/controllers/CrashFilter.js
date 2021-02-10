const { readCrushs } = require('../utils/manageFiles');

const crushs = '../../crush.json';

const filterCrush = async (req, res) => {
  const queryParam = req.query.q;
  const reqToken = req.headers.authorization;

  const contentCrushs = await readCrushs(crushs);

  console.log(queryParam);

  if (!reqToken) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (reqToken.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  if (queryParam === undefined || queryParam === '') {
    res.status(200).send(contentCrushs);
  }

  const filteredCrushs = contentCrushs.filter((crush) => crush.name.includes(queryParam));

  if (filteredCrushs.length === 0) {
    return res.status(200).send([]);
  }

  return res.status(200).send(filteredCrushs);
};

module.exports = filterCrush;
