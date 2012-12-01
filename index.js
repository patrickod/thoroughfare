var Cache = module.exports = (function() {
  function Cache(client, prefix) {
    this.client = client;
    this.prefix = prefix;
  }
  Cache.prototype.read = function(key, expire, generate, cb) {
    var self = this;
    return this.client.get(this.prefix + ":" + key, function(err, data) {
      if (err != null) { return cb(err); }
      if (data != null) { return cb(null, JSON.parse(data)); }

      generate(key, function(err, data) {
        if (err != null) { return cb(err); }
        self.client.setex(self.prefix + ":" + key, expire, JSON.stringify(data));
        cb(null, data);
      });
    });
  };
  return Cache;
})();
