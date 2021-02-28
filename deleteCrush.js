const fs = require('fs').promises;

const crushData = 'crush.json';

module.exports = {
  async deleteCrush(request, response) {
    const file = await fs.readFile(crushData, 'utf-8');

    let fileJson = JSON.parse(file);

    const { id } = request.params;

    const { authorization } = request.headers;

    if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

    if (String(authorization).length < 16) return response.status(401).json({ message: 'Token inválido' });

    fileJson = fileJson.map((crush) => crush.id !== +id);

    await fs.writeFile(crushData, JSON.stringify(fileJson));

    return response.status(200).json({ message: 'Crush deletado com sucesso' });
  },
};
