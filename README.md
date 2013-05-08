#thecache

**Install:** `npm install thecache`

## API

### get(key)

Gets a key

### set(key, value[, expire])

Sets a key with optional expire time in seconds

### put(key, value[, expire])

Alias for set

### del(key)

Deletes a key

### clear

Delete all data and expiration timers

## Usage

```javascript
var thecache = require('thecache');

var conf = thecache(); // Each call creates it's own self-contained cache
var tests = thecache();

conf.set('key1', 'somedata');

conf.set('key2', [2, 5]); // The value can be any JS variable

conf.set('expirekey', {something: true}, 2); // Expires after 2 seconds

var val2 = conf.get('key2'); // Contents can be gotten with a sync call...

conf.get('key2', function(val) { // ...or asynchronously, using a callback
	console.log(val);
});
```
