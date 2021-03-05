const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (+age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { date } = req.body;
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!regexData.test(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  /* estava tendo problemas na validação no requisito 5: meu date.rate caia sempre no primeiro
  teste, não entrava neste último porque eu não estava fazendo a validação do número ser inteiro,
  graças ao PR da Alessandra Plets eu consegui resolver
  link do PR: https://github.com/tryber/sd-06-crush-manager/pull/98/files */

  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = { validateName, validateAge, validateDate };
