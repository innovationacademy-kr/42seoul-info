const DateUtils = require('../common/DateUtils')
test('DateUtils.getToday()', () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = year + '-' + ((month > 9) ? month : '0' + month) + '-' + ((day > 9) ? day : '0' + day);
  expect(DateUtils.getToday()).toBe(dateStr);
});

test('DateUtils.format', () => {
  expect(DateUtils.format(new Date('2021/04/17 13:05:05'), 'YYYY-MM-DD HH:mm:ss')).toBe('2021-04-17 13:05:05');
  expect(DateUtils.format(undefined, 'YYYY-MM-DD HH:mm:ss')).toBe('');
});