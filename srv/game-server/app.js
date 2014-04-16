var pomelo = require('pomelo');
var httpServer = require('./app/servers/connector/httpServer');
var connectors = require('./app/online/connectors');
var test = require('./app/test/test');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'srv');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
    app.loadConfig('redis', app.getBase() + '/config/redis.json');
    console.log("config load for redis  %s", app.getBase() + '/config/redis.json');
    require('./app/nosql/redis_pools').configure(app.get('redis'));
    //  create http server
    var http = new httpServer(app.get('curServer').host,app.get('curServer').httpClientPort);
    http.createHttpServer();
    app.set('httpServer',http);
    var __connectors = new connectors();
    app.set('connectors',__connectors);
});

// start app
app.start();
//  test code begin
if(0)
{
    test.test_event_emitter();
}
//  test code end

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
