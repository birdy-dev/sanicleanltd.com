<?php
/**
Subscribe a New Member to a List using the MCAPI.php 
**/
require_once 'MCAPI.class.php';

//API Key - see http://admin.mailchimp.com/account/api
$apikey = 'd0368a83a75aa11524a621a01a8ebc3f-us4';
    
// A List Id to run examples against.
// Also, login to MC account, go to List, then List Tools, and look for the List ID entry
$listId = '8b391c9985';
    
//email address submitted
$my_email = $_POST['email'];
	

$api = new MCAPI($apikey);

$merge_vars;

$retval = $api->listSubscribe( $listId, $my_email, $merge_vars, 'html', false );

if ($api->errorCode){
	echo "Unable to load listSubscribe()!\n";
	echo "\tCode=".$api->errorCode."\n";
	echo "\tMsg=".$api->errorMessage."\n";
} else {
    echo "ok";
}

?>
