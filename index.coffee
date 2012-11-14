module.exports =
  configure: (client, prefix) ->
    @client = client
    @prefix = prefix

  read: (key, expire, generate, cb) ->
    client.get key, (err, data) ->
      return cb(err) if err?
      return cb(JSON.parse(data)) if data?

      generate (err, data) ->
        return cb(err) if err?
        client.setex "#{prefix}:#{key}", expire, JSON.stringify(data)
        cb(null, data)

