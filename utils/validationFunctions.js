const emailValidation = (email) => {
  const comparison = /\S+@\S+\.\S+/;
  return comparison.test(email);
};

const passwordValidation = (password) => password.length >= 6;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  req.emailValidation = email && email !== '' ? emailValidation(email) : '';
  if (req.emailValidation === '' || req.emailValidation === undefined) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (req.emailValidation === false) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  req.passwordValidation = password && password !== '' ? passwordValidation(password) : '';
  if (req.passwordValidation === '' || req.passwordValidation === undefined) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (req.passwordValidation === false) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  next();
};

const validateToken = (req, res, next) => {
  const { authentication } = req.headers;
  req.tokenValidation = authentication && authentication !== '' ? authentication.length >= 16 : '';
  if (req.tokenValidation === '' || req.tokenValidation === undefined) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.tokenValidation === false) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  req.nameValidation = name && name !== '' ? name.length >= 3 : '';
  if (req.nameValidation === '' || req.nameValidation === undefined) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (req.nameValidation === false) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  req.ageValidation = age && age !== '' ? Number.isInteger(age) && age >= 18 : '';
  if (req.ageValidation === '' || req.ageValidation === undefined) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (req.ageValidation === false) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  next();
};

const dateFormating = (dateString) => {
  const separatedDate = dateString.split('/');
  const formatedDate = separatedDate.reverse().join('-');
  return formatedDate;
};

const validateDateFormat = (date) => {
  const dateObj = new Date(dateFormating(date));
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  console.log(dateObj, day, month, year);
  if (month < 9) {
    const compareDate = day < 10
      ? `0${day + 1}/0${month + 1}/${year}`
      : `${day + 1}/0${month + 1}/${year}`;
    console.log(compareDate);
    return compareDate === date;
  }
  const compareDate = day < 10
    ? `0${day + 1}/${month + 1}/${year}`
    : `${day + 1}/${month + 1}/${year}`;
  console.log(compareDate);
  return compareDate === date;
};

const validateDate = (req, res, next) => {
  const emptyKeyMessage = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  const { date: { datedAt } } = req.body;
  req.datedAtValidation = datedAt && datedAt !== ''
    ? validateDateFormat(datedAt)
    : '';
  if (req.datedAtValidation === '' || req.datedAtValidation === undefined) {
    return res.status(400)
      .json({
        message: emptyKeyMessage,
      });
  }
  if (req.datedAtValidation === false) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  next();
};

const validateRate = (req, res, next) => {
  const emptyKeyMessage = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  const { date: { rate } } = req.body;
  req.rateValidation = rate && rate !== ''
    ? rate >= 1 && rate <= 5
    : '';
  if (req.rateValidation === '' || req.rateValidation === undefined) {
    return res.status(400)
      .json({
        message: emptyKeyMessage,
      });
  }
  if (req.rateValidation === false) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
};
