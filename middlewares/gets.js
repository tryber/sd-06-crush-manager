const crushs = require('../crush.json');

module.exports = {
  async getCrushs(_req, res, next) {
    if (crushs.length > 0) {
      res.status(200).json(crushs);
    } else {
      res.status(200).json([]);
    }
    return next();
  },
};
