/**
 * @author eyes
 */

//刪除array裡的特定元素,所創建的function
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			return i;
		}
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

$().ready(function() {
	$(function() {
		$.ajax({
			url:'searchSalesOrder',
//			datatype: 'json',
			data : null,
			type: 'GET',
		}).done(function(data) {
			console.log(data);
			var dataSet = [];
			for (var i = 0; i < data.length; i++) {
				data[i].createDate = moment(data[i].createDate).format("YYYY/MM/DD"); 
				
				if (data[i].orderDate == null || data[i].orderDate == 'Invalid date') {
					data[i].orderDate = '';	
				} else {
					data[i].orderDate = moment(data[i].orderDate).format("YYYY/MM/DD");
				}
				
				if (data[i].arrivalDate == null || data[i].arrivalDate == 'Invalid date') {
					data[i].arrivalDate = '';
				} else {
					data[i].arrivalDate = moment(data[i].arrivalDate).format("YYYY/MM/DD");
				}
				dataSet[i] = $.map(data[i], function(el) { return el });
			}
			
			$("#querySalesOrderTableContainer").show();
			
			var table = $('#querySalesOrderTable').DataTable({
				destroy: true,
				autoWidth: false,
				scrollX: false,
				data: dataSet,
				lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
				columnDefs: [{
		     		data: null,
		     		defaultContent: '<label><input type="checkbox" id="selectSaleOrder" value=""></label>',
		     		orderable: false,
		     		targets: 0,
					}, {
	                    targets: [1],
	                    visible: false
		            }
				],
			});
			
			var saleOrderArray=[];
			$("#querySalesOrderTable tbody").on("click", "input#selectSaleOrder", function(){
				var data = table.row( $(this).parents('tr') ).data();
				if($(this).prop("checked")) {
					saleOrderArray.push(data);
					$('button#orderBtn').attr('disabled', false);
					$('button#nonStockBtn').attr('disabled', false);

					if (data[9] != "") {
						$('button#arriveBtn').attr('disabled', false);
						$('button#cancleBtn').attr('disabled', false);
					} else { 
						$('button#arriveBtn').attr('disabled', true);
						$('button#cancleBtn').attr('disabled', true)
					}
				} else {
					console.log('clickB');
					saleOrderArray.remove(data);
					if (saleOrderArray == [] || saleOrderArray == "") {
						$('button#nonStockBtn').attr('disabled', true);
						$('button#orderBtn').attr('disabled', true);
						$('button#arriveBtn').attr('disabled', true);
						$('button#cancleBtn').attr('disabled', true)
					}
				}
			});
			
			var orderIds = [];
			$("button#orderBtn").on('click', function(){
				for(var i = 0; i < saleOrderArray.length; i++) {
					orderIds[i] = saleOrderArray[i][1];
				}
		    		order(orderIds);
			});
			
			$("button#nonStockBtn").on('click', function(){
				for(var i = 0; i < saleOrderArray.length; i++) {
					orderIds[i] = saleOrderArray[i][1];
				}
		    		updateNonStockStatus(orderIds);
			});
			
			$("button#arriveBtn").on('click', function(){
				for(var i = 0; i < saleOrderArray.length; i++) {
					orderIds[i] = saleOrderArray[i][1];
				}
				updateArrivalDate(orderIds);
			});
				
//			$("button#cancleBtn").on('click', function(){
//				for(var i = 0; i < saleOrderArray.length; i++ ){
//					saleData[i] = saleOrderArray[i];
//					console.log(saleData);
//				}
//				var dialog = bootbox.dialog({
//					size: 'larger',
//					title: '	到貨/銷單/不出貨',
//					message: "<p>請選擇[到貨] or [銷單/不出貨]</p>",
//					buttons: {
//					    cancel: {
//					        label: "	到貨",
//					        className: 'btn btn-success',
//						    callback: function(){
//						    		arricalFunction(saleData);
//						    		}
//					        },
//						    ok: {
//						        label: "銷單",
//						        className: 'btn-warning',
//						        callback: function(){
//						        		cancelFunction(saleData);
//						        }
//						    },
//						    wrong: {
//						    		label: "不出貨",
//						        className: 'btn-info',
//						        callback: function(){
//						        		nonShippingFunction(saleData);
//						        },
//						    }
//						}
//					});
//				});
			}).fail(function() {
				bootbox.alert("資料錯誤，請聯繫工程師");
			}).always(function() {
				console.log('complete');
			});
	});
});

var order = function(orderIds) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content-order").html(),
        title: "下單資訊",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
            		var orderDate = moment($('.modal-dialog .bootbox-body input#orderDate').val()).format("YYYYMMDD");
//            	    noStock: $('.modal-dialog .bootbox-body select#noStock').val(), 			
            		var data = {
            			orderDate : orderDate,
            			orderIds : orderIds 
            		}
			  
    				$.ajax({
					url : "updateOrderDate",
					data : data,
					type : "POST",
				}).done(function(returnData) {	
					reload();
				}).fail(function() {
					bootbox.alert("新增錯誤，請聯繫工程師");
				}).always(function() {
					console.log('Complete');
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

var updateNonStockStatus = function(orderIds) {
	bootbox.confirm('確認通知沒貨', function(isConfirmed) {	  
		if (isConfirmed) {
			$.ajax({
				url : "updateNonStockStatus",
				data : {
					orderIds : orderIds
				},
				type : "POST",
			}).done(function(returnData) {	
				reload();
			}).fail(function() {
				bootbox.alert("新增錯誤，請聯繫工程師");
			}).always(function() {
				console.log('Complete');
			});
		}
	});      
}

var updateArrivalDate = function(orderIds) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content-arrival").html(),
        title: "下單資訊",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
            		var arrivalDate = moment($('.modal-dialog .bootbox-body input#arrivalDate').val()).format("YYYYMMDD");
			
            		var data = {
            			arrivalDate : arrivalDate,
            			orderIds : orderIds 
            		}

    				$.ajax({
					url : "updateArriveDate",
					data : data,
					type : "POST",
				}).done(function(returnData) {	
					reload();
				}).fail(function() {
					bootbox.alert("新增錯誤，請聯繫工程師");
				}).always(function() {
					console.log('Complete');
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


var cancelFunction = function(saleOrderArraydata) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content3").html(),
        title: "客戶銷單",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var dataSet=[];
              for(var i = 0; i < saleOrderArraydata.length; i++){
            	      var data = {
            	    		  salesOrder: $('.modal-dialog .bootbox-body select#salesOrder').val(), 			
            	      };
            	      dataSet[i] = data;
            	      
              }
			  console.log(dataSet);
			  
			  bootbox.confirm('確認送出?', function(isConfirmed) {
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
var nonShippingFunction = function(saleOrderArraydata) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content4").html(),
        title: "不出貨",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var dataSet=[];
              for(var i = 0; i < saleOrderArraydata.length; i++){
            	      var data = {
            	    		  reasonForNoShipped: $('.modal-dialog .bootbox-body select#reasonForNoShipped').val(), 			
            	      };
            	      dataSet[i] = data;
            	      
              }
			  console.log(dataSet);
			  
			  bootbox.confirm('確認送出?', function(isConfirmed) {
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






