const MessageUtils = {

  getStatusCode: function (message) {
    const result = message.match(/\d{3}/);
    return (result) ? result[0] : message;
  }

};

module.exports = MessageUtils;
