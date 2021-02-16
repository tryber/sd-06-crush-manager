module.exports = {
  verifyEmail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
    return emailRegex.test(email);
  },

  verifyPassword(password) {
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    return passwordRegex.test(password);
  },

  verifyDate(date) {
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    return dateRegex.test(String(date));
  },
};
