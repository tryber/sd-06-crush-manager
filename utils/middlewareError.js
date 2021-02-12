async function handleError(err, _request, response, _next) {
  response.status(err.statusCode || 500).json({ erro: err.message });
}

module.exports = {
  handleError,
};
