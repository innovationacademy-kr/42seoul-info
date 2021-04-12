const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const axios = require('axios');
const dayjs = require('dayjs');
const User = require('../stores/User');
const ObjectUtils = require('../common/ObjectUtils');

/* GET users listing. */
router.get('/', ensureLoggedIn('/login/42'), async function (req, res, next) {
  const username = req.query.u;
  const refresh = req.query.r;
  const user = await User.findOne(username);
  if (!user || refresh) {
    const accessToken = req.session.accessToken;

    const headers = {
      'headers':
        { 'Authorization': 'Bearer ' + accessToken }
    }
    const uri = 'https://api.intra.42.fr/v2/users/' + username;
    axios.get(uri, headers)
      .then(async response => {
        const one = response.data;
        ObjectUtils.calcDiff(one.projects_users, 'marked_at');
        await User.save(one);
        res.render('user', { user: one, updatedAt: dayjs().format('YYYY/MM/DD HH:mm:ss'), dayjs });
      })
      .catch(e => {
        const error = new Error(e.message);
        console.log(e.message);
        error.status = e.response.status;
        if (error.status === 401) {
          res.redirect('/login/42');
          return;
        }
        next(error);
      })
      .finally(() => { });
  } else {
    const one = (typeof user.data === 'string') ? JSON.parse(user.data) : user.data;
    ObjectUtils.calcDiff(one.projects_users, 'marked_at');
    res.render('user', { user: one, updatedAt: dayjs(user.updatedAt).format('YYYY/MM/DD HH:mm:ss'), dayjs })
  }

});

module.exports = router;
