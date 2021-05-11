const FileUtils = require('../common/FileUtils');

test('read file with lowercase', async () => {
  const filePath = __dirname + '/list.txt';
  const list = await FileUtils.getListFromFile(filePath);
  expect(list.length).toBe(6);
  expect(list[4]).toBe('saam');
});
