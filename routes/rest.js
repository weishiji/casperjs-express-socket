var express = require('express');
var router = express.Router();
var io = require('../socketApi').io;
var exec = require("child_process").exec;
spawn = require('child_process').spawn;
var path = require('path');

function start(){
    var autoLoginPath = path.dirname(__dirname) + '/spider/autologin.js';
    exec("kill $(ps aux|grep casperjs| awk '{print $2}')",function(){
        var casperCommand = spawn('casperjs',[autoLoginPath])
        casperCommand.stdout.on('data',function(data){
            io.sockets.emit('start', {msg: data.toString()})
            console.log(data.toString())
        })
        casperCommand.stderr.on('data', function(data){
            console.log(data,'this is stdrr');
        });
    })

    

    // exec("kill $(ps aux|grep casperjs| awk '{print $2}')",function(){
    
    //     exec('casperjs ' + autoLoginPath,function(err,stdout,stderr){
    //         console.log(stdout,'this is out put')
    //         io.sockets.emit('start', {msg: stdout});
    //     });  
    // })
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
