require('dotenv').config();
const { Op } = require("sequelize");
const axios = require('axios');
const userService = require('../services/userService');
const END_POINT_42_API = "https://api.intra.42.fr";

async function getToken() {
  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.FORTYTWO_CLIENT_ID,
    client_secret: process.env.FORTYTWO_CLIENT_SECRET
  };
  try {
    const res = await axios(END_POINT_42_API + '/oauth/token',
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data)
      });
    if (res) {
      return res.data;
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  };
}

async function getActiveList(where) {
  return await userService.findAll(where);;
}

async function updateList(list, accessToken) {
  var asyncFunction = setInterval(fetchData, 3000);
  var idx = 0;
  function fetchData() {
    var user = list[idx];
    console.log(idx, user.id, user.username);
    try {
      userService.updateBatch(user, accessToken);
    } catch (e) {
      console.log(`err: ${user.username}, e.message`);
    }
    idx++;
    if (idx === list.length) {
      clearInterval(asyncFunction);
    }
  }
}

async function doIt() {
  // get accessToken
  const token = await getToken();
  console.log(token.access_token);

  // load list with active status
  const where = {
    where: {
      id: {
        [Op.gte]: process.env.START_ID || 0
      },
      active: {
        [Op.eq]: true
      }
    }
  }
  const activeList = await getActiveList(where);

  // update each item every 3 senconds
  if (activeList.length > 0 && token.access_token) {
    await updateList(activeList, token.access_token);
  }
  console.log(`Finished: ${activeList.length} cadets`);
}

doIt();
