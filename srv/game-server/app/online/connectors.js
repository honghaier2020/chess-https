/**
 * Created by King Lee on 2014/5/16.
 */
var redis_wrapper = require('../nosql/redis_wrapper');
var obj_user = require('../obj/obj_user');
var async = require('async');

var connectors = function() {
    this.sessions = {};
};

module.exports = connectors;

/**
 * get user from database,is not exist,create one.
 * @param uid
 */
connectors.prototype.load_user = function(uid,cb) {
    async.waterfall([
        function(callback){
            redis_wrapper.exist_user(uid,function(exist){
                callback(null, exist);
            });
        },
        function(exist, callback){
            if(!exist){
                var user =  new obj_user(uid);
                redis_wrapper.save_user(user);
                callback(null, exist);
            }
        }
    ], function (err, exist) {
        redis_wrapper.load_user(uid,cb);
    });
};

connectors.prototype.add = function(uid,user){
    this.sessions[uid] = user;
};
