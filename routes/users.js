const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ObjectUtils = require('../common/ObjectUtils');
const DateUtils = require('../common/DateUtils');
const ImageUtils = require('../common/ImageUtils');
const TransUtils = require('../common/TransUtils');
const userService = require('../services/userService');

/* GET users listing. */
router.get('/', ensureLoggedIn('/login/42'), async function (req, res, next) {
  const username = req.query.u;
  const refresh = req.query.r;
  let coalition;
  let user;

  try {
    user = await userService.findOne(username);
    if (user !== null) {
      coalition = (user && typeof user.coalition === 'string') ? JSON.parse(user.coalition) : user.coalition;
    }
  } catch (err) {
    console.log("[user.js] findOne: ", err);
  }
  let one;
  if (!user || refresh) {
    try {
      if (!coalition) {
        one = await userService.updateOne(username, req.session.accessToken);
        coalition = one.coalition;
      } else {
        one = await userService.updateBatch(username, req.session.accessToken, coalition);
      }
    } catch (err) {
      const error = new Error("[user.js] getUri, getCoalition: " + err.message);
      error.status = (err.response) ? err.response.status : 500;
      if (error.status === 401) {
        res.redirect('/login/42');
        return;
      }
      next(error);
      return;
    }
  } else {
    one = (typeof user.data === 'string') ? JSON.parse(user.data) : user.data;
    ObjectUtils.calcDiff(one.projects_users, 'marked_at');
  }
  one.image_small = ImageUtils.small(one.image_url);
  res.render('user', {
    user: one,
    coalition,
    updatedAt: DateUtils.getDatetime((!user || refresh) ? undefined : user.updatedAt),
    DateUtils,
    TransUtils,
  })
});

router.get('/list', ensureLoggedIn('/login/42'), async function (req, res, next) {
  const userList = await userService.getListOfUsername();
  userList.forEach(user => {
    user.blackhole = DateUtils.format(user.blackholedAt, 'YY/MM/DD HH:mm:ss');
    user.toBlack = DateUtils.datediff(Date.now(), user.blackholedAt);
  });
  const data = {
    list: userList
  };
  res.render('users/list', data);
});

module.exports = router;
