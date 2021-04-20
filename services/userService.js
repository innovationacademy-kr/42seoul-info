const ObjectUtils = require('../common/ObjectUtils');
const User = require('../stores/User');
const axios = require('axios');

const checkIfCoalition = (coalition) => {
  return ((coalition) ? coalition : { name: '', cover_url: '' });
}

const userService = {
  findOne: async function (username) {
    return await User.findOne(username);
  },
  save: async function (user) {
    return await User.save(user);
  },
  findAll: async function () {
    return await User.findAll();
  },
  update: async function (username, accessToken) {
    const END_POINT_42_API = "https://api.intra.42.fr";
    const axios42 = axios.create({
      baseURL: END_POINT_42_API,
      timeout: 2500,
      'headers':
        { 'Authorization': 'Bearer ' + accessToken }
    });
    const coalitionUri = `${END_POINT_42_API}/v2/users/${username}/coalitions`;
    const userUri = `${END_POINT_42_API}/v2/users/${username}`;
    const response = await axios.all([axios42.get(userUri), axios42.get(coalitionUri)]);
    one = { ...response[0].data, 'coalition': response[1].data[0] };
    ObjectUtils.calcDiff(one.projects_users, 'marked_at');
    one.coalition = checkIfCoalition(one.coalition);
    await userService.save(one);
    return one;
  }
};

module.exports = userService;
