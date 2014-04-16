/**
 * Created by King Lee on 2014/5/16.
 */

var redis_pools = require("../nosql/redis_pools");
var h_user = 'h_user';

var redis_wrapper = module.exports;

redis_wrapper.exist_user = function(uid,cb){
    redis_pools.execute('pool_1',function(client, release){
        client.hexists(h_user + ":" + uid,function(err,reply){
            if(err){
                cb(0);
            }
            cb(reply);
            release();
        });
    });
};

redis_wrapper.load_user = function(uid,cb){
    redis_pools.execute('pool_1',function(client, release){
        client.hget(h_user + ":" + uid,function (err, reply){
            if(err){
                cb(null);
            }
            if(reply){
                cb(reply);
            }
            release();
        });
    });
};

redis_wrapper.save_user = function(user){
    redis_pools.execute('pool_1',function(client, release){
        client.hset(h_user + ":" + user.get_uid(),user.user_2_json(),function (err, reply){
            if(err){
                //  some thing log
            }
            release();
        });
    });
};

