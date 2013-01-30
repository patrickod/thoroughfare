var Store = require('./store');
var _ = require('underscore')

function MemoryStore(opts) {
  opts = _.isUndefined(opts) ? {} : opts;
  this.prefix = (_.has(opts, 'prefix')) ? opts.prefix : '';
  this.data = {};
}

MemoryStore.prototype = new Store();

MemoryStore.prototype.connect = function(cb) {
  process.nextTick(cb);
}

MemoryStore.prototype.write = function(key, value, cb) {
  key = this.prefix + key;
  this.data[key] = value;
  if (_.isFunction(cb)) return cb(null, value);
}

MemoryStore.prototype.read = function(key, generate, cb) {
  key = this.prefix + key;
  if (_.isUndefined(cb)) {
    cb = generate;
    generate = null;
  }
  if (_.has(this.data, key)) return cb(null, this.data[key]);
  else if (_.isFunction(generate)) {
    var self = this;
    generate(key, function(err, value) {
      if (err) return cb(err);
      self.data[key] = value;
      return cb(null, value);
    });
  }
  else return cb();
}

MemoryStore.prototype.remove = function(key, cb) {
  key = this.prefix + key;
  delete this.data[key];
  if (typeof cb !== 'undefined') { return cb(); }
}

MemoryStore.prototype.exists = function(key, cb) {
  key = this.prefix + key;
  cb(null, _.has(this.data, key))
}

MemoryStore.prototype.clear = function(cb) {
  this.data = {};
  if (_.isFunction(cb)) return cb();
}

MemoryStore.prototype.keys = function(cb){
  return cb(null,_.keys(this.data))
}

module.exports = MemoryStore;
