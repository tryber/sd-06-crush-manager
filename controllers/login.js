module.exports = (req, res) => {
  const { token } = req;
  return res.status(200).json({ token });
};
