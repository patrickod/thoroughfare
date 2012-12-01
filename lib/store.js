var _ = require('underscore')
var utils = require('./utils');
function Store() {
}

Store.prototype.fetch = function(key, generate, cb) {
  key = this.prefix + key;
  var self = this;

  if (_.isUndefined(cb)) {
    cb = generate;
    generate = null;
  }
  utils.readOrGenerate(this, key, cb, generate)
}

module.exports = Store;
