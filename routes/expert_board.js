var express = require('express');
var router = express.Router();
var model = require('./model.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.account && req.session.account_type == 0) {
    (async () => {
      var p = await model.expert.findOne({ where: { account_ID: req.session.account_ID } });
      console.log("expert is ",p);
      res.render('expert_board', {
        title: 'Express',
        expert:p
      });
    })();
  }
  else res.redirect('/index');
});

router.route("/entering")//录入专家信息
  .post(function (req, res) {
    console.log(req.body);
    model.expert.update(req.body,
      {
        where: {
          account_ID: req.session.account_ID
        }
      })
      .then(project => {
        console.log("update Successfully");
        res.redirect('/expert_board');
      })
      .catch(error => {
        res.send(500);
        console.log(error);
      });
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
