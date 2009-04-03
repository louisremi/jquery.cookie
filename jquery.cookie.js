(function($){
	$.cookie = function(key, value, options) {
		var o = $.extend({}, $.cookie.defaults, options || value),
			result = value;		
		// Function used as a setter
		if(value !== undefined && (value === null || value.smart === undefined)) {
			// Function used to delete a cookie
			if (value === null) {
        result = '';
        o.expires = -1;
			// If smart mode is enabled and the value is a boolean ..
      } else if(o.smart && !!value === value)
			// .. turn the value into a Number
				result = value? 1 : 0;
			// If the date parameter is a number, create a date from today + this number of days
      if (typeof o.expires == "number") {
				var day = new Date();
				day.setDate(day.getDate() + o.expires);
				o.expires = day;
			}
			// Write the cookie string
			document.cookie = [
				key , '=' , encodeURIComponent(result),
				'; expires=' , o.expires.toUTCString(),
				(o.path? '; path=' + (o.path) : ''),
				(o.domain? '; domain=' + (o.domain) : ''),
				(o.secure? '; secure' : '')
			].join("");
			// Be kind, return the value.
			return value;
		} else if(result = new RegExp("(?:^|; )" +key+ "=([^;]*)").exec(document.cookie))
			return $.cookie.decode(result[1], o.smart);
		return false;
	};	
	
	// Decode a value and turn it back to a Number if smart is enabled
	$.cookie.decode = function decode(value, smart) {
		value = decodeURIComponent(value);
		return smart && parseFloat(value) + '' == value? parseFloat(value) : value;
	}
	
	$.cookie.defaults = {
		expires: 365,
		path: '/'/*,
		smart: false*/
	};
})(jQuery);