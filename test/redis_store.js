var assert = require('assert');
var should = require('should');
var _ = require('underscore');
var RedisStore = require('../lib/redis_store');

describe('RedisStore', function(){

  var redis_store = new RedisStore({}, before(function(done){ done () }))

  before(function(done) {
    redis_store.client.flushdb(done);
  });

  describe('#read', function() {
    it('should return null when no data exists for key', function(done) {
      redis_store.read('test-key', function(err, value) {
        if (err) throw err;
        should.not.exist(value);
        done();
      });
    });

    it('should write values into the store when passed a generator', function(done) {
      redis_store.read('test-key', function(key, cb){ cb(null, 'value')}, function(err, value) {
        if (err) return done(err);
        redis_store.read('test-key', function(err, value) {
          value.should.equal('value');
          done();
        })
      });
    });
  });

  describe('#remove', function() {
    it('should remove values when given key', function(done) {
      redis_store.remove('test-key', function(){
        redis_store.read('test-key', function(err, value){
          should.not.exist(value);
          done();
        });
      });
    });
  });
  describe('#write', function(){
    it('should write values for given key', function(done){
      redis_store.write('key', 'value', done);
    })
  });
  describe('#exists', function(){
    it('should return true for existing values', function(done) {
      redis_store.exists('key', function(err, result) {
        result.should.equal(true);
        done();
      });
    });
    it('should return false for missing values', function(done){
      redis_store.exists('missing-key', function(err, result) {
        result.should.equal(false);
        done();
      });
    });
  });
  describe('#clear', function(){
    it('should empty the store of all values', function(done) {
      redis_store.clear(done);
    });
  });
});

