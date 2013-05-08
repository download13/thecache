#thecache

*Install* `npm install thecache`

## API

### get(key)

Gets a key

### set(key, value[, expire])

Sets a key with optional expire time in seconds

### put(key, value[, expire])

Alias for set

### del(key)

Deletes a key

### prefix

Creates a prefixed version of the cache on which get/set/put/del can be used

### clear

Delete all data and expiration timers. This will delete all prefixed data as well.

## Usage

```javascript
var thecache = require('thecache');

var cache1 = thecache(); // Each call creates it's own self-contained cache
var cache2 = thecache();

var conf = cache1.prefix('config'); // Prefixed areas in the same cache
```
