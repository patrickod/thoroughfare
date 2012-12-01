var redis = require('redis');
var _ = require('redis');
var async = require('async');

function RedisStore(opts) {
  opts = (_.isUndefined(opts)) ? {} : opts;
  this.host = opts.host || 'localhost';
  this.port = opts.port || 6379;
  this.prefix = opts.prefix || '';
  this.expire = opts.expire || 60;

  this.client = redis.createClient(this.host, this.port);
  if _.has(opts, 'password') {
    this.client.auth(opts.password, function(){});
  }
}

RedisStore.prototype.read = function(key, generate, cb) {
  key = this.prefix + key;
  var self = this;
  if (_.isUndefined(cb)) {
    cb = generate;
    generate = null;
  }

  var readOrGenerate = function(err, value, cb) {
    if (value) { return cb(null, JSON.parse(value)) }
    else if (value == null && generate != null) {
      generate(key, function(err, result){
        if (err) { return cb(err) }
        self.client.set(key, result, cb)
      })
    }
    else cb(null, null);
  };

  async.waterfall([
    function(cb) { self.client.get(key); },
    function(result, cb) {
      if(result) {
    }
  ]);

}
