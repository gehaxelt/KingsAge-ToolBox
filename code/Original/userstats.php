<?php
session_start();
$masterpw="xxx"; //MD5
mysql_connect("xxx","xxx","xxx") or die ("Keine Verbindung moeglich");
mysql_select_db("xxx") or die ("Die Datenbank existiert nicht");

mysql_query("delete from `kingsage_toolbox_user` where DATE_SUB(CURDATE(), INTERVAL 7 DAY) >= `date`");
if(isset($_GET['action'])) {
	if($_GET['action']=="login") {
		$user=$_POST['username'];
		$pass=$_POST['password'];
		if(($user=="admin" || $user=="bmin") && $masterpw == md5($pass)) {
			$_SESSION['user']=$user;
			echo "<a href='".$_SERVER['PHP_SELF']."?action=show'>Weiter</a>";
		}
	}
	if($_GET['action']=="update") {
		$user=mysql_real_escape_string($_GET['user']);
		$lang=mysql_real_escape_string($_GET['lang']);
		$server=mysql_real_escape_string($_GET['server']);
		$hash=md5(mysql_real_escape_string($_GET['id']));
		mysql_query("insert into `kingsage_toolbox_user` (hash,lang,world,user,date) VALUES ('$hash','$lang','$server','$user',NOW())") or (mysql_query("update `kingsage_toolbox_user` set date= NOW() where hash='$hash'"));
	}
	if(isset($_SESSION['user']) && $_GET['action']="show") {
		$res2=mysql_query("select count(hash) as anzahl from `kingsage_toolbox_user`");
		$r2=mysql_fetch_object($res2);
		echo "<div id='country'><h1>L&auml;nderverteilung</h1><br><table><tr><th>Land</th><th>Userzahl</th></tr>";
		$res=mysql_query("select lang,count(hash) as anzahl from `kingsage_toolbox_user` group by lang order by anzahl desc");
		
		while($r=mysql_fetch_object($res)) {
			echo "<tr>";
			echo "<th>".($r->lang)."</th>";
			echo "<th>".($r->anzahl)."</th>";
			echo "</tr>";
		}
		echo "</table><br><span>Gesamt: ".$r2->anzahl."</span></div>";
		
		echo "<div id='country'><h1>Weltenverteilung</h1><br><table><tr><th>Welt</th><th>Userzahl</th></tr>";
		$res=mysql_query("select world,count(hash) as anzahl from `kingsage_toolbox_user` group by world order by anzahl desc");
		while($r=mysql_fetch_object($res)) {
			echo "<tr>";
			echo "<th>".($r->world)."</th>";
			echo "<th>".($r->anzahl)."</th>";
			echo "</tr>";
		}
		echo "</table></div>";
	}
} else {
	if(!isset($_SESSION['user'])) {
		echo "<form action='".$_SERVER['PHP_SELF']."?action=login' method='Post'><input type='text' name='username'><br><input type='password' name='password'><br><input type='submit' value='submit'></form>";
	}
}
?>