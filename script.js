function shrink(filename){
	var ext = filename.split('.').pop();
	return filename.substr(0,5)+'.'+ext;
}	

$(document).ready(function(){
	
	// Request the list of files in the current folder:
	$.get('dir?path=.',
	function(data) {
		for (file in data.files){
			$('#tabbar').append("<div class = 'tab' id = '" + data.files[file] + "'>"+ shrink(data.files[file]) +"</tab>");
			$('#debug').append("<p> Loaded: "+ data.files[file] +" for edition</p>");
		}
	},"json");
	
	$('#editor').load('server.js', function() {
		
		
		
		
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/chrome");
		editor.getSession().setMode("ace/mode/javascript");
	
		editor.gotoLine(1);
	});
	
	
});

