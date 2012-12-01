var _ = require('underscore')
function MemoryStore(opts) {
  opts = typeof opts === 'undefined' ? {} : opts;
  this.prefix = (_.has(opts, 'prefix')) ? opts.prefix : '';
  this.data = {};
}

MemoryStore.prototype.read = function(key, generate, cb) {
  var self = this;
  if (typeof cb === 'undefined') {
    cb = generate;
    generate = null;
  }
  if (_.has(this.data, key)) { return cb(null, this.data[key]); }

  else if (generate != null) {
    generate(function(err, result){
      if (err == null) { return cb(err); }
      this.data[key] = result;
      return cb(null, result)
    })
  }
  else return cb(null, null);
}

MemoryStore.prototype.write = function(key, value, cb) {
  this.data[key] = value;
  if (typeof cb !== 'undefined') { return cb(); }
}

MemoryStore.prototype.remove = function(key, cb) {
  delete this.data[key];
  if (typeof cb !== 'undefined') { return cb(); }
}

MemoryStore.prototype.exists = function(key, cb) {
  cb(null, _.has(this.data, key))
}

MemoryStore.prototype.clear = function(key, cb) {
  delete this.data;
  this.data = {};
  if (typeof cb !== 'undefined') { return cb(null); }
}

module.exports = MemoryStore;
