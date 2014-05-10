/**
 * Created by King Lee on 2014/5/9.
 */

var handlerMgr = require("./../handlerMgr");
var consts = require("../../../util/consts");
handlerMgr.handler(consts.MSG_TYPE.MSG_TYPE_BEGIN, function(msg, session, next) {
    next(null, {code: 200, msg: 'test.'});
});
