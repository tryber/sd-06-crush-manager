const chegandoData = (data) => {
  const validacao = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return validacao.test(data);
};

const validandoCrush = (req, res, next) => {
  const { nome, idade, data } = req.body;
  if (!nome || nome === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (nome.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!idade || idade === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (idade < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (!data || !data.datedAt || (!data.rate && data.rate !== 0)) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!chegandoData(data.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (data.rate < 1 || data.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  return next();
};

module.exports = { validandoCrush };
