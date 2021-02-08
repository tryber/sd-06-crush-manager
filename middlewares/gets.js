const crushs = require('../crush.json');

module.exports = {
  async getCrushs(_req, res, _next) {
    res.status(200).json(crushs);
  },
};
