module.exports = (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }
  if (request.headers.authorization && request.headers.authorization.length !== 16) {
    return response.status(401).send({ message: 'Token inválido' });
  }

  if (!request.body.name) {
    return response.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (request.body.name.length < 3) {
    return response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!request.body.age) {
    return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (request.body.age < 18) {
    return response.status(400).send({ message: 'O crush deve ser maior de idade' });
  }

  if (!request.body.date || !request.body.date.datedAt || !request.body.date.rate) {
    if (request.body.date && request.body.date.rate === 0) {
      return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return response.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!regex.test(request.body.date.datedAt)) {
    return response.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (request.body.date.rate >= 1 && request.body.date.rate <= 5) {
    return next();
  } else {
    return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};
