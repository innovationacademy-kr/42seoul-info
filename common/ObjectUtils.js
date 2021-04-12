const ObjectUtils = {
  calcDiff: function (list, key) {
    list.sort((a, b) => (a[key] < b[key]) ? -1 : 1);
    let lastTime = 0;
    list.forEach(item => {
      const timestamp = new Date(item[key]).getTime();
      const diff = timestamp - lastTime;
      lastTime = timestamp;
      const diffHour = Math.round(diff / 1000 / 60 / 60);
      item.diff = (Math.abs(diffHour) > 100000) ? 0 : diffHour;
    });
  }
}
module.exports = ObjectUtils;
