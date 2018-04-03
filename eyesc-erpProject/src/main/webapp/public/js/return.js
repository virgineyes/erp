/**
 * 
 */

function format ( d ) {
    return '收件人: '+ d[2] + '<br>' + '運費: '+ d[3] + '<br>' + '價格: '+ d[6] + '<br>' + '客戶拒收: '+ d[11] + '<br>'
}

//刪除array裡的特定元素,所創建的function
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
		return -1;
	};
	
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

$.validator.setDefaults({
    submitHandler: function(form) {
      alert("Confirm Submit");
    }
});

$().ready(function(){
	console.log('inner');
	$('#queryCustomer').on('click', function(){
		var id = $('input#queryCustomerId').val()
		console.log('hello');
		console.log(id);
		$.ajax({
			url:"public/js/order.json",
			dataType:"json",
			data:{
				customerId : id
			},
			type:"GET",
		}).done(function(data){
			var dataArray=[];
			for(var i = 0; i < data.length; i++ ){
				dataArray[i] = $.map(data[i],function(el){return el});
			}
			
			$("#queryOrderTableContainer").show();
			
			var table = $('#queryOrderTable').DataTable({
				destroy: true,
				scrollX: false,
				autoWidth: false,
				data:dataArray,
				lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
				columnDefs: [{
		     		data: null,
		     		defaultContent: '<label><input type="checkbox" id="selectOrders" value=""></label>',
		     		orderable: false,
		     		targets: 0,
		     	},{
		     		data: null,
		     		defaultContent: "<button class='btn btn-warning' id='changeMaterialButton'>換貨</button",
		     		orderable: false,
		     		targets: -1,
		     	},{
                    targets: [3,4,6,7,9,10,16,18,19],
                    visible: false
		     	}]
			});
			//換貨:
			$('#queryOrderTable tbody').on( 'click', 'button#changeMaterialButton', function () {
				var data = table.row( $(this).parents('tr') ).data();
				console.log(data);
				bootbox.dialog({
					title: '	換貨表',
					message: "<p>請填寫換貨資訊</p>",
					buttons: {
					    ok: {
					        label: "填寫退貨資訊",
					        className: 'btn-info',
					        callback: function() {
					        		console.log('update');
					        		showUpdateCustomer(data);
					        }
					    },
					    cancel: {
					        label: "取消",
					        className: 'btn-warning',
					        callback: function(){
					        		reload();
					        }
					    },
					}
				});
			});
			//退貨:
			var returnArray=[];
			$("#queryOrderTable tbody").on("click", "input#selectOrders", function(){
				var data = table.row( $(this).parents('tr') ).data();
				if($(this).prop("checked")){
					returnArray.push(data);
					$('button#refound').show();
					$('button#saleOrder').show();
					console.log(returnArray);
				}else{
					returnArray.remove(data);
					if(returnArray == [] || returnArray == ""){$('button#refound').hide();$('button#saleOrder').hide()};
					console.log(returnArray);
				};
			});
			var RefoundData = [];
			$("button#refound").on('click', function(){
				for(var i = 0; i < returnArray.length; i++ ){
					RefoundData[i] = returnArray[i];
					console.log(RefoundData);
				}
				var dialog = bootbox.dialog({
					size: 'larger',
					title: '	退貨表',
					message: "<p>請選「退貨」或「拒收」</p>",
					buttons: {
					    cancel: {
					        label: "	退貨",
					        className: 'btn btn-warning',
						    callback: function(){
						    		showInsertReturn(RefoundData);
						    		}
					        },
						    ok: {
						        label: "客戶拒收",
						        className: 'btn-info',
						        callback: function(){
						        	console.log("客戶拒收");
						        }
						    }
						}
					});
				});
			}).fail(function() {
					bootbox.alert("資料錯誤，請聯繫工程師");
				}).always(function() {
					console.log('complete');
				});
			});
	//搜尋退貨中的訂單
	$('#queryReturnCustomer').on('click', function(){
		var id = $('input#queryReturnCustomerId').val();
		console.log(id);
		$.ajax({
			url:"public/js/orderReturn.json",
			dataType:"json",
			data:{
				customerId : id
			},
			type:"GET",
		}).done(function(data){
			var dataArray=[];
			for(var i = 0; i < data.length; i++ ){
				dataArray[i] = $.map(data[i],function(el){return el});
			}
			
			$("#queryReturnsTableContainer").show();
			
			var table = $('#queryReturnsTable').DataTable({
				 autoWidth: false,
				 destroy: true,
			     data: dataArray,
			     scrollX: false,
			     columnDefs: [{
			     		data: null,
			     		defaultContent: "<button class='btn btn-info' id='openData'>細節</button>",
			     		orderable: false,
			     		targets: -1,
			     	},{
			     		data: null,
			     		defaultContent: '<label><input type="checkbox" id="selectRefound" value=""></label>',
			     		orderable: false,
			     		targets: 0,
			     	},{
	                    targets: [2,3,6,11],
	                    visible: false
	            }],
			});
			$('#queryReturnsTable tbody').on( 'click', 'button#openData', function () {
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
		    });
			
			var returnArray2=[];
			$("#queryReturnsTable tbody").on("click", "input#selectRefound", function(){
				var totalrefoundprice = 0;
				var data = table.row( $(this).parents('tr') ).data();
				if($(this).prop("checked")){
					returnArray2.push(data);
					$('button#refound2').show();
					console.log(returnArray2);
				}else{
					returnArray2.remove(data);
					if(returnArray2 == [] || returnArray2 == ""){$('button#refound2').hide()};
					console.log(returnArray2);
				};
				totalrefoundprice = totalRefound(returnArray2) - 60;
				$("#totalPrice").remove();
				if(totalrefoundprice > 0){
					var money = "<h3 style='color:red; margin: -62px 5px 5px 5px;'>退款總金額: " + totalrefoundprice + "</h3>";
					$("#queryReturnsTableContainer").after("<div class= 'col-sm-3 col-sm-offset-7' id='totalPrice'></div>");
					$("#totalPrice").append(money)
				}else{
					$("#totalPrice").hide();
				}
			})
		
			var RefoundData2 = [];
			$("button#refound2").on('click', function(){
				for(var i = 0; i < returnArray2.length; i++ ){
					RefoundData2[i] = returnArray2[i];
					console.log(RefoundData2);
				}
				var dialog = bootbox.dialog({
					size: 'larger',
					title: '	退貨表',
					message: "<p>收到退貨日/退款</p>",
					buttons: {
					    cancel: {
					        label: "收到退貨日/退款",
					        className: 'btn btn-warning',
						    callback: function(){
						    		showRefound(RefoundData2);
						    		}
					        },
						    ok: {
						        label: "取消",
						        className: 'btn-info',
						        callback: function(){
						        		reload();
						        }
						    }
						}
					});
				});
			}).fail(function() {
					bootbox.alert("資料錯誤，請聯繫工程師");
				}).always(function() {
					console.log('complete');
				});
			});
	
	$("#changeForm").validate({
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
		submitHandler: function(form) {
			//我先把換貨後的新單資料跟退貨的資料分開,看你想怎麼傳都可以....
			  newOrderData = {
					  orderId: $('#updateOrderId').val(),
					  customerId: $('input#updateCustomerId').val(),
					  name: $('input#updateName').val(),
					  bodyType: $('input#updateBodyType').val(),
					  customerSource: $('select#updateCustomerSource').val(),
					  delivery: $('select#updateDelivery').val(),
					  payment: "",
					  noticeType: "不通知",
					  phone: $('input#updatePhone').val(),
					  addressFirst: $('input#updateAddressFirst').val(),
					  addressSecond: $('input#updateAddressSecond').val(),
					  materialId: $('input#updateMaterialId').val(),
					  price: $("input#updatePrice").val(),
					  cutSized: $('input#updateCutSize').val(),
					  cusSize: $('input#updateCusSize').val(),
					  color: $('input#updateColor').val(),
					  count: $('input#updateCount').val(),
					  priceType: $("select#updatePriceType").val(),
					  confirm: '客戶下單',
					  employee: "",
					  orderComplete: "Y",
		      };
			  changeMaterialData = {
					  orderId: $('#updateOrderId').val(),
					  customerId: $('input#updateCustomerId').val(),
					  deliveryType: $('select#updateDelivery').val(),
					  phone: $('input#updatePhone').val(),
					  materialId: $('input#updateMaterialId').val(),
					  price: $("input#updatePrice").val(),
					  customerReturnsDate: $('input#updateCustomerReturnsDate').val(),
					  customerReceivingDate: $('input#updateCustomerReceivingDate').val(),
					  nonRefundable: "Y",
					  receivedReturnsDate: $('input#updateReceivedReturnsDate').val(),
	  		  		  customerRejected: "N",
					  reasonsForReturns: $('select#updateReasonsForReturns').val(),
					  bankAccount: "",
  		  			  remittanceDay: "",	
  		  			  customerNoticeRefund: "",
					  employee: "",
			  };
			  console.log(newOrderData);
			  console.log(changeMaterialData);
			  
			  bootbox.confirm('確認更新客戶', function(isConfirmed) {
			      if (isConfirmed) {
				      $.ajax({
							url : "updateCustomer",
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
	});
});

var showInsertReturn = function(returnArraydata) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content").html(),
        title: "退貨資訊",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var customerReturnsDate = moment($('.modal-dialog .bootbox-body input#customerReturnsDate').val()).format("YYYYMMDD");
              var customerReceivingDate = moment($('.modal-dialog .bootbox-body input#customerReceivingDate').val()).format("YYYYMMDD");
              var multileOrderRefund = totalRefound(returnArraydata) - 60 ;
              var dataSet=[];
              for(var i = 0; i < returnArraydata.length; i++){
            	      var data = {
            	    		  			orderId: returnArraydata[i][0],
            	    		  			customerId: returnArraydata[i][1],
            	    		  			name: returnArraydata[i][2],
            	    		  			delivery: returnArraydata[i][5],
            	    		  			phone: returnArraydata[i][8],
            	    		  			materialId: returnArraydata[i][11],
            	    		  			price: returnArraydata[i][17],
            	    		  			customerReturnsDate: customerReturnsDate,
            	    		  			customerReceivingDate: customerReceivingDate,
            	    		  			nonRefundable: $('.modal-dialog .bootbox-body select#nonRefundable').val(),
            	    		  			receivedReturnsDate: "",	
            	    		  			customerRejected: "N",
            	    		  			reasonsForReturns: $('.modal-dialog .bootbox-body select#reasonsForReturns').val(),
            	    		  			bankAccount: "",
            	    		  			remittanceDay: "",	
            	    		  			customerNoticeRefund: "",
            	    		  			employee: "",
            	      };
            	      dataSet[i] = data;
            	      
              }
			  console.log(dataSet);
			  
			  bootbox.confirm('送出退貨資訊?', function(isConfirmed) {
			      if (isConfirmed) {
				      $.ajax({
							url : "updateMaterial",
							data : dataSet,
							type : "POST",
						}).done(function(dataSet) {
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

var showRefound = function(orderId) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content2").html(),
        title: "收到退貨日/退款",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var receivedReturnsDate = moment($('.modal-dialog .bootbox-body input#receivedReturnsDate').val()).format("YYYYMMDD");
              var remittanceDay = moment($('.modal-dialog .bootbox-body input#remittanceDay').val()).format("YYYYMMDD");
              var multileOrderRefund = totalRefound(orderId) - 60 ;
              var dataSet=[];
              for(var i = 0; i < orderId.length; i++){
            	      var data = {
            	    		  			orderId: orderId[i][0],
            	    		  			receivedReturnsDate: receivedReturnsDate,	
            	    		  			bankAccount: $('.modal-dialog .bootbox-body input#bankAccount').val(),
            	    		  			remittanceDay: remittanceDay,	
            	    		  			customerNoticeRefund: $('.modal-dialog .bootbox-body select#customerNoticeRefund').val(),
            	    		  			employee: "fireOP",
            	      };
            	      dataSet[i] = data;
            	      
              };
			  console.log(dataSet);
			  
			  bootbox.confirm('確定更新退貨資訊?', function(isConfirmed) {
			      if (isConfirmed) {
				      $.ajax({
							url : "updateMaterial",
							data : dataSet,
							type : "POST",
						}).done(function(dataSet) {
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

var showUpdateCustomer = function(data) {
	$("#updateTitle").empty();
	$("#updateTitle").append('<h2 style="color:blue">請填寫換貨資訊</h2><br>');
	$('#updateOrderId').val(data[0]);
	$('#updateCustomerId').val(data[1]);
	$("#updateName").val(data[2]);
	$("#updateCustomerSource").val(data[4]);
	$("#updateDeliveryType").val(data[5]);
	$("#updateBodyType").val(data[3]);
	$("#updatePhone").val(data[8]);
	$("#updateAddressFirst").val(data[9]);
	$("#updateAddressSecond").val(data[10]);
	$("#change").show();
}
//計算退貨總金額(沒有減運費)
var totalRefound = function(refound){
	var totalPrice = 0;
	for(var i = 0; i < refound.length; i++){
		totalPrice = totalPrice + parseInt(refound[i][6])
	};
	return totalPrice;
}

