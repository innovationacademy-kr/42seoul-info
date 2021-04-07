const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const axios = require('axios');

/* GET users listing. */
router.get('/', ensureLoggedIn('/login/42'), function (req, res, next) {
  const username = req.query.u;
  const accessToken = req.session.accessToken;
  const headers = {
    'headers':
      { 'Authorization': 'Bearer ' + accessToken }
  }
  const uri = 'https://api.intra.42.fr/v2/users/' + username;
  axios.get(uri, headers)
    .then(response => {
      res.render('user', { user: response.data });
    })
    .catch(e => {
      const error = new Error(e.message);
      error.status = e.response.status;
      next(error);
    })
    .finally(() => { });

});

module.exports = router;
