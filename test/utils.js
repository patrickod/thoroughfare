var _ = require('underscore');
var should = require('should');

var run_tests = function(name, store) {
  describe(name, function(){
    // Clear the store for fresh test
    before(function(done){
      store.clear(done);
    });

    describe('#init', function(){
      it('should create an empty store by default', function(done) {
        store.keys(function(err, keys) {
          if (err) return done(err);
          keys.length.should.equal(0);
          done();
        })
      });
    });

    describe('#read', function() {
      it('should return null when no data exists for key', function() {
        store.read('test-key', function(err, value) {
          if (err) throw err;
          should.not.exist(value);
        })
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
          store.read('test-key', function(err, value){
            should.not.exist(value)
            done();
          });
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
        store.clear(function(err){
          if (err) return done(err);
          store.keys(function(err, keys){
            if (err) return done(err);
            _.keys(keys).length.should.equal(0);
            done();
          });
        });
      });
    });
  });
};

module.exports.run_tests = run_tests
