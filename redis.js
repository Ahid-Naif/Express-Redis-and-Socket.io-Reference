const config = require('./config.js');
const redis  = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var promiser = (resolve, reject) => {
    return (err, data) => {
        if(err)
            reject(err);
        resolve(data);
    };
};

var get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, promiser(resolve, reject));
    });
};

var hgetall = (key) => {
    return new Promise((resolve, reject) => {
        if(key == null)
            reject();
        client.hgetall(key, promiser(resolve, reject));
    });
};

var lrange = (key) => {
    return new Promise((resolve, reject) => {
        client.lrange(key, [0, -1], promiser(resolve, reject));
    });
};

var zrevrangebyscore = (key, max, min) => {
    return new Promise((resolve, reject) => {
        client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
    });
};

var aroundLoc = (long, lat, miles) => {
    return new Promise((resolve, reject) => {
      client.georadius('places', long, lat, miles, 'mi', 'WITHDIST', promiser(resolve, reject));
    });
  };
  
var aroundSB = (miles) => {
    return new Promise((resolve, reject) => {
      client.georadiusbymember('places', "South Bend", miles, 'mi', 'WITHDIST', promiser(resolve, reject));
    });
};

module.exports.get              = get;
module.exports.hgetall          = hgetall;
module.exports.lrange           = lrange;
module.exports.zrevrangebyscore = zrevrangebyscore;
module.exports.aroundLoc        = aroundLoc;
module.exports.aroundSB         = aroundSB;
module.exports.client           = client