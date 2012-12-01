var _ = require('underscore')
function MemoryStore(opts) {
  opts = typeof opts === 'undefined' ? {} : opts;
  this.prefix = (_.has(opts, 'prefix')) ? opts.prefix : '';
  this.data = {};
}

MemoryStore.prototype.read = function(key, generate, cb) {
  key = this.prefix + key;
  var self = this;
  if (typeof cb === 'undefined') {
    cb = generate;
    generate = null;
  }
  if (_.has(this.data, key)) { return cb(null, this.data[key]); }

  else if (generate != null) {
    generate(function(err, result){
      if (err) { return cb(err); }
      self.data[key] = result;
      return cb(null, result)
    })
  }
  else return cb(null, null);
}

MemoryStore.prototype.write = function(key, value, cb) {
  key = this.prefix + key;
  this.data[key] = value;
  if (typeof cb !== 'undefined') { return cb(); }
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

MemoryStore.prototype.clear = function( cb) {
  delete this.data;
  this.data = {};
  if (typeof cb !== 'undefined') { return cb(null); }
}

module.exports = MemoryStore;
