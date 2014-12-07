// ==UserScript==
// @name           Hervorhebung Verlassene Siedlung
// @namespace      All
// @description    hebt die Verlassene Siedlung in den Notizen hervor
// @include        http://s5.kingsage.de/game.php?*&s=tools&p=*
// ==/UserScript==
var div=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]", document, null,XPathResult.ANY_TYPE, null).iterateNext();
var html= div.innerHTML
html=html.replace(/Verlassene Siedlung/ig,"<span style='color:#FF0000;'>Verlassene Siedlung</span>")
div.innerHTML=html
