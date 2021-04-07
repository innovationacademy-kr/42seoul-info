const MessageUtils = require('../common/MessageUtils');

test('error message', () => {
  expect(MessageUtils.getStatusCode('error 401')).toBe('401');
  expect(MessageUtils.getStatusCode('error')).toBe('error');
});
