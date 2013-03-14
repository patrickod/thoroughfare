var should = require('should');
var thoroughfare = require('../index');

var create_tests = function(name){
  var test_key_exist = function(key, exists, cb) {
    store.read(key, function(err, value){
      if (err) return cb(err);
      if (exists) value.should.equal(exists);
      else should.not.exist(value);
      cb();
    });
  }

  var store = null;

  before(function(done){
    store = thoroughfare(name, {prefix: "test"})
    store.connect(done)
  });

  before(function(done){
    store.clear(done);
  });

  describe('#read', function() {
    it('should return null when no data exists for key', function(done) {
      test_key_exist('test-key', false, done);
    });

    it('should write values into the store when passed a generator', function(done) {
      var generate = function(key, cb) {
        cb(null, 'value')
      };
      store.read('test-key', generate, function(err, value){
        value.should.equal('value');
        done();
      });
    });
  });

  describe('#remove', function() {
    it('should remove values when given key', function(done) {
      store.remove('test-key', function(){
        test_key_exist('test-key', false, done);
      });
    });
  });

  describe('#write', function(){
    it('should write values for given key', function(done){
      store.write('key', 'value', done);
    })
  });

  describe('#exists', function(){
    it('should return true for existing values', function(done) {
      store.exists('key', function(err, result) {
        result.should.equal(true);
        done();
      });
    });

    it('should return false for missing values', function(done){
      store.exists('missing-key', function(err, result) {
        result.should.equal(false);
        done();
      });
    });
  });

  describe('#clear', function(){
    it('should empty the store of all values', function(done) {
      store.clear(done);
    });
  });
}

exports.create_tests = create_tests
