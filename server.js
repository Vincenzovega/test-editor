var http = require("http"),
	url = require("url"),
	fileSystem = require('fs'),
	path = require('path');

function start(){
	
	function onRequest(request, response) {
		
		
		var pathname = url.parse(request.url).pathname;
		
		if (pathname === '/'){
			var pathname = 'index.html';
		}
		var filepath = path.join(__dirname, pathname);
		
		
		
		if (pathname === '/dir'){
			require("./commands.js")._dir(request, response);
			} else {		
				fileSystem.exists(filepath,function(exists){
  					if (exists){
						var stat = fileSystem.statSync(filepath);
				
				
				
						response.writeHead(200, {
							"Content-Type": (filepath.split(".").pop()==="css")?"text/css":"text/html",
							"Content-Length": stat.size
						});
				
						var readStream = fileSystem.createReadStream(filepath);
				
						readStream.on('data',function(data){
							response.write(data);
						});
		
						readStream.on('end',function(){
							console.log("File:" + filepath + "envoyé");
							response.end();
						});
		
						readStream.on('error',function(){
							console.log("Envoi ficher échoué.");
						});
				
				
					}else{
						console.log("fichier " + filepath + " absent :(");
						response.writeHead(404, {
						"Content-Type": "text/html"
					});
					response.end();
				
				}
			});	
			
		}
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");

}
exports.start = start;