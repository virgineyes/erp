/**
 *  @eyes
 *  
 */

$.validator.setDefaults({
    submitHandler: function(form) {
      alert("Confirm Submit");
     
    }
});

$().ready(function(){
	$("#customerOrderForm").validate({
		rules: {
			customerId: {
				required: true,
                customerIdEndCode : true,
                customerIdEqualPhone : true,

			},
			name: {
				required: true,
			},
			phone: {
				required: true,
				phoneValidation : true,
				maxlength : 12,
				minlength : 10,			
			}, 
			addressFirst: {
				required: true,
				addressValidation : true,
			},
            addressSecond: {
				required: true,
				addressValidation : true,
			},
			
		},
		messages: {
			customerId: {
				required: "請輸入客戶FB/Line/網站+電話末五碼",
			},
			
			phone: {
				required: "請輸入客戶電話帳號",
				maxlength : "超過輸入長度",
				minlength : "請至少輸入完整電話號碼"
			},			
			addressFirst: {
				required: "請輸入客戶住址",
			},
			addressSecond: {
				required: "請輸入客戶住址",
			},
		},
	});
	
 });







function intoCustomerInformation() {
	
	
}