const BAD_REQUEST = 400;

module.exports = {
  loginValidator(req, res, next) {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const { email, password } = req.body;
    const validatedEmail = emailValidationRegex.test(email);
    if (!email) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "email" é obrigatório' });
    } else if (!validatedEmail) {
      res.status(BAD_REQUEST)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password || password.length === 0) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(BAD_REQUEST)
        .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
    next();
  },

  alterCrushValidator(req, res, next) {
    const dateValidationRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const rateValidationRegex = /[1-5]/;
    const { name, age, date } = req.body;
    const validatedDate = dateValidationRegex.test(date.datedAt);
    const validateRate = rateValidationRegex.test(date.rate);
    if (!name) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "name" é obrigatório' });
    } else if (name.length < 3) {
      res.status(BAD_REQUEST)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    if (!age) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "age" é obrigatório' });
    } else if (age < 18) {
      res.status(BAD_REQUEST)
        .json({ message: 'O crush deve ser maior de idade' });
    }

    if (!date || date.dateAt === '' || date.rate === '') {
      res.status(BAD_REQUEST)
        .json({
          message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
        });
    }

    if (!validatedDate) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    if (!validateRate) {
      res.status(BAD_REQUEST)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  },
};
