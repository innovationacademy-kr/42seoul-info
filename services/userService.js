const ObjectUtils = require('../common/ObjectUtils');
const User = require('../stores/User');
const axios = require('axios');

const checkIfCoalition = (coalition) => {
  return ((coalition) ? coalition : { name: '', cover_url: '' });
}

const END_POINT_42_API = "https://api.intra.42.fr";
const axios42 = function (accessToken) {
  const axios42 = axios.create({
    baseURL: END_POINT_42_API,
    timeout: 2500,
    'headers':
      { 'Authorization': 'Bearer ' + accessToken }
  });
  return axios42;
};
const userService = {
  findOne: async function (username) {
    return await User.findOne(username);
  },
  save: async function (user, coalition) {
    return await User.save(user, coalition);
  },
  findAll: async function (where) {
    console.log(where);
    return await User.findAll(where || {});
  },
  updateOne: async function (username, accessToken) {
    const userUri = `${END_POINT_42_API}/v2/users/${username}`;
    const coalitionUri = `${END_POINT_42_API}/v2/users/${username}/coalitions`;
    const response = await axios.all([axios42(accessToken).get(userUri), axios42(accessToken).get(coalitionUri)]);
    one = { ...response[0].data, 'coalition': response[1].data[0] };
    ObjectUtils.calcDiff(one.projects_users, 'marked_at');
    one.coalition = checkIfCoalition(one.coalition);
    await userService.save(one, checkIfCoalition(one.coalition));
    return one;
  },
  updateBatch: async function (user, accessToken) {
    const userUri = `${END_POINT_42_API}/v2/users/${user.username}`;
    const response = await axios.all([axios42(accessToken).get(userUri)]);
    one = { ...response[0].data };
    ObjectUtils.calcDiff(one.projects_users, 'marked_at');
    await userService.save(one, checkIfCoalition(user.coalition));
    return one;
  }
};

module.exports = userService;
