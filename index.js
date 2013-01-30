module.exports = thoroughfare = function(type, config) {
  if (!thoroughfare.STORES[type]) { throw new Error('No thoroughfare store of type ' + type); }
  return new thoroughfare.STORES[type](config || {});
};

thoroughfare.STORES = {
  memory: require('./lib/memory_store'),
  redis: require('./lib/redis_store')
};
