var _ = require('underscore');

module.exports.readOrGenerate = function(client, key, cb, generate) {
  client.read(key, function(err, value) {
    if (err) { return cb(err); }
    else if (value != null) {
      return cb(null, value);
    }
    else if (generate != null) {
      generate(key, function(err, result) {
        if (err) { return cb(err); }
        client.write(key, result, function(err){
          if (err) return cb(err);
          return cb(null, result);
        });
      });
    }
    else {
      return cb(null, null);
    }
  });
}
