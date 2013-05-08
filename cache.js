module.exports = function() {
	var cache = {};
	var expires = {};
	
	function get(key, cb) {
		var v = cache[key];
		cb && cb(v);
		return v;
	}
	
	function set(key, val, expire) {
		cache[key] = val;
		if(expire != null) {
			clearTimeout(expires[key]);
			expires[key] = setTimeout(del, expire * 1000, key);
		}
	}
	
	function del(key) {
		delete cache[key];
		if(key in expires) {
			clearTimeout(expires[key]);
			delete expires[key];
		}
	}
	
	function clear() {
		cache = {};
		for(var i in expires) {
			clearTimeout(expires[i]);
		}
		expires = {};
	}
	
	return {
		get: get,
		set: set,
		put: set,
		del: del,
		clear: clear
	};
}
