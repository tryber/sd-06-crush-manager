const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const charList = chars.split('');
const charListLength = charList.length;

function sortCharIndex() {
  return Math.round(Math.random() * (charListLength - 1));
}

module.exports = function generateToken(tokenSize) {
  const tokenAggregator = [];
  for (let i = 1; i <= tokenSize; i += 1) {
    const index = sortCharIndex();
    const char = charList[index];
    tokenAggregator.push(char);
  }
  const token = tokenAggregator.join('');
  return token;
};
