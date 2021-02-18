const resError = (bool, res, message, status) => {
  if (bool) {
    if (status) {
      res.status(status).json({ message });
    } else {
      res.json({ message });
    }
    return false;
  }
  return true;
};

module.exports = resError;
