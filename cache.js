function Cache() {
	this.cache = {};
	this.expires = {};
}
Cache.prototype = {
	get: function(key, cb) {
		var v = this.cache[key];
		cb && cb(v);
		return v;
	},
	set: function(key, val, expire) {
		this.cache[key] = val;
		if(expire != null) {
			clearTimeout(this.expires[key]);
			this.expires[key] = setTimeout(this.del.bind(this, key), expire * 1000);
		}
	},
	del: function(key) {
		delete this.cache[key];
		var ex = this.expires;
		if(key in ex) {
			clearTimeout(ex[key]);
			delete ex[key];
		}
	},
	clear: function() {
		this.cache = {};
		for(var i in this.expires) {
			clearTimeout(this.expires[i]);
		}
		this.expires = {};
	}
};
Cache.prototype.put = Cache.prototype.set; // Alias

module.exports = function() {
	return new Cache();
}
