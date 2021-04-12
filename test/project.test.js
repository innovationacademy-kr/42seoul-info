const data = require('./testData.js');

const ObjectUtils = require('../common/ObjectUtils');

test('get project list and sort', () => {
  projectList = data.projects_users;
  expect(projectList.length).toBe(38);
  ObjectUtils.calcDiff(projectList, 'marked_at');
  expect(projectList[3].diff).toBe(31);
});
