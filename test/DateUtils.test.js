const DateUtils = require('../common/DateUtils');
const dayjs = require('dayjs');

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function lpad(number) {
  return number > 9 ? String(number) : '0' + number;
}
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const dateStr = year + '-' + lpad(month) + '-' + lpad(day);
const timeStr = lpad(date.getHours()) + ':' + lpad(date.getMinutes()) + ':' + lpad(date.getSeconds());

test('DateUtils.getToday()', () => {
  expect(DateUtils.getToday()).toBe(dateStr);
});

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
test('DateUtils.format', () => {
  expect(DateUtils.format(new Date('2021/04/17 13:05:05'), DATETIME_FORMAT)).toBe('2021-04-17 13:05:05');
  expect(DateUtils.format('2021/04/17 13:05:05', DATETIME_FORMAT)).toBe('2021-04-17 13:05:05');
  expect(DateUtils.format(undefined, DATETIME_FORMAT)).toBe(dateStr + ' ' + timeStr);
  expect(DateUtils.format(null, DATETIME_FORMAT)).toBe('');
});

test('DateUtils.getDatetime', () => {
  expect(DateUtils.getDatetime('2021/04/17 13:05:05')).toBe('2021-04-17 13:05:05');
  expect(DateUtils.getDatetime(undefined)).toBe(dateStr + ' ' + timeStr);
});

test('datediff', () => {
  expect(DateUtils.datediff('2021/04/16 13:05:05', '2021/04/17 13:05:05')).toBe('1 일');
  expect(DateUtils.datediff('2021/03/16 13:05:05', '2021/04/17 13:05:05')).toBe('32 일');
});
