const { readFile, writeFile } = require('../utils/managefile');

// Função responsável por deletar um crush existente.
const deleteCrush = async (req, res) => {
  // Função que busca o token vindo da autorização de acesso, de acordo com os testes.
  const token = await req.headers.authorization;
  // Validações do token de acordo com os requisitos.
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  // Conjunto de funções responsável por fazer a exclusão de crush existente, fazendo a leitura,
  // captando o id dos parâmetros, buscando esse id e comparando com os ids dos crushes,
  // filtrando no array de crushes todos os crushes menos o a ser deletado
  // finalizando com um writeFile para editar os dados no json.
  const crushes = await readFile('crush');
  const crushesParsed = JSON.parse(crushes);
  const crushId = parseInt(req.params.id, 10);
  const crushToDelete = crushesParsed.find((crush) => crush.id === crushId);
  const newCrushesArray = crushesParsed.filter((crush) => crush !== crushToDelete);
  writeFile('crush', JSON.stringify(newCrushesArray));
  // Retornando um res 200 com o dado excluído.
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
