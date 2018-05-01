/**
 *  @eyes
 */


$().ready(function(){
	$(function(){
		$.ajax({
		    url: "searchStock",
		    data: null,
		    type : 'GET',
		}).done(function(returnData) { 
			console.log(retunrDat);
		});
	});
});