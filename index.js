const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const SUCCESS = 200;
const TAMANHO_PASSWORD = 6;

const numeroRandomico = Math.random().toString(36).substring(2, 10);

const lerArquivo = async (arquivo) => {
  const conteudoArquivo = await fs.readFile(path.resolve(path.join(__dirname, arquivo)), 'utf-8');
  return conteudoArquivo;
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

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (__request, response) => {
  const data = await lerArquivo('/crush.json');
  response.status(SUCCESS).send(JSON.parse(data));
});

app.get('/crush/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await lerArquivo('/crush.json');
    const newData = JSON.parse(data);
    const actor = newData.find((element) => element.id === Number(id));
    if (!actor) throw new Error('Crush não encontrado');
    response.status(SUCCESS).json(actor);
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (request, response) => {
  try {
    const aleatorio = numeroRandomico + numeroRandomico;
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

app.use((err, __request, response, __next) => {
  response.status(404).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
