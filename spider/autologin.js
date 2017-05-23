var cookiesManager = require('./DCookieManagement').create("/tmp/liveCookies.txt");
var utils = require('utils');

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
        ,logLevel: "info",              // Only "info" level messages will be logged
        verbose: true        
        
    }
});
casper.options.waitTimeout = 40000;

phantom.cookiesEnabled = true;
casper.options.onResourceRequested = function(C, requestData, request) {
    //utils.dump(requestData);
};
casper.options.onResourceReceived = function(C, response) {
    //utils.dump(response.headers);
};
casper.on('remote.message', function(message) {
    this.echo(message);
});
var loginCookie = [

{
    //"domain": "www.188188188188b.com",
    "domain" : "sb.188188188188b.com",
    "hostOnly": true,
    "httpOnly": true,
    "name": "ASP.NET_SessionId",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "ugheyiczuoxae45c3qlscgup",
    "id": 4
}
]
for(var i=0;i<loginCookie.length;i+=1){
    phantom.addCookie(loginCookie[i]);
}



console.log("starting...");
//First step is to open Facebook
//TODO:登录后要用这个去获取数据，之前的事iframe
//https://sb.188188188188b.com/zh-cn/sports?q=PoVIMwbDZTjGy49W2jmo9w..&country=CN&currency=RMB&tzoff=480&allowRacing=false&reg=China
// 原始地址：https://www.188188188188b.com/zh-cn/sports
var sprotLink = 'https://sb.188188188188b.com/zh-cn/sports?q=PoVIMwbDZTjGy49W2jmo9w..&country=CN&currency=RMB&tzoff=480&allowRacing=false&reg=China';
casper.start().thenOpen(sprotLink, function() {
    console.log("Facebook website opened");
    
});
// request bet 直接发ajax请求貌似行不通
// var requestLink = 'https://sb.188188188188b.com/zh-cn/Service/MyBetService?GetMyBet&ts=1494771809618&_=1494770988180';
// casper.open(requestLink,function(data){
//     console.log('do ajax reqeust')
    
//     console.log(JSON.stringify(data),'this is request data')
// })

// casper.then(function(){
//     console.log("Login using username and password");
//     this.evaluate(function(){
//         var username = document.querySelector('input#username');
//         username.value = 'lxg1986';
//         username.dispatchEvent(new Event('change'));        
        
//         var password = document.querySelector('input#password');
//         password.value = 'lxg1367633';
//         password.dispatchEvent(new Event('change'));        
//         var button = document.querySelector('.login-boxes button.btn-success');
//         button.click();
//         console.log(username.outerHTML)
//     });
// });
// casper.then(function(){
//     var cookies = this.page.cookies;
//     phantom.addCookie(cookies);
// }) 


casper.then(function(){
    console.log('before ajax loaded')
    casper.wait(5000,function(){
        console.log("Make a screenshot and save it as AfterLogin.png");
        casper.capture('AfterLogin.png');
    })
})


// casper.waitForSelectorTextChange('#right-panel',function(){
//     this.captureSelector('yoursitelist.png', '#right-panel');
// })


// id="tabMyBet""
// casper.waitFor(function check() {
//     return this.evaluate(function() {
//         return document.querySelectorAll('#right-panel').length >= 1;
//     });
// }, function then() {
//     this.captureSelector('yoursitelist.png', '#right-panel');
// });
function getLoopTime(){
    var looper = 6;
    var d = new Date();
    var currentHour = d.getHours();
    switch(currentHour){
        case 0:
            looper = 15;// 15s
        case 1:
            looper = 15;// 15s
            break;
        case 2:
            looper = 20;
        case 3:
            looper = 30;
        case 4:
            looper = 60;
        case 5:
            looper = 60;
        case 6:
            looper = 30;
            break;
        case 7:
            looper = 10;
            break;
        default:
            looper = 6;
    }

    return looper * 1000;
}
var count = 0;
function loopBetList(){
    casper.wait(getLoopTime())
    casper.waitFor(function check(){
        return casper.evaluate(function(){
            return document.querySelectorAll('#tabMyBet').length == 1;
        })
    },function then(){
        this.evaluate(function(){
            var tabBtn = document.querySelector('#tabMyBet a')
            tabBtn.click();
        })
    })
    // casper.then(function(){
    //     this.evaluate(function(){
    //         var tabBtn = document.querySelector('#tabMyBet')
    //         tabBtn.click();
    //     })
    // })
    casper.then(function(){
        this.evaluate(function(_count){
            console.log('<p>'+_count+'</p>')
            var list = document.querySelector('.BetreceiptContent');
            //datareact-id=['"][^'"]+['"]
            console.log(list.outerHTML.replace(/data-reactid=['"][^'"]+['"]/g,''));
        },++count)
        loopBetList();
    })
}

loopBetList();


 
casper.run();



//module.exports = casper;