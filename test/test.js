var assert = require('assert');
var should = require('should');
var _ = require('underscore');
var MemoryStore = require('../lib/memory_store');

describe('MemoryStore', function(){
  describe('#init', function(){
    it('should create an empty store by default', function() {
      var memory_store = new MemoryStore();
      _.keys(memory_store.data).length.should.equal(0);
    });
  });
  describe('#get', function() {
    var memory_store = new MemoryStore();

    it('should return null when no data exists for key', function(done) {
      memory_store.read('test-key', function(err, value) {
        console.log(arguments);
        if (err) throw err;
        value.should.equal(null);
      })
    });

    it('should write values into the store when passed a generator', function(done) {
      memory_store.read('test-key', function(cb){ cb(null, 'value')}, function(err, value) {
        if (err) return done(err);
        done(null, (value == 'value'));
      });
    });
  });
});
