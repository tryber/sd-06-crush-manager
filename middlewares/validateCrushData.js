const badRequest = 400;
const Unauthorized = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(Unauthorized).send({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) return res.status(Unauthorized).send({ message: 'Token inválido' });

  const { name, age, date } = req.body;
  if (!name || name === '') return res.status(badRequest).send({ message: 'O campo "name" é obrigatório' });
  if (name && name.length < 3) return res.status(badRequest).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === null || !Number.isInteger(age)) return res.status(badRequest).send({ message: 'O campo "age" é obrigatório' });
  if (age && Number.isInteger(age) && age < 18) return res.status(badRequest).send({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return res.status(badRequest)
      .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const validDatedAt = reg.test(String(date.datedAt).toLowerCase());
  if (!validDatedAt) return res.status(badRequest).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(badRequest)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};
