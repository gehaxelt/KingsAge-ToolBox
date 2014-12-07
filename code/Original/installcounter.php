<?php
mysql_connect("xxx","xxx","xxx") or die ("Keine Verbindung moeglich");
mysql_select_db("xxx") or die ("Die Datenbank existiert nicht");
$iphash=md5($_SERVER['REMOTE_ADDR']);

mysql_query("INSERT INTO `kingsage_toolbox_installs` (date,iphash) VALUES (NOW(),'$iphash')");

$res=mysql_query("SELECT count(id) as anzahl FROM `kingsage_toolbox_installs`");
$r=mysql_fetch_object($res);
echo "Gesamt: ".($r->anzahl)."<br>";

$res=mysql_query("SELECT date,count(id) as anzahl FROM `kingsage_toolbox_installs` group by date order by date desc");
while($r=mysql_fetch_object($res))
{
	echo $r->date;
	echo " =>";
	echo $r->anzahl;
	echo "<br>";
}

?>