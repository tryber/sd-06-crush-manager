const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  const regexToken = /^[a-zA-Z0-9]*$/i;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (!regexToken.test(authorization) || authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validAuthentication = (req, res, next) => {
  const { name, age, date } = req.body;
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (!date || date === '') {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!date.datedAt || date.datedAt === '' || date.rate === '' || !date.rate) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regexDate.test(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  next();
};

module.exports = { validationToken, validAuthentication };
