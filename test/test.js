var should = require('should');
var _ = require('underscore');
var async = require('async');
var utils = require('./utils');

var MemoryStore = require('../lib/memory_store');
var RedisStore = require('../lib/redis_store');

new MemoryStore({}, function(err, store) {
  utils.run_tests('MemoryStore', store)
});
new RedisStore({}, function(err, store) {
  utils.run_tests('RedisStore', store);
});
