var express = require('express');
var router = express.Router();
var connection = require('./config');

/* GET index page. */
router.get('/', function (req, res) {
  res.redirect('/index');
});
router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route("/login")
  // .get(function (req, res) {
  //   res.redirect('/index');
  // })
  .get(function (req, res) {
    req.body.account = "admin";
    req.body.password = "admin";
    var account = req.body.account;
    var password = req.body.password;
    connection.connect();
    connection.query({
      sql: 'SELECT * FROM `account` WHERE `account` = ?',
      timeout: 40000, // 40s
      values: [account]
    }, function (error, rows, fields) {
      if (error) throw error;
      if (rows[0]) {//用户存在
        if (password = rows[0].password) {//并且密码正确
          console.log('login success: ', rows[0]);
          if (rows[0].account_type == 0)
            res.render('expert_board', { title: 'Express' });
          else res.render('dashboard', { title: 'Express' });
        }
        else console.log('fail: ', "密码错误");
      }
      else {//该账户不存在
        console.log("账户不存在")
      }
    });
    connection.end();
  });

router.route("/register")
  // .get(function (req, res) {
  //   res.redirect('/index');
  // })
  .get(function (req, res) {
    req.body.account = "test";
    req.body.password = "test";
    req.body.account_type = 1;// 1是系统管理员，0是专家
    var account = req.body.account;
    var password = req.body.password;
    connection.connect();
    connection.query({
      sql: 'insert into account(account,password,account_type) value(?,?,?);',
      timeout: 40000, // 40s
      values: [account, password, account_type]
    }, function (error, rows, fields) {
      if (error) throw error;
      //不知道如何检测数据库插入成功，姑且认为都成功了吧
      console.log('register success: ', rows[0]);
      if (rows[0].account_type == 0)
        res.render('expert_board', { title: 'Express' });
      else res.render('dashboard', { title: 'Express' });
    });
    connection.end();
  });

router.get('/logout', function (req, res) {
  res.redirect('/index');
});

module.exports = router;
