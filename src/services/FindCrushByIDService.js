const AppError = require('../errors/AppError');

class FindCrushByIDService {
  constructor(crushModel) {
    this.crushModel = crushModel;
  }

  execute(id) {
    const isNumericRegex = /^\d*$/;
    const idIsNumeric = isNumericRegex.test(id);

    if (!idIsNumeric) {
      throw new AppError('ID Inválido');
    }

    const numericID = Number(id);

    const crushData = this.crushModel.findByID(numericID);

    if (!crushData) {
      throw new AppError('Crush não encontrado', 404);
    }

    return crushData;
  }
}

module.exports = FindCrushByIDService;
