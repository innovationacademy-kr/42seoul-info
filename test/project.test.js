const data = require('./testData.js');

const ObjectUtils = require('../common/ObjectUtils');
const ImageUtils = require('../common/ImageUtils');

test('get project list and sort', () => {
  projectList = data.projects_users;
  expect(projectList.length).toBe(27);
  ObjectUtils.calcDiff(projectList, 'marked_at');
  expect(projectList[3].diff).toBe(18);
});

test('small image path', () => {
  const imagePath = 'https://cdn.intra.42.fr/users/jasong.jpg';
  const smallImagePath = 'https://cdn.intra.42.fr/users/small_jasong.jpg';
  const resultPath = ImageUtils.small(imagePath);
  expect(resultPath).toBe(smallImagePath);
});
