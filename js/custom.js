$(document).ready(function(){
    $("#fetchAccountDetails").on('click', function(){
    	
    	//first grab the account number from the field.
    	const accountNumber = $(this).parent().find('input#account_number').val();

    	//check if the field is not empty
    	if (accountNumber !== '') {

    		//grab the modal container
	    	const modalContainer = $('div#modal_content');

	    	//add the loading icon to the modal
	    	const modalLoadingContent = `<p><img src="images/loading.gif" width="24" height="24" /> Fetching Account Details....</p>`;
	    	
	    	//insert loading content into modal
	    	modalContainer.html(modalLoadingContent);

	    	//display the modal
    		$("#myModal").modal();
    		
	    	const modalFooter = $('div#modal_footer');
	    	const signNowTemplateLink = 'https://signnow.com/s/aBPMHxZV?';
	    	const county_name = 'TARRANT COUNTY APPRAISAL DISTRICT';
	    	const siteName = window.location.hostname;
	    	const dateObj = new Date();
	    	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const todayDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    		console.log(accountNumber);
    		$.ajax({
	            url: "autosearch_property.php",
	            method: "POST",
	            data: {'account_number' : accountNumber},
	            success:function(data){
	                let result = JSON.parse(data);
	                if (result.response_code == 200) {
						console.log(result);
						const props = result.result;
						let modalContent = `<p>Confirm Your Account Details</p>
											<table class="table table-striped">
												<tbody>
													<tr>
														<th>Owner Name</th>
														<td>${props.owner_name}</td>
													</tr>
													<tr>
														<th>Owner Address</th>
														<td>${props.owner_address}</td>
													</tr>
													<tr>
														<th>Owner City / State / Zip</th>
														<td>${props.owner_city} / ${props.owner_zip}</td>
													</tr>
													<tr>
														<th>Account Number</th>
														<td>${props.taxnet_id}</td>
													</tr>
													<tr>
														<th>Situs Address</th>
														<td>${props.address}</td>
													</tr>
													<tr>
														<th>Legal Description</th>
														<td>${props.legal_description}</td>
													</tr>
												</tbody>
											</table>`;
						//populate the modal with the new details
						modalContainer.html(modalContent);
						//populate the footer link

						const footerLinkHref = encodeURI(`${signNowTemplateLink}county=${county_name}&owner_name=${props.owner_name}&owner_city=${props.owner_city}, ${props.owner_zip}&owner_address=${props.owner_address}&situs_address=${props.address}&legal_description=${props.legal_description}&account_num=${props.taxnet_id}&today_date=${todayDate}&redirect_uri=http://${siteName}`);
						const footerLink = `<a href="${footerLinkHref}" class="btn btn-primary">Sign Document</a>`;
						modalFooter.find('span').html(footerLink);

					} else {
						console.log(result);
						//populate the modal with error message
						modalContainer.html('<p>Property Was Not Found</p>');
					}
	            }
	        });
    	}
    	
    });
});