<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
require_once "../message360/vendor/autoload.php";
try{
	$requestInput = file_get_contents("php://input");
	$requestData = json_decode($requestInput,true);
	$phone_number = isset($requestData['phone_number']) ? $requestData['phone_number'] : "";
	$action = isset($requestData['action']) ? $requestData['action'] : "";
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();
	$accountSid = getenv('ACCOUNT_SID');
	 $authToken = getenv('AUTH_TOKEN');
	$clientInstance = new Message360Lib\Message360Client($accountSid, $authToken);
	$webrtcInstance = $clientInstance->getWebRTCAdmin();

	$options = [
		'phone_number' => $phone_number,
		'action' => $action,
	    'accountSid' => $accountSid,
	    'authToken' => $authToken,
	];
	$response = $webrtcInstance->setWebrtcOverride($options);

	echo json_encode($response);
}catch(Exception $ex){
	echo json_encode([$ex->getMessage(),$ex->getLine()]);
}