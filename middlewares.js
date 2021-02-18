const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

function verifyToken(request, response, next) {
  const tokenHeader = request.headers.authorization;
  if (!tokenHeader) return response.status(401).json({ message: 'Token não encontrado' });
  if (tokenHeader.length < 16) return response.status(401).json({ message: 'Token inválido' });
  next();
}

function verifySenha(request, response, next) {
  const { password } = request.body;
  if (!password || !password.length) return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  next();
}

// js considera falso quando - false, string vazia (''), undefined, null, zero (0)
function verifyEmail(request, response, next) {
  const { email } = request.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email || !email.length) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  next();
}

function verifyCrush(request, response, next) {
  const { name, age, date } = request.body;
  const regex = /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  if (!name || !name.length) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || !age.length) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || !date.rate) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (date.rate < 1 || date.rate > 5) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!regex.test(date.datedAt)) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  next();
}

module.exports = {
  verifyToken,
  generateToken,
  verifyCrush,
  verifyEmail,
  verifySenha,
};
