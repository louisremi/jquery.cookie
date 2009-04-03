(function($){
	$._cookie = $.cookie;
	$.cookie = function(key, value, options) {
		// Function used as "set multiple"
		if(key.constructor == Object) {
			for(var i in key)
				$._cookie(i, key[i], value);
			return key;
		// Function used as "get all"
		} else if(key === true && document.cookie != "") {
			var cookies = document.cookie.split('; '),
				cookie,
				result = {};
			for(var i in cookies) {
				cookie = cookies[i].split('=', 2);
				result[cookie[0]] = $._cookie.decode(
					cookie[1],
					(value && value.smart) || $.cookie.defaults.smart);
			}
			return result;
		} else return $._cookie(key, value, options);				
	};
	// Restor decode and defaults of the original cookie object
	$.cookie.decode = $._cookie.decode;
	$.cookie.defaults = $._cookie.defaults;
})(jQuery);