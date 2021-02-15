const { generateToken } = require('./middlewares');
const { readJson, writeJson } = require('./getRequire');

// login
function login(request, response) {
  const token = generateToken();
  return response.status(200).json({ token });
}

// create crush
async function createCrush(request, response) {
  const crushes = await readJson();
  const crushesNew = { id: crushes.length + 1, ...request.body };
  console.log('crushes', crushesNew);
  crushes.push({
    id: crushesNew.id,
    nome: crushesNew.name,
    age: crushesNew.age,
    date: crushesNew.date,
  });
  console.log('linha 16', crushes);
  const crush = await writeJson(crushesNew);
  return response.status(201).JSON.stringify(crush);
}
module.exports = {
  login,
  createCrush,
};
