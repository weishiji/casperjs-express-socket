var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
//TODO:autologin
// exec('casperjs ./spider/autologin.js',function(err,stdout,stderr){
//     console.log('stdout: ' + stdout);
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' });
});

module.exports = router;
