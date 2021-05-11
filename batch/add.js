
require('dotenv').config();
const axios = require('axios');
const userService = require('../services/userService');
const FileUtils = require('../common/FileUtils');
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

var tries = 1;

async function updateList(list, accessToken) {
  var idx = 0;
  const failedList = [];
  var asyncFunction = setInterval(addData, 3000);

  async function addData() {
    var username = list[idx];
    console.log(idx, username);
    try {
      await userService.updateOne(username, accessToken);
    } catch (e) {
      failedList.push(username);
      console.log(`err: ${username}, ${e.message}`);
    }
    idx++;
    if (tries < 4 && idx === list.length) {
      console.log(`failed`, failedList.length, JSON.stringify(failedList));
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

  const filePath = __dirname + '/list.txt';
  const activeList = await FileUtils.getListFromFile(filePath);

  // update each item every 3 senconds
  if (activeList.length > 0 && token.access_token) {
    await updateList(activeList, token.access_token);
  }
  console.log(`Scheduled: ${activeList.length} cadets`);
}

doIt();
