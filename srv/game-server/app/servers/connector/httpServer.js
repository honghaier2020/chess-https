var http = require("http");
var qs = require( 'querystring' );
var handlerMgr = require('./handlerMgr');

var connector = function(host,port) {
	this.server = null;
	this.host = host;
	this.port = port;
};

connector.prototype.createHttpServer = function() {
    var self = this;
	this.server = http.createServer(function(req, res) {
        var url = req.url;
		var client_ip = req.connection.remoteAddress;
		console.log("new client coming ip:" + client_ip + " method:" + req.method + " url:" + url);
		switch(req.method){
			case 'GET':{
                res.end();
				break;
			}
			case 'POST':{
                self.parsePost(req,res,function(data){
                    self.dispatchMessage(data,url,req,res);
				});
				break;
			}
			default:{
                res.end();
                break;
			}
		}
	});
	this.server.listen( this.port );
    console.log("server listen at " + this.port);
};

connector.prototype.parsePost = function(req,res,cb){
	var chunks = [];
    req.on('data', function(chunk) {
        chunks.push(chunk);
    });
    
    req.on('end', function() {
        //  convert array to string,delimiter is "";
        var data = chunks.join('');
        //  convert url format to normal!!
        cb(qs.parse(data));
    });
    req.on('error',function(err){
        console.log('problem with request: ' + err.message);
    });
};

connector.prototype.dispatchMessage = function(data,url,req,res){
    if(url == "/test")
    {
        self.pressTest(req,res);
        return;
    }
    var msg = JSON.parse(data.msg);
    handlerMgr.trigger(msg.msg_id,msg,null,function(error,res_msg){
        console.log("after dispatchMessage ... %j", res_msg);
        if(0){
            //  by default the encoding is 'utf8'.
            res.write(JSON.stringify(res_msg));
            res.end();
        }
        else{
            //  res.end:Finishes sending the request. If any parts of the body are unsent, it will flush them to the stream.
            //  If the request is chunked, this will send the terminating '0\r\n\r\n'.
            //  If data is specified, it is equivalent to calling request.write(data, encoding) followed by request.end().
            res.end( JSON.stringify(res_msg));
        }
    });
};

connector.prototype.pressTest = function(req,res){
    var msg = '{"context": "context", "msg_id": 2}';
    this.dispatchMessage(msg,req,res);
};

module.exports = connector;