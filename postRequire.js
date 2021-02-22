const { generateToken } = require('./middlewares');
const { readJson, writeJson } = require('./readWrite');

// login
function login(request, response) {
  const token = generateToken();
  return response.status(200).json({ token });
}

// create crush
async function createCrush(request, response) {
  console.log('AQUI');
  const crushes = await readJson();
  const crushesNew = { id: crushes.length + 1, ...request.body };
  crushes.push({
    id: crushesNew.id,
    name: crushesNew.name,
    age: crushesNew.age,
    date: crushesNew.date,
  });
  await writeJson(crushes);
  if (!crushes) return response.status(404).json({ message: 'erro writeJson' });
  return response.status(201).json(crushesNew);
}
// edit crush
async function editCrushes(request, response) {
  const crushes = await readJson();
  const { id } = request.params;
  const crushIndex = crushes.find((objCrush) => objCrush.id === Number(id));

  if (!crushIndex) return response.status(404).json({ message: 'Crush não encontrado' });
  response.status(200).json(crushIndex);

  const { name, age, date } = request.body;
  const editNewCrush = { ...crushIndex, name, age, date };

  await writeJson(editNewCrush);
  const crushes2 = await readJson();
  console.log('resultado ', crushes2);
  if (!crushes) return response.status(404).json({ message: 'erro writeJson' });
  return response.status(200).json({ editNewCrush });
}
// delete crush
async function deleteCrush(request, response) {
  const crushes = await readJson();
  const { id } = request.params;
  const crushIndex = crushes.find((objCrush) => objCrush.id === Number(id));
  if (crushIndex === -1) return response(500).json({ message: 'crush não encontrado' });
  crushes.splice(crushIndex, 1);
  return response.json({ message: 'Crush deletado com sucesso' });
}
// pesquisa crush
async function searchCrush(request, response) {
  const crushes = await readJson();
  const { name } = request.query;
  const crushesSearch = crushes.find((objCrush) => objCrush.name === name);
  if (!crushesSearch) return response.status(500).json({ message: 'Crush não encontrado !!' });
  return response.json({ message: 'crush encontrado  com sucesso', crushesSearch });
}

module.exports = {
  login,
  createCrush,
  editCrushes,
  deleteCrush,
  searchCrush,
};
