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
  await writeJson(crushes); /// tratar erro
  return response.status(201).json(crushesNew);
}
module.exports = {
  login,
  createCrush,
};
