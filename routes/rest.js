var express = require('express');
var router = express.Router();
var io = require('../socketApi').io;
var exec = require("child_process").exec;

//var socketApi = require('../socketApi');
//TODO:autologin
// exec('casperjs ./spider/autologin.js',function(err,stdout,stderr){
//     console.log('stdout: ' + stdout);
// });


/* Rest */
//kill $(ps aux|grep casperjs| awk '{print $2}')
router.post('/save_cookie', function(req, res) {
    io.sockets.emit('hello', {msg: 'Hello World!'});
    console.log(req.body,'this is request')
    var b_session = req.body.b_session;
    var session = JSON.parse(b_session);
    res.send(session);
});
module.exports = router;
