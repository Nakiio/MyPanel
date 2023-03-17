var page = 1;

function ClickCreateProject(){
    var name = document.getElementById('name');
    var author = document.getElementById('author');
    var speech = document.getElementById('speech');
    var ide = document.getElementById('ide');
    var description = document.getElementById('description');
    var inputsValue = [name.value, author.value, speech.value, ide.value, description.value];
    var notNull = true;
    for(var i = 0; i < inputsValue.length; i++){
        var value = inputsValue[i].toString();
        if(value === ""){
            notNull = false;
        }
    }
	if (notNull === true) {
    	create_project(inputsValue, function() {
        	window.location.href = "http://localhost/home/home.php#projets";
        	alert("Votre projet est crée !");
    	});
	}
}

function create_project(list, callback) {
    var content = list[0] + "." + list[1] + "." + list[2] + "." + list[3] + "." + list[4];
    console.log(content)
    var path = '/data/projectFiles/' + list[0];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback();
        }
    };
    xhttp.open("POST", "http://localhost/php/create_file.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("file_path=" + encodeURIComponent(path) + "&is_content=true&file_content=" + encodeURIComponent(content));
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

function show_project() {
	console.log(page);
    var path = '/data/projectFiles/';
    $.ajax({
        method: "POST",
        url: "http://localhost/php/get_folder_children.php",
        data: { file_path: path }
    })
    .done(function(response) {
        var data = JSON.parse(response);
        console.log(data)
        var porjID = page * 3 -1;
        var project1 = loadFile("http://localhost/data/projectFiles/" + data[porjID-2]).split('.');
        var project2 = loadFile("http://localhost/data/projectFiles/" + data[porjID-1]).split('.')
        var project3 = loadFile("http://localhost/data/projectFiles/" + data[porjID]).split('.')
        var list = [project1,project2,project3];
        for(var i = 0; i < list.length; i++){
        	var num = i + 1;
        	document.getElementById("nom" + num).innerHTML = "Nom : "+ list[i][0];
	      	document.getElementById("dev" + num).innerHTML = "Developpeur : "+ list[i][1];
	      	document.getElementById("langue" + num).innerHTML = "Langage : "+ list[i][2];
	      	document.getElementById("env" + num).innerHTML = "Environement : "+ list[i][3];
	      	document.getElementById("desc" + num).innerHTML = "Description : "+ list[i][4]; 
        }
        update();
      
    });
}

var root = document.querySelector(':root');
var randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
var randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;
var randomAngle = () => `${Math.floor(Math.random() * 361)}deg`;

function update() {
  var dom = document.getElementsByClassName('project1');
  root.style.setProperty("--color-1", randomColor());
  root.style.setProperty("--color-2", randomColor());
  root.style.setProperty("--angle", randomAngle());

  root.style.setProperty("--color-3", randomColor());
  root.style.setProperty("--color-4", randomColor());
  root.style.setProperty("--angle", randomAngle());

  root.style.setProperty("--color-5", randomColor());
  root.style.setProperty("--color-6", randomColor());
  root.style.setProperty("--angle", randomAngle());
};




function changePage(button){
	
	if(button.className.toString() === "nextProj"){
		page = page + 1;
		show_project();
	}else if(button.className.toString() === "formerProj"){
		if(page > 1){
			page = page - 1;
			show_project();
		}else{
			alert("Vous ne pouvez pas plus reculer ! ");
		}
	}
	
}   


show_project();