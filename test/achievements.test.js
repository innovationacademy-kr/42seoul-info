const TransUtils = require('../common/TransUtils');

test('achievement test, TransUtils', () => {
  const english = TransUtils.toEnglish('Etre logué 90h sur une semaine.');
  expect(english).toBe('Be logged in 90 hours over a week.');

  const trimNeeded = TransUtils.toEnglish('Valider 3 projets. ');
  expect(trimNeeded).toBe('Validate 3 projects.');

  const notFound = TransUtils.toEnglish('Valider 3 projets.' + '.');
  expect(notFound).toBe('Valider 3 projets..');
});
