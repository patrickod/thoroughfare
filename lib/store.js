var _ = require('underscore')
var utils = require('./utils');

function Store() {
}

Store.prototype.connect = function(cb) {
  process.nextTick(function() { cb(null, this)});
}

module.exports = Store;
