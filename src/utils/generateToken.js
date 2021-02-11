module.exports = function generateToken() {
  const validChars = 'abcdefghijklmnopqrstuvwyxz0123456789';

  const interactionsArray = Array.from(
    { length: 16 },
    (_, index) => index + 1,
  );

  let token = '';

  interactionsArray.forEach(() => {
    const letterIndex = Math.round(Math.random() * 35);
    const isUpper = Math.round(Math.random());

    let letter = validChars[letterIndex];

    if (isUpper) {
      letter = letter.toUpperCase();
    }

    token += letter;
  });

  return token;
};
