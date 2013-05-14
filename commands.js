var http = require("http"),
	url = require("url"),
	fileSystem = require('fs'),
	queryString = require( "querystring" );


function _dir(request, response){
	console.log("going to process a dir request");
	path = url.parse(request.url, true).query.path;
	console.log(path);
	
	dir = fileSystem.readdir(path,function(err,files){
		for (file in files){
			console.log("file: " + files[file] + " Extention " + files[file].split('.').pop());
			if (['html','htm','js','css'].indexOf(files[file].split('.').pop()) === -1){
				files.splice(file,1);
			}
		}
		var answer = {
			path: path,
			files: files
		};
	
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(answer));
		response.end('\n');
	});
	
	
};
	

	
	
exports._dir = _dir;