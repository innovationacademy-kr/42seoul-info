const achieveMap = {
  'Etre logué 24h de suite. (à bosser, ofc !)': 'To be logged in 24 hours a day. (to work, ofc!)',
  'Etre logué 90h sur une semaine.': 'Be logged in 90 hours over a week.',
  'Assister à une conférence.': 'Attend a conference.',
  'Assister à 3 conférences.': 'Attend 3 conferences.',
  'Assister à 10 conférences.': 'Assister à 10 conférences.',
  'Avoir donné 1 point de correction au pool.': 'Have given 1 correction point to the pool.',
  'Avoir donné 10 points de correction au pool.': 'Have given 10 correction points to the pool.',
  'Valider son premier projet.': 'Validate your first project.',
  'Valider 3 projets.': 'Validate 3 projects.',
  'Valider 10 projets.': 'Validate 10 projects.',
  'Valider 21 projets.': 'Validate 21 projects.',
  'S\'être logué dans le même cluster un mois de suite.': 'Have logged into the same cluster one month in a row.',
  'Faire une soutenance sans avoir validé le projet.': 'Make a defense without having validated the project.',
  'Participer à 21 soutenances d\'affilée sans en manquer aucune.': 'Participate in 21 defenses in a row without missing any.',
  'Avoir 100 points de wallet.': 'Have 100 wallet points.',
  'Valider 3 projets d\'affilée (journées de piscines comprises).': 'Validate 3 projects in a row (swimming pool days included).',
  'Valider 10 projets d\'affilée (journées de piscines comprises).': 'Validate 10 projects in a row (swimming pool days included).',
  'Obtenir les achievements "404 - Sleep not found" et "In the name of Nicolas !"': 'Obtain the achievements "404 - Sleep not found" and "In the name of Nicolas!"',
  'Tu as réussi ta piscine C. Bienvenue à 42 !': 'You have successfully completed your C pool. Welcome to 42!'
};

const Trans = {
  toEnglish: function (french) {
    const english = achieveMap[french.trim()];
    return (english) ? english : french;
  }
};

module.exports = Trans;