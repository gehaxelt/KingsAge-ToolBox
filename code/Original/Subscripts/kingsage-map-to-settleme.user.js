// ==UserScript==
// @name           KingsAge Map-to-Settlement-overview
// @namespace      All
// @include        http://s*.kingsage.de/map.php*
//@version 			1.0
// ==/UserScript==

document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<span id='changename'>Change username</span>"
document.getElementById("changename").addEventListener('click',function() {setusername();},true)

if (!GM_getValue('username')) {setusername()}
var as=document.getElementsByTagName("a")
for(var i=0;i< as.length;i++) {
str=as[i].getAttribute("onmouseover")
if(str.search(GM_getValue('username'))!=-1) {var href=as[i].href.replace(/\d+&s=info_village&id=/,"")+"&s=overview";as[i].href=href;}
}

function setusername() {
username=prompt("Plaese Enter your Username.","")
if(username!=null) {GM_setValue('username',username);alert('Saved username!')} else {GM_setValue('username',"");alert('incorrect input')}
}