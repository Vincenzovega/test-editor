$(document).ready(function(){
	
	
	
	$('#editor').load('server.js', function() {
		
		$('#tabbar').append("<div class = 'tab active' id = 'server.js'>server.js</tab>")
		$('#debug').append('<p> Loaded: server.js for edition</p>');
		
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/chrome");
		editor.getSession().setMode("ace/mode/javascript");
	
		editor.gotoLine(1);
	});
	
	
});