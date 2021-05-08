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

var tries = 1;

async function updateList(list, accessToken) {
  var idx = 0;
  const failedList = [];
  var asyncFunction = setInterval(fetchData, 3000);

  async function fetchData() {
    var user = list[idx];
    if (!user) {
      clearInterval(asyncFunction);
      return;
    }
    console.log(idx, user.id, user.username);
    try {
      await userService.updateBatch(user.username, accessToken, user.coalition);
    } catch (e) {
      failedList.push(user);
      console.log(`err: ${user.username}, ${e.message}`);
    }
    idx++;
    if (tries < 4 && idx === list.length) {
      console.log(`failed`, failedList.length, JSON.stringify(failedList.map(user => user.username)));
      clearInterval(asyncFunction);

      if (failedList.length > 0) {
        tries++;
        console.log('\n\n', tries + ' trial ===');
        await updateList(failedList, accessToken);
      }
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
  console.log(`Scheduled: ${activeList.length} cadets`);
}

doIt();
