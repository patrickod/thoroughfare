var MemoryStore = require('./lib/memory_store');
var RedisStore = require('./lib/redis_store');

var Thoroughfare = function() {
}

Thoroughfare.MemoryStore = MemoryStore
Thoroughfare.RedisStore = RedisStore

module.exports = Thoroughfare
