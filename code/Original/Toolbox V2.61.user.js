// ==UserScript==
// @name           KingsAge Toolbox
// @namespace      All
// @version 2.6
// @description    KingsAge Toolbox- Nice functions for KingsAge.
// @include        http://*.kingsage.*/*
// @exclude        http://board.kingsage.*/*
// @exclude        http://board.kingsage.*/*
// @exclude        http://s*.kingsage.*/forum.php*
// @exclude        http://s*.kingsage.*/popup.php*
// @exclude        http://s*.kingsage.*/map.php*
// ==/UserScript==

//inits the languages and checks for updates
var scriptVersion=2.6;
var scriptUpdateText='A bigger update.Script works better with PAs. I renamed the Script! (01.11.10 - dd/mm/yy)';
var lang
initlang()
var string = lang[GM_getValue("lang")]
checkupdate()
if(!GM_getValue("lang")) {GM_setValue("lang","Eng")}
if(!GM_getValue("xkor")) {GM_setValue("xkor",1)}
if(!GM_getValue("ykor")) {GM_setValue("ykor",1)}
if(!GM_getValue('pnmessave')) {GM_setValue('pnmessave',"")}
if(!GM_getValue('repsave')) {GM_setValue('repsave',"")}
if(!GM_getValue('room')) {GM_setValue('room',1)}
if(eval(GM_getValue("link", "[]"))=="") {var link = new Array('&s=build_main','&s=build_barracks','&s=build_market') ; GM_setValue("link",uneval(link));}
var market=/s=build_market/
var pnmes=/&s=messages&m=in&/
var tools=/&s=tools/
var bbcode=/&amp;s=build_barracks&amp;m=sim_battle&amp;/
var citinfo=/&s=info_village/
var recruit=/s=build_barracks&m=recruit/
var map=/&s=map/
var body=document.getElementsByTagName("body")[0]
dragObj = new Object(), x, y;
dragObj.zIndex = 1000;

if(GM_getValue('extrabuttons') || GM_getValue('highlighter')) {
var overview= /s=overview/
var overview_kombi=/s=overview_villages&m=1/
var overview_pro=/s=overview_villages&m=2/
var overview_geb=/s=overview_villages&m=7/
var overview_forschung=/s=overview_villages&m=8/
var overview_trup_eig=/s=overview_villages&m=4/
var overview_trup_all=/s=overview_villages&m=4&type=all/
var overview_trup_home=/s=overview_villages&m=4&type=here/
var overview_trup_out=/s=overview_villages&m=4&type=outwards/
var overview_trup_move=/s=overview_villages&m=4&type=moving/
var overview_trans_rec=/s=overview_villages&m=3&type=rec/
var overview_befehle=/s=overview_villages&m=5/
}
// end init vars

//stylesheet einbinden
var style=document.createElement("link")
style.setAttribute("type","text/css")
style.setAttribute("rel","stylesheet")
style.setAttribute("href","http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/css/kings_script_age.css") //hier die url zum stylesheet
body.appendChild(style)
window.addEventListener('load',function() {notepad();chat();calcresources();},true)
//end stylesheet

//hidecheck
if(GM_getValue("header")=="1" && GM_getValue("headeractive")) {hidetop()} else if (GM_getValue("header")=="2" && GM_getValue("headeractive")) {
hidetop=document.createElement("button")
hidetop.setAttribute("id","hidetop")
hidetop.innerHTML=string["bt_hidetop"]
body.appendChild(hidetop)
ID("hidetop").addEventListener('click',function() {hideheader()},false)
}
//Settings-button
settingsbuttonhtml='<td align="center"><table cellspacing="0" cellpadding="0" class="shortcut"><tbody><tr><td><img alt="" src="/img/layout/sc_left.png"></td><td class="head1"><img alt="" src="/img/layout/sc_marker.png"><span id="settings" >'+string["bt_settings"]+'</span></td><td><img alt="" src="/img/layout/sc_right.png"></td></tr></tbody></table></td>'
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=settingsbuttonhtml
ID("settings").addEventListener('click',function() {settings()},true)

//deleting iframe
var iframe=document.evaluate("//*[@id=\"banner_container\"]", document, null,XPathResult.ANY_TYPE, null).iterateNext() //deletes the right Iframe
if(iframe) {iframe.style.visibility="hidden"}
//settingsbox
window.addEventListener('keydown', function(a){hotkeysdown(a);},true);

function settings() {
if(!ID("settingsdiv")) {
var settingsdiv=document.createElement("div")
settingsdiv.setAttribute("id","settingsdiv")
settingsdiv.setAttribute("class","topbox")
part1="<table class='borderlist' id='controlpanel' width='100%'><tbody><tr><th>"+string["tit_titel"]+"</th><th width='10%' >"+string["tit_active"]+"</th></tr>"
part2="<tr><td>"+string["tit_fill"]+"</td><td class='textcenter'><input type='checkbox' id=\"market\" class='cursorpointer'></td></tr>"
part3="<tr><td>"+string["tit_highlighter"]+"</td><td class='textcenter'><input type='checkbox' id=\"highlighter\" class='cursorpointer'></td></tr>"
part4="<tr><td>"+string["tit_extrabuttons"]+"</td><td class='textcenter'><input type='checkbox' id=\"extrabuttons\" class='cursorpointer'><button id='config' class='flatbuttons'>"+string["bt_settings"]+"</button></td></tr>"
part5="<tr><td>"+string["tit_extrabuttonstab"]+"</td><td class='textcenter'><input type='checkbox' id=\"extrabuttonstab\" class='cursorpointer'></td></tr>"
part6="<tr><td>"+string["tit_messagesaver"]+"</td><td class='textcenter'><input type='checkbox' id=\"messagesaver\" class='cursorpointer'></td></tr>"
part7="<tr><td>"+string["tit_smallmap"]+"</td><td class='textcenter'><input type='checkbox' id=\"smallmap\" class='cursorpointer'></td></tr>"
part8="<tr><td>"+string["tit_calc"]+"</td><td class='textcenter'><input type='checkbox' id=\"calculator\" class='cursorpointer'></td></tr>"
part9="<tr><td>"+string["tit_notepad"]+"</td><td class='textcenter'><input type='checkbox' id=\"notepad\" class='cursorpointer'></td></tr>"
part10="<tr><td>"+string["tit_chat"]+"</td><td class='textcenter'><input type='checkbox' id=\"chat\" class='cursorpointer'></td></tr>"
part11="<tr><td>"+string["tit_prem"]+"</td><td class='textcenter'><input type='checkbox' id=\"premium\" class='cursorpointer'></td></tr>" //premium
part12="<tr><td>"+string["tit_lang"]+"</td><td class='textcenter'><select id=\"langselect\"><option value='Eng'>En</option><option value='DE'>De</option><option value='Nl'>Nl</option></select></td></tr>"
part13="<tr><td>"+string["tit_header"]+"</td><td class='textcenter'><input type='checkbox' id=\"header\" class='cursorpointer'><select id=\"headerselect\"><option value='always'>"+string["tit_headeralways"]+"</option><option value='onlybutton'>"+string["tit_headerbutton"]+"</option></select></td></tr>"
part14=""
part15=""
part16=""
part17=""
part18=""
part19=""
part20=""
part21=""
part22=""
part23=""
part24=""
part25="</tr></tbody></table>"
//savebutton="<button id='savebutton' style='position:absolute;top:90%;left:89%;'>Save</button>"
imprint="<div id='madeby' >"+string["tit_scriptby"]+": KA-Freak <br>"+string["tit_styleby"]+": yuko<br>"+string["tit_copyright"]+"</div>"
savebutton="<button id='savebutton' class='configbutton'>"+string["bt_save"]+"</button><button id='cancel' class='flatbuttons' style='position:absolute;left:5px;bottom:10px;'>"+string["bt_hide"]+"</button>"
settingsdiv.innerHTML=part1+part12+part11+part2+part3+part4+part5+part6+part7+part8+part9+part10+part13+part14+part15+part16+part17+part18+part19+part20+imprint+savebutton
body.appendChild(settingsdiv)
ID("cancel").addEventListener('click',function() {ID("settingsdiv").style.visibility='hidden'},true)
ID("savebutton").addEventListener('click',function() {savesettings()},false)
ID("config").addEventListener('click',function() {configbuttons()},false)
}
else {
ID("settingsdiv").style.visibility="visible"}
if(GM_getValue("market")) {ID("market").checked=true} else {ID("market").checked=false}
if(GM_getValue("highlighter")) {ID("highlighter").checked=true} else {ID("highlighter").checked=false}
if(GM_getValue("extrabuttons")) {ID("extrabuttons").checked=true} else {ID("extrabuttons").checked=false}
if(GM_getValue("extrabuttonstab")) {ID("extrabuttonstab").checked=true} else {ID("extrabuttonstab").checked=false}
if(GM_getValue("messagesaver")) {ID("messagesaver").checked=true} else {ID("messagesaver").checked=false}
if(GM_getValue("smallmap")) {ID("smallmap").checked=true} else {ID("smallmap").checked=false}
if(GM_getValue("calculator")) {ID("calculator").checked=true} else {ID("calculator").checked=false}
if(GM_getValue("notepad")) {ID("notepad").checked=true} else {ID("notepad").checked=false}
if(GM_getValue("chat")) {ID("chat").checked=true} else {ID("chat").checked=false}
if(GM_getValue("premium")) {ID("premium").checked=true} else {ID("premium").checked=false}
if(GM_getValue("lang")=="Eng") {ID("langselect").selectedIndex=0}
if(GM_getValue("lang")=="De"){ID("langselect").selectedIndex=1}
if(GM_getValue("lang")=="Nl") {ID("langselect").selectedIndex=2}
if(GM_getValue("header")=="1") {ID("headerselect").selectedIndex=0}
if(GM_getValue("header")=="2") {ID("headerselect").selectedIndex=1}
if(GM_getValue("headeractive")) {ID("header").checked=true} else {ID("header").checked=false}
}
//configbuttons
function configbuttons(){
if(!ID("configdiv")) {
var configdiv=document.createElement("div")
configdiv.setAttribute("id","configdiv")
configdiv.setAttribute("style","height:305px;")
configdiv.setAttribute("class","topbox") 
option="<option value='none' >"+string["op_none"]+"</option><option value='&s=build_main'>"+string["op_burg"]+"</option><option value='&s=build_market'>"+string["op_markt"]+"</option><option value='&s=build_market&m=accept'>"+string["op_markta"]+"</option><option value='&s=build_barracks'>"+string["op_bar"]+"</option><option value='&s=build_barracks&m=recruit'>"+string["op_baraus"]+"</option><option value='&s=build_barracks&m=research'>"+string["op_barfor"]+"</option><option value='&s=build_snob'>"+string["op_snob"]+"</option><option value='&s=build_smith'>"+string["op_gold"]+"</option><option value='&s=map'>"+string["op_map"]+"</option>"
table="<table class='borderlist' id='controlpanel' width='100%'><tbody><tr><th>"+string["tit_config"]+"</th><th width='25%' >"+string["tit_buttons"]+"</th>"
tr1="<tr><td>1. Button</td><td><select id='selbutton1'>"+option+"</select></td></tr>"
tr2="<tr><td>2. Button</td><td><select id='selbutton2'>"+option+"</select></td></tr>"
tr3="<tr><td>3. Button</td><td><select id='selbutton3'>"+option+"</select></td></tr>"
tr4="<tr><td>4. Button</td><td><select id='selbutton4'>"+option+"</select></td></tr>"
tr5="<tr><td>5. Button</td><td><select id='selbutton5'>"+option+"</select></td></tr>"
tr6="<tr><td>6. Button</td><td><select id='selbutton6'>"+option+"</select></td></tr>"
tr7="<tr><td>7. Button</td><td><select id='selbutton7'>"+option+"</select></td></tr>"
tr8="<tr><td>8. Button</td><td><select id='selbutton8'>"+option+"</select></td></tr>"
tr9="<tr><td>9. Button</td><td><select id='selbutton9'>"+option+"</select></td></tr>"
savebutton="<button id='saveconfig' class='configbutton'>"+string["bt_save"]+"</button><button id='cancelconf' class='flatbuttons' style='position:absolute;left:5px;bottom:10px;'>"+string["bt_hide"]+"</button>"
configdiv.innerHTML=table+tr1+tr2+tr3+tr4+tr5+tr6+tr7+tr8+tr9+savebutton+"</table>"
body.appendChild(configdiv) } else {ID("configdiv").style.visibility='visible'}
for(var i=1;i<9;i++) {ID("selbutton"+(i)).selectedIndex=0}
link=eval(GM_getValue("link", "[]"))
for(var i=0; i < link.length;i++) {
if(link[i]=="&s=build_main") {ID("selbutton"+(i+1)).selectedIndex=1}
else if(link[i]=="&s=build_market") {ID("selbutton"+(i+1)).selectedIndex=2}
else if(link[i]=="&s=build_market&m=accept") {ID("selbutton"+(i+1)).selectedIndex=3}
else if(link[i]=="&s=build_barracks") {ID("selbutton"+(i+1)).selectedIndex=4}
else if(link[i]=="&s=build_barracks&m=recruit") {ID("selbutton"+(i+1)).selectedIndex=5}
else if(link[i]=="&s=build_barracks&m=research") {ID("selbutton"+(i+1)).selectedIndex=6}
else if(link[i]=="&s=build_snob") {ID("selbutton"+(i+1)).selectedIndex=7}
else if(link[i]=="&s=build_smith") {ID("selbutton"+(i+1)).selectedIndex=8}
else if(link[i]=="&s=map") {ID("selbutton"+(i+1)).selectedIndex=9}
}
ID("cancelconf").addEventListener('click',function() {ID("configdiv").style.visibility='hidden'},true)
ID("saveconfig").addEventListener('click',function() {saveconfig()},true)
}
//saveconfig
function saveconfig() {
var link=new Array()
if(ID("selbutton1").value!="none") {link.push(ID("selbutton1").value)}
if(ID("selbutton2").value!="none") {link.push(ID("selbutton2").value)}
if(ID("selbutton3").value!="none") {link.push(ID("selbutton3").value)}
if(ID("selbutton4").value!="none") {link.push(ID("selbutton4").value)}
if(ID("selbutton5").value!="none") {link.push(ID("selbutton5").value)}
if(ID("selbutton6").value!="none") {link.push(ID("selbutton6").value)}
if(ID("selbutton7").value!="none") {link.push(ID("selbutton7").value)}
if(ID("selbutton8").value!="none") {link.push(ID("selbutton8").value)}
if(ID("selbutton9").value!="none") {link.push(ID("selbutton9").value)}
GM_setValue("link",uneval(link))
ID("configdiv").style.visibility='hidden'
}
//message illegalfunction
/*function illegalfunction(element) {
if(ID(element).checked==true) {
var okay=confirm(string["al_illegal"])
if(okay) {ID(element).checked=true} else {ID(element).checked=false}
}} */ //all functions allowed

//saving options from menu
function savesettings() {
if(ID("market").checked==true) {GM_setValue("market",true)} else {GM_setValue("market",false)}
if(ID("highlighter").checked==true) {GM_setValue("highlighter",true)} else {GM_setValue("highlighter",false)}
if(ID("extrabuttons").checked==true) {GM_setValue("extrabuttons",true)} else {GM_setValue("extrabuttons",false)}
if(ID("extrabuttonstab").checked==true) {GM_setValue("extrabuttonstab",true)} else {GM_setValue("extrabuttonstab",false)}
if(ID("messagesaver").checked==true) {GM_setValue("messagesaver",true)} else {GM_setValue("messagesaver",false)}
if(ID("smallmap").checked==true) {GM_setValue("smallmap",true)} else {GM_setValue("smallmap",false)}
if(ID("calculator").checked==true) {GM_setValue("calculator",true)} else {GM_setValue("calculator",false)}
if(ID("notepad").checked==true) {GM_setValue("notepad",true)} else {GM_setValue("notepad",false)}
if(ID("chat").checked==true) {GM_setValue("chat",true)} else {GM_setValue("chat",false)}
if(ID("premium").checked==true) {GM_setValue("premium",true)} else {GM_setValue("premium",false)}
if(ID("langselect").selectedIndex==0) {GM_setValue("lang","Eng")}
if(ID("langselect").selectedIndex==1) {GM_setValue("lang","De")}
if(ID("langselect").selectedIndex==2) {GM_setValue("lang","Nl")}
if(ID("headerselect").selectedIndex==0) {GM_setValue("header","1")}
if(ID("headerselect").selectedIndex==1) {GM_setValue("header","2")}
if(ID("header").checked==true) {GM_setValue("headeractive",true)} else {GM_setValue("headeractive",false)}
ID("settingsdiv").style.visibility="hidden"
document.location.reload()
}
//notepad
function notepad() {
if(GM_getValue("notepad")) {
if (!GM_getValue("page")) {GM_setValue("page",1)}
notes=document.createElement("div")
notes.setAttribute("id","notesid")
x=GM_getValue("xkor")
y=GM_getValue("ykor")
if (y < 0 || y > window.innerHeight) {y=1}
if (x < 0 || x > (window.innerWidth-25)) {x=1}
notes.setAttribute("style","top:"+y+"px;left:"+x+"px;") 
buttons="<button id='notesbutton1' class='flatbuttons' >1</button><button id='notesbutton2' class='flatbuttons' >2</button><button id='notesbutton3' class='flatbuttons' >3</button><button id='notesbutton4' class='flatbuttons' >4</button><button id='notesbutton5' class='flatbuttons' >5</button><button id='notesbutton6' class='flatbuttons' >6</button><button id='notesbutton7' class='flatbuttons' >7</button><button id='notesbutton8' class='flatbuttons' >8</button><button id='notesbutton9' class='flatbuttons' >9</button><button id='notesbutton10' class='flatbuttons' >10</button>"
notes.innerHTML="<div id='notemove'><span class='info'><a href='#' style='cursor:move'>"+string["tit_move"]+"</a></span></div><textarea id='nottext' ></textarea><br><button id='notesbutton' class='flatbuttons' style='position: absolute; right:10px;bottom:10px;'>"+string["bt_hide"]+"</button><button id='resettbutton' class='flatbuttons' style='position: absolute; right:65px;bottom:10px;'>"+string["bt_resett"]+"</button>"+buttons;
img=document.createElement("img")
img.setAttribute("id","writerid")
img.setAttribute("src","img/ico_edit.png")
img.setAttribute("width","25px")
img.setAttribute("height","25px")
img.setAttribute("style","top:1px;left:1px;z-index:1000; position:fixed; cursor:pointer;")
body.appendChild(notes)
body.appendChild(img)
img.addEventListener('click',function() {shownote()},false)
ID("notesbutton1").addEventListener('click',function() {changepage(1)},false)
ID("notesbutton2").addEventListener('click',function() {changepage(2)},false)
ID("notesbutton3").addEventListener('click',function() {changepage(3)},false)
ID("notesbutton4").addEventListener('click',function() {changepage(4)},false)
ID("notesbutton5").addEventListener('click',function() {changepage(5)},false)
ID("notesbutton6").addEventListener('click',function() {changepage(6)},false)
ID("notesbutton7").addEventListener('click',function() {changepage(7)},false)
ID("notesbutton8").addEventListener('click',function() {changepage(8)},false)
ID("notesbutton9").addEventListener('click',function() {changepage(9)},false)
ID("notesbutton10").addEventListener('click',function() {changepage(10)},false)
ID("resettbutton").addEventListener('click',function() {resettposition()},false)
ID("notemove").addEventListener('mousedown', function(e){dragStart(e);}, false);
if (!GM_getValue("hiddennotes")) { shownote()}
markpage()
}}
//chat
function chat() {
if (GM_getValue("chat")) {
var width=document.body.clientWidth
var chatdiv=document.createElement("div")
chatdiv.setAttribute("id","chatdiv")
var selecthtml="<select id='room' ><option value='1'>Global</option><option value='2'>EN</option><option value='3'>DE</option><option value='4'>Beta</option></select>"
var chatsettings="<input type='text' id='chatinput'><button id='chatsend' class='flatbuttons'>"+string["bt_send"]+"</button>"+selecthtml+"<br><button id='hidechat' class='flatbuttons'>"+string["bt_hide_chat"]+"</button><span id='haftung'>"+string["tit_liable"]+"</span>"
chatdiv.innerHTML="<div id='chattext'></div><br><div id='settings'>"+chatsettings+"</div>"
body.appendChild(chatdiv)
chatimg=document.createElement("img")
chatimg.setAttribute("id","chatimg")
chatimg.setAttribute("src","http://www.supersites.bplaced.net/chat_trans.png")
chatimg.setAttribute("width","25px")
chatimg.setAttribute("height","25px")
chatimg.setAttribute("style","top:0px;left:"+(width-25)+"px;z-index:1000; position:fixed; cursor:pointer;")
body.appendChild(chatimg)
chatimg.addEventListener('click',function() {initchat()},false)
ID("chatsend").addEventListener('click',function() {send()},false)
ID("room").addEventListener('change',function() {changeroom()},true)
ID("hidechat").addEventListener('click',function() {cancelchat()},false)
if(GM_getValue("showchat")) {initchat()}
}}
//hidetop
function hideheader() {
document.getElementsByTagName("head")[0].innerHTML+="<style type='text/css'>html{ position:relative; top:-150px; }n.forum_contentpane { position:relative; top:150px; } n#map{ position:relative; top:0px; }</style>"
}
//menu table
if (GM_getValue('extrabuttons')) { 
if (GM_getValue("extrabuttonstab")) {tab=true} else {tab=false}
if (GM_getValue('premium')) { try {document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href+="&m=2"} catch(e) {}}
//setting the new overview-link
if(GM_getValue('premium')) {
if(overview_kombi.test(lref()) && GM_getValue('premium')) { extrabuttons("kombi",tab)}
else if(overview_pro.test(lref()) && GM_getValue('premium')) { extrabuttons("produktion",tab)}
else if(overview_geb.test(lref()) && GM_getValue('premium')) { extrabuttons("gebaude",tab)}
else if(overview_forschung.test(lref()) && GM_getValue('premium')) { extrabuttons("forschung",tab)}
else if(overview_trup_eig.test(lref()) && GM_getValue('premium') && !overview_trup_all.test(lref())) { extrabuttons("trup_eigene",tab)}
else if(overview_trans_rec.test(lref()) && GM_getValue('premium')) { extrabuttons("trans_rec",tab)}
else if(/&s=overview_villages&m=3/.test(lref()) || /&s=overview_villages&m=3&type=own/.test(lref()) || /&s=overview_villages&m=3&type=all/.test(lref()) || /&s=overview_villages&m=3&type=inc/.test(lref()) || /&s=overview_villages&m=3&type=out/.test(lref()) && GM_getValue('premium')) { extrabuttons("transport",tab)}
else if(overview_befehle.test(lref()) && GM_getValue('premium')) { extrabuttons("befehle",tab)}
}else if (overview.test(lref())) {extrabuttons("normal",tab) }
}

function extrabuttons(type,tab) {
link=eval(GM_getValue("link", "[]"))
tdhtml=""
thhtml=""
tdleer=""
tdmarked=""
if(tab) {
for(var i=0; i < link.length;i++) {
thhtml+="<th></th>"
tdleer+="<td></td>"
tdmarked+='<td class="marked_sum"></td>'
if(link[i]=="&s=build_main") {tdhtml+="<td><a href='' target='_blank'><img src='/img/overview/main.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_market&m=accept") {tdhtml+="<td><a href=''  target='_blank'><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/market_in.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_market") {tdhtml+="<td><a href=''  target='_blank'><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/market_out.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks") {tdhtml+="<td><a href='' target='_blank'><img src='/img/buildings/barracks.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks&m=recruit") {tdhtml+="<td><a href=''  target='_blank'><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/barracks_recruit.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks&m=research") {tdhtml+="<td><a href=''  target='_blank'><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/barracks_research.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_snob") {tdhtml+="<td><a href=''  target='_blank'><img src='/img/buildings/snob.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_smith") {tdhtml+="<td><a href=''target='_blank' ><img src='/img/buildings/smith.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=map") {tdhtml+="<td><a href='' target='_blank'><img src='/img/shortcut/map.png' class='cursorpointer'></a></td>"}
}} else {
for(var i=0; i < link.length;i++) {
thhtml+="<th></th>"
tdleer+="<td></td>"
tdmarked+='<td class="marked_sum"></td>'
if(link[i]=="&s=build_main") {tdhtml+="<td><a href=''><img src='/img/overview/main.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_market&m=accept") {tdhtml+="<td><a href=''><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/market_in.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_market") {tdhtml+="<td><a href=''><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/market_out.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks") {tdhtml+="<td><a href=''><img src='/img/buildings/barracks.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks&m=recruit") {tdhtml+="<td><a href=''><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/barracks_recruit.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_barracks&m=research") {tdhtml+="<td><a href=''><img src='http://dl.dropbox.com/u/9832951/KingsAge%20Toolbox/images/barracks_research.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_snob") {tdhtml+="<td><a href=''><img src='/img/buildings/snob.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=build_smith") {tdhtml+="<td><a href=''><img src='/img/buildings/smith.png' class='cursorpointer'></a></td>"}
if(link[i]=="&s=map") {tdhtml+="<td><a href=''><img src='/img/shortcut/map.png' class='cursorpointer'></a></td>"}
}}
//mit premium
if(type=="forschung" || type=="kombi" || type=="produktion" || type=="gebaude" || type=="trup_eigene" || type=="trup_home" || type=="trup_out" || type=="trupmove") {
try {
headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
span=headtable.colSpan
if(span > 5) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml; 
var i=2} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
var i=1}

do {
i++
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (result) {
url=result.href.replace("&s=overview","")
url=url.replace("&s=build_main","")
if (tab) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
}
try{
if (type=="forschung") {var a=12}
if (type=="kombi") { var a=14}
if (type=="produktion") {var a=9}
if (type=="gebaude") {var a =18}
if (type=="trup_eigene") {var a = 13}
var l=a
do {
a++
result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
} while(result2!=null); }catch(e){}
} else
{
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
break;
}
} while(result!=null);
} catch(e) {}} //end wenn eins von den oberen

if(type=="transport" && !/&s=overview_villages&m=3&type=own_offer/.test(lref())) { //heir sind Alle ; Ausgehende; Ankommende ; Eigene
try{
headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
span=headtable.colSpan
if(span==9 || span==8) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml; 
var i=2} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
var i=1}
if(span==9 || /&s=overview_villages&m=3&type=all/.test(lref())) {td=5;span=9} else if(span==8 || /&s=overview_villages&m=3&type=inc/.test(lref()) || /&s=overview_villages&m=3&type=out/.test(lref())) {td=4;span=8}
else if (/&s=overview_villages&m=3&type=own/.test(lref())) {span=7;td=3;}
else if (/&s=overview_villages&m=3/.test(lref())) {span=9;td=5}
do {
i++							
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+td+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (result) {
url=result.href.replace("&s=overview","")
url=url.replace(/\d+&s=info_village&id=/,"")
if (tab) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} 
try{
var a = span
var l=a
do {
a++
result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
} while(result2!=null); }catch(e){GM_log("First:"+e.message)} 
} else
{
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
break;
}
} while(result!=null);
}
catch(e) {GM_log("Secound:"+e.message)}}

//Transporte Angenommene
if(type=="trans_rec") {
try {
headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
span=headtable.colSpan
if(span==10) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml; 
var i=2} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
var i=1}
do {
i++								//html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr[3]/td[4]/a
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td[4]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (result) {
url=result.href.replace(/\d+&s=info_village&id=/,"")

if (tab) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
}
try{
var a=span
var l=a
do {
a++
result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
} while(result2!=null); }catch(e){}
} else
{
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml //
break;
}
} while(result!=null);
} catch(e) {}}

if(type=="befehle") { //Befehle
try{
headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
span=headtable.colSpan
if(span==14) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml; 
var i=2} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
var i=1;span=14}
td=3
do {
i++
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[3]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (result) {
url=result.href.replace("&s=build_barracks&m=command","")
if (tab) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
} 
try{
var a = span
var l=a
do {
a++
result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
} while(result2!=null); }catch(e){GM_log("First:"+e.message)} 
} else
{
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
break;
}
} while(result!=null);
}
catch(e) {GM_log("Secound:"+e.message)}}


//normal ohne prem
if (type=="normal") {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml
var i=1
do {
i++
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null);
var rst=result.iterateNext();
if (rst) {
url=rst.href.replace("&s=overview","")
if (tab) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
}
} else {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdleer

break;
}
} while(rst!=null); 
} 
}

//Highlighter soll noch f+ür Produktion, Truppen, Befehle
//Highlighter
if ((GM_getValue('highlighter')) && overview.test(lref()) && !GM_getValue('premium')) {
regex2=/img\/command\/support.png/
regex3=/img\/command\/attack.png/
var i=1
do {
i++
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
var result2= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (regex2.test(result.innerHTML) && regex3.test(result.innerHTML)) {result2.style.color="#0000FF"; result2.style.fontWeight="bold"}
else if (regex2.test(result.innerHTML)) {result2.style.color="#008000"; result2.style.fontWeight="normal"}
else if (regex3.test(result.innerHTML)) {result2.style.color="#FF0000"; result2.style.fontWeight="normal"}
if (result==null) {break;}
} while(result!=null);
}

if ((GM_getValue('highlighter')) && overview_pro.test(lref()) || overview_trup_eig.test(lref())) {
regex2=/img\/command\/support.png/
regex3=/img\/command\/attack.png/
page=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if(page && page.style.backgroundImage=='url("img/layout/bg_table_cell.jpg")') {var i=2} else {var i=1}
do {
i++
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
var result2= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
if (regex2.test(result.innerHTML) && regex3.test(result.innerHTML)) {result2.style.color="#0000FF"; result2.style.fontWeight="bold"}
else if (regex2.test(result.innerHTML)) {result2.style.color="#008000"; result2.style.fontWeight="normal"}
else if (regex3.test(result.innerHTML)) {result2.style.color="#FF0000"; result2.style.fontWeight="normal"}
if (result==null) {break;}
} while(result!=null);
}
//end Highlighter

//Fill in 200k Market function
if(market.test(lref())) { 
if(GM_getValue('market')) {
var result=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
if(result) {result.innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '200000'); insertNum('kingsage', 'send_res1', '200000'); insertNum('kingsage', 'send_res3', '200000');\" ><img src=\"/img/arrow_right_raquo.png\"> "+string["tit_fill"]+"</p>";}
if(!result) {
var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '200000'); insertNum('kingsage', 'send_res1', '200000'); insertNum('kingsage', 'send_res3', '200000');\" ><img src=\"/img/arrow_right_raquo.png\"> "+string["tit_fill"]+"</p>";
}
}
}
//pnmessage-Saver
if(pnmes.test(lref())) {
if(GM_getValue('messagesaver')&& document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()!=null) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src="/img/tabs/menue_nn_center.png"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\"/img/tabs/menue_n_back.png\"><span id=\"pnmessaver\" style=\"color:#840000;cursor:pointer;\">"+string["bt_savemessage"]+"</span></td><td><img src=\"/img/tabs/menue_n_right.png\"></td>"
ID("pnmessaver").addEventListener('click',function() {messaver('pnmes')},true)
} else if (GM_getValue('messagesaver')&&  document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null &&document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src="/img/tabs/menue_nn_center.png"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\"/img/tabs/menue_n_back.png\"><span id=\"repsaver\" style=\"color:#840000;cursor:pointer;\">"+string["bt_savereport"]+"</span></td><td><img src=\"/img/tabs/menue_n_right.png\"></td>"
ID("repsaver").addEventListener('click',function() {messaver('rep')},true)
}
}
//adds the PM-show and Report-show to tools
if(tools.test(lref())) {
if(GM_getValue('messagesaver')) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[7]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src="/img/tabs/menue_nn_center.png"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\"/img/tabs/menue_n_back.png\"><span id=\"pnshow\" style=\"color:#840000;cursor:pointer;\">"+string["bt_showmessages"]+"</span></td><td><img src=\"/img/tabs/menue_nn_center.png\"></td>"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\"/img/tabs/menue_n_back.png\"><span id=\"repshow\" style=\"color:#840000;cursor:pointer;\">"+string["bt_showreports"]+"</span></td><td><img src=\"/img/tabs/menue_n_right.png\"></td>"
ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)
ID("repshow").addEventListener('click',function() {messhower('rep')},false)
}}
//adds the Minimap to the village-info
if(citinfo.test(lref())) {
if(GM_getValue('smallmap')) {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<th>"+string["tit_mapofregion"]+"</th>";
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td rowspan=\"7\"><img src=\"\" id=\"map\" style=\"width: 226px; height: 226px;\">"
var x=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(0,3)
var y=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(4,7)
ID("map").src="minimap.php?x="+x+"&y="+y+""
var userid=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href
var trenn=userid.indexOf("id=")
var id=userid.substr(trenn+3,userid.length)
ind1=lref().indexOf("info") //adden zur Übersicht...
ind2=lref().indexOf("=")   
var city=lref().substr(ind2+1)
var city2=city.substr(0,city.indexOf("&s"))
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="&nbsp;<img src=\"/img/messages/mail_unread.png\" onclick=\"document.location.href='/game.php?village="+city2+"&s=messages&m=new&pid="+id+"'\" style=\"cursor:pointer\"\">"

}}
//messaver for saving PMs
function messaver(type) {
if (type=="pnmes") {
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML="";
var divtext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;

document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div/img", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","width:0px;height:0px;visiblility:hidden;")
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","")
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","");
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("class","");
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("class","");
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[5]", document, null, XPathResult.ANY_TYPE, null).iterateNext().setAttribute("class","");
var headertext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;

GM_setValue('pnmessave',headertext+"<br>"+divtext+"<hr>"+GM_getValue('pnmessave'))
alert(string["al_savedmessage"])
}  else {
ob=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table", document, null, XPathResult.ANY_TYPE, null)
i=0
do {
i++
table=ob.iterateNext()
if(bbcode.test(table.innerHTML)) { 
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<div class=\"smallButton\"><span onclick=\"javascript:$('bb_code').style.display = ($('bb_code').style.display == 'block') ? 'none' : 'block'\" style=\"cursor:pointer\" >BB-Code</span>"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+i+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+(i+1)+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
break;
}
} while (table!=null)
var divtext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
GM_setValue('repsave',divtext+"<hr>"+GM_getValue('repsave'))
alert(string["al_savedreport"])
} }
//messhower for showing saved messages /reports
function messhower(type) {
if(!ID("showdiv")) { 
var head="<div style=\"background-image: url(&quot;/img/tabs/menue_back.png&quot;); background-position: left center; background-repeat: repeat-x; width: 100%;\">"+document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+"</div>"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<h1>Tools</h1>"+head+"<div id=\"showdiv\"></div>"}
if (type=="pnmes") {
ID("showdiv").innerHTML=GM_getValue('pnmessave')+"<button id=\"delpn\" class=\"flatbuttons\">"+string["bt_deleteallmessages"]+"</button>"
ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)
ID("delpn").addEventListener('click',function() {mesdel('pnmes')},false)
if (GM_getValue('rep')) {ID("repshow").addEventListener('click',function() {messhower('rep')},false)}
}
else {
ID("showdiv").innerHTML=GM_getValue('repsave')+"<button id=\"delrep\" class=\"flatbuttons\">"+string["bt_deleteallreports"]+"</button>"
if (GM_getValue('pnmes')) {ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)}
ID("delrep").addEventListener('click',function() {mesdel('rep')},false)
ID("repshow").addEventListener('click',function() {messhower('rep')},false)
}
} 
//delets all PMs/reports
function mesdel(type) {
if (type=="pnmes") {
GM_setValue('pnmessave',"")
alert(string["al_deletedmessages"])
messhower("pnmes")
}else {
GM_setValue('repsave',"")
alert(string["al_deletedreport"])
messhower("repmes")
}
}
//marks the current activ room
function markpage() {
page=GM_getValue("page")
if (page==1) {ID("notesbutton1").setAttribute("style","position: absolute; left:10px; bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton1").setAttribute("style","position: absolute; left:10px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==2) {ID("notesbutton2").setAttribute("style","position: absolute; left:35px; bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton2").setAttribute("style","position: absolute; left:35px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==3) {ID("notesbutton3").setAttribute("style","position: absolute; left:60px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton3").setAttribute("style","position: absolute; left:60px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==4) {ID("notesbutton4").setAttribute("style","position: absolute; left:85px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton4").setAttribute("style","position: absolute; left:85px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==5) {ID("notesbutton5").setAttribute("style","position: absolute; left:110px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton5").setAttribute("style","position: absolute; left:110px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==6) {ID("notesbutton6").setAttribute("style","position: absolute; left:135px; bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton6").setAttribute("style","position: absolute; left:135px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==7) {ID("notesbutton7").setAttribute("style","position: absolute; left:160px; bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton7").setAttribute("style","position: absolute; left:160px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==8) {ID("notesbutton8").setAttribute("style","position: absolute; left:185px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton8").setAttribute("style","position: absolute; left:185px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==9) {ID("notesbutton9").setAttribute("style","position: absolute; left:210px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton9").setAttribute("style","position: absolute; left:210px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
if (page==10) {ID("notesbutton10").setAttribute("style","position: absolute; left:235px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background-color:rgb(214, 179, 113); padding:0 2px 0 2px;")} else {ID("notesbutton10").setAttribute("style","position: absolute; left:235px;bottom:10px;-moz-border-radius:15px; -khtml-border-radius:45px; background: transparent; padding:0 2px 0 2px; cursor:pointer;")}
} 
//resetts the position
function resettposition() {
GM_setValue("xkor",1)
GM_setValue("ykor",1)
ID("notesid").style.left="1px"
ID("notesid").style.top="1px"
}
//changes the page of the notepade
function changepage(page) {
GM_setValue("text"+GM_getValue("page"),ID("nottext").value)
GM_setValue("page",page)
ID("nottext").value=GM_getValue("text"+GM_getValue("page"))
markpage()
}
//shows the notepad
function shownote() {
ID("writerid").style.visibility="hidden"
ID("notesid").style.visibility="visible"
ID("nottext").value=GM_getValue("text"+GM_getValue("page")) //hier text.
ID("notesbutton").addEventListener('click',function() {hidenote()},false)
GM_setValue("hiddennotes",false)
}
//hides the notepad
function hidenote() {
ID("writerid").style.visibility="visible"
ID("notesid").style.visibility="hidden"
ID("writerid").addEventListener('click',function() {shownote()},false)
GM_setValue("text"+GM_getValue("page"),ID("nottext").value) //hier text.
GM_setValue("hiddennotes",true)
}
//initialisates the chat
function initchat() {
ID("chatdiv").style.visibility="visible"
ID("chatimg").style.visibility="hidden"
GM_setValue("showchat",true)
reloadit()
} 
//hides the chat
function cancelchat() {
ID("chatdiv").style.visibility="hidden"
ID("chatimg").style.visibility="visible"
ID("chatimg").addEventListener('click',function() {initchat()},false)
GM_setValue("showchat",false)
}
//changes the room of the chat
function changeroom() {
GM_setValue("room",ID("room").value)
}
//send a post to the chat-server
function send() {
ID("chatsend").disabled=true
var str= document.title.split(" - ")
var user=str[1]; 
var text = ID("chatinput").value;
ID("chatinput").value=""
if((text.length > 65) || (text=="")) {alert(string["al_stringerror"]);ID("chatsend").disabled=false} else { //hier length abfrage..
var room = GM_getValue("room")
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.supersites.bplaced.net/chat2.php?user='+user+'&text='+text+'&room='+room,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	 ID("chatsend").disabled=false
    }
});
}}
//relaods the chat every 1,5 seconds
function reloadit() {
var room = GM_getValue("room")
ID("room").selectedIndex =(GM_getValue("room")-1)
var request=GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.supersites.bplaced.net/chat.php?room='+room,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
		ID("chattext").innerHTML=responseDetails.responseText;//}
    }
});
window.setTimeout(function() {reloadit()},1500)
}
//calculates the needed resources every 1,5secs 
function calcresources() {
if(recruit.test(lref()) && GM_getValue("calculator")) {
res1=0
res2=0
res3=0
res4=0
templer=0
knappe=0
berser=0
langbo=0
spaeh=0
kreuz=0
schw=0
sturm=0
tri=0
try{if(document.getElementsByName("sword")[0].name=="sword") {var templer=document.getElementsByName("sword")[0].value} }catch(e) {}
try{if(document.getElementsByName("spear")[0].name=="spear") {var knappe=document.getElementsByName("spear")[0].value} }catch(e) {}
try{if(document.getElementsByName("axe")[0].name=="axe") {var berser=document.getElementsByName("axe")[0].value} }catch(e) {}
try{if(document.getElementsByName("bow")[0].name=="bow") {var langbo=document.getElementsByName("bow")[0].value} }catch(e) {}
try{if(document.getElementsByName("spy")[0].name=="spy") {var spaeh=document.getElementsByName("spy")[0].value} }catch(e) {}
try{if(document.getElementsByName("light")[0].name=="light") {var kreuz=document.getElementsByName("light")[0].value} }catch(e) {}
try{if(document.getElementsByName("heavy")[0].name=="heavy") {var schw=document.getElementsByName("heavy")[0].value} }catch(e) {}
try{if(document.getElementsByName("ram")[0].name=="ram") {var sturm=document.getElementsByName("ram")[0].value} }catch(e) {}
try{if(document.getElementsByName("kata")[0].name=="kata") {var tri=document.getElementsByName("kata")[0].value} }catch(e) {}
res1= templer*30+knappe*10+berser*40+langbo*80+spaeh*40+kreuz*100+schw*100+sturm*100+tri*200
res2= templer*10+knappe*20+berser*50+langbo*160+spaeh*60+kreuz*100+schw*300+sturm*500+tri*600
res3= templer*80+knappe*30+berser*50+langbo*80+spaeh*60+kreuz*300+schw*500+sturm*200+tri*200
res4=templer*1+knappe*1+berser*1+langbo*1+spaeh*2+kreuz*4+schw*6+sturm*5+tri*8
img1="<img src='/img/res2.png'>"
img2="<img src='/img/res1.png'>"
img3="<img src='/img/res3.png'>"
img4="<img src='/img/worker.png'>"
if(ID("resou1")) {ID("resou1").innerHTML=res1; ID("resou2").innerHTML=res2 ; ID("resou3").innerHTML=res3; ID("resou4").innerHTML=res4; } else {
calchtml="<br><table id='calctable' class='ressilist noborder'><tbody><tr><td class='needres'>"+string["tit_calctitel"]+"</td><td class='ressis'>"+img1+"<span id='resou1'>"+res1+"</span>"+img2+"<span id='resou2'>"+res2+"</span>"+img3+"<span id='resou3'>"+res3+"</span></td><td class='siedler'>"+img4+"<span id='resou4'>"+res4+"</span></td></tr></tbody></table>"
document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div/table/tbody", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<tr>"+calchtml+"</tr>"
}
window.setTimeout(function() {calcresources()},1000)
}}
//start drag 'n' drop
function dragStart(e) {
//dragObj.elNode = e.target;
dragObj.elNode = ID("notesid")
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}
function dragGo(e) {
e.preventDefault();
var x = e.clientX
	y = e.clientY
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";

GM_setValue("xkor",parseInt(dragObj.elNode.style.left))
GM_setValue("ykor",parseInt(dragObj.elNode.style.top))
}
function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}
//end drag 'n' drop
function hotkeysdown(a) {
var key=a.keyCode
if((key==13) && (ID("chatinput").value!="")) {send()}
} 

function ID(obj) {
id=document.getElementById(obj);
return id;
}

function lref() {
return document.location.href}
//inits the languages
function initlang() {
lang ={
	Eng: {  
	bt_save:"Save",
	bt_settings:"Toolbox",
	bt_hide:"X",
	bt_hide_chat:"X",
	bt_resett:"Reset",
	bt_send:"Send",
	bt_savereport:"Save Report",
	bt_savemessage:"Save Message",
	bt_showreports:"Show reports",
	bt_showmessages:"Show messages",
	bt_deleteallmessages:"Delete all messages",
	bt_deleteallreports:"Delete all reports",
	bt_hidetop:"Hide header",
	tit_lang:"Language",
	tit_config:"Order of extrabuttons",
	tit_buttons:"Extrabutton",
	tit_titel:"KingsAge Toolbox settings",
	tit_active:"active",
	tit_prem:"Premiumaccount?",
	tit_fill:"200.000",
	tit_highlighter:"Highlighter",
	tit_extrabuttons:"Extrabuttons",
	tit_extrabuttonstab:"Extrabbuttons in new tab",
	tit_messagesaver:"Messagesaver",
	tit_smallmap:"Village-Info with minimap",
	tit_calc:"Resourcecalculator",
	tit_notepad:"Notepad",
	tit_chat:"Chat",
	tit_liable:"The author of the chat is not liable for the written text.",
	tit_calctitel:"Needed resources:",
	tit_scriptby:"&copy; &amp; Script von",
	tit_styleby:"&copy; Style von",
	tit_copyright:"&copy; of images: Kingsage.de",
	tit_header:"Hide Header",
	tit_headeralways:"Always",
	tit_headerbutton:"Button",
	tit_mapofregion:"Map of the region",
	tit_recruit:"Recruit",
	tit_move:"Click here to move the notepad",
	al_stringerror:"Text is too long or empty. Only 65 chars.",
	al_savedmessage:"Saved Message!",
	al_savedreport:"Saved Report!",
	al_deletedmessages:"Messages deleted!",
	al_deletedreport:"Reports deleted!",
	al_illegal:"This is an illegal function.\nDo you really want to use it?",
	op_burg:"Castle",
	op_markt:"Market",
	op_markta:"Market-accept",
	op_bar:"Barracks orders",
	op_baraus:"Barracks train",
	op_barfor:"Barracks research",
	op_snob:"Residence",
	op_gold:"Goldsmith",
	op_map:"Map",
	op_none:"None"
	},
	De: {
	bt_save:"Speichern",
	bt_settings:"Toolbox",
	bt_hide:"X",
	bt_hide_chat:"X",
	bt_resett:"Zurück",
	bt_send:"Senden",
	bt_savereport:"Bericht speichern",
	bt_savemessage:"Nachricht speichern",
	bt_showreports:"Berichte anzeigen",
	bt_showmessages:"Nachrichten anzeigen",
	bt_deleteallmessages:"Alle Nachrichten löschen",
	bt_deleteallreports:"Alle Berichte löschen",
	bt_hidetop:"Header verstecken",
	tit_lang:"Sprache",
	tit_config:"Reihenfolge der zus. Buttons",
	tit_buttons:"Button",
	tit_titel:"KingsAge Toolbox Einstellungen",
	tit_active:"aktiviert",
	tit_prem:"Premiumaccount?",
	tit_fill:"200.000",
	tit_highlighter:"Hervorhebung der Siedlungen",
	tit_extrabuttons:"Zusätzliche Buttons",
	tit_extrabuttonstab:"Zusätzliche Buttons in neuem Tab öffnen",
	tit_messagesaver:"Nachrichten speichern",
	tit_smallmap:"Minimap auf Siedlungs-Info-Seite",
	tit_calc:"Ressourcenrechner",
	tit_notepad:"Notizblock",
	tit_chat:"Chat",
	tit_liable:"Der Chatautor übernimmt keine Haftung für den erscheinenden Text.",
	tit_calctitel:"Benötigte Rohstoffe:",
	tit_scriptby:"&copy; &amp; Script von",
	tit_styleby:"&copy; Style von",
	tit_copyright:"&copy; der Bilder: Kingsage.de",
	tit_header:"Header verstecken",
	tit_headeralways:"Immer",
	tit_headerbutton:"Button",
	tit_mapofregion:"Umgebung der Siedlung",
	tit_recruit:"Ausbilden",
	tit_move:"Hier klicken, um das Notepad zu bewegen&nbsp;&oplus;",
	al_stringerror:"Der Text ist zulang oder leer. Maximal 65 Zeichen.",
	al_savedmessage:"Nachricht gespeichert!",
	al_savedreport:"Bericht gespeichert.",
	al_deletedmessages:"Nachrichten gelöscht!",
	al_deletedreport:"Berichte gelöscht!",
	al_illegal:"Das ist eine illegale Funktion.\nMöchtest du diese wirklich benutzen?",
	op_burg:"Burg",
	op_markt:"Markt",
	op_markta:"Markt Annehmen",
	op_bar:"Kaserne Befehle",
	op_baraus:"Kaserne Ausbilden",
	op_barfor:"Kaserne Forschung",
	op_snob:"Residenz",
	op_gold:"Goldschmiede",
	op_map:"Karte",
	op_none:"Kein"
	},
	Nl: {
	bt_save:"Opslaan",
	bt_settings:"Toolbox",
	bt_hide:"X",
	bt_hide_chat:"X",
	bt_resett:"Herstel.",	
	bt_send:"Verzend",
	bt_savereport:"Rapport opslaan",	
	bt_savemessage:"Bericht opslaan",
	bt_showreports:"Bekijk rapporten",
	bt_showmessages:"Bekijk berichten",
	bt_deleteallmessages:"Verwijder alle berichten",
	bt_deleteallreports:"Verwijder alle rapporten",
	bt_hidetop:"Verberg logo",
	tit_lang:"Taal",
	tit_config:"Volgorde van de extra knoppen",
	tit_buttons:"Extra knop",
	tit_titel:"KingsAge Toolbox instellingen",
	tit_active:"aktief",
	tit_prem:"Premiumaccount?",
	tit_fill:"200.000",
	tit_highlighter:"Markeerstift",	
	tit_extrabuttons:"Extraknoppen",
	tit_extrabuttonstab:"Extraknoppen in een nieuw venster",
	tit_messagesaver:"Berichtenbox",
	tit_smallmap:"Dorpenifo met mini kaart",
	tit_calc:"Grondstoffenrekenmachine",
	tit_notepad:"Notitieblok",
	tit_chat:"Chat",
	tit_liable:"De maker van de chat is niet verandwoordelijk voor de geschreven tekst.",
	tit_calctitel:"Benodigde grondstoffen:",
	tit_scriptby:"&copy; &amp; Script van",
	tit_styleby:"&copy; Style van",
	tit_copyright:"&copy; of images: Kingsage.de",
	tit_header:"Verberg logo",
	tit_headeralways:"Altijd",
	tit_headerbutton:"Button",
	tit_mapofregion:"Kaart van de regio",
	tit_recruit:"Trainen",
	tit_move:"Click hier om het notitie blok te verplaatsen",
	al_stringerror:"Tekst is te lang of leeg. max 65 karakters.",	
	al_savedmessage:"Bericht opgeslagen!",
	al_savedreport:"Rapport opgeslagen!",
	al_deletedmessages:"Bericht verwijderd!",
	al_deletedreport:"Rapport verwijderd!",
	al_illegal:"Dit is een illegale funtie.\n Wilt u het echt gebruiken?",
	op_burg:"Kasteel",
	op_markt:"Markt",
	op_markta:"Markt-accepteren",
	op_bar:"Barakken orders",
	op_baraus:"Barakken trainen",
	op_barfor:"Barakken onderzoeken",
	op_snob:"Paleis",
	op_gold:"Goudsmit",
	op_map:"Kaart",
	op_none:"Niets"
}
}
}
//checks for updates
function checkupdate() {

	//autoupdate
	scriptName='KingsAge Toolbox';
	scriptId='80402';
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					ID('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					ID('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(ID('gm_update_alert'));}, true);
			          		ID('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(ID('gm_update_alert'));}, true);
					ID('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(ID('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}
}




