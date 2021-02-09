const { readFiles, writingFile } = require('../services/reader');
const { validateName, validateAge, validateDate } = require('../services/validations');

module.exports = {
  async putCrushId(req, res, next) {
    const file = await readFiles();
    const { params: { id }, body: { name, age, date } } = req;
    if (!id) return next({ message: 'Crush não encontrado', statusCode: 404 });

    if (!name || name === '') return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
    if (!age || age === '') return next({ statusCode: 400, message: 'O campo "age" é obrigatório' });
    if (!date || date.datedAt === undefined || date.rate === undefined) return next({ statusCode: 400, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    const trueName = validateName(name);
    if (!trueName) return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
    const trueAge = validateAge(age);
    if (!trueAge) return next({ statusCode: 400, message: 'O crush deve ser maior de idade' });
    const trueDate = validateDate(date.datedAt);
    if (!trueDate) return next({ statusCode: 400, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    if (date.rate <= 0 || date.rate >= 6) return next({ statusCode: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    const newFile = await file.map((crush) => ((crush.id === +id)
      ? { name, age, date, id: +id }
      : crush));
    console.log(date.datedAt);
    res.status(200).json({ name, age, date, id: +id });
    return writingFile(newFile);
  },
};
