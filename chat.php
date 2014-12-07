<?php
mysql_connect("xxxxxxxde","xxxxxxx1","xxxxxxx23") or die ("Keine Verbindung moeglich");
mysql_select_db("Dxxxxx") or die ("Die Datenbank existiert nicht");
$now=time();
$last=$now-(86400*2);
$ab="DELETE FROM kingsage_toolbox_chat WHERE time < ".$last."";
mysql_query($ab) or die (mysql_error());
$text="";
$room=$_GET['room'];
$room = mysql_real_escape_string($room);
$room =htmlspecialchars($room);
$abfrage = "SELECT * FROM kingsage_toolbox_chat WHERE room =".$room." ORDER BY time DESC LIMIT 0, 10";
$ergebnis = mysql_query($abfrage) or die (mysql_error()); 
$colors=array("#0000FF","#006b00");
$i=1;
$inwhile=false;
while($row = mysql_fetch_object($ergebnis))
    {
	$inwhile=true;
	$i=$i+1;
	$rowuser=$row->user;
	$rowtext=$row->text;
	$rowroom=$row->room;
	$rowtime=$row->time;
	//smiles einsetzen
	$rowtext=str_replace(":D","<img src='/img/forum/smilies/biggrin.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace(":P","<img src='/img/forum/smilies/tongue.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace(":)","<img src='/img/forum/smilies/smile.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace(":(","<img src='/img/forum/smilies/sad.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace(";)","<img src='/img/forum/smilies/wink.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace(":'(","<img src='/img/forum/smilies/crying.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace("*rolleyes*","<img src='/img/forum/smilies/rolleyes.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace("*huh*","<img src='/img/forum/smilies/huh.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace("*unsure*","<img src='/img/forum/smilies/unsure.png' class='smilie'/>",$rowtext);
	$rowtext=str_replace("B)","<img src='/img/forum/smilies/cool.png' class='smilie'/>",$rowtext);
	if($i==1) {
	$text="<span class='chattextodd'><span class='chattextdate'>".date("d. M, H:i",$rowtime)." - </span><span class='chattextuser'>".$rowuser.":</span><span class='chattextpost'>".$rowtext."</span></span>".$text;
	} else
	{
	$text="<span class='chattexteven'><span class='chattextdate'>".date("d. M, H:i",$rowtime)." - </span><span class='chattextuser'>".$rowuser.":</span><span class='chattextpost'>".$rowtext."</span></span>".$text;
	$i=0;
	}
	}
if(!$inwhile)
{
	$text="<span class='chattexteven'><span class='chattextdate'>".date("d. M, H:i",$now)." - </span><span class='chattextuser'>KingsAge ToolBox:</span><span class='chattextpost'>Write the first message...</span></span>";
}
	echo $text;
?>
