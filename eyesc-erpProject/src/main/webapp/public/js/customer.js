/**
 *	@eyesc
 *		
 */

function format ( d ) {
    return '	地址: '+ d[10] + '<br>'
}

$().ready(function(){
	$("#customerForm").validate({
		rules: {
			customerId: {
				required: true,
                customerIdEndCode : true,
                customerIdEqualPhone : true
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
			shippingMoney: {
				maxlength:6,
				numberValidation : true,
			},
		},
		messages: {
			customerId: {
				required: "請輸入客戶FB/Line/網站+電話末五碼",
			},
			name: {
				required: "請輸入客戶姓名",
			},
			phone: {
				required: "請輸入客戶電話帳號",
				maxlength : "超過輸入長度",
				minlength : "請至少輸入完整電話號碼"
			},			
			addressFirst: {
				required: "請輸入客戶住址",
			},
			shippingMoney : {
				maxlength: "超過金額上限",
			},
		},
		submitHandler: function(form) {
			  var blockList;
			  if ($('select#blockList').val() == 1) {
				  blockList = 'O';
			  } else {
				  blockList = 'X';
			  }
			
			  data = {
					  customerId: $('input#customerId').val(),
					  name: $('input#name').val(),
					  bodyType: $('input#bodyType').val(),
					  customerSource: $('select#customerSource').val(),
					  deliveryType: $('select#deliveryType').val(),
					  blockList: blockList,
					  noticeType: $('select#noticeType').val(),
					  shippingMoney: $('input#shippingMoney').val(),
					  phone: $('input#phone').val(),
					  addressFirst: $('input#addressFirst').val(),
					  hint: $('textarea#hint').val()
		      };  
			  
			  var customerId = {
					  customerId: $('input#customerId').val(),
			  }

;			  bootbox.confirm('確認新增客戶', function(isConfirmed) {	  
			      if (isConfirmed) {
				      $.ajax({
							url : "searchOneCustomer",
							data : customerId,
							type : "POST",
						}).done(function(returnData) {
							console.log(returnData);
							if (returnData == null || returnData == '') {
								var customerColumn = column;
								$("#newCustomer").show();
								$("button#deleteNewCustomer").attr("onclick","reload()");
								$("button#confirmNewCustomer").attr("onclick","createCustomer()");
								
								var newCustomer = [];
								newCustomer[0] = data;		
								
								console.log(data);
								
								$('#newCustomerTable').bootstrapTable({
							        columns : customerColumn,
							        striped : true,
							        cache : false,
							        showColumns: false,
							        data: newCustomer,                        
							        rowStyle : function() {
							          return {
							              classes: 'text-nowrap'
							          };
							        },
								});
							} else {
								bootbox.alert("此客戶已經存在資料庫！請確認");
							}
						}).fail(function() {
							bootbox.alert("新增錯誤，請聯繫工程師");
						}).always(function() {
							console.log('Complete');
						});
			      }
			  });
		  }
	});

    $('#queryCustomer').on('click', function () {
		var id = $('input#queryCustomerId').val();
		$.ajax({
		    url: 'searchCustomer',
		    data: {
		    	customerId : id
		    },
		    type : 'GET',
		}).done(function(data) { 
			var dataSet = [];
			for (var i = 0; i < data.length; i++) {
				data[i].createDate = moment(data[i].createDate).format("YYYY/MM/DD"); 
				dataSet[i] = $.map(data[i], function(el) { return el });
			}

			$("#queryCustomerTableContainer").show();
			
			console.log(dataSet);
		
			var table = $('#queryCustomerTable').DataTable({
				 destroy: true,
			     data: dataSet,
			     createdRow: function ( row, data, index ) {
		            if ( data[4] == "X" ) {
		                $('td', row).eq(4).addClass('highlight');
		            }
			     },
			     lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
			     scrollX: true,
			     columnDefs: [ {
			    	 		targets: -1,
			    	 		data: null,
			    	 		defaultContent: "<button class='btn btn-warning' id='updateButton'>更新</button>"
			     	},{		            
		                targets:0,
		                orderable:false,
		                data:null,
		                defaultContent: "<button class='btn btn-info' id='openData'>開關</button>"
		            },{
	                    targets: [10],
	                    visible: false
	            }]
			});
			
			
			 
		    $('#queryCustomerTable tbody').on( 'click', 'button#openData', function () {
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
		    
		    
			
			$('#queryCustomerTable tbody').on( 'click', 'button#updateButton', function () {
				var data = table.row( $(this).parents('tr') ).data();
				console.log(data);
				bootbox.dialog({
					title: '修改或刪除客戶資料',
					message: "<p>請選「修改」或「刪除」</p>",
					buttons: {
					    cancel: {
					        label: "刪除客戶資料",
					        className: 'btn-danger',
					        callback: function(){
					        	bootbox.confirm('確認刪除客戶資料', function(isConfirmed) {
					        		if (isConfirmed) {
						         	deleteNewCustomer(data[0]);
					      	    }
					        	})
					        }
					    },
					    ok: {
					        label: "修改客戶資料",
					        className: 'btn-info',
					        callback: function() {
					        		console.log('update');
					        		showUpdateCustomer(data);
					        }
					    }
					}
				});
			});  
		}).fail(function() {
			bootbox.alert("搜尋錯誤，請聯繫工程師");
		}).always(function() {
			console.log('complete');
		});
	});
    
    
    $("#updateForm").validate({
		rules: {
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
		},
		messages: {
			name: {
				required: "請輸入客戶姓名",
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
			  data = {
					  customerId: $('input#updateCustomerId').val(),
					  name: $('input#updateName').val(),
					  customerSource: $('select#updateCustomerSource').val(),
					  blockList: $('select#updateBlockList').val(),
					  deliveryType: $('select#updateDeliveryType').val(),
					  bodyType: $('input#updateBodyType').val(),
					  noticeType: $('select#updateNoticeType').val(),
					  phone: $('input#updatePhone').val(),
					  hint: $('textarea#updateHint').val(),
					  addressFirst: $('input#updateAddressFirst').val(),
					  addressSecond: $('input#updateAddressSecond').val(),
		      };  
			  console.log(data);
			  
			  bootbox.confirm('確認跟新客戶', function(isConfirmed) {
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
	
var deleteNewCustomer = function(id) {
	 var deleteId = id;
	 $.ajax({
		url : "deleteCustomer",
		data : {
			id : deleteId
		},
		type : "GET",
	 }).done(function(data) {
	 	location.reload();
	 }).fail(function() {
		console.log('fail');
	 }).always(function() {
		console.log('Creat Customer Complete');
	 });
}

var createCustomer = function() {
	$.ajax({
		url : "createCustomer",
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

var showUpdateCustomer = function(data) {
	$("#updateTitle").empty();
	$("#updateTitle").append('<h2>更新客戶 : ' + data[1] + '</h2>');
	$('#updateCustomerId').val(data[1]);
	$("#updateName").val(data[2]);
	$("#updateCustomerSource").val(data[3]);
	if (data[4] == 'O') {
		$("#updateBlockList").val(1);
	} else if (data[4] == 'X') {
		$("#updateBlockList").val(0);
	}
	$("#updateDeliveryType").val(data[5]);
	$("#updateBodyType").val(data[7]);
	$("#updateNoticeType").val(data[8]);
	$("#updatePhone").val(data[9]);
	$("#updateAddressFirst").val(data[10]);
	$("#updateHint").val(data[11]);
	$("#update").show();
}

var column = [{
    field: 'customerId',
    title: 'ID'
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
    field: 'blockList',
    title: '是否接單'
}, {
    field: 'noticeType',
    title: '出貨前通知'
}, {
    field: 'shippingMoney',
    title: '購物金'
}, {
    field: 'addressFirst',
    title: '地址'
}, {
    field: 'phone',
    title: '電話'
}, {
    	field: 'hint',
    	title: '備註'
}, {
	field: 'createDate',
	title: '新增日期',
	formatter:  function(val) {
	    return moment(val).format("YYYY/MM/DD");
	}
}];
