var redis = require('redis');
var _ = require('underscore');
var Store = require('./store');

function RedisStore(opts, cb) {
  opts = (_.isUndefined(opts)) ? {} : opts;
  this.host = opts.host || 'localhost';
  this.port = opts.port || 6379;
  this.prefix = opts.prefix || '';
  this.expire = opts.expire || null;
  this.database = opts.database || 0;

  this.client = redis.createClient(this.port, this.host);

  if (this.database > 0) this.client.select(this.database);

  if (_.has(opts, 'password')) {
    this.client.auth(opts.password, function(){});
  }
  var self = this;

  process.nextTick(function(){
    return cb(null, self);
  })
}
RedisStore.prototype = new Store();

RedisStore.prototype.read = function(key, cb) {
  key = this.prefix + key;
  this.client.get(key, function(err, data){
    if (err) return cb(err);
    if (data == null) return cb();
    return cb(null, JSON.parse(data).data);
  });
}

RedisStore.prototype.write = function(key, value, cb) {
  key = this.prefix + key;
  if (this.expire) {
    this.client.setex(key, this.expire, JSON.stringify({data: value}), cb);
  } else {
    this.client.set(key, JSON.stringify({data: value}), cb);
  }
}

RedisStore.prototype.remove = function(key, cb) {
  key = this.prefix + key;
  this.client.del(key, cb);
}

RedisStore.prototype.exists = function(key, cb) {
  key = this.prefix + key;
  this.client.exists(key, function(err, exists){
    if (err) return cb(err);
    return cb(null, exists == 1 ? true : false)
  });
}

RedisStore.prototype.clear = function(cb) {
  this.client.flushdb(cb);
}

RedisStore.prototype.keys = function(cb) {
  this.client.keys('*', cb);
}

module.exports = RedisStore;
