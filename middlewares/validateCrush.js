const validateCrush = async (request, response, next) => {
  const { name, age, date } = request.body;

  const checkDate = (oneDate) => {
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    return dateRegex.test(String(oneDate));
  };

  if (!name) {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || !date.datedAt || date.rate === undefined) {
    return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!checkDate(date.datedAt)) {
    return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (date.rate < 1 || date.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateCrush,
};
