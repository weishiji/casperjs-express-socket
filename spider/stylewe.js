// var casper = require('casper').create({
//     pageSettings: {
//         loadImages: false,//The script is much faster when this field is set to false
//         loadPlugins: false,
//         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
//     }
// });
 
// //First step is to open Facebook
// casper.start().thenOpen("https://facebook.com", function() {
//     console.log("Facebook website opened");
// });
 
 
// //Now we have to populate username and password, and submit the form
// casper.then(function(){
//     console.log("Login using username and password");
//     this.evaluate(function(){
//         document.getElementById("email").value="449051368@qq.com";
// 		document.getElementById("pass").value="lxg1367633";
// 		document.getElementById("loginbutton").children[0].click();
//     });
// });
 
// //Wait to be redirected to the Home page, and then make a screenshot
// casper.then(function(){
// 	console.log("Make a screenshot and save it as AfterLogin.png");
// 	console.log(1);
// 	casper.wait(6000,function(){
// 		console.log(2);	
// 		casper.capture('AfterLogin.png');
// 	});//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
	
    
// });
 
 
// casper.run();



var casper = require('casper').create({
    pageSettings: {
        loadImages: true,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
        ,logLevel: "info",              // Only "info" level messages will be logged
        verbose: true        
        
    }
});
phantom.cookiesEnabled = true;

casper.on('remote.message', function(message) {
    this.echo(message);
});
 
//First step is to open Facebook
casper.start().thenOpen("https://www.stylewe.com/account/login", function() {
    console.log("Facebook website opened");
});
 
 
//Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(){
        var username = document.querySelector('#login_form input[name="email"]');
        username.value = 'liuxg1986@hotmail.com';
        var password = document.querySelector('#login_form input[name="password"]');
        password.value = 'liuxiaoguang';
        password.focus();
        var button = document.querySelector('#login_form button[type="submit"]');
        button.click();
        console.log(username.value)
        console.log(password.value)
        //document.getElementById("email").value="449051368@qq.com";
		//document.getElementById("pass").value="lxg1367633";
		//document.getElementById("loginbutton").children[0].click();
    });
});
 

casper.then(function(){
    casper.wait(30000,function(){
        console.log("Make a screenshot and save it as AfterLogin.png");
        casper.capture('AfterLogin.png');
    });//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
})
//Wait to be redirected to the Home page, and then make a screenshot
// casper.then(function(){
// 	console.log(1);
// 	casper.wait(15000,function(){
//     	console.log("Make a screenshot and save it as AfterLogin.png");
// 		casper.capture('AfterLogin.png');
// 	});//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
	
    
// });
 
 
casper.run();