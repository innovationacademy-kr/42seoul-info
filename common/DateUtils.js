const dayjs = require('dayjs');

const DateUtils = {
  DEFAULT_FORMAT: 'YYYY-MM-DD',
  getToday: function() {
    return dayjs().format(this.DEFAULT_FORMAT);
  },
  parse: function(str) {
    return dayjs(str);
  },
  format: function(date, formatStr) {
    if (!date) {
      return '';
    }
    return dayjs(date).format(formatStr);
  }
};

module.exports = DateUtils;