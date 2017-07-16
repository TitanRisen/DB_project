var express = require('express');
var router = express.Router();
var model = require('./model.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.account && req.session.account_type == 1) {
    (async () => {
      var p = await model.expert.findAll({ where: {} });
      res.render('dashboard', {
        title: 'Express',
        experts: p
      });
    })();
  }
  else res.redirect('/index');
});

router.route("/altering")//更改客户密码
  .get(function (req, res) {
    res.redirect('/index');
  })
  .post(function (req, res) {
    var account = req.session.account;
    var password = req.body.old;
    var new_password = req.body.new;
    (async () => {
      var p = await model.account.findOne({ where: { account: account } });
      if (p) {
        if (password == p.password) {//并且密码正确
          model.account.update({
            password: new_password,
          }, {
              where: {
                account: account
              }
            });
          console.log('altering success: ', p);
        }
        else console.log('fail: ', "原始密码错误");
      } else {
        console.log("账户不存在");
      }
    })();
  });

module.exports = router;
