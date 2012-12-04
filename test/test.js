var utils = require('./utils');

var MemoryStore = require('../lib/memory_store');
var RedisStore = require('../lib/redis_store');
var MemcacheStore = require('../lib/memcache_store');

new MemoryStore({prefix: "test"}, function(err, store) {
  utils.run_tests('MemoryStore', store)
});

new RedisStore({prefix: "test"}, function(err, store) {
  utils.run_tests('RedisStore', store);
});

new MemcacheStore({prefix: "test"}, function(err, store) {
  utils.run_tests('MemcacheStore', store);
});
