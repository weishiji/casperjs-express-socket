var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
exec('casperjs ./casper/startup.js',function(err,stdout,stderr){
    console.log('stdout: ' + stdout);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' });
});

module.exports = router;
