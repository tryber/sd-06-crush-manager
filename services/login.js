module.exports = (request, response) => {
  response.status(200).send({ token: request.token });
};
