var moka = require('moka');
var describe = moka.describe;

var thecache = require('./cache');
var cache = thecache();
var cache2 = thecache();

describe('cache', function(it, after) {
	it('stores some data', function() {
		cache.set('key1', 'data1');
		cache.put('key2', 'data2');
	});
	it('gets stored data sync', function() {
		if(cache.get('key1') != 'data1') throw new Error();
	});
	it('gets stored data async', function(done) {
		cache.get('key2', function(val) {
			if(val != 'data2') throw new Error();
			done();
		});
	});
	it('sets expiration for data', function() {
		cache.set('key1', 'expiring', 1);
	});
	it('gets data that hasn\'t expire yet', function() {
		if(cache.get('key1') != 'expiring') throw new Error();
	});
	it('get undefined for expired data', function(done) {
		setTimeout(function() {
			if(cache.get('key1') !== undefined) throw new Error();
			done();
		}, 1500);
	});
	it('clears data', function() {
		cache.clear();
	});
	it('get undefined for any old data', function() {
		if(cache.get('key2') !== undefined) throw new Error();
	});
	
	after(function() {
		cache.set('something', 'olddata');
	});
});

describe('different cache', function(it) {
	it('doesn\'t see data from the other cache', function() {
		if(cache2.get('something') !== undefined) throw new Error();
	});
});

moka.run({parallel: false});