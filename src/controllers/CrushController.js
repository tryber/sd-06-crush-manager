const CrushModel = require('../models/Crush.js');
const ListAllCrushesService = require('../services/ListAllCrushesService.js');
const FindCrushByIDService = require('../services/FindCrushByIDService.js');
const CreateCrushService = require('../services/CreateCrushService.js');
const UpdateCrushService = require('../services/UpdateCrushService.js');
const RemoveCrushByIDService = require('../services/RemoveCrushByIDService.js');
const FindCrushesByPattern = require('../services/FindCrushesByPattern.js');
const AppError = require('../errors/AppError.js');

class CrushController {
  constructor() {
    this.list = this.list.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.findByPattern = this.findByPattern.bind(this);
  }

  list(_request, response) {
    this.num += 1;

    const crushModel = new CrushModel();
    const listAllCrushesService = new ListAllCrushesService(crushModel);

    const crushList = listAllCrushesService.execute();

    return response.status(200).json(crushList);
  }

  find(request, response) {
    this.num += 1;

    const { id } = request.params;

    const crushModel = new CrushModel();
    const findCrushByIDService = new FindCrushByIDService(crushModel);

    const crushList = findCrushByIDService.execute(id);

    return response.status(200).json(crushList);
  }

  create(request, response) {
    this.num += 1;

    const { name, age, date } = request.body;

    if (!name || !age) {
      const message = `O campo "${name ? 'age' : 'name'}" é obrigatório`;

      throw new AppError(message);
    }

    if (!date || !date.datedAt || !date.rate) {
      throw new AppError('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }

    const crushModel = new CrushModel();
    const createCrushService = new CreateCrushService(crushModel);

    const crushToCreate = {
      name,
      age,
      date,
    };

    const newCrush = createCrushService.execute(crushToCreate);

    return response.status(201).json(newCrush);
  }

  update(request, response) {
    this.num += 1;

    const { id } = request.params;
    const { name, age, date } = request.body;

    if (!name || !age) {
      const message = `O campo "${name ? 'age' : 'name'}" é obrigatório`;

      throw new AppError(message);
    }

    if (!date || !date.datedAt || !date.rate) {
      throw new AppError('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }

    const crushModel = new CrushModel();
    const updateCrushService = new UpdateCrushService(crushModel);

    const crushToUpdate = {
      id,
      name,
      age,
      date,
    };

    const updatedCrush = updateCrushService.execute(crushToUpdate);

    return response.status(200).json(updatedCrush);
  }

  remove(request, response) {
    this.num += 1;

    const { id } = request.params;

    const crushModel = new CrushModel();
    const removeCrushByIDService = new RemoveCrushByIDService(crushModel);

    removeCrushByIDService.execute(id);

    return response.status(200).json({ message: 'Crush deletado com sucesso' });
  }

  findByPattern(request, response) {
    this.num += 1;

    const { q: pattern } = request.query;

    if (!pattern) {
      throw new AppError('Parâmetro de busca inválido');
    }

    const crushModel = new CrushModel();
    const findCrushesByPattern = new FindCrushesByPattern(crushModel);

    const crushList = findCrushesByPattern.execute(pattern);

    return response.status(200).json(crushList);
  }
}

module.exports = CrushController;
