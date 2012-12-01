var Store = require('./store');
var _ = require('underscore')
function MemoryStore(opts, cb) {
  opts = _.isUndefined(opts) ? {} : opts;
  this.prefix = (_.has(opts, 'prefix')) ? opts.prefix : '';
  this.data = {};
  if (_.isFunction(cb)) { cb(null, this); }
}

MemoryStore.prototype = new Store();

MemoryStore.prototype.read = function(key, cb) {
  if (_.has(this.data, key)) return cb(null, this.data[key]);
  return cb();
}

MemoryStore.prototype.write = function(key, value, cb) {
  key = this.prefix + key;
  this.data[key] = value;
  if (typeof cb !== 'undefined') { return cb(null, value); }
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
  delete this.data;
  this.data = {};
  if (typeof cb !== 'undefined') { return cb(null); }
}

MemoryStore.prototype.keys = function(cb){
  return cb(null,_.keys(this.data))
}

module.exports = MemoryStore;
