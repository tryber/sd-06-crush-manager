const isAge = (req, res, next) => {
  const ageBody = req.body.age;
  if (ageBody === null || ageBody === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (ageBody.length < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

module.exports = {
  isAge,
};
