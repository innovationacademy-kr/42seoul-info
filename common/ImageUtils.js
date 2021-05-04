const ImageUtils = {
  small: function(imagePath) {
    const changedPath = imagePath.replace(/\/users\//, '/users/small_');
    return changedPath;
  }
};

module.exports = ImageUtils;
