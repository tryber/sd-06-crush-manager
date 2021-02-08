const errMiddle = (err, req, res, next) => {
  if (err) res.status(200).json([]);
  next();
};

module.exports = errMiddle;
