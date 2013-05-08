module.exports = function() {
	var cache = {};
	var expires = {};
	
	function get(prefix, key, cb) {
		key = prefix + key;
		var v = cache[key];
		cb && cb(v);
		return v;
	}
	
	function set(prefix, key, val, expire) {
		key = prefix + key;
		cache[key] = val;
		if(expire != null) {
			clearTimeout(expires[key]);
			expires[key] = setTimeout(del, expire * 1000, '', key);
		}
	}
	
	function del(prefix, key) {
		key = prefix + key;
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
	
	function prefix(pre) {
		if(pre.length > 0) pre += ':';
		var boundSet = set.bind(null, pre);
		return {
			get: get.bind(null, pre),
			set: boundSet,
			put: boundSet, // Alias for dev/libs that prefer different names
			del: del.bind(null, pre)
		};
	}
	
	var c = prefix('');
	c.prefix = prefix; // Don't want prefixes to have access to these
	c.clear = clear;
	return c;
}
