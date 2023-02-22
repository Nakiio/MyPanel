function read_tasks(callback) {
	console.log("read_tasks");
    var iteration = 0;
    var path = '/data/tasks/';
    $.ajax({
        method: "POST",
        url: "http://localhost/php/get_folder_children.php",
        data: { file_path: path }
    })
    .done(function(response) {
        var data = JSON.parse(response);
        for (var i = -1; i < data.length-1 && i <= 12; i++) {
            var t = i +1;
            var id = 'task' + t;
            var is_do = loadFile("http://localhost/data/tasks/" + data[t]);
            console.log(data.length,t, data[t], is_do, id);
            var li = document.getElementById(id);
            var name = data[t].split('.');
            li.innerHTML = name[0];
            if(is_do == "false"){
            	li.style = "text-decoration: none;";
            }else{
            	li.style = "text-decoration: line-through;";
            }
            iteration++;
        }

        callback(iteration);
    });
}


function create_task(){
	read_tasks(function(iteration) {
    	console.log("La valeur finale est : " + iteration);
    	if(iteration < 12){
			var input = document.getElementById("task");
			let text = input.value;
			console.log(text);
			if(text != ""){
				console.log("sdfsdfgsdfg");
			var path = '/data/tasks/' + text;
				$.ajax({
            		method: "POST",
            		url: "http://localhost/php/create_file.php",
            		data: { file_path: path, is_content:true, file_content:"flase" }
        		})
            	.done(function( response ) {
            		$("p.broken").html(response);
        		});
		
			}else{
				alert("Ecriver quelque chose dans \"Note\"");
			}
		}else{
			alert("Vous avez trop de notes !");
		}
		input.value = "";
		read_tasks(function(iteration) {
			console.log(iteration);
		});
	});

	

	
}

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


