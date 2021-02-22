const { readFile, writeFile } = require('../utils/managefile');
const { dateValidation } = require('../utils/validator');

// Função responsável por editar um crush existente.
const editCrush = async (req, res) => {
  // Função que busca o token vindo da autorização de acesso, de acordo com os testes.
  const token = req.headers.authorization;
  console.log(token);
  // Descontrução que capta o nome, age, e date do body da requisição.
  const { name, age, date } = req.body;
  // Validações de token, name, age e date de acordo com os requisitos.
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 4) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (dateValidation(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  // Conjunto de funções responsável por fazer a edição de crush existente,
  // captando o id, e fazendo um filter no array de crushes, buscando o crush pelas suas chaves,
  // finalizando com um writeFile para editar o dado no json.
  const crushes = await readFile('crush');
  const crushesParsed = JSON.parse(crushes);
  const crushToBeEditedId = parseInt(req.params.id, 10);
  const crushesWithoutCrushId = crushesParsed
    .filter((crush) => crush.id !== crushToBeEditedId);
  const crushEdited = ({
    name,
    age,
    id: crushToBeEditedId,
    date,
  });
  crushesWithoutCrushId.push(crushEdited);
  writeFile('crush', JSON.stringify(crushesWithoutCrushId));
  console.log(crushesWithoutCrushId);
  // Retornando um res 200 com o dado editado.
  res.status(200).send(crushEdited);
};

module.exports = editCrush;
