const validaData = (req, res, next) => {
  const { date } = req.body;

  if (date === undefined || date.rate === undefined || date.datedAt === undefined) {
    console.log(1);
    res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
    return;
  }

  if (date.rate < 1 || date.rate > 5) {
    console.log(2);
    res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
    return;
  }

  const test = date.datedAt.split('/');
  if (test.length !== 3 || test[0].length !== 2 || test[1].length !== 2 || test[2].length !== 4) {
    console.log(3);
    res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
    return;
  }

  return next();
};

module.exports = validaData;
