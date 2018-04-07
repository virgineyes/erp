/**
 * @eyesc
 */

$.validator.setDefaults({
    submitHandler: function(form) {
      alert("Confirm Submit");     
    }
});

$().ready(function(){
	$("#materialForm").validate({
		rules: {
			materialId: {
				required: true,
			},
			cloth: {
				required: true,
			},
			price: {
				required: true,
				numberValidation : true,
			}
		},
		messages: {
			materialId: {
				required: "請輸入貨號",
			},
			cloth: {
				required: "請輸入衣服名稱",
			},			
			price: {
				required: "請輸入價格",
			},
		},
		submitHandler: function(form) {
			  data = {
					  materialId: $('input#materialId').val(),
					  cloth: $('input#cloth').val(),
					  price: $('input#price').val(),				  
		      };  
			  
			  var materialId = {
					  materialId: $('input#materialId').val(),
			  }
			  bootbox.confirm('確認新增貨號', function(isConfirmed) {	  
			      if (isConfirmed) {
				      $.ajax({
							url : "searchOneMaterail",
							data : materialId,
							type : "POST",
						}).done(function(returnData) {
							if (returnData == null || returnData == '') {
								var materialColumn = column;
								
								$("#newMaterial").show();
								$("button#deleteNewMaterial").attr("onclick","reload()");
								$("button#confirmNewMaterial").attr("onclick","createMaterial()");
								
								var newMaterail = [];
								newMaterail[0] = data;		
								
								$('#newMaterialTable').bootstrapTable({
							        columns : materialColumn,
							        data: newMaterail,     
							        striped : true,
							        cache : false,
							        showColumns: false,
							        rowStyle : function() {
							          return {
							              classes: 'text-nowrap'
							          };
							        },
								});
	
							} else {
								bootbox.alert("此貨號已經存在資料庫！請確認");
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
		
    $('#queryMaterial').on('click', function () {
		var id = $('input#queryMaterialId').val();
		$.ajax({
		    url: 'searchMaterial',
		    data: {
		    	materialId : id
		    },
		    type : 'GET',
		}).done(function(data) { 
			var dataSet = [];
			for (var i = 0; i < data.length; i++) {
				var tempDate;
				var tempUpdatePrice;
				if (data[i].date == null || data[i].date == 'Invalid date') {
					tempDate = '';
				} else {
					tempDate = moment(data[i].date).format("YYYY/MM/DD");
				}
				
				if (data[i].updatePrice == null) {
					tempUpdatePrice = '';
				} else {
					tempUpdatePrice = data[i].updatePrice;
				}
				
				dataSet[i] = [data[i].materialId, data[i].cloth, data[i].price, tempUpdatePrice, tempDate] 
			}

			$("#queryMaterialTableContainer").show();
		
			var table = $('#queryMaterialTable').DataTable({
				 destroy: true,
			     data: dataSet,
			     lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
			     columnDefs: [ {
		            targets: -1,
		            data: null,
		            defaultContent: "<button class='btn btn-warning'>押更新價格 / 刪除</button>"
			     } ]
			});
			
			$('#queryMaterialTable tbody').on( 'click', 'button', function () {
				var data = table.row( $(this).parents('tr') ).data();
				var dialog = bootbox.dialog({
					title: '修改或刪除客戶資料',
					message: "<p>請選「修改」或「刪除」</p>",
					buttons: {
					    cancel: {
					        label: "刪除貨號",
					        className: 'btn-danger',
					        callback: function(){
					        	bootbox.confirm('確認刪除貨號', function(isConfirmed) {
					      	      if (isConfirmed) {
						         	deleteNewMaterial(data[0]);
					      	      }
					        	})
					        }
					    },
					    ok: {
					        label: "押更新價格",
					        className: 'btn-info',
					        callback: function(){
					        		showUpdateMaterial(data[0]);
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
});

var showUpdateMaterial = function(materialId) {
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


var deleteNewMaterial = function(materialId) {
	 var deleteId = materialId;
	 $.ajax({
		url : "deleteMaterial",
		data : {
			materialId : deleteId
		},
		type : "GET",
	 }).done(function(data) {
	 	location.reload();
	 }).fail(function() {
		console.log('fail');
	 }).always(function() {
		console.log('Creat Material Complete');
	 });
}

var createMaterial = function() {
	$.ajax({
		url : "createMaterial",
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

var column = [{
    field: 'materialId',
    title: '貨號'
}, {
    field: 'cloth',
    title: '衣服名稱'
}, {
    field: 'price',
    title: '價格'
}];
