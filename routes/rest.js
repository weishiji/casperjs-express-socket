var express = require('express');
var router = express.Router();
var io = require('../socketApi').io;
var exec = require("child_process").exec;
spawn = require('child_process').spawn;
var path = require('path');
var cheerio = require('cheerio')

function start(){
    var autoLoginPath = path.dirname(__dirname) + '/spider/autologin.js';
    console.log(autoLoginPath,'this is script path')
    exec("kill $(ps aux|grep casperjs| awk '{print $2}')",{
        maxBuffer : '1024 * 1024'
    },function(){
        var casperCommand = spawn('casperjs',[autoLoginPath])
        casperCommand.stdout.on('data',function(data){
            console.log(data.toString())
            var dataStr = '<div>' + data.toString() + '</div>';
            var $ = cheerio.load(dataStr,{
                decodeEntities : false
            });
            var $betList = $('.BetreceiptContent');
            if($betList.length){
                $betList.children('div.hidden').remove();
                var sendStr = $betList.html();
                
                io.sockets.emit('start', {msg: sendStr})
            }
        })
        casperCommand.stderr.on('data', function(data){
            console.log(data,'this is stdrr');
        });
    })
}

/* Rest */
//kill $(ps aux|grep casperjs| awk '{print $2}')
router.post('/save_cookie', function(req, res) {
    console.log(req.body,'this is request')
    var b_session = req.body.b_session;
    var session = JSON.parse(b_session);
    start();
    res.send(session);
});
router.post('/start',function(req,res){
    start();
})

module.exports = router;
