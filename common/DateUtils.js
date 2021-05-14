const dayjs = require('dayjs');

const DateUtils = {
  DEFAULT_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  getToday: function() {
    return dayjs().format(this.DEFAULT_FORMAT);
  },
  getDatetime: function(datetime) {
    return dayjs(datetime).format(this.DATETIME_FORMAT);
  },
  parse: function(str) {
    return dayjs(str);
  },
  format: function(date, formatStr) {
    if (date === null) {
      return '';
    }
    return dayjs(date).format(formatStr);
  },
  datediff: function(from, to) {
    const date1 = dayjs(from);
    const date2 = dayjs(to);
    const diff = date2.diff(date1, 'day', false);
    return diff + ' 일';
  }
};

module.exports = DateUtils;
