<?php
class SignNow {

	/* TRIAL API account */
	public $apiBaseURL = "https://api-eval.signnow.com/";    // API TRIAL
	public static $webBaseURL = "https://eval.signnow.com/";  // API TRIAL

	/* PRODUCTION API account */
	// public $apiBaseURL = "https://api.signnow.com/";
	// public static $webBaseURL = "https://signnow.com/";


	public static $template_id = "118f6b60576805ebc1b499d076bbc56a0f6b30ca";


	public $fromEmail = "";
	public $toEmail = "";
	public $password = "";
	public $clientID;
	public $encodedCredentials;
	public $clientToken;


	public function __construct() {

		/* TRIAL API account */
		// $this->clientID = '0fccdbc73581ca0f9bf8c379e6a96813';// Your client id goes here.  // API TRIAL
		// $client_secret="";  // API TRIAL
		// $this->encodedCredentials = 'MGZjY2RiYzczNTgxY2EwZjliZjhjMzc5ZTZhOTY4MTM6MzcxOWExMjRiY2ZjMDNjNTM0ZDRmNWMwNWI1YTE5NmI='; // API TRIAL
		// $this->toEmail = 'luke@weesedesigns.com'; // API TRIAL

		/* TRIAL API account */
		$this->clientID = '0fccdbc73581ca0f9bf8c379e6a96813';
		$client_secret = '3719a124bcfc03c534d4f5c05b5a196b';
		$this->encodedCredentials = 'MGZjY2RiYzczNTgxY2EwZjliZjhjMzc5ZTZhOTY4MTM6MzcxOWExMjRiY2ZjMDNjNTM0ZDRmNWMwNWI1YTE5NmI=';

		// PRODUCTION API ACCOUNT
		// $this->clientID = '957e543d74e4c7c445138c9d1e655e56';// Your client id goes here.
		// $client_secret="ffb238c9e8c8be34437350ae5267168c"; 
		// $this->encodedCredentials = base64_encode($this->clientID.":".$client_secret);


		$this->toEmail = 'websurer@gmail.com'; // Your To email and Signer Token email goes here.

		$this->fromEmail = 'support@tadaoa.com'; // Your From and main account email goes here.

		$this->password = '77732YounggP';

		// On class invocation grab a new client token.
		$this->clientToken = $this->getOAuthToken();
	}
	// For creating a user. 
	public function createUser ($email, $password, $firstName="", $lastName="") {
		$url        = $this->apiBaseURL . "user"; 
		$header     = array("Accept: application/json", "Authorization: Basic ".$this->encodedCredentials);
		$parameters = json_encode(array("email"=>$email,"password"=>$password));
		if (isset($firstName) && !empty($firstName)) { $tempArray["first_name"] = $firstName; }
		if (isset($lastName)  && !empty($lastName))  { $tempArray["last_name"]  = $lastName; }
		return self::makeCurlRequest ($url, $header, $parameters);
	}

	public function getUserAccessToken() {
		$url = "https://api-eval.signnow.com/oauth2/token";

		/* Get a new access key */
		$header = array('Accept:application/json','Authorization: Basic ' . $this->encodedCredentials); 

		$username = $this->fromEmail;
		$grant_type = "password";
		$password = $this->password;

		$parameters = array('username'=> $username,'password' => $password, 'grant_type'=> $grant_type);



		$response = self::makeCurlRequest ($url, $header, $parameters);
		$json_response = json_decode($response);

		// echo "<pre>";
		// print_r($json_response);
		// echo "</pre>";

		if (!isset($_SESSION)) session_start();
		$_SESSION["sn_access_token"] = $json_response->access_token;

		return $_SESSION["sn_access_token"];
		//return $json_response;
	}

	// For getting an OAuthToken for main user.
	public function getOAuthToken() {
		$url = $this->apiBaseURL . "oauth2/token";

		// if (!isset($_SESSION)) session_start();
		// if (!empty($_SESSION["sn_access_token"])) {

			
		// 	$header = array('Accept:application/json','Authorization: Bearer ' . $_SESSION["sn_access_token"]);
		// 	$response = self::makeCurlRequest ($url, $header, "", false);
		// 	if (!empty($response)) {
		// 		$json_response = json_decode($response);
		// 		if (isset($json_response->access_token)) {
		// 			$_SESSION["sn_access_token"] = $json_response->access_token;
		// 			return $_SESSION["sn_access_token"];
		// 		}
		// 	}
		// }

		/* Get a new access key */
		$header = array('Accept:application/json','Authorization: Basic ' . $this->encodedCredentials); 

		$username = $this->fromEmail;
		$grant_type = "password";
		$password = $this->password;
		$scope = "*";

		$parameters = array('username'=> $username,'password' => $password, 'grant_type'=> $grant_type,'scope'=> $scope);

		$response = self::makeCurlRequest ($url, $header, $parameters);
		$json_response = json_decode($response);

		// echo "<pre>";
		// print_r($json_response);
		// echo "</pre>";

		if (!isset($_SESSION)) session_start();
		$_SESSION["sn_access_token"] = $json_response->access_token;

		return $_SESSION["sn_access_token"];
		//return $json_response;
	}

	public function tokenForSigningLink ($document) {
		$url    = $this->apiBaseURL . "oauth2/token";
		$header = array('Accept:application/json','Authorization: Basic ' . $this->encodedCredentials); 

		$username = $this->toEmail; 
		$password = $this->password; 
		$grant_type = "password"; 
		// $scope = "*"; 
		$scope = "signer_limited_scope_token document/".$document; 
		$parameters = array('username'=> $username,'password' => $password, 'grant_type'=> $grant_type,'scope'=> $scope); 
		$response = self::makeCurlRequest ($url, $header, $parameters, true);

		$json_response = json_decode($response);
		return $json_response->access_token;
	}

	public function signerAccountAccessToken () {
		$url    = $this->apiBaseURL . "oauth2/token";
		$header = array('Accept:application/json','Authorization: Basic ' . $this->encodedCredentials); 

		$username = $this->toEmail; 
		$password = $this->password;
		$grant_type = "password";
		$parameters = array('username'=> $username,'password' => $password, 'grant_type'=> $grant_type); 
		$response = self::makeCurlRequest ($url, $header, $parameters, true);

		$json_response = json_decode($response);

		if (!isset($_SESSION)) session_start();
		$_SESSION["signer_access_token"] = $json_response->access_token;

		return $_SESSION["signer_access_token"];
	}

	// For getting a document.
	public function getDocument ($document) {
		$url        = $this->apiBaseURL . "document/".$document;
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, "", false);
	}
	// For getting a document from copying a template
	public function getDocumentFromTemplate ($template, $docName = "") {
		$url = $this->apiBaseURL . "template/".$template."/copy";
		$parameters = "";
		if (!empty($docName)) {
			$parameters = json_encode(array("document_name"=>$docName));
		}
		$header = array("Accept:application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, $parameters, true);
	}
	// For getting history of a document.
	public function getDocumentHistory ($document) {
		$url        = $this->apiBaseURL . "document/".$document."/history";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, "", false);
	}

	// For inviting a user to sign a document.
	public function inviteUserToSignDocument ($document, $email) {
		$url        = $this->apiBaseURL . "document/".$document."/invite?email=enable";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		$parameters = json_encode(array("from"=>$this->fromEmail,"to"=>$email));
		return self::makeCurlRequest ($url, $header, $parameters, true);
	}

	// For getting the signing link to a document.
	public function signingLink ($document) {
		$url        = $this->apiBaseURL . "link/";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		$parameters = json_encode(array("document_id"=>$document));
		return self::makeCurlRequest ($url, $header, $parameters, true);
	}


	// Update Signer account with user first name and turn off reusable signatures
	public function updateSignerAccount ($firstName, $lastName) {
		$signerToken = $this->signerAccountAccessToken();

		$url        = $this->apiBaseURL . "user";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$signerToken);
		$parameters = json_encode(array("first_name"=>$firstName,"last_name"=>$lastName));
		$response = self::makeCurlRequest ($url, $header, $parameters, false, true);

		
		$url        = $this->apiBaseURL . "user/setting/no_user_signature_return";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$signerToken);
		$parameters = json_encode(array("active"=>1));
		$response = self::makeCurlRequest ($url, $header, $parameters, false, true);
	}


	// For inviting a user to sign role-based document.
	// public function inviteUserToSignRoleBasedDocument($document, $role) {
	public function inviteUserToSignRoleBasedDocument($document, $email, $role, $name="", $cc="") {
		/*
		curl -H 'Authorization: Bearer ACCESS_TOKEN' --data '{"to":[{"email":"USER_2_EMAIL","role":"Buyer","order":1, "role_id":"","prefill_signature_name":"Jane Doe"}],"from":"USER_1_EMAIL","cc":[],"subject":"Please Sign","message":"Please Sign"}' https://api-eval.cudasign.com/document/DOCUMENT_ID/invite?email=disable
		 */
		$url    = $this->apiBaseURL . "document/".$document."/invite?email=disable";
		// $url    = $this->apiBaseURL . "document/".$document."/invite?email=enable";
		$header = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);

		$signers = array();
		$signers[] = array(
			"email"=>$this->toEmail,
			"role"=>$role,
			"order"=>1,
			"role_id"=>"",
			"prefill_signature_name"=>$name
		);

		// $ccs = array($email);
		// if (!empty($cc)) {
		// 	$ccs[] = $cc;
		// }

		$params = array(
			// "from"=>$this->toEmail,
			"from"=> $this->fromEmail,
			"to"  => $signers,
			"cc"  => []
		);

		$parameters = json_encode($params);
		// $parameters = $params;
		return self::makeCurlRequest ($url, $header, $parameters, true);
	}

	public function cancelFieldInvite($document) {
		$url    = $this->apiBaseURL . "document/".$document."/fieldinvitecancel";
		$header = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, "", false, true);
	}

	// For adding fields to a document.
	public function addFieldsToDocument($document, $fields, $texts = null) {
		/*
		curl -X PUT -H 'Authorization: Bearer ACCESS_TOKEN' --data '
		{"fields":[{"x":18,"y":18,"width":122,"height":34,"page_number":0,"role":"Buyer","required":true,"label":"a sample label","prefilled_text":"PREFILLED TEXT","type":"text"}]}
		' https://api-eval.signnow.com/document/2586a3f5fe9a79106015602a5191938bfaf698e9
		 */
		$url    = $this->apiBaseURL . "document/".$document;
		$header = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);

		$params = array(
			"fields" => $fields
		);
		if (!empty($texts)) {
			$params["texts"] = $texts;
		}

		$parameters = json_encode($params);
		// echo '<pre>parameters
		// ';
		// print_r($parameters);
		// echo '</pre>';

		// $parameters = $params;
		return self::makeCurlRequest ($url, $header, $parameters, false, true);
	}

	// For uploading a document.
	public function uploadDocument ($file) {
		$url        = $this->apiBaseURL . "document";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		$parameters = array("file"=>"@".realpath($file));
		$response   = json_decode(self::makeCurlRequest ($url, $header, $parameters));
		return $response->id;
	}

	// Generate link to download a document.
	public function downloadDocumentLink ($document) {
		// POST /document/<id>/download/link
		$url        = $this->apiBaseURL . "document/".$document."/download/link";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, "", true);
	}

	// For downloading a document.
	public function downloadDocument ($document) {
		// curl -H 'Authorization: Bearer ACCESS_TOKEN' https://api-eval.signnow.com/document/2586a3f5fe9a79106015602a5191938bfaf698e9/download?type=collapsed
		$url        = $this->apiBaseURL . "document/".$document."/download?type=collapsed";
		$header     = array("Accept: application/json", "Authorization: Bearer ".$this->clientToken);
		return self::makeCurlRequest ($url, $header, "", false);
	}
	// To make a curl request to the sign now api.
	public static function makeCurlRequest ($url, $header="", $parameters="", $post=true, $put=false) {
		$handle = curl_init(); 
		curl_setopt($handle, CURLOPT_URL, $url); 
		if(isset($header) && !empty($header)) { curl_setopt($handle, CURLOPT_HTTPHEADER, $header); }
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); 
		curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); 
		// curl_setopt($handle, CURLOPT_SSLVERSION, 3);
		if($post) { curl_setopt($handle, CURLOPT_POST, true); }
		if($put) { 
			// curl_setopt($handle, CURLOPT_PUT, true); 
			// if(empty($header)) { 
			// 	$header = array();
			// }
			// $header[] = 'X-HTTP-Method-Override: PUT';
			curl_setopt($handle, CURLOPT_CUSTOMREQUEST, "PUT"); // THIS IS THE MAGIC
		}
		if(isset($parameters) && !empty($parameters)) { curl_setopt($handle, CURLOPT_POSTFIELDS, $parameters); }
		$response = curl_exec($handle); 
		return $response;
	}
}

?>