function verifyCrush(name, age, date) {
  if (!name || name.length === 0) return 'O campo "name" é obrigatório';
  if (name.length > 0 && name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';

  if (!age || age === '') return 'O campo "age" é obrigatório';
  if (age === 0 || age < 18) return 'O crush deve ser maior de idade';

  if (!date || date === '') return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

  const { datedAt, rate } = date;

  if (!datedAt || datedAt.length === 0) return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

  const datePattern = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/;
  if (!datePattern.test(datedAt)) return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';

  if (!rate || rate === '') return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (rate < 1 || rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';

  return true;
}

module.exports = verifyCrush;
