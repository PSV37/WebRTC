<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
require_once "../message360/vendor/autoload.php";
try{
	$requestInput = file_get_contents("php://input");
	$requestData = json_decode($requestInput,true);
	$firstname = isset($requestData['firstname']) ? $requestData['firstname'] : "";
    $lastname = isset($requestData['lastname']) ? $requestData['lastname'] : "";
    $username = isset($requestData['username']) ? $requestData['username'] : "";
    $password = isset($requestData['password']) ? $requestData['password'] : "";
    $password_confirmation = isset($requestData['password_confirmation']) ? $requestData['password_confirmation'] : "";
    $phonenumber = isset($requestData['phonenumber']) ? $requestData['phonenumber'] : "";
	$dotenv = new Dotenv\Dotenv(__DIR__);
	$dotenv->load();
	$accountSid = getenv('ACCOUNT_SID');
	 $authToken = getenv('AUTH_TOKEN');
	$clientInstance = new Message360Lib\Message360Client($accountSid, $authToken);
	$webrtcInstance = $clientInstance->getWebRTCAdmin();

	$options = [
		'firstname' => $firstname,
		'lastname' => $lastname,
		'username' => $username,
		'password' => $password,
		'password_confirmation' => $password_confirmation,
		'phonenumber' => $phonenumber,
	    'accountSid' => $accountSid,
	    'authToken' => $authToken,
	];
	$response = $webrtcInstance->createUser($options);

	echo json_encode($response);
}catch(Exception $ex){
	echo json_encode([$ex->getMessage(),$ex->getLine()]);
}