class FindCrushesByPattern {
  constructor(crushModel) {
    this.crushModel = crushModel;
  }

  execute(pattern) {
    const desiredPatternRegex = new RegExp(pattern, 'i');

    const allCrushes = this.crushModel.listAll();

    const matchedCrushes = allCrushes.filter((crush) => desiredPatternRegex.test(crush.name));

    return matchedCrushes;
  }
}

module.exports = FindCrushesByPattern;
