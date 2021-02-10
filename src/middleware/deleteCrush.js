const { readFile } = require('../utils/managefile');

// Requisito 6
const deleteCrush = async (req, res) => {
  const token = await req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const crushes = await readFile('crush');
  const crushesParsed = JSON.parse(crushes);
  const crushId = +req.params.id;
  const crushToDelete = crushesParsed.find((crush) => crush.id === crushId);
  const newCrushesArray = crushesParsed.filter((crush) => crush !== crushToDelete);
  console.log(newCrushesArray);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
