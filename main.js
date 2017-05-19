var http = require('http');

http.createServer(onRequest).listen(8080);

function onRequest(client_req, client_res) {
  
  console.log("handling :" + client_req.url);
  
  console.log(client_req.headers);
  
	var options = {
		hostname: client_req.headers.host,
		port: 80,
		path: client_req.url,
		method: client_req.method,
		headers: client_req.headers
	};
	
	delete options.headers['accept-encoding'];

  var proxy = http.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}
