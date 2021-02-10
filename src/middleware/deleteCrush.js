// const { readFile } = require('../utils/managefile');

// // Requisito 6
// const deleteCrush = async (req, res) => {
//   const token = await req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Token não encontrado' });
//   }
//   if (token.length !== 16) {
//     return res.status(401).json({ message: 'Token inválido' });
//   }
//   const data = await readFile();
//   const crushId = req.params.id;
//   console.log(data);
//   console.log(crushId);
// };

// module.exports = deleteCrush;
