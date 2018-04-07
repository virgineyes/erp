/**
 * 
 */

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
	$(function(){
		$.ajax({
			url:'public/js/order.json',
			datatype: 'json',
			type: 'GET',
		}).done(function(data){
			var dataArray = [];
			for(var i = 0; i < data.length; i++ ){
				dataArray[i] = [
					data[i].orderId,
					data[i].customerId,
					data[i].bodyType,
					"creatday",
					data[i].materialId,
					data[i].cutSize,
					data[i].cusSize,
					data[i].color,
					data[i].count,
					"",
					"",
					"",
					"",
					'',
					"未下單",
				]
			}
			
			$("#querySalesOrderTableContainer").show();
			
			console.log(dataArray);
			
			var table = $('#querySalesOrderTable').DataTable({
				destroy: true,
				autoWidth: false,
				scrollX: false,
				data: dataArray,
				lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
				columnDefs: [{
	     		data: null,
	     		defaultContent: '<label><input type="checkbox" id="selectSaleOrder" value=""></label>',
	     		orderable: false,
	     		targets: 0,
				}],
			});
			
			var saleOrderArray=[];
			$("#querySalesOrderTable tbody").on("click", "input#selectSaleOrder", function(){
				var data = table.row( $(this).parents('tr') ).data();
				if($(this).prop("checked")){
					saleOrderArray.push(data);
					$('button#saleOrderBtn').attr('disabled', false);
					if(data[9] != ""){$('button#cancleBtn').attr('disabled', false);}else{$('button#cancleBtn').attr('disabled', true)};
					console.log(saleOrderArray);
				}else{
					saleOrderArray.remove(data);
					if(saleOrderArray == [] || saleOrderArray == ""){$('button#saleOrderBtn').attr('disabled', true);$('button#cancleBtn').attr('disabled', true)};
					console.log(saleOrderArray);
				};
			});
			
			var saleData = [];
			$("button#saleOrderBtn").on('click', function(){
				for(var i = 0; i < saleOrderArray.length; i++ ){
					saleData[i] = saleOrderArray[i];
					console.log(saleData);
				}
				var dialog = bootbox.dialog({
					size: 'larger',
					title: '	 下單',
					message: "<p>JO下單/通知客戶沒貨</p>",
					buttons: {
					    cancel: {
					        label: "	下單/通知客戶沒貨",
					        className: 'btn btn-warning',
						    callback: function(){
						    		showSaleOrder(saleData);
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
				
			$("button#cancleBtn").on('click', function(){
				for(var i = 0; i < saleOrderArray.length; i++ ){
					saleData[i] = saleOrderArray[i];
					console.log(saleData);
				}
				var dialog = bootbox.dialog({
					size: 'larger',
					title: '	到貨/銷單/不出貨',
					message: "<p>請選擇[到貨] or [銷單/不出貨]</p>",
					buttons: {
					    cancel: {
					        label: "	到貨",
					        className: 'btn btn-success',
						    callback: function(){
						    		arricalFunction(saleData);
						    		}
					        },
						    ok: {
						        label: "銷單",
						        className: 'btn-warning',
						        callback: function(){
						        		cancelFunction(saleData);
						        }
						    },
						    wrong: {
						    		label: "不出貨",
						        className: 'btn-info',
						        callback: function(){
						        		nonShippingFunction(saleData);
						        },
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

var showSaleOrder = function(saleOrderArraydata) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content").html(),
        title: "下單資訊",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var JOOrderDate = moment($('.modal-dialog .bootbox-body input#JOOrderDate').val()).format("YYYYMMDD");
              var dataSet=[];
              for(var i = 0; i < saleOrderArraydata.length; i++){
            	      var data = {
            	    		  JOOrderDate: JOOrderDate,
            	    		  noStock: $('.modal-dialog .bootbox-body select#noStock').val(), 			
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

var arricalFunction = function(saleOrderArraydata) {
    var modal = bootbox.dialog({
    		size: 'larger',
        message: $(".form-content2").html(),
        title: "到貨資訊",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var arrivalDate = moment($('.modal-dialog .bootbox-body input#arrivalDate').val()).format("YYYYMMDD");
              var dataSet=[];
              for(var i = 0; i < saleOrderArraydata.length; i++){
            	      var data = {
            	    		  arrivalDate: arrivalDate
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






