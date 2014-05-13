/**
 * Created by King Lee on 14-4-15.
 */
var handlerMgr = require("./../handlerMgr");
var consts = require("../../../util/consts");
var redis_pools = require("../../../nosql/redis_pools");
handlerMgr.handler(consts.MSG_TYPE.MSG_TYPE_LOGIN, function(msg, session, next) {
    var random_val = Math.floor(Math.random()*10000000);
    redis_pools.execute("pool_1",function(client, release){
        client.hset("chess" + ":" + "king_lee" + random_val,"hello","hi",function (err, reply){
            console.log(JSON.stringify(reply));
            release();
        });
    });
    var ret_msg = {};
    ret_msg.msg_id = msg.msg_id;
    ret_msg.context = "login is ok.";
    next(null, {code: 200, msg: ret_msg});
});