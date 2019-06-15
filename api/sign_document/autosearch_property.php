<?php

define('PTL_DBHOST', 'localhost');
define('PTL_DBUSER', 'root');
define('PTL_DBNAME', 'propertytaxlock');
define('PTL_DBPASS', '');
define('PTL_DBTABLE', 'taxes');

//connect with the database
$db = new mysqli(PTL_DBHOST, PTL_DBUSER, PTL_DBPASS, PTL_DBNAME);
if (isset($_POST['account_number'])) {
    $searchTerm = $_POST['account_number'];
    //get matched data from skills table
    //$sql = "SELECT * FROM taxes WHERE Situs_Address LIKE '%".$searchTerm."%' ORDER BY Situs_Address";
    $sql = "SELECT * FROM accountnumbers WHERE account_id = '".$searchTerm."'";
    $query = $db->query($sql);
    if ($query->num_rows > 0) {
        $sql2 = "SELECT Account_Num, Situs_Address, Owner_Name, Owner_Address, Owner_CityState, Owner_Zip, LegalDescription FROM taxes WHERE MATCH (Account_Num) AGAINST ('" . $searchTerm . "')";
        $query2 = $db->query($sql2);

        $total_result = $query2->num_rows;
        if ($total_result > 0) {
            $data = '{"count" : "' . $total_result . '", "response_code" : 200, "response_message" : "success"';
            /*$results = "[";*/
            while ($row = $query2->fetch_assoc()) {
            	/*if ($results !== "[") {
            		$results .= ", ";
            	}*/
                $results = '{"address" : "' . $row['Situs_Address'] . '", "owner_address" : "' . $row['Owner_Address'] . '", "owner_name" : "' . $row['Owner_Name'] . '", "taxnet_id" : "' . $row['Account_Num'] . '", "owner_city" : "' . $row['Owner_CityState'] . '", "owner_zip" : "' . $row['Owner_Zip'] . '", "legal_description" : "' . $row['LegalDescription'] . '"}';
            }
            /*$results .= "]";*/
            $data .= ', "result" : ' . $results . '}';
            // //return json data
            echo $data;
        } else {
            $data = '{"count" : 0, "response_code" : 400, "response_message" : "no record found"}';
            echo $data;
        }
    } else {
        $data = '{"count" : 0, "response_code" : 400, "response_message" : "no record found"}';
        echo $data;
    }
}
?>