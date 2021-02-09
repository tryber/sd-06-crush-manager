const { readCrushs, writeCrushFile } = require('../utils/manageFiles');

const pathCrush = '../../crush.json';

const authToken = require('../auth/token.json').token;

const deleteCrushs = async (req, res) => {
  const { id } = req.params;
  const reqToken = req.headers.authorization;

  if (!reqToken) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (reqToken.length !== 16 || reqToken !== authToken) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  const arrayCrushs = await readCrushs(pathCrush);

  const crushIndex = arrayCrushs.findIndex((crush) => crush.id === Number(id));

  if (crushIndex === -1) {
    return res.status(401).send({ message: 'Id inválido' });
  }

  arrayCrushs.splice(crushIndex, 1);

  writeCrushFile(pathCrush, arrayCrushs);

  res.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrushs;
