const isName = (req, res, next) => {
  const nameBody = req.body.name;
  if (nameBody === null || nameBody === '') return res.status(400).json({ message: 'O campo \"name\" é obrigatório' });
  if (nameBody.length < 3) return res.status(400).json({ message: 'O \"name\" deve ter pelo menos 3 caracteres' });
  next();
};

module.exports = {
  isName,
};

