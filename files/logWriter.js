const fs = require('fs');
const path = require('path');

function writeLog(error) {
  const filepath = path.join(__dirname, 'log.txt');
  const { name, message } = error;
  fs.writeFile(filepath, JSON.stringify({ error: { name, message } }), (err) => {
    if (err) throw err;
  });
}

module.exports = { writeLog };
