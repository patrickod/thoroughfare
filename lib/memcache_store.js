var memcache = require('memcache')
var Store = require('./store');
var _ = require('underscore')

function MemcacheStore(opts, cb) {
  opts = _.isUndefined(opts) ? {} : opts;
  this.prefix = opts.prefix + ':' || '';
  this.port = opts.port || 11211;
  this.host = opts.host || 'localhost';

  this.client = new memcache.Client(this.port, this.host);

  var self = this;

  this.client.on('connect', function(err) {
    cb(null, self);
  })
  this.client.connect();
}

MemcacheStore.prototype = new Store();

MemcacheStore.prototype.write = function(key, value, cb) {
  key = this.prefix + key;
  this.client.set(key, JSON.stringify({data: value}), cb);
}

MemcacheStore.prototype.read = function(key, generate, cb) {
  if (_.isUndefined(cb)) {
    cb = generate;
    generate = null;
  }
  var self = this;
  this.client.get(this.prefix + key, function(err, value) {
    if (err) return cb(err);

    if (value) return cb(null, value);

    else if (_.isFunction(generate)) {
      generate(key, function(err, value) {
        if (err) return cb(err);
        self.write(key, value, function(err) {
          if (err) return cb(err);
          return cb(null, value);
        });

      });
    }
    else return cb();
  });
}

MemcacheStore.prototype.remove = function(key, cb) {
  key = this.prefix + key;
  this.client.delete(key, cb);
}

MemcacheStore.prototype.clear = function(cb){
  return cb()
  this.client.flush_all(cb);
}

MemcacheStore.prototype.exists = function(key, cb) {
  this.read(key, function(err, value) {
    if (err) return cb(err);
    return cb(null, (value != null))
  });
}

module.exports = MemcacheStore
