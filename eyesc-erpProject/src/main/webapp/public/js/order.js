/**
 *  @eyes
 *  
 */


var addMaterialIdcount = 0;
var addMaterialIdBtn = function() {
	addMaterialIdcount ++;
	var stockId = '<input type="hidden" class="form-control" id="stockId' + addMaterialIdcount + '" name="stockId">'
	var materialId = '<div class="form-group control-label col-sm-2"><label for="materialId">貨號:</label> <div class="input-group"><input type="text" class="form-control" id=materialId' + addMaterialIdcount + " " + 'name="materialId"><span class="input-group-btn"> <button class="btn btn-primary" type="button" onclick="getStock()">庫存</button></span></div></div>';
	var cutSize = "<div class='form-group control-label col-sm-1'><label for='cutSize'>剪標尺碼:</label><input type='text' class='form-control' id=cutSize" + addMaterialIdcount + " " + "name='cutSize'></div>";
	var cusSize = '<div class="form-group control-label col-sm-1"> <label for="cusSize">客要尺碼:</label><input type="text" class="form-control" id=cusSize' + addMaterialIdcount + " " + 'name="cusSize"></div>';
	var color = '<div class="form-group control-label col-sm-1"><label for="color">顏色:</label><input type="text" class="form-control" id=color' + addMaterialIdcount + " " + 'name="color"></div>';
	var count = '<div class="form-group control-label col-sm-1"><label for="count">件數:</label><input type="text" class="form-control" id=count' + addMaterialIdcount + " " + 'name="count"></div>';
	var priceType = '<div class="form-group control-label col-sm-2"><label for="priceType">出清/現貨原價</label><select class="form-control" id=priceType' + addMaterialIdcount + " " +  'name="priceType"  disabled><option>現貨原價</option><option>出清</option></select></div>'
	var confirm = '<div class="form-group control-label col-sm-2"><label for="confirm">客戶下單/不下單:</label><select class="form-control" id=confirm' + addMaterialIdcount + ' ' + 'name="confirm"><option>待確認</option><option>客戶下單</option><option>客戶不下單</option></select></div>'
	var employee = '<input type="text" class="form-control" id=employee' + addMaterialIdcount + ' ' + 'name="employee" style="display:none"></div>'
	var price = '<div class="form-group control-label col-sm-2"><label for="price">價錢:</label><input type="text" class="form-control" id=price' + addMaterialIdcount + ' ' + 'name="price"</div>'
	$("#addNewMaterialId").before('<div id=addDiv' + addMaterialIdcount + '></div>')
	$("#addDiv" + addMaterialIdcount).append(stockId, materialId, cutSize, cusSize, color, count, priceType, confirm, employee, price)
	$("#deleteAddMaterialIdBtn").show()
}

var deleteAddMaterialIdBtn = function() {
	$("#addDiv" + addMaterialIdcount).remove();
	addMaterialIdcount --;
	if(addMaterialIdcount === 0){
		$("#deleteAddMaterialIdBtn").hide();
	}
}

function getdata() {
	var ArrayM = [];	
	var errorMessage = "";
	for(var i = 0; i <= addMaterialIdcount; i++) {
		var dataArray = {
			stockId : $('input#stockId' + i).val(), 
			materialId : $('input#materialId' + i).val(), 
			cutSize : $('input#cutSize' + i).val(), 
			cusSize : $('input#cusSize' + i).val(), 
			color : $('input#color' + i).val(), 
			count : $('input#count' + i).val(), 
			priceType : $('select#priceType' + i).val(), 
			confirm : $('select#confirm' + i).val(), 
			employeeId : $('input#employee' + i).val(),
			price : $('input#price' + i).val()
		};
		
		ArrayM[i] = dataArray;
		
		if ($('input#materialId' + i).val() == "" || $('input#materialId' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (貨號)<br>");
		}
		if ($('input#cutSize' + i).val() == "" || $('input#cutSize' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (剪標尺碼)<br>");
		}
		if ($('input#cusSize' + i).val() == "" || $('input#cusSize' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (客要尺碼)<br>");
		}
		if ($('input#color' + i).val() == "" || $('input#color' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (顏色)<br>");
		}
		if ($('input#count' + i).val() == "" || $('input#count' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (數量)<br>");
		}
		if ($('input#price' + i).val() == "" || $('input#price' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (價錢)<br>");
		}
	}
	
	var data = {
		customerId : $('input#customerId').val(),
		name : $('input#name').val(),
		bodyType : $('input#bodyType').val(),
		customerSource : $('select#customerSource').val(),
		deliveryType : $('select#deliveryType').val(),
		paymentTerm : $('select#paymentTerm').val(),
		noticeType : $('select#noticeType').val(),
		phone : $('input#phone').val(),
		addressFirst : $('input#addressFirst').val(),
		addressSecond : $('input#addressSecond').val(),
		stockVos : ArrayM
	};
	
	if (errorMessage === "") {
		return data;
	} else {
		bootbox.alert(errorMessage);
		return null;
	}
}

function getStock(){
	bootbox.confirm('庫存確認', function(isConfirmed) {	  
		if (isConfirmed) {
			console.log("yes")
		} else{
			console.log("no")
		}
	});		
}

var getCustomer = function() {
	var customerId = {
		customerId: $('input#customerId').val()
    }
	
	$.ajax({
		url : "searchOneCustomer",
		data : customerId,
		type : "POST",
	}).done(function(returnData) { 
		if (returnData != null && returnData != '') {
			if (returnData.blockList === 'O') {
				console.log(returnData.deliveryType);
				console.log(returnData.noticeType);
				$("#name").val(returnData.name);
				$("#bodyType").val(returnData.bodyType);
				$("#customerSource").val(returnData.customerSource);
//				$("#paymentTerm").val(returnData.paymentTerm);
//				$("#deliveryType").val(returnData.deliveryType);
//				$("#noticeType").val(returnData.noticeType);
				$("#phone").val(returnData.phone);
				$("#addressFirst").val(returnData.addressFirst);	
			} else {
				bootbox.alert("<h3 style='color:red'>此客戶為不接單客戶</h3>");
			}
		} else {
			bootbox.alert("<h3 style='color:blue'>此客戶不存在資料庫！請自行輸入</h4>");
		}
	}).fail(function() {
		bootbox.alert("帶入客戶錯誤，請聯繫工程師");
	}).always(function() {
		console.log('Complete');
	});
	
}

$.validator.setDefaults({
    submitHandler: function(form) {
      alert("Confirm Submit");
    }
});

$().ready(function(){
	$("#orderForm").validate({
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
			materialId:{
				required: true,
			},
			cutSize:{
				required: true,
			},
			cusSize:{
				required: true,
			},
			color:{
				required: true,
			},
			count:{
				required: true,
				numberValidation: true
			},
			price:{
				required: true,
				numberValidation: true
			}
		},
		messages: {
			customerId: {
				required: "請輸入客戶資料",
			},
			
			phone: {
				required: "請輸入客戶電話帳號",
				maxlength : "超過輸入長度",
				minlength : "請至少輸入完整電話號碼"
			},			
			addressFirst: {
				required: "請輸入客戶住址",
			}
		},
		submitHandler: function(form) {
			  var data = getdata();	    
			  if (data != null) {
				  bootbox.confirm('確認新增客戶', function(isConfirmed) {	  
				      if (isConfirmed) {
				    	  console.log(JSON.stringify(data));
					      $.ajax({
								url : "createOrder",
								data : JSON.stringify(data),
								type : "POST",
								dataType: "json", 
							    contentType: "application/json; charset=utf-8",
							}).done(function() {
								console.log('done');
							}).fail(function() {
								location.reload();
//								bootbox.alert("新增錯誤，請聯繫工程師");
							}).always(function() {
								console.log('Complete');
							});
				      }
				  });
			  }
		}
	});
	
 });





