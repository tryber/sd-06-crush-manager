module.exports = (err, _req, res, _next) => {
  const { message, status } = JSON.parse(err.message);
  res.status(status).json({ message });
};
