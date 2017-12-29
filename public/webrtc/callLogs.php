<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
require_once "../message360/vendor/autoload.php";
try{
	$requestInput = file_get_contents("php://input");
	$requestData = json_decode($requestInput,true);
	$start_date = isset($requestData['start_date']) ? $requestData['start_date'] : "";
	$end_date = isset($requestData['end_date']) ? $requestData['end_date'] : "";
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();
	$accountSid = getenv('ACCOUNT_SID');
	 $authToken = getenv('AUTH_TOKEN');
	$clientInstance = new Message360Lib\Message360Client($accountSid, $authToken);
	$webrtcInstance = $clientInstance->getWebRTCAdmin();

	$options = [
	    'start_date' => $start_date,
	    'end_date' => $end_date,
	    'accountSid' => $accountSid,
	    'authToken' => $authToken,
	];
	$response = $webrtcInstance->getCallLogs($options);

	echo json_encode($response);
}catch(Exception $ex){
	echo json_encode([$ex->getMessage(),$ex->getLine()]);
}