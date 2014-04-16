/**
 * Created by King Lee on 2014/5/16.
 */
var pulser  = require('./test_event_emitter');
var util = require('util');

var test_event_emitter = function() {
    var __pulser = new pulser();
    if(0)
    {
        __pulser.on('pulser', function(param1,param2){
            util.log('pulse received ' + " param1 = " + param1 + " param2 = " + param2 );
        });
        __pulser.start();
    }
    else{
        __pulser.register();
        __pulser.trigger('pulser');
        __pulser.trigger('start');
    }
};

exports.test_event_emitter = test_event_emitter;
