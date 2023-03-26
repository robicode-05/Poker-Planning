<?
include("config.php");
include("config.bdd.php");

date_default_timezone_set("Europe/Paris");
header("Server: Passific");
header("X-Powered-By: Passific");
header("Content-Type: application/json; charset=utf-8");

$bdderror = NULL;
//  Data Base access function
function bdd_access($query)
{
    try
    {
        global $site_bdd, $site_bdd_user, $site_bdd_pass;
        $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
        $bdd = new PDO($site_bdd, $site_bdd_user, $site_bdd_pass, $pdo_options);
        $reponse = $bdd->query($query);
        $bdd = NULL;
        return $reponse;
    }
    catch (Exception $e)
    {
        global $bdderror;
        $bdderror = $e->getMessage();
//~         die($e->getMessage());  //debug
        die('Oups...');
        return null;
    }
    return null;
}

$action = isset($_GET['a'])?$_GET['a']:"";
// Remove new lines and extra spaces
$param = isset($_GET['p'])?stripslashes(htmlspecialchars(preg_replace('/\s+/', ' ', trim($_GET['p'])), ENT_QUOTES, "UTF-8")):"";
$value = isset($_GET['v'])?intval($_GET['v']):0;
$table = isset($_GET['t'])?intval($_GET['t']):0;

switch ($action) {
case "reset":
    $result = false;
    if( bdd_access("UPDATE `".$site_bdd_prefix."tables` SET `status`='2', `date`='0000-00-00 00:00:00' WHERE `id`='".$table."'") ) {
        if (bdd_access("DELETE FROM `".$site_bdd_prefix."cards` WHERE `table`='".$table."'")) {
            $result = true;
        }
    }
    echo json_encode( array("result"=>$result, "data" => "") );
    break;
case "reveal":
    $result = false;
    if( bdd_access("UPDATE `".$site_bdd_prefix."tables` SET `status`='1', `date`='0000-00-00 00:00:00' WHERE `id`='".$table."'") ) {
        $result = true;
    }
    echo json_encode( array("result"=>$result, "data" => "") );
    break;
case "update":
    $result = false;
    if( bdd_access("UPDATE `".$site_bdd_prefix."cards` SET `value`='".$value."' WHERE `table`='".$table."' AND `owner`='".$param."'") ) {
        $result = true;
    }
    echo json_encode( array("result"=>$result, "data" => "") );
    break;
case "timeout":
    $result = false;
    if( bdd_access("UPDATE `".$site_bdd_prefix."tables` SET `timeout`='".$value."', `date`='0000-00-00 00:00:00' WHERE `id`='".$table."'") ) {
        $result = true;
    }
    echo json_encode( array("result"=>$result, "data" => "") );
    break;
case "get":
    $data = array();
    $reponse = bdd_access("SELECT * FROM `".$site_bdd_prefix."cards`WHERE `table`='".$table."' ORDER BY `owner` asc");
    while($donnees = $reponse->fetch()) {
        array_push($data, array("id" => $donnees['id'], "value" => $donnees['value'], "table" => $donnees['table'], "owner" => $donnees['owner']));
    }$reponse->closeCursor();
    $tableStatus = 0;
    $tableDate = '0000-00-00 00:00:00';
    $result = false;
    $reponse2 = bdd_access("SELECT * FROM `".$site_bdd_prefix."tables` WHERE `id`='".$table."'");
    while($donnees2 = $reponse2->fetch()) {
        $tableStatus = $donnees2['status'];
        $tableDate = $donnees2['date'];
        $tableTimeout = $donnees2['timeout'];
        $result = true;
    }$reponse->closeCursor();
    echo json_encode( array("result"=>$result, "data" => $data, "status" => $tableStatus, "date" => $tableDate, "timeout" => $tableTimeout ));
    break;
case "select":
    $result = false;
    if( bdd_access("UPDATE `".$site_bdd_prefix."tables` SET `status`='0', `date`=IF(`date`='0000-00-00 00:00:00', NOW(), `date`) WHERE `id`='".$table."'") ) {
        if (bdd_access("INSERT INTO `".$site_bdd_prefix."cards` (`id`, `value`, `table`, `owner`) VALUES ('',".$value.", ".$table.", '".$param."')")) {
            $result = true;
        }
    }
    echo json_encode( array("result" => $result, "data" => "") );
    break;
case "create":
    $result = false;
    if( bdd_access("INSERT INTO `".$site_bdd_prefix."tables` (`id`, `status`, `date`, `timeout`) VALUES (".$table.", '0', '0000-00-00 00:00:00', 60)") ) {
        $result = true;
    }
    echo json_encode( array("result" => $result, "data" => "") );
    break;
case "delete":
    $result = false;
    if (bdd_access("DELETE FROM `".$site_bdd_prefix."tables` WHERE `id`='".$table."'")) {
        $result = true;
    }
    echo json_encode( array("result" => $result, "data" => "") );
    break;
default:
    echo json_encode( array("result" => false, "data" => "Unknown error.") );
    break;
}

?>
