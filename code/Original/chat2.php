<?php
mysql_connect("xxx","xxx","xxx") or die ("Keine Verbindung moeglich");
mysql_select_db("xxx") or die ("Die Datenbank existiert nicht");
$time=time();
$room=$_GET['room'];
$user=$_GET['user'];
$text=$_GET['text'];
$text = mysql_real_escape_string($text);
$text =htmlspecialchars($text);
$user = mysql_real_escape_string($user);
$user =htmlspecialchars($user);
$room = mysql_real_escape_string($room);
$room =htmlspecialchars($room);
$ab="INSERT INTO `kingsage_toolbox_chat` VALUES ('$user','$text','$time','$room')";
mysql_query($ab) or die (mysql_error());
?>