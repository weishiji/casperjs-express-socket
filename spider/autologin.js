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
    "domain": "www.188188188188b.com",
    "hostOnly": true,
    "httpOnly": true,
    "name": "ASP.NET_SessionId",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "e2rylcofnupktldawepge5hz",
    "id": 4
}
]
for(var i=0;i<loginCookie.length;i+=1){
    phantom.addCookie(loginCookie[i]);
}



console.log("starting...");
//First step is to open Facebook
casper.start().thenOpen("https://www.188188188188b.com/zh-cn/sports", function() {
    console.log("Facebook website opened");
    
});


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
    casper.wait(5000,function(){
        console.log("Make a screenshot and save it as AfterLogin.png");
        casper.capture('AfterLogin.png');
    })
})

//  casper.thenOpen('https://www.188188188188b.com/zh-cn/sports',function(){
//      console.log('Open Sport Success!')
//  })

casper.then(function(){
    console.log("hello this is query ")
    this.evaluate(function(){
    var list = document.querySelector('.BetreceiptContent');
    console.log(list,'123')
    })
})

 
casper.run();



//module.exports = casper;