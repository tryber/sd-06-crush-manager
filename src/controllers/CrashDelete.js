const { readCrushs, writeCrushFile } = require('../utils/manageFiles');

const pathCrush = '../../crush.json';

// const authToken = require('../auth/token.json').token;

const deleteCrushs = async (req, res) => {
  const { id } = req.params;
  const reqToken = req.headers.authorization;

  // console.log(reqToken);

  if (!reqToken) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (reqToken.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  const arrayCrushs = await readCrushs(pathCrush);

  const crushIndex = arrayCrushs.findIndex((crush) => crush.id === Number(id));

  arrayCrushs.splice(crushIndex, 1);

  writeCrushFile(pathCrush, arrayCrushs);

  return res.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrushs;
