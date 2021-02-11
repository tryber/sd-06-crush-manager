const fs = require('fs');
const path = require('path');

class Crush {
  constructor() {
    this.dataPath = path.resolve(__dirname, '..', '..', 'crush.json');
  }

  listAll() {
    const rawData = fs.readFileSync(this.dataPath);
    const crushData = JSON.parse(rawData);

    return crushData || [];
  }

  findByID(id) {
    const rawData = fs.readFileSync(this.dataPath);
    const crushData = JSON.parse(rawData);

    const desiredCrush = crushData.find((crush) => crush.id === id);

    return desiredCrush;
  }

  create({ name, age, date }) {
    const rawData = fs.readFileSync(this.dataPath);
    const crushData = JSON.parse(rawData);

    const lastItemIndex = crushData.length - 1;
    const newCrushID = crushData[lastItemIndex].id + 1;

    const newCrushData = {
      name,
      age,
      date,
      id: newCrushID,
    };

    const newCrushes = [...crushData, newCrushData];

    fs.writeFileSync(this.dataPath, JSON.stringify(newCrushes), {
      encoding: 'utf8',
    });

    return newCrushData;
  }

  update({ name, age, date, id }) {
    const rawData = fs.readFileSync(this.dataPath);
    const crushData = JSON.parse(rawData);

    const updatedCrush = {
      name,
      age,
      date,
      id,
    };

    const newCrushData = crushData.map((crush) => {
      if (crush.id !== id) {
        return crush;
      }

      return updatedCrush;
    });

    fs.writeFileSync(this.dataPath, JSON.stringify(newCrushData), {
      encoding: 'utf8',
    });

    return updatedCrush;
  }

  delete(id) {
    const rawData = fs.readFileSync(this.dataPath);
    const crushData = JSON.parse(rawData);

    const updatedCrushes = crushData.filter((crush) => crush.id !== id);

    fs.writeFileSync(this.dataPath, JSON.stringify(updatedCrushes), {
      encoding: 'utf8',
    });
  }
}

module.exports = Crush;
