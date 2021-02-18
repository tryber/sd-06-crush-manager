const express = require('express');

const routes = express.Router();
const fs = require('fs').promises;
const crypto = require('crypto');

// cria função readFile
const lerArquivo = async () => {
  const contatinhos = await fs.readFile('./crush.json', 'utf8');
  return JSON.parse(contatinhos);
};

// cria função writeFile
const escreverArquivo = async (novoContatinho) => {
  await fs.writeFile('./crush.json', novoContatinho, 'utf-8');
  return true;
};

// vai rotear os endpoints que se quer acessar
// POST, GET, PUT, DELETE

// cria endpoint GET /crush (req1)
routes.get('/crush', async (_request, response) => {
  const crushes = await lerArquivo();
  return response.status(200).send(crushes);
});

//  cria endpoint GET /crush/:id (req2)
routes.get('/crush/:id', async (request, response) => {
  const { id } = request.params;

  const listaContatinhos = await lerArquivo();
  const neoTheChosenOne = listaContatinhos
    .filter((contatinho) => contatinho.id === parseInt(id, 10));

  if (neoTheChosenOne.length > 0) {
    return response.status(200).json(neoTheChosenOne[0]);
  }

  return response.status(404).json({ message: 'Crush não encontrado' });
});

// cria endpoint POST /login (req3)
routes.post('/login', (request, response) => {
  const { email, password } = request.body;

  // testar se o campo email não é passado ou é vazio:
  if (email === '' || !email) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  // regex do AppReceitas e da Atividade de 05 fev 2021:
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
  if (!regexEmail.test(email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  // testar se o campo password não é passado ou é vazio
  if (password === '' || !password) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  // testar se o campo password não tem pelo menos 6 caracteres
  if (password.length < 6) {
    return response.status(400).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

  // caso email e senha correspondam ao solicitado, gerar token
  // como visto na Atividade do dia 05 fev 2021
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).send({ token });
});

// cria endpoint POST /crush (req4)
routes.post('/crush', async (request, response) => {
  const { authorization } = request.headers;
  const { name, age, date } = request.body;

  /* o authorization deve estar presente no headers e seu valor deve ser o token
  pq isso significa que a pessoa com email e senha estão logadas (eu acho) e aí
  ela tem autorização pra criar um crush. */

  // testa se existe token
  if (authorization === '' || !authorization) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  // testa se o token é válido (como o token é válido? Se tiver length === 16)
  if (authorization.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  // testa se o campo name não é passado ou é vazio
  if (name === '' || !name) {
    return response.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  // testa se o campo name não tem pelo menso 3 caracteres
  if (name.length < 3) {
    return response.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  // testa se o campo age não é passado ou é vazio
  if (age === '' || !age) {
    return response.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }

  // testa se o campo age é menor do que 18
  if (age < 18) {
    return response.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }

  // testa se o campo date é obrigatório e nenhuma de suas chaves deve vir vazia
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return response.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  // testa se o numero em rate é um inteiro [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger]
  // e se é um valor entre 1 e 5
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return response.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  // testa se o campo datedAt respeita o formato dd/mm/aaaa
  // regex para Datas [https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy]
  // com algumas adaptações
  const regexDateFormat = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!regexDateFormat.test(date.datedAt)) {
    return response.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  // caso o name, age, date e token sejam válidos, é necessário acrescentar o
  // contatinho criado ao crush.json através do writeFile
  const listaContatinhos = await lerArquivo();
  const contatinhoCriado = { id: listaContatinhos.length + 1, name, age, date };
  await escreverArquivo(JSON.stringify([...listaContatinhos, contatinhoCriado], 0, 2));
  return response.status(201).send(contatinhoCriado);
});

// cria endpoint PUT /crush:id (req5)
routes.put('/crush/:id', async (request, response) => {
  const { authorization } = request.headers;
  const { name, age, date } = request.body;
  // precisa do id para comparar, encontrar e "alterar" o contatinho
  const { id } = request.params;
  const idPut = parseInt(id, 10);
  console.log('recebe id:', idPut);

  // testa se existe token
  if (authorization === '' || !authorization) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  // testa se o token é válido (como o token é válido? Se tiver length === 16)
  if (authorization.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  // testa se o campo name não é passado ou é vazio
  if (name === '' || !name) {
    return response.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  // testa se o campo name não tem pelo menso 3 caracteres
  if (name.length < 3) {
    return response.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  // testa se o campo age não é passado ou é vazio
  if (age === '' || !age) {
    return response.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }

  // testa se o campo age é menor do que 18
  if (age < 18) {
    return response.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }

  // testa se o campo date é obrigatório e nenhuma de suas chaves deve vir vazia
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    return response.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  // testa se o numero em rate é um inteiro [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger]
  // e se é um valor entre 1 e 5
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return response.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  // testa se o campo datedAt respeita o formato dd/mm/aaaa
  // regex para Datas [https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy]
  // com algumas adaptações
  const regexDateFormat = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!regexDateFormat.test(date.datedAt)) {
    return response.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  // caso o name, age, date e token sejam válidos, é necessário alterar o contato
  // para isso 1) ler o arquivo e encontrar o contato pelo id; 2) "remover" o contato e
  // 3) inserir os novos dados do contato no index daquele id
  // referência do splice [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice]
  const listaContatinhos = await lerArquivo();
  const novosDadosContatinho = { id: idPut, name, age, date };
  listaContatinhos.splice(idPut, 1, novosDadosContatinho);
  await escreverArquivo(JSON.stringify([...listaContatinhos], 0, 2));
  return response.status(200).send(novosDadosContatinho);
});

// cria DELETE /crush/:id
routes.delete('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const idPut = parseInt(id, 10);
  const { authorization } = request.headers;
  // validações de token
  if (authorization === '' || !authorization) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  // testa se o token é válido (como o token é válido? Se tiver length === 16)
  if (authorization.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }

  // caso o token seja válido, o próximo passo é deletar o contato
  // para isso 1)ler o arquivo ; 2) utilizar o id para comparação
  // 3) remover e 4) retornar o arquivo sem esse contatinho
  // referência do splice [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice]
  const listaContatinhos = await lerArquivo();
  listaContatinhos.splice(idPut, 1);
  await escreverArquivo(JSON.stringify([...listaContatinhos], 0, 2));
  return response.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = routes;
