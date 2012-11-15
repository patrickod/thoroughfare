class Cache
  constructor: (client, prefix) ->
    @client = client
    @prefix = prefix

  read: (key, expire, generate, cb) ->
    @client.get "#{@prefix}:#{key}", (err, data) =>
      return cb(err) if err?
      return cb(null, JSON.parse(data)) if data?

      generate key, (err, data) =>
        return cb(err) if err?
        @client.setex "#{@prefix}:#{key}", expire, JSON.stringify(data)
        cb(null, data)


module.exports = Cache
