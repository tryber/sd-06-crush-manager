const rescue = require('express-rescue');

const routes = require('express').Router();
const crypto = require('crypto');
const {
  readFile,
  addCrushToFile,
  editCrushInFile,
  deleteCrushFromFile,
  findCrushInFile,
} = require('../utils/fileFunctions');

const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
} = require('../utils/validationFunctions');

routes.get('/crush/search', validateToken, rescue(async (req, res) => {
  const searchTerm = req.query.q;
  const searchedCrushes = await findCrushInFile('crush', searchTerm);
  res.status(200).send(searchedCrushes);
}));

routes.route('/crush/:id')
  .get(rescue(async (req, res) => {
    const crushId = parseInt(req.params.id, 10);
    const fullFile = await readFile('crush');
    const idFile = JSON.parse(fullFile).find((crush) => crush.id === crushId);
    if (idFile === undefined) return res.status(404).json({ message: 'Crush não encontrado' });
    res.status(200).json(idFile);
  }))
  .put(
    validateToken,
    validateName,
    validateAge,
    validateDate,
    validateRate,
    rescue(async (req, res) => {
      const editInfo = req.body;
      const crushId = parseInt(req.params.id, 10);
      await editCrushInFile('crush', editInfo, crushId);
      const file = await readFile('crush');
      const readEditedCrush = JSON.parse(file).find(({ id }) => id === crushId);
      res.status(200).send(readEditedCrush);
    }),
  )
  .delete(
    validateToken,
    rescue(async (req, res) => {
      const crushId = parseInt(req.params.id, 10);
      await deleteCrushFromFile('crush', crushId);
      res.status(200).json({ message: 'Crush deletado com sucesso' });
    }),
  );

routes.route('/crush')
  .get(rescue(async (req, res) => {
    const file = await readFile('crush');
    return res.status(200).json(JSON.parse(file));
  }))
  .post(
    validateToken,
    validateName,
    validateAge,
    validateDate,
    validateRate,
    rescue(async (req, res) => {
      const newCrush = req.body;
      const newId = await addCrushToFile('crush', newCrush);
      const file = await readFile('crush');
      const readNewCrush = JSON.parse(file).find(({ id }) => id === newId);
      res.status(201).send(readNewCrush);
    }),
  );

routes.post('/login', validateEmail, validatePassword, rescue((req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { emailValidation, passwordValidation } = req;
  if (emailValidation && passwordValidation) res.status(200).send({ token });
}));

module.exports = routes;
