/**
 *  @eyes
 *  
 */

var addMaterialIdcount = 0;
var addMaterialIdBtn = function() {
	addMaterialIdcount ++;
	var stockId = '<input type="hidden" class="form-control" id="stockId' + addMaterialIdcount + '" name="stockId">'
	var materialId = '<div class="form-group control-label col-sm-3">' + 
		'<label for="materialId">貨號:</label>' + 
		'<div class="input-group"><input type="text" class="form-control" id=materialId' + addMaterialIdcount + " " + 'name="materialId">' + 
		'<span class="input-group-btn"><button class="btn btn-primary" type="button" onclick="getStock(' + addMaterialIdcount + ')">庫存</button></span>' + 
		'<span class="input-group-btn"><button class="btn btn-success" type="button" onclick="getMaterialId(' + addMaterialIdcount + ')">貨號</button></span>' + 
		'</div></div>';
	var price = '<div class="form-group control-label col-sm-1"><label for="count">價格:</label><input type="text" class="form-control" id=price' + addMaterialIdcount + " " + 'name="price" disabled></div>'
	var cutSize = "<div class='form-group control-label col-sm-1'><label for='cutSize'>剪標尺碼:</label><input type='text' class='form-control' id=cutSize" + addMaterialIdcount + " " + "name='cutSize'></div>";
	var cusSize = '<div class="form-group control-label col-sm-1"> <label for="cusSize">客要尺碼:</label><input type="text" class="form-control" id=cusSize' + addMaterialIdcount + " " + 'name="cusSize"></div>';
	var color = '<div class="form-group control-label col-sm-1"><label for="color">顏色:</label><input type="text" class="form-control" id=color' + addMaterialIdcount + " " + 'name="color"></div>';
	var count = '<div class="form-group control-label col-sm-1"><label for="count">件數:</label><input type="text" class="form-control" id=count' + addMaterialIdcount + " " + 'name="count"></div>';
	var priceType = '<div class="form-group control-label col-sm-2"><label for="priceType">出清/現貨原價</label><select class="form-control" id=priceType' + addMaterialIdcount + " " +  'name="priceType"  disabled><option>現貨原價</option><option>出清</option></select></div>';
	var confirm = '<div class="form-group control-label col-sm-2"><label for="confirm">客戶下單/不下單:</label><select class="form-control" id=confirm' + addMaterialIdcount + ' ' + 'name="confirm"><option>待確認</option><option>客戶下單</option><option>客戶不下單</option></select></div>';
	var employee = '<input type="text" class="form-control" id=employee' + addMaterialIdcount + ' ' + 'name="employee" style="display:none"></div>';
	$("#addNewMaterialId").before('<div id=addDiv' + addMaterialIdcount + '></div>')
	$("#addDiv" + addMaterialIdcount).append(stockId, materialId, price, cutSize, cusSize, color, count, priceType, confirm, employee)
	$("#deleteAddMaterialIdBtn").show()
}

var deleteAddMaterialIdBtn = function() {
	$("#addDiv" + addMaterialIdcount).remove();
	addMaterialIdcount --;
	if(addMaterialIdcount === 0){
		$("#deleteAddMaterialIdBtn").hide();
	}
}

var getOrderHeaderObject = function() {
	var orderHeader = {
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
		}
	return orderHeader;
}

var getOrderDetailArray = function() {
	var stockVoArray = [];	
	var errorMessage = "";
	for (var i = 0; i <= addMaterialIdcount; i++) {
		var stockVo = {
			stockId : $('input#stockId' + i).val(), 
			materialId : $('input#materialId' + i).val(), 
			price: $('input#price' + i).val(),
			cutSize : $('input#cutSize' + i).val(), 
			cusSize : $('input#cusSize' + i).val(), 
			color : $('input#color' + i).val(), 
			count : $('input#count' + i).val(), 
			priceType : $('select#priceType' + i).val(), 
			confirm : $('select#confirm' + i).val(), 
			employeeId : $('input#employee' + i).val(),
		};
		
		stockVoArray[i] = stockVo;
		
		if ($('input#materialId' + i).val() == "" || $('input#materialId' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (貨號)<br>");
		}
		if ($('input#price' + i).val() == "" || $('input#price' + i).val() == null) { 
			errorMessage = errorMessage.concat("請輸入第 " + (i+1) + " 個 (價格)<br>");
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
	}
	
	if (errorMessage === "") {
		return stockVoArray;
	} else {
		bootbox.alert(errorMessage);
		return null;
	}
}

var getdata = function(orderHeaderObject, orderDetailArray) {
	var stockVosObject = {
		stockVos : orderDetailArray
	};
	
	var data = Object.assign({}, orderHeaderObject, stockVosObject);
	return data;
}

var getDataArray = function(orderHeaderObject, orderDetailArray) {
	var dataArray = [];
	console.log(orderDetailArray.length)
	for (var i = 0; i < orderDetailArray.length;  i++) {
		dataArray[i] = Object.assign({}, orderHeaderObject, orderDetailArray[i]);
	}
	return dataArray;
}

function getStock(itemNumber){
	bootbox.confirm('庫存確認', function(isConfirmed) {	  
		if (isConfirmed) {
			console.log(itemNumber)
		}
	});		
}

function getMaterialId(itemNumber){
	  var select = 'input#materialId' + itemNumber;
	  var materialId = {
			materialId: $(select).val()
	  }
	  
	  $.ajax({
			url : "searchOneMaterail",
			data : materialId,
			type : "POST",
		}).done(function(returnData) {	
			console.log(returnData);
			if (returnData != '' && returnData != null) {
				select = "#price" + itemNumber;
				$(select).val(returnData.price);
			} else {
				bootbox.alert("<h3 style='color:red'>請輸入正確貨號！</h3>");
			}
		}).fail(function() {
			bootbox.alert("新增錯誤，請聯繫工程師");
		}).always(function() {
			console.log('Complete');
		});
}

var getCustomerItemNum = function() {
	return $('.bs-checkbox input:checked').attr('data-index');
}

var insertCustomer = function(data) {
		$("#customerId").val(data.customerId);
		$("#name").val(data.name);
		$("#bodyType").val(data.bodyType);
		$("#customerSource").val(data.customerSource);
	//	$("#paymentTerm").val(data.paymentTerm);
		if (data.deliveryType === "完全免運") {
			$("#deliveryType").val(data.deliveryType);	
		}
		$("#noticeType").val(data.noticeType);
		$("#phone").val(data.phone);
		$("#addressFirst").val(data.addressFirst);	
}

var getCustomer = function() {
	if ($('input#customerId').val().length === 5) {
		var customerId = {
				customerId: $('input#customerId').val()
		    } 
			
			$.ajax({
				url : "searchCustomerEnding",
				data : customerId,
				type : "POST",
			}).done(function(returnData) { 
				if (returnData != null && returnData != '') {
//					console.log(returnData);
					$('#insertCustomerTable').bootstrapTable({
						columns : [{
						    title: '選擇',
						    	radio: true
						},{
						    field: 'customerId',
						    title: '客戶ID'
						}, {
						    field: 'name',
						    title: '收件人'
						}, {
						    field: 'phone',
						    title: '電話'
						}],
				        striped : true,
				        cache : false,
				        showColumns: false,
				        data: returnData,                        
				        rowStyle : function() {
				        		return {
				        			classes: 'text-nowrap'
				        	  	};
				        },
					});
					var modal = bootbox.dialog({
					    title: '選擇客戶',
					    message: $(".insertCustomer").html(),
					    buttons: {
						    cancel: {
						        label: "取消帶入客戶",
						        className: 'btn-danger',
						        callback: function(){
						        		location.reload();
						        }
						    },
						    ok: {
						        label: "帶入客戶",
						        className: 'btn-info',
						        callback: function() {
						        		console.log(returnData[getCustomerItemNum()]);
						        		insertCustomer(returnData[getCustomerItemNum()]);
						        }
						    }
						},
					    show: false,
					        onEscape: function() {
					        modal.modal("hide");
					    }
					});
					modal.modal("show");
				} else {
					bootbox.alert("<h3 style='color:blue'>不存在此客戶！請自行輸入</h4>");
				}
			}).fail(function() {
				bootbox.alert("帶入客戶錯誤，請聯繫工程師");
			}).always(function() {
				console.log('Complete');
			});
	} else {
		bootbox.alert("<h3 style='color:red'>請確實輸入電話後五碼</h4>");
	}
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
			  var stockVosArray = getOrderDetailArray();	    
			  if (stockVosArray != null) {
				  bootbox.confirm('確認新增客戶', function(isConfirmed) {	  
				      if (isConfirmed) {
				    	  	  var orderHeaderObject = getOrderHeaderObject();
				    	  	  //show insert information
				    	  	  var dataArray = getDataArray(orderHeaderObject, stockVosArray);
						  $("#newOrder").show();
						  $('#newOrderTable').bootstrapTable({
					          columns : column,
					          striped : true,
					          cache : false,
					          showColumns: false,
					          data: dataArray,                        
					          rowStyle : function() {
					        	  	return {
					        	  		classes: 'text-nowrap'
					        	  	};
					          },
						  });
						  
						  $("button#deleteNewOrder").attr("onclick","reload()");
					    	 
					      // insert table
					      data = getdata(orderHeaderObject, stockVosArray); 
						  $("button#confirmNewOrder").attr("onclick","createOrder()");
					  }
				  });
			  }
		}
	});
	
 });

var createOrder = function() {	
//	  console.log(JSON.stringify(data));
  	  $.ajax({
  		  url : "createOrder",
  		  data : JSON.stringify(data),
  		  type : "POST",
  		  dataType: "json", 
  		  contentType: "application/json; charset=utf-8",
	  }).done(function(returnData) {
    		  location.reload();
	  }).fail(function() {
//    			location.reload();
		  	bootbox.alert("新增錯誤，請聯繫工程師");
	  }).always(function() {
		  	console.log('Complete');
	  });
}

var searchOrder = function() {
	  $.ajax({
  		  url : "searchOrder",
  		  data : null,
  		  type : "GET",
	  }).done(function(returnData) {
		  console.log(returnData);
	  }).fail(function() {
		  bootbox.alert("新增錯誤，請聯繫工程師");
	  }).always(function() {
		  console.log('Complete');
	  });
}


var column = [{
    field: 'customerId',
    title: '客戶ID'
}, {
    field: 'name',
    title: '收件人'
}, {
    field: 'bodyType',
    title: '身型'
}, {
    field: 'customerSource',
    title: '客戶來源'
}, {
    field: 'deliveryType',
    title: '運費方案'
}, {
    field: 'paymentTerm',
    title: '付款方式'
}, {
    field: 'noticeType',
    title: '出貨前通知'
}, {
    field: 'phone',
    title: '電話'
}, {
    field: 'addressFirst',
    title: '地址1'
}, {
    field: 'addressSecond',
    title: '地址2'
}, {
    	field: 'materialId',
    	title: '貨號'
}, {
	field: 'price',
	title: '價格'
}, {
	field: 'cutSize',
	title: '剪標尺碼'
}, {
	field: 'cusSize',
	title: '客要尺碼'
}, {
	field: 'color',
	title: '顏色'
}, {
	field: 'count',
	title: '數量'
}, {
	field: 'priceType',
	title: '原價/出清'
}, {
	field: 'confirm',
	title: '下單狀態'
}];



