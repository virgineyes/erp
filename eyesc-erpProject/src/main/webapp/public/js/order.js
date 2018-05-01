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

function format ( d ) {
    return '	姓名: '+ d[3] + '<br>' +
    '身形: '+ d[4] + '<br>' +
    '客戶來源: '+ d[5] + '<br>' +
    '電話: '+ d[9] + '<br>' +
    '地址1: '+ d[10] + '<br>' +
    '地址2: '+ d[11] + '<br>'
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
				  bootbox.confirm('確認新增訂單', function(isConfirmed) {	  
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
	
	searchOrder();
	
 });

var createOrder = function() {	
  	  $.ajax({
  		  url : "createOrder",
  		  data : JSON.stringify(data),
  		  type : "POST",
  		  dataType: "json", 
  		  contentType: "application/json; charset=utf-8",
	  }).done(function() {
    		  location.reload();
	  }).fail(function() {
    		  location.reload();
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
	  }).done(function(data) {	
			var dataSet = [];
			for (var i = 0; i < data.length; i++) {
				data[i].lastColumn = "";
				data[i].createDate = moment(data[i].createDate).format("YYYY/MM/DD"); 
				
				if (data[i].shippingDate == null || data[i].shippingDate == 'Invalid date') {
					data[i].shippingDate = '';	
				} else {
					data[i].shippingDate = moment(data[i].shippingDate).format("YYYY/MM/DD");
				}
				dataSet[i] = $.map(data[i], function(el) { return el });
			}
			
			console.log(dataSet);
			
			$("#queryOrderTableContainer").show();
			
			var table = $('#queryOrderTable').DataTable({
				 destroy: true,
			     data: dataSet,
			     lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
			     columnDefs: [ 
			    	 	{
			    	 		targets: -2,
			    	 		data: null,
			    	 		defaultContent: "<button class='btn btn-success' id='orderButton'>下單</button>"
				    },{
			    	 		targets: -1,
			    	 		data: null,
			    	 		defaultContent: "<button class='btn btn-warning' id='updateButton'>更新</button>"
			     	},{		            
		                targets: 0,
		                orderable:false,
		                data:null,
		                defaultContent: "<button class='btn btn-info' id='openData'>細節</button>"
		            },{
	                    targets: [1, 3, 4, 5, 9, 10, 11, 12, 18, 22, 23],
	                    visible: false
		            }
	             ]
			});
			
		    $('#queryOrderTable tbody').on( 'click', 'button#openData', function () {
		        var tr = $(this).closest('tr');
		        var row = table.row( tr )
		        
		        if ( row.child.isShown() ) {
		            tr.removeClass( 'details' );
		            row.child.hide();

		        }
		        else {
		            tr.addClass( 'details' );
		            row.child( format( row.data()) ).show();
		        }
		    } );
		    
			$('#queryOrderTable tbody').on( 'click', 'button#orderButton', function () {
				var data = table.row( $(this).parents('tr') ).data();
				order(data);
			});
						   
			$('#queryOrderTable tbody').on( 'click', 'button#updateButton', function () {
				var data = table.row( $(this).parents('tr') ).data();
				updateOrder(data);
			}); 
	  }).fail(function() {
		  bootbox.alert("新增錯誤，請聯繫工程師");
	  }).always(function() {
		  console.log('Complete');
	  });
}

var order = function(data) {
	bootbox.dialog({
		title: '請選擇確認下單',
		message: "<p>請選擇確認下單</p>",
		buttons: {
//		    cancel: {
//		        label: "取消",
//		        className: 'btn-danger'
//		    },
		    ok: {
		        label: "確認下單",
		        className: 'btn-info',
		        callback: function() {
		        		confirm(data[1]);
		        }
		    }
		}
	});
}

var updateOrder = function(data) {
	  var modal = bootbox.dialog({
	        message: $(".form-content").html(),
	        title: "更新價格",
	        buttons: [
	        {
	            label: "確認更新",
	            className: "btn btn-primary pull-left",
	            callback: function() {	
	              var date = moment($('.modal-dialog .bootbox-body input#date').val()).format("YYYYMMDD");
	              data = {
						  materialId: materialId,
						  updatePrice: $('.modal-dialog .bootbox-body input#updatePrice').val(),
						  date: date,
			      };  
				  console.log(data);
				  
				  bootbox.confirm('確認更新價格', function(isConfirmed) {
				      if (isConfirmed) {
					      $.ajax({
								url : "updateMaterial",
								data : data,
								type : "POST",
							}).done(function(data) {
								reload();
							}).fail(function() {
								bootbox.alert("新增錯誤，請聯繫工程師");
							}).always(function() {
								console.log('Complete');
							});
				      }
				  });

	            }
	          },
	          {
	            label: "Close",
	            className: "btn btn-default pull-left",
	            callback: function() {
	            }
	          }
	        ],
	        show: false,
	        onEscape: function() {
	          modal.modal("hide");
	        }
	    });
	    modal.modal("show");
}


var confirm = function(orderId) {	
	  $.ajax({
		  url : "updateConfirm",
		  data : {
			  orderId: orderId
		  },
		  type : "GET",
	  }).done(function() {
		  location.reload();
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



