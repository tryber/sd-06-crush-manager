const { objectify } = require('../utils');

module.exports = {
  error: {
    invalidAge: objectify('O crush deve ser maior de idade'),
    invalidDatedAt: objectify('O campo "datedAt" deve ter o formato "dd/mm/aaaa"'),
    invalidEmail: objectify('O "email" deve ter o formato "email@email.com"'),
    invalidName: objectify('O "name" deve ter pelo menos 3 caracteres'),
    invalidPassword: objectify('A "senha" deve ter pelo menos 6 caracteres'),
    invalidRate: objectify('O campo "rate" deve ser um inteiro de 1 à 5'),
    invalidToken: objectify('Token inválido', 401),
    noAge: objectify('O campo "age" é obrigatório'),
    noCrush: objectify('Crush não encontrado', 404),
    noDate: objectify('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios'),
    noEmail: objectify('O campo "email" é obrigatório'),
    noName: objectify('O campo "name" é obrigatório'),
    noPassword: objectify('O campo "password" é obrigatório'),
    noToken: objectify('Token não encontrado', 401),
    unexpected: objectify('Unexpected error'),
    noFile: objectify('Arquivo de leitura não encontrado', 404),
  },
  success: {
    crushDeleted: 'Crush deletado com sucesso',
  },
};
