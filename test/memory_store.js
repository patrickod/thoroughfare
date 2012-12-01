var assert = require('assert');
var should = require('should');
var _ = require('underscore');
var MemoryStore = require('../lib/memory_store');

describe('MemoryStore', function(){
  var memory_store = new MemoryStore({}, before(function(done){ done () }))

  describe('#init', function(){
    it('should create an empty store by default', function() {
      var memory_store = new MemoryStore();
      _.keys(memory_store.data).length.should.equal(0);
    });
  });
  describe('#get', function() {
    it('should return null when no data exists for key', function() {
      memory_store.read('test-key', function(err, value) {
        if (err) throw err;
        should.not.exist(value);
      })
    });

    it('should write values into the store when passed a generator', function() {
      memory_store.read('test-key', function(cb){ cb(null, 'value')}, function(err, value) {
        if (err) return done(err);
        value.should.equal('value');
      });
    });
  });
  describe('#remove', function() {
    it('should remove values when given key', function() {
      memory_store.remove('test-key', function(){
        memory_store.read('test-key', function(err, value){
          should.not.exist(value)
        });
      });
    });
  });
  describe('#write', function(){
    it('should write values for given key', function(done){
      memory_store.write('key', 'value', done);
    })
  });
  describe('#exists', function(){
    it('should return true for existing values', function() {
      memory_store.exists('key', function(err, result) {
        result.should.equal(true);
      });
    });
    it('should return false for missing values', function(){
      memory_store.exists('missing-key', function(err, result) {
        result.should.equal(false);
      });
    });
  });
  describe('#clear', function(){
    it('should empty the store of all values', function() {
      memory_store.clear(function(){
        _.keys(memory_store.data).length.should.equal(0);
      });
    });
  });
});
