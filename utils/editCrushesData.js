const fs = require('fs').promises;

function editData(crush) {
  const receivedData = JSON.stringify(crush);
  const newData = fs.writeFile('crush.json', receivedData, (err, data) => {
    if (!err) return data;

    return process.exit(1);
  });

  return newData;
}

module.exports = editData;
