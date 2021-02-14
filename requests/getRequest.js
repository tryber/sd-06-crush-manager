// aqui a função referente ao que se quer buscar em routes.get() por exemplo
const listarTodosUsuarios = async (request, response) => {
  response.send('hello world! Não é irônico fazer um crush manager no dia se St Valetim?');
};

// cada nova função criada poderá ser exportada aqui, apenas acrescentando o nome
// da variável
module.exports = {
  listarTodosUsuarios,
};
