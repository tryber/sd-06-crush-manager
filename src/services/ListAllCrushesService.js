class ListAllCrushesService {
  constructor(crushModel) {
    this.crushModel = crushModel;
  }

  execute() {
    const crushData = this.crushModel.listAll();

    return crushData;
  }
}

module.exports = ListAllCrushesService;
