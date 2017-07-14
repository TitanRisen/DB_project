var express = require('express');
var router = express.Router();
var model = require('./model.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('expert_board', { title: 'Express' });
});

router.route("/entering")//录入专家信息
  .post(function (req, res) {
    // connection.connect();
    // connection.query({
    //   //高变更处
    //   sql: 'INSERT INTO `expert` WHERE `ID` = ?',
    //   timeout: 40000, // 40s
    //   values: [account]
    // }, function (error, rows, fields) {
    //   if (error) throw error;
    //   if (rows[0]) {
    //     console.log('success: ', rows[0]);
    //   }
    //   else {//该账户不存在
    //     console.log("账户不存在")
    //   }
    // });
    // connection.end();
  });

router.route("/altering")//更改客户密码
  // .get(function (req, res) {
  //   res.redirect('/index');
  // })
  .get(function (req, res) {
    req.body.account = "test";
    req.body.password = "test";
    var account = req.body.account;
    var password = req.body.password;
    // connection.connect();
    // connection.query({
    //   sql: 'update  into administrator(ID,password) value("?","?")',
    //   timeout: 40000, // 40s
    //   values: [account, password]
    // }, function (error, rows, fields) {
    //   if (error) throw error;
    //   //row不存在
    // });
    // connection.end();
  });



module.exports = router;
