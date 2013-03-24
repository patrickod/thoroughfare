var create_tests = require('./utils').create_tests;

describe("Thoroughfare", function(){
  describe("RedisStore", function() {
    create_tests('redis');
  });
  describe("MemoryStore", function() {
    create_tests('memory');
  });
});
