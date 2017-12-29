<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
require_once "../message360/vendor/autoload.php";
try{
	$requestInput = file_get_contents("php://input");
	$requestData = json_decode($requestInput,true);
	$current_domain = isset($requestData['current_domain']) ? $requestData['current_domain'] : "";
    $new_domain = isset($requestData['new_domain']) ? $requestData['new_domain'] : "";
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();
	$accountSid = getenv('ACCOUNT_SID');
	 $authToken = getenv('AUTH_TOKEN');
	$clientInstance = new Message360Lib\Message360Client($accountSid, $authToken);
	$webrtcInstance = $clientInstance->getWebRTCAdmin();

	$options = [
		'current_domain' => $current_domain,
		'new_domain' => $new_domain,
	    'accountSid' => $accountSid,
	    'authToken' => $authToken,
	];
	$response = $webrtcInstance->updateDomain($options);

	echo json_encode($response);
}catch(Exception $ex){
	echo json_encode([$ex->getMessage(),$ex->getLine()]);
}