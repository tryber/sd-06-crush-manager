const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  if ((authorization).length !== 16) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if ((name).length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const valiDate = (req, res, next) => {
  const { date } = req.body;
  // regex extraido do Stackoverflow
  const maskDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!date || date === '' || !date.datedAt || date.datedAt === '' || (!date.rate && date.rate !== 0)) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (maskDate.test(date.datedAt) === false) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  // if (date.rate < 1 || date.rate > 5) {
  //   return res
  //     .status(400)
  //     .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  // }

  next();
};

const validateRate = (req, res, next) => {
  const { date } = req.body;

  if (date.rate < 1 || date.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  valiDate,
  validateRate,
};
