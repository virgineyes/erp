/**
 *  @eyes
 */

function format (d) {
    return d;
}

function dataTableFormat(d) {
	return 'Address1: ' + d.addressFirst + '<br>'
			+ 'Address2: ' + d.addressSecond + '<br>';
}

var reload = function() {
	location.reload();
}