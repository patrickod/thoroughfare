var should = require('should');
var _ = require('underscore');
var async = require('async');
var utils = require('./utils');

var MemoryStore = require('../lib/memory_store');
var RedisStore = require('../lib/redis_store');

describe('Stores', function(){
  var tests = {};

  before(function(done){
    async.parallel({
      MemoryStore: function(cb) { new MemoryStore({}, cb)},
      RedisStore: function(cb) { new RedisStore({}, cb)}
    },
    function(err, results) {
      if (err) return console.error(err);
      _.map(_.keys(results), function(key){
        utils.run_tests(key, results[key])
      })
      done();
    });
  });
  it('should be true', function(){
    var t = true;
    t.should.equal(true);
  });
});
