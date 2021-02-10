const handleSearchCrush = (req, res) => {
  const { query } = req;
  const { readData } = res.locals;
  console.log(readData);
  const re = new RegExp(query.q, 'g');

  const crushName = readData.filter((crush) => re.test(crush.name));
  if (crushName) res.status(200).json(crushName);
};

module.exports = handleSearchCrush;
