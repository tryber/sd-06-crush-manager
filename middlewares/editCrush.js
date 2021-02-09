const { readFile, updateCrush } = require('../utils/index');

const editCrush = async (request, response) => {
  const crushId = request.params.id;

  const crushList = await readFile();

  const crushThatShouldBeUpdated = JSON.parse(crushList).find((crush) => crush.id === +crushId);

  const { name, age, date } = request.body;

  const crushIndex = crushList.indexOf(crushThatShouldBeUpdated);

  crushList[crushIndex] = { name, age, date };

  await updateCrush(crushList);

  return response.status(200).json({ name, age, date, id: +crushId });
};

module.exports = {
  editCrush,
};
