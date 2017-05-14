
/**
 * This prototype is used to manage cookies
 * Author: Amir Duran
 */
var cookieStore = {
    set: function(name,value,days,valid_domain) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        } else {
            var expires = "";
        }
        var domain = valid_domain ? ("; domain=." + valid_domain) : '' ;
        document.cookie = name+"="+value+expires+"; path=/" + domain;
    },
    get: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) {
                var ret = c.substring(nameEQ.length,c.length);
                switch (ret) {
                    case 'true':
                        return true;
                    case 'false':
                        return false;
                    default:
                        return ret;
                }
            }
        }
        return null;
    },
    del: function(name) {
        this.set(name,"",-1);
    }
}
var DCookieManagement = function(cookiesFileName){
    this.fileManagement = require('fs');
    this.phantomCookies=null;//Original cookies from PhantomJS
    this.cookiesFileName=cookiesFileName;//set cookies file name
 
    DCookieManagement.prototype.loadCookies = function (cookies){
        this.phantomCookies = cookies;
    };
 
    DCookieManagement.prototype.saveCookies = function(){
        if(this.phantomCookies != null)
            this.fileManagement.write(this.cookiesFileName, JSON.stringify(this.phantomCookies), "w");
    };
    DCookieManagement.prototype.readCookies = function () {
        if(this.cookieFileExists())
            this.loadCookies(JSON.parse(this.fileManagement.read(this.cookiesFileName)));
    };
    DCookieManagement.prototype.cookieFileExists = function(){
        return this.fileManagement.isFile(this.cookiesFileName);
    };
    DCookieManagement.prototype.getCookies = function(){
        return this.phantomCookies;
    };
 
    DCookieManagement.prototype.removePreviousCookies = function(){
        this.fileManagement.remove(this.cookiesFileName);
    };
 
};
 
exports.create = function(cookiesFileName){
    return new DCookieManagement(cookiesFileName);
};