const express = require('express');
const redis   = require('redis');
const config  = require('./config.js');
const process = require('process');

const app = express();

var redisClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.on("error", (err) => {
    console.log("Error " + err);
});

redisClient.set("redis_key", '0', redis.print);

app.get('/', (req, res) =>{
    redisClient.incr("redis_key");
    redisClient.get('redis_key', (err, reply) => {
        res.send("<html><head><title>Page" +
        "</title><head><body><h1>Our Redis and Express Web Application</h1>" +
        "Redis count: " + reply + "</body></html>");
        res.end();
    });
});

app.listen(process.argv[2]);