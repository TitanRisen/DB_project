var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
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
    connection.connect();
    connection.query({
      sql: 'update  into administrator(ID,password) value("?","?")',
      timeout: 40000, // 40s
      values: [account, password]
    }, function (error, rows, fields) {
      if (error) throw error;
      //row不存在
    });
    connection.end();
  });
  
module.exports = router;
