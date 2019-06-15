<?php
include_once('classes/sendmail.php');
include_once('config.php');

header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// if( empty($_POST['firstName']) && empty($_POST['email']) ) {
//     echo json_encode(
//         [
//            "sent" => false,
//            "message" => $SendMailEmptyerrorMessage
//         ]
//     ); 
//     exit();
// }

if ($_POST){
//@important: Please change this before using
http_response_code(200);
$subject = $_POST['clientname'] . ' Income And Expense Form';
$from = $_POST['email'];

$message = '
<!DOCTYPE HTML>
<html>
<head>
<title>Tadaoa | Document Signing</title>
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<style>
table, td, th {    
    border: 1px solid #ddd;
    text-align: left;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: left;
    padding: 8px;
}

table.confirm-dtails td {
    text-align: center;
}

tr:nth-child(even){background-color: #f2f2f2}
</style>
</head>
<body>
<div>
<div>';

$message .= '
<div class="col-sm-12">
<h2>CLIENT DETAILS</h2>
<div class="table-responsive">
<table class="table table-striped confirm-dtails">
<tbody>
<tr>
<td>
<h3>' . $_POST['clientname'] . '</h3>
<p>Client Name</p>
</td>
<td>
<h3>' . $_POST['glarea'] . '</h3>
<p>Gross Leaseable Area</p>
</td>
<td>
<h3>' . $_POST['vacantarea'] . '</h3>
<p>Vacant Area</p>
</td>
<td>
<h3>' . $_POST['askingrent'] . '</h3>
<p>Asking Rent</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['propertyaddress'] . '</h3>
<p>Property Address</p>
</td>
<td>
<h3>' . $_POST['taxaccno'] . '</h3>
<p>Tax Acc. No</p>
</td>
<td>
<h3>' . $_POST['pgincome'] . '</h3>
<p>Potential Gross Income</p>
</td>
<td>
<h3>' . $_POST['agincome'] . '</h3>
<p>Actual Gross Income</p>
</td>
</tr>
</tbody>
</table>
</div>
</div>';

$message .= '
<div class="col-sm-12">
<h2>INCOME INFORMATION</h2>
<div class="table-responsive">
<table class="table table-striped">
<thead>
<tr>
<th>Suite#</th>
<th>Tenant(s)</th>
<th>SqFt.</th>
<th>Rent (USD)</th>
<th>Lease Term(Yrs)</th>
<th>Year <br />Lease Started</th>
</tr>
</thead>
<tbody>';

$totalRent = 0;
for ($i=0; $i < count($_POST['income_info']); $i++) { 
$totalRent = $totalRent + (int)$_POST['income_info'][$i]['rent'];
$message .= '
<tr>
<td>
<h3>'. $_POST['income_info'][$i]['suite'] . '</h3>
</td>
<td>
<h3>'. $_POST['income_info'][$i]['tenant'] . '</h3>
</td>
<td>
<h3>'. $_POST['income_info'][$i]['sqft'] . '</h3>
</td>
<td>
<h3>'. $_POST['income_info'][$i]['rent'] . '</h3>
</td>
<td>
<h3>'. $_POST['income_info'][$i]['lease'] . '</h3>
</td>
<td>
<h3>'. $_POST['income_info'][$i]['year'] . '</h3>
</td>
</tr>';
}

$message .= '
<tr>
<td colSpan="3"><h3>Total Rent</h3></td>
<td><h3>USD ' . $totalRent . '</h3></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>
</div>
';

$message .= '
<div class="col-sm-12">
<h2>EXPENSES INFORMATION (USD)</h2>
<div class="table-responsive">
<table class="table table-striped">
<tbody>
<tr>
<td>
<h3>' . $_POST['propertytaxes'] . '</h3>
<p>Property Taxes</p>
</td>
<td>
<h3>' . $_POST['insurance'] . '</h3>
<p>Insurance</p>
</td>
<td>
<h3>' . $_POST['management'] . '</h3>
<p>Management</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['maintenance'] . '</h3>
<p>Maintenance</p>
</td>
<td>
<h3>' . $_POST['water'] . '</h3>
<p>Water</p>
</td>
<td>
<h3>' . $_POST['repairs'] . '</h3>
<p>Repairs</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['gas'] . '</h3>
<p>Gas</p>
</td>
<td>
<h3>' . $_POST['janitoria'] . '</h3>
<p>Janitorial</p>
</td>
<td>
<h3>' . $_POST['electric'] . '</h3>
<p>Electric</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['trashremoval'] . '</h3>
<p>Trash Removal</p>
</td>
<td>
<h3>' . $_POST['advertising'] . '</h3>
<p>Advertising</p>
</td>
<td>
<h3>' . $_POST['legalfees'] . '</h3>
<p>Legal Fees</p>
</td>
</tr>
<tr>
<td><h3>Total</h3></td>
<td colspan="2"><h3>USD ' . $_POST['totalExpenses'] . '</h3></td>
</tr>
</tbody>
</table>
</div>
</div>
';

$message .='
<div class="col-sm-12">
<h2>TENANT REIMBURSEMENT (USD)</h2>
<div class="table-responsive">
<table class="table table-striped">
<tbody>
<tr>
<td>
<h3>' . $_POST['taxes1'] . '</h3>
<p>Taxes</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['insurance1'] . '</h3>
<p>Insurance</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['electric1'] . '</h3>
<p>Electric</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['repairs1'] . '</h3>
<p>Repairs</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['trashremoval1'] . '</h3>
<p>Trash Removal</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['janitorial1'] . '</h3>
<p>Janitorial</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['maintenance1'] . '</h3>
<p>Maintenance</p>
</td>
</tr>
<tr>
<td>
<h3>' . $_POST['others1'] . '</h3>
<p>Others</p>
</td>
</tr>
<tr>
<td><h3>Total: USD ' . $_POST['totalReimbursement'] . '</h3></td>
</tr>
</tbody>
</table>
</div>
</div>
';

$message .= '
</div>
</div>
</body>
</html>	
';

//Actual sending email
$sendEmail = new Sender($adminEmail, $from, $subject, $message);
$sendEmail->send();

} else {
 // tell the user about error
 echo json_encode(
     [
        "sent" => false,
        "message" => $SendMailFailederrorMessage
     ]
 );
}