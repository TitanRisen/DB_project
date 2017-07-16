var express = require('express');
var router = express.Router();
//var connection = require('./config');
var model = require('./model.js');

/* GET index page. */
router.get('/', function (req, res) {
  res.redirect('/index');
});
router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route("/login")
  .get(function (req, res) {
    res.redirect('/index');
  })
  .post(function (req, res) {
    var account = req.body.account;
    var password = req.body.password;
    (async () => {
      var p = await model.account.findOne({ where: { account: account } });
      if (p) {
        if (password == p.password) {//并且密码正确
          req.session.account = account;
          req.session.account_type = p.account_type;
          req.session.account_ID = p.ID;
          if (p.account_type == 0)
            //res.render('expert_board', { title: 'Express' });
            res.redirect('/expert_board');
          else //res.render('dashboard', { title: 'Express' });
            res.redirect('/dashboard');
        }
        else console.log('fail: ', "密码错误");
      } else {
        console.log("账户不存在");
      }
    })();
  });

router.route("/register")
  .get(function (req, res) {
    res.redirect('/index');
  })
  .post(function (req, res) {
    var account = req.body.account;
    var account_type = req.body.account_type;
    var password = req.body.password;
    (async () => {
      var p = await model.account.findOne({ where: { account: account } });
      if (!p) {//该账户不存在
        // model.account.create({
        //   account: account,
        //   account_type: account_type,
        //   password: password
        // })
        model.account.create(req.body)//可以直接用对象的传递，即使req.body里面还包括identification等别的键也不影响，但最好还是单独列一个对象键来赋予
          // {
          //   account_type: '1',
          //     account: 'admin',
          //       password: 'admin',
          //         identification: 'a'
          // }
          .then(project => {
            req.session.account = account;
            req.session.account_type = account_type;
            if (account_type == 0) {
              model.expert.create({
                account_ID: project.ID
              })
                .then(project2 => {
                  req.session.account_ID = project.ID;
                  console.log("create expert Successfully");
                  res.redirect('/expert_board');
                })
                .catch(error => {
                  res.send(500);
                  console.log(error);
                });
            }
            else res.redirect('/dashboard');
            console.log("create account Successfully");
          })
          .catch(error => {
            res.send(500);
            console.log(error);
          });
      } else {
        res.send(500);
        console.log("账户已经存在");
      }
    })();
  });

router.get('/logout', function (req, res) {
  res.redirect('/index');
});

module.exports = router;
