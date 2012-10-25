<?php
session_start();
$masterpw="xxxxxxxxxxxxx191504da61f55";
mysql_connect("xxxxxxxxx.de","xxxxxxxxxx1","xxxxxxxx23") or die ("Keine Verbindung moeglich");
mysql_select_db("Dxxxxxxxxxx") or die ("Die Datenbank existiert nicht");

if(isset($_GET['action'])) {
	if($_GET['action']=="shownews") {
		$id=intval($_GET['newsid']);
		$code="<div id='newscontent'>";
		$res=mysql_query("Select date,title,text from kingsage_toolbox_news where id=$id");
		$r=mysql_fetch_object($res);
		$code.="<span class='newsdate'>".($r->date)."</span> - <span class='newstitel'>".($r->title)."</span>";
		$code.="<br><span id='newstext'>".($r->text)."</span>";
		$code.="</div>";
		echo $code;
	} else if($_GET['action']=="overview") {
		$code="<div id='newscontent'>";
		$res=mysql_query("Select id,date,title from kingsage_toolbox_news order by id desc");
		while($r=mysql_fetch_object($res))
		{
			$code.="<span class='newsdate'>".($r->date)."</span> - <span class='newstitel'>".($r->title)."</span> <span class='readmore' id='".($r->id)."'>read...</span>";
			$code.="<br>";
		}
		$code.="</div>";
		echo $code;
	} else if($_GET['action']=="login") {
		$user=$_POST['username'];
		$pass=$_POST['password'];
		if(($user=="xxxxxn" || $user=="xxxxxxxx") && $masterpw == md5($pass)) {
			$_SESSION['user']=$user;
			echo "<a href='".$_SERVER['PHP_SELF']."?action=show'>Weiter</a>";
		}
	} else if($_GET['action']=="show") {
		$code="<div id='newscontent'>";
		$res=mysql_query("Select id,date,title from kingsage_toolbox_news order by date desc");
		while($r=mysql_fetch_object($res))
		{
			$code.="<span class='newsdate'>".($r->date)."</span> - <span class='newstitel'>".($r->title)."</span>";
			$code.="<br>";
		}
		$code.="</div>";
		echo $code;
		
	} else if($_GET['action']=="add") {
		$title=mysql_real_escape_string($_POST['title']);
		$text=mysql_real_escape_string($_POST['text']);
		mysql_query("INSERT INTO kingsage_toolbox_news (date,title,text) VALUES (NOW(),'$title','$text')");
		echo "<a href='".$_SERVER['PHP_SELF']."?action=show'>Weiter</a>";
	} else if($_GET['action']=="lastid") {
		$res= mysql_query("select id from kingsage_toolbox_news order by id desc limit 0,1");
		$r=mysql_fetch_object($res);
		echo $r->id;
	}
	if(isset($_SESSION['user']) && $_GET['action']!="add") {
		echo "<br>";
		echo "<br>";
		echo "<form action='".$_SERVER['PHP_SELF']."?action=add' method='Post'><input type='text' name='title'><br><textarea wrap='hard' type='text' name='text'></textarea><br><input type='submit' value='submit'></form>";
	}
} else {
	if(!isset($_SESSION['user'])) {
		echo "<form action='".$_SERVER['PHP_SELF']."?action=login' method='Post'><input type='text' name='username'><br><input type='password' name='password'><br><input type='submit' value='submit'></form>";
	}
}
?>
