const { generateToken } = require('./middlewares');
const { readJson, writeJson } = require('./readWrite');

// login
function login(request, response) {
  const token = generateToken();
  return response.status(200).json({ token });
}

// create crush
async function createCrush(request, response) {
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
  console.log(crushIndex);
  if (!crushIndex) return response.status(404).json({ message: 'Crush não encontrado' });

  const { name, age, date } = request.body;

  const editNewCrush = crushes.filter((crush) => crush.id !== Number(id));
  const crushUpdate = { id: +id, name, age, date };
  editNewCrush.push(crushUpdate);

  await writeJson(editNewCrush);
  if (!crushes) return response.status(404).json({ message: 'erro writeJson' });
  return response.status(200).json(crushUpdate);
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
  const { searchTerm } = request.query;
  const crushesSearch = crushes.find((objCrush) => objCrush.name.includes(searchTerm));
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
