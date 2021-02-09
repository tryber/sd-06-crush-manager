const { readFiles, writingFile } = require('../services/reader');
const { validateName, validateAge, validateDate } = require('../services/validations');

module.exports = {
  async putCrushId(req, res, next) {
    const file = await readFiles();
    const { params: { id }, body: bodyCrush } = req;
    if (!id) return next({ message: 'Crush não encontrado', statusCode: 404 });

    if (!bodyCrush.name || bodyCrush.name === '') return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
    if (!bodyCrush.age || bodyCrush.age === '') return next({ statusCode: 400, message: 'O campo "age" é obrigatório' });
    if (!bodyCrush.date && !bodyCrush.date.datedAt && !bodyCrush.date.rate && bodyCrush.date.rate !== 0) return next({ statusCode: 400, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    const trueName = validateName(bodyCrush.name);
    if (!trueName) return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
    const trueAge = validateAge(bodyCrush.age);
    if (!trueAge) return next({ statusCode: 400, message: 'O crush deve ser maior de idade' });
    const trueDate = validateDate(bodyCrush.date.datedAt);
    if (!trueDate) return next({ statusCode: 400, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    if (bodyCrush.date.rate <= 0 || bodyCrush.date.rate >= 6) return next({ statusCode: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    const newFile = await file.map((crush) => ((crush.id === +id)
      ? { ...bodyCrush, id: +id }
      : crush));
    res.status(200).json({ ...bodyCrush, id: +id });
    return writingFile(newFile);
  },
};
