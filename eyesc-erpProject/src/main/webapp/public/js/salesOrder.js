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
			
			var saleOrderArray = [];
			$("#querySalesOrderTable tbody").on("click", "input#selectSaleOrder", function() {
				var orderBoolean = true;
				var nonStockBoolean = true;
				var arriveBoolean = true;
				var cancleBoolean = true;
				var nonShippingBoolean = true;
				var data = table.row( $(this).parents('tr') ).data();
				if($(this).prop("checked")) {
					saleOrderArray.push(data);
				} else {
					saleOrderArray.remove(data);
				}
				
				var readyOrderCount = 0;
				var haveOrderedCount = 0;
				var haveArrivalCount = 0;
				for (var i = 0; i < saleOrderArray.length; i++) {
					if (saleOrderArray[i][11] === "沒貨") {
						break;
					}
					if (saleOrderArray[i][11] === "已到貨") {
						haveArrivalCount++;
					} else if (saleOrderArray[i][11] === "JO已下單") {
						haveOrderedCount++;
					} else if (saleOrderArray[i][11] === "要下單") {
						readyOrderCount++;
					}
				}		
				
				if (saleOrderArray.length != 0 && readyOrderCount == saleOrderArray.length) {
					orderBoolean = false;
					nonStockBoolean = false;
				} else if (saleOrderArray.length != 0 && haveOrderedCount == saleOrderArray.length) {
					orderBoolean = false;
					nonStockBoolean = false;
					arriveBoolean = false;
				} else if (saleOrderArray.length != 0 && haveArrivalCount == saleOrderArray.length) {
					cancleBoolean = false;
					nonShippingBoolean = false;
				}
				
				updateBtn(orderBoolean, nonStockBoolean, arriveBoolean, cancleBoolean, nonShippingBoolean);
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
				
			$("button#cancleBtn").on('click', function() {
				for(var i = 0; i < saleOrderArray.length; i++) {
					orderIds[i] = saleOrderArray[i][1];
				}
		
				bootbox.dialog({
					size: 'larger',
					title: '銷單入庫/不入庫',
					message: "<p>請選擇 入庫 or 不入庫</p>",
					buttons: {
						okl: {
					        label: "入庫",
					        className: 'btn btn-success',
						    callback: function() {
						    		insertStock(orderIds);
						    		}
					    },
					    ok: {
					        label: "不入庫",
					        className: 'btn-warning',
					        callback: function() {
					        		cancelOrder(orderIds);
					        	}
					    	}
					}
				});
			});
			
			$("button#nonShippingBtn").on('click', function() {
				for(var i = 0; i < saleOrderArray.length; i++) {
					orderIds[i] = saleOrderArray[i][1];
				}
		
				bootbox.dialog({
					size: 'larger',
					title: '不出貨 入庫/不入庫',
					message: "<p>請選擇 入庫 or 不入庫</p>",
					buttons: {
						okl: {
					        label: "入庫",
					        className: 'btn btn-success',
						    callback: function() {
					    			insertStockNonShipping(orderIds);
					    		}
					    },
					    ok: {
					        label: "不入庫",
					        className: 'btn-warning',
					        callback: function() {
					        		cancelOrderNonShipping(orderIds);
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
});

var updateBtn = function(orderBoolean, nonStockBoolean, arriveBoolean, cancleBoolean, nonShippingBoolean) {
	$('button#nonStockBtn').attr('disabled', orderBoolean);
	$('button#orderBtn').attr('disabled', nonStockBoolean);
	$('button#arriveBtn').attr('disabled', arriveBoolean);
	$('button#cancleBtn').attr('disabled', cancleBoolean);
	$('button#nonShippingBtn').attr('disabled', nonShippingBoolean);
}

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

var insertStock = function(orderIds) {
	$.ajax({
		url : "insertStock",
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

var cancelOrder = function(orderIds) {
	$.ajax({
		url : "cancelOrder",
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