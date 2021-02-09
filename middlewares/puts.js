const fs = require('fs').promises;
const path = require('path');
const { readFiles, writingFile } = require('../services/reader');
const { validateName, validateAge, validateDate, validateRate } = require('../services/validations');

async function writer(file) {
  const crush = path.resolve(__dirname, '..', 'newCrush.json');
  const data = await fs.writeFile(crush, JSON.stringify(file));
  return data;
}

module.exports = {
  async putCrushId(req, res, next) {
    const file = await readFiles();
    const crushId = +req.params.id;
    const crushToEdit = file.find((crush) => crush.id === crushId);
    if (!crushToEdit) return next({ message: 'Crush não encontrado', statusCode: 404 });

    const { name, age, date } = req.body;
    if (!name) return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
    if (!age) return next({ statusCode: 400, message: 'O campo "age" é obrigatório' });
    if (!date || !date.datedAt || !date.rate) return next({ statusCode: 400, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    const trueName = validateName(name);
    if (!trueName) return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
    const trueAge = validateAge(age);
    if (!trueAge) return next({ statusCode: 400, message: 'O crush deve ser maior de idade' });
    const trueDate = validateDate(date.datedAt);
    if (!trueDate) return next({ statusCode: 400, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    const trueRate = validateRate(date.rate);
    if (!trueRate) return next({ statusCode: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    await writer({ name, age, date });
    const newFile = await file.map(async (crushs) => ((crushs.id === crushToEdit.id)
      ? writingFile({ name, age, date })
      : crushs));
    console.log(newFile);
    res.status(201).json(newFile);
    // return writingFile(editedCrush);
  },
};
