var cookiesManager = require('./DCookieManagement').create("/tmp/liveCookies.txt");
var utils = require('utils');

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
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
function login(){
    casper.evaluate(function(){
        var username = document.querySelector('input#username');
        username.value = 'lxg1986';
        username.dispatchEvent(new Event('change'));        
        
        var password = document.querySelector('input#password');
        password.value = 'lxg1367633';
        password.dispatchEvent(new Event('change'));        
        var button = document.querySelector('.login-boxes button.btn-success');
        button.click();
        console.log(username.outerHTML)
        console.log(button.outerHTML)
    })
}
console.log("starting...");
//First step is to open Facebook
casper.start().thenOpen("https://m.188188188188b.com/zh-cn/user/login", function() {
    console.log("Facebook website opened");
    casper.wait(4000,function(){
        login();
    })
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
casper.thenOpen('https://mbs.188188188188b.com/m/zh-cn/sports?q=KJ6KcgJNu5uU95XMMDQ9RQ..&u=https://m.188188188188b.com&c=44&allowRacing=false&reg=China',function(){
    casper.wait(3000);
    console.log("Make a screenshot and save it as unsettled-bets.png")
    casper.capture('unsettled-bets.png');
})

casper.then(function(){
    console.log("hello this is query ")
    this.evaluate(function(){
    var list = document.querySelector('.BetreceiptContent');
    console.log(list,'123')
    })
})

 
casper.run();



//module.exports = casper;