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
    return dayjs(date).format(formatStr);
  }
};

module.exports = DateUtils;