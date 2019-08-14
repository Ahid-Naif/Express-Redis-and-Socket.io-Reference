const express = require('express');
const redis   = require('redis');
const config  = require('./config.js');
const process = require('process');

const app = express();

var redisClient = redis.createClient(config.redis_port, config.redis_host);
var publishClient = redis.createClient(config.redis_port, config.redis_host);

// define the channel
redisClient.on("message",(channel, message) => {
    console.log(message);
});
// subscribe
redisClient.subscribe("REQUESTS");

app.get('/', (req, res) =>{
    publishClient.publish("REQUESTS", `request on ${req.socket.localPort} for ${req.url}`);
    console.log(`Local log for ${req.url}`);
    res.end();
});

app.listen(process.argv[2]);