const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const rescue = require('express-rescue');

const app = express();
const SUCCESS = 200;
const TAMANHO_PASSWORD = 6;
const TAMANHO_TOKEN = 16;

const numeroRandomico = () => {
  const token = Math.random()
    .toString(36).substring(2, 10)
      + Math.random()
        .toString(36).substring(2, 10);
  return token;
};

const comparar = (a, b) => {
  let compar = 0;
  if (a.id > b.id) {
    compar = 1;
  } else if (a.id < b.id) {
    compar = -1;
  }
  return compar;
};

const lerArquivo = async (arquivo) => {
  const conteudoArquivo = await fs.readFile(path.resolve(path.join(__dirname, arquivo)), 'utf-8');
  const parseConteudoArquivo = JSON.parse(conteudoArquivo);
  return parseConteudoArquivo;
};

const escreverArquivo = async (arquivo, crush) => {
  await fs.writeFile(path.resolve(path.join(__dirname, arquivo)), crush, 'utf-8');
  return true;
};

const verificaCampoEmail = (objeto) => {
  if (!objeto.email) return false;
  return true;
};

const verificaFormatoEmail = ({ email }) => {
  const verificar = /^[a-zA-Z0-9]+@[a-z]+\.com$/;
  const resposta = verificar.test(email);
  return resposta;
};

const verificaCampoPassword = ({ password }) => {
  if (!password) return false;
  return true;
};

const verificaTamanhoPassword = ({ password }) => {
  if (password) {
    const tamanho = password.toString().split('');
    return tamanho.length;
  }
};

const verificaNome = (name) => {
  if (!name) return null;
  if (name.length < 3) return false;
  return true;
};

const verificaIdade = (age) => {
  if (!age) return null;
  if (!Number.isInteger(age) || age < 18) return false;
  return true;
};

const verificaData = (date) => {
  if (!date) return false;
  const formatoData = /(0[1-9]|[12][0-9]|3[01])\/?(0[1-9]|1[012])\/?\d{4}/;
  const respostaData = formatoData.test(date.datedAt);
  return respostaData;
};

const verificaNota = (date) => {
  if (!date) return false;
  const nota = Number.isInteger(date.rate) && date.rate > 0 && date.rate < 6;
  return nota;
};

const verificaDate = (date) => {
  if (!date) return null;
  return !date.datedAt || !date.rate;
};

const adicionaCrush = async (id, name, age, date) => {
  const crushes = await lerArquivo('/crush.json');
  const novoObjeto = {
    name,
    age,
    id: (crushes.length) + id,
    date,
  };
  const novoCrush = [...crushes, novoObjeto];
  await escreverArquivo('/crush.json', JSON.stringify(novoCrush), 'utf-8');
  return novoObjeto;
};

const editaCrush = async (id, name, age, date) => {
  const idCrush = await lerArquivo('/crush.json');
  const idCrushEncontrado = idCrush.filter((crush) => crush.id !== id);
  const crushEditado = { name, age, id, date };
  idCrushEncontrado.push(crushEditado);
  idCrushEncontrado.sort(comparar);
  await escreverArquivo('/crush.json', JSON.stringify(idCrushEncontrado));
  return crushEditado;
};

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (__request, response) => {
  const data = await lerArquivo('/crush.json');
  response.status(SUCCESS).json(data);
});

app.get('/crush/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await lerArquivo('/crush.json');
    const actor = data.find((element) => element.id === Number(id));
    if (!actor) throw new Error('Crush não encontrado');
    response.status(SUCCESS).json(actor);
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (request, response) => {
  try {
    const aleatorio = numeroRandomico();
    const loginUser = request.body;
    const campoEmailVerificado = verificaCampoEmail(loginUser);
    const campoPasswordVerificado = verificaCampoPassword(loginUser);
    const formatoEmailVerificado = verificaFormatoEmail(loginUser);
    const tamanhoPasswordVerificado = verificaTamanhoPassword(loginUser);
    if (!campoPasswordVerificado) throw new Error('O campo "password" é obrigatório');
    if (!campoEmailVerificado) throw new Error('O campo "email" é obrigatório');
    if (!formatoEmailVerificado) throw new Error('O "email" deve ter o formato "email@email.com"');
    if (tamanhoPasswordVerificado < TAMANHO_PASSWORD) throw new Error('A "senha" deve ter pelo menos 6 caracteres');
    response.status(SUCCESS).json({ token: aleatorio });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.post('/crush', rescue(async (request, response) => {
  const { name, age, date } = request.body;
  const id = 1;
  const { authorization } = request.headers;
  const nomeVerificado = verificaNome(name);
  const idadeVerificada = verificaIdade(age);
  const dateVerificada = verificaDate(date);
  const dataVerificada = verificaData(date);
  const notaVerificada = verificaNota(date);
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < TAMANHO_TOKEN || authorization.length > TAMANHO_TOKEN) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  if (nomeVerificado === null) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (nomeVerificado === false) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (idadeVerificada === null) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (idadeVerificada === false) return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (dateVerificada === null || dateVerificada) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!dataVerificada) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!notaVerificada) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  const crushAdicionado = await adicionaCrush(id, name, age, date);
  response.status(201).json(crushAdicionado);
}));

app.put('/crush/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const parseId = parseInt(id, 10);
  const { name, age, date } = request.body;
  const { authorization } = request.headers;
  const nomeVerificado = verificaNome(name);
  const idadeVerificada = verificaIdade(age);
  const dateVerificada = verificaDate(date);
  const dataVerificada = verificaData(date);
  const notaVerificada = verificaNota(date);
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < TAMANHO_TOKEN || authorization.length > TAMANHO_TOKEN) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  if (nomeVerificado === null) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (nomeVerificado === false) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (idadeVerificada === null) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (idadeVerificada === false) return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (dateVerificada === null || dateVerificada) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!dataVerificada) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!notaVerificada) return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  const crushEditadoOk = await editaCrush(parseId, name, age, date);
  response.status(200).json(crushEditadoOk);
}));

app.use((err, __request, response, __next) => {
  response.status(404).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
