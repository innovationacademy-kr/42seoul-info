const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

const FileUtils = {
  getListFromFile: async function (filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    const list = [];
    rl.on('line', line => {
      if (line && line.trim()) {
        list.push(line.toLowerCase().trim());
      }
    });
    await once(rl, 'close');
    return list;
  }
};

module.exports = FileUtils;
