define(function(require, exports, module) {
	var $ = require("jQuery");
	var r;
	alert(12333)
	$.ajax({
		type: "post",
		url: resultUrl,
		async: true,
		dataType: "json",
		data: {

		},
		success: function(res) {
			global_res = res;
		}
	});
});