var allCookieInfo = ""; //String
var allCookieObj = null;//Array
function cookieinfo(){
    chrome.cookies.getAll({},function (cookie){
        console.log(cookie.length);
        for(i=0;i<cookie.length;i++){
            allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
        }
        allCookieObj = cookie;
        localStorage.allCookieInfo = allCookieInfo;
    });
}
window.onload=cookieinfo;

function getSession(cookie){
    for(i=0;i<cookie.length;i++){
        var c = cookie[i];
        if(c.domain == "sb.188188188188b.com" && c.name == "ASP.NET_SessionId"){
            return c;
        }
    }
}

$(function(){
    $('#start-spider').on('click',function(){
        var cookie = getSession(allCookieObj);
        if(cookie){
            $.ajax({
                url : 'http://localhost:3000/rest/save_cookie'
                ,data : {'b_session' : JSON.stringify(cookie)}
                ,type : 'POST'
            }).done(function(dt){
                console.log(dt)
            })    
        }
        
    })
})
//增加监听事件
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log(tabId,changeInfo,'helllllllll')
    if(changeInfo.status == 'complete'){
        $('#my-text').html(tab.url)    
    }
    
})
