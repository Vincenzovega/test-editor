var http = require("http"),
	url = require("url"),
	fileSystem = require('fs'),
	path = require('path');

function start(){
	
	function onRequest(request, response) {
		
		var pathname = url.parse(request.url).pathname;
		console.log("Request for: " + pathname +" received");
		if (pathname === '/'){
			var pathname = path.join(__dirname, 'index.html');
		} else {
			var pathname = path.join(__dirname, pathname);
		}

		console.log(pathname.split(".").pop());
		
		
		fileSystem.exists(pathname,function(exists){
  			if (exists){
				var stat = fileSystem.statSync(pathname);
				console.log("sending file: " + pathname+ " size: " + stat.size);
				
				
				
				response.writeHead(200, {
					"Content-Type": (pathname.split(".").pop()==="css")?"text/css":"text/html",
					"Content-Length": stat.size
				});
				
				var readStream = fileSystem.createReadStream(pathname);
				
				readStream.on('data',function(data){
						response.write(data);
					});
		
				readStream.on('end',function(){
					console.log("transmission terminée");
					response.end();
				});
		
				readStream.on('error',function(){
					console.log("Envoi ficher échoué.");
				});
				
				
			}else{
				console.log("fichier " + pathname + " absent :(");
				response.writeHead(404, {
					"Content-Type": "text/html"
				});
				response.end();
				
			}
		});	
			
		
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");

}
exports.start = start;