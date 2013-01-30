# Thoroughfare

A really simple caching system insipred by ActiveSupport::Cache

## Download

Releases are available for download from
[GitHub](http://github.com/patrickod/thoroughfare/downloads).
Alternatively, you can install using Node Package Manager (npm):

    npm install thoroughfare

## Example
```js
var thoroughfare = require('thoroughfare');

var store = thoroughfare('memory', {prefix: "test"})

store.connect(function(err, store) {
  if (err) throw err;
  store.write("key", "value", function(err){
    if (err) throw err;
    console.log("Set key to value");
  });
});
```

## Documentation

### Standard Methods

* [read](#read)
* [write](#write)
* [fetch](#fetch)
* [remove](#remove)
* [exists](#exists)
* [clear](#clear)

### Stores
* [MemoryStore](#memorystore)
* [RedisStore](#redisstore)

## Stores

<a name="memorystore"/ >
### MemoryStore
__Options__
  * prefix - The prefix to be prepended to every key in the store

### RedisStore
<a name="redisstore" />
__Options__
  * prefix - Prefix to be prepended to all keys in the store
  * host - The hostname of the redis server you'd like to use
  * port - The port that the redis server you want to use listens on
  * password - If the redis server requires authentication
  * database - Select the database that you'd like to use for storage
  * expire - The expiration time of all keys in the store in seconds (default 0)

## Standard Methods

<a name="read" />
### store.read(key, callback)

  Reads a key from the store and returns a value if found, otherwise returning null

__Arguments__

* key - A string key for which to search.
* callback(err, value) - A callback which returns if there's an error or passes the retrieved value

__Example__

```js
store.read('key', function(err, value) {
  // if there was a problem interacting with the backend store then err will contain that err
  console.log(value);
});
```

---------------------------------------

<a name="write" />
### store.write(key, value, callback)

  Writes a value to the store for key

__Arguments__

* key - A key of type string
* value - data to be stored for the key. It will be JSON.stringified before being stored
* callback(err) - A callback to be called when the operation is complete.

__Example__

```js
store.write('key', {name: "Patrick"}, function(err) {
  if (err) throw err; // Oh noes there was an error
})
```
---------------------------------------

<a name="fetch" />
### store.fetch(key, generate, callback)

Similar to read except that Thoroughfare will execute the generate function if a null value is returned from the store and store the result under key

__Arguments__

* key - A key of type string
* generate(key) - A function that generates the desired result for the key
* callback(err, value) - A callback which returns with the value retrieved from the store or generated if it didn't exist

__Example__

```js
var generate = function(key, cb) {
  return cb(null, key + "-generated");
});
store.fetch(key, generate, function(err, value) {
  if (err) throw err;
  console.log(value);
});
```

---------------------------------------

<a name="remove" />
### store.remove(key, callback)
  Removes the value stored for given key from the store

__Arguments__

* key - A key of type string
* callback(err) - Callback called on successful deletion from the store

__Example__

```js
store.remove('no-longer-needed', function(err){
  console.log("Successfully deleted key");
});
```

---------------------------------------

<a name="exists" />
### store.exists(key, callback)

  Checks the store for the existence of a value for given key and returns true / false as to its presence

__Arguments__
* key - key of type string
* callback(err, exists) - A callback that returns the existence of the given key

__Example__
```js
store.exists(key, function(err, exists) {
  if (err) throw err;
  console.log("I " + (exists ? "found" : "didn't find") the key");
});
```

---------------------------------------

<a name="clear" />
### store.clear(callback)

Empties the store of all key/value pairs

__Arguments__

* callback(err) - A callback which is called after all the operation completes.

__Example__

```js
store.clear(function(err) {
  if (err) throw err;
  console.log("Emptied the store");
});
```

