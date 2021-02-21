// const resError = (bool, res, message, status) => {
//   if (bool) {
//     if (status) {
//       res.status(status).json({ message });
//     } else {
//       res.json({ message });
//     }
//     return false;
//   }
//   return true;
// };

const resError = (res) => {
  let boolSaida = false;
  const resError3 = () => ({ resError2: resError3, boolSaida });
  const resError2 = (bool, message, status) => {
    if (bool) {
      if (status) {
        res.status(status).json({ message });
      } else {
        res.json({ message });
      }
      boolSaida = true;
      return { resError2: resError3, boolSaida };
    }
    return { resError2, boolSaida };
  };
  return { resError2 };
};

module.exports = resError;
