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
			materialNo: {
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
			materialNo: {
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
					  price: $('select#price').val(),
		      };  

			  bootbox.confirm('確認新增貨號', function(isConfirmed) {	  
			      if (isConfirmed) {
				      $.ajax({
							url : "searchOneMaterail",
							data : data.materialId,
							type : "POST",
						}).done(function(returnData) {
							console.log('outter');
							if (returnData == null || returnData == '') {
								console.log('inner');
								var materialColumn = column;
								
								$("#newCustomer").show();
								$("button#deleteNewMaterial").attr("onclick","reload()");
								$("button#confirmNewMaterial").attr("onclick","creatMaterail()");
								
								var newMaterail = [];
								newMaterail[0] = data;			
								
								$('#newMaterialTable').bootstrapTable({
							        columns : materialColumn,
							        striped : true,
							        cache : false,
							        showColumns: false,
							        data: newMaterail,                        
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
});


var column = [{
    field: 'materialId',
    title: '貨號'
}, {
    field: 'cloth',
    title: '衣服名稱'
}, {
    field: 'price',
    title: '價格'
}, {
	field: 'date',
	title: '日期',
	formatter:  function(val) {
	    return moment(val).format("YYYY/MM/DD");
	}
}];
