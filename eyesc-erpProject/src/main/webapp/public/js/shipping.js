/**
 *  @eyes
 *  
 */

function format ( d ) {
    return '	工作人員: '+ d[14] + "<br>" + "下單日:" + d[17] + "<br>" + "備註:" + d[15]  + "<br>"  
}

$(document).ready(function(){
	$(function(){
		$.ajax({
		    url: 'public/js/123.json',
		    dataType: "json",
		    type : 'GET',
		}).done(function(data) { 
			var dataArray = [];
			for (var i = 0; i < data.length; i++) { 
				dataArray[i] = $.map(data[i], function(el) { return el });
			}

			$("#queryShippingTableContainer").show();
			
			console.log(dataArray);
		
		var table = $('#queryShippingTable').DataTable({
			 destroy: true,
		     data: dataArray,
		     scrollX: false,
		     columnDefs: [{
		     		data: null,
		     		defaultContent: "<button class='btn btn-warning' id='shippingButton'>出貨</button>",
		     		orderable: false,
		     		targets: -2,
		     	},{
		     		data: null,
		     		defaultContent: "<button class='btn btn-info' id='openData'>細節</button>",
		     		orderable: false,
		     		targets: -1,
		     	},{
                    targets: [0,14,15,17],
                    visible: false
            }],
		});
		
		$('#queryShippingTable tbody').on( 'click', 'button#openData', function(){
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
		
		$('#queryShippingTable tbody').on( 'click', 'button#shippingButton', function () {
			var data = table.row( $(this).parents('tr') ).data();
			var dialog = bootbox.dialog({
				title: '到/出貨 或 刪除',
				message: "<p>請選「到貨/出貨」或「刪除」</p>",
				buttons: {
				    cancel: {
				        label: "刪除出貨",
				        className: 'btn-danger',
				        callback: function(){
				        	bootbox.confirm('確認刪除貨號', function(isConfirmed) {
				      	      if (isConfirmed) {
					         	deleteNewShipping(data[0]);
				      	      }
				        	})
				        }
				    },
				    ok: {
				        label: "到貨/出貨",
				        className: 'btn-info',
				        callback: function(){
				        	showUpdateShipping(data[0]);
				        		}
				    		}
					}
				});
			}); 	
		});
	});
});

var showUpdateShipping = function(materialId) {
    var modal = bootbox.dialog({
        message: $(".form-content").html(),
        title: "確認到貨/出貨日",
        buttons: [
        {
            label: "確認",
            className: "btn btn-primary pull-left",
            callback: function() {	
              var arrivalDate = moment($('.modal-dialog .bootbox-body input#materialArrivalDay').val()).format("YYYYMMDD");
              var shippingDate = moment($('.modal-dialog .bootbox-body input#shippingＤate').val()).format("YYYYMMDD");
              data = {
					  materialId: materialId,
					  arrivalDate: arrivalDate,
					  shippingDate: shippingDate
		      };  
			  console.log(data);
			  
			  bootbox.confirm('確認到貨/出貨日', function(isConfirmed) {
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

var deleteNewShipping = function(materialId) {
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
	
