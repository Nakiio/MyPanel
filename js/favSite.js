

function create_site(){
	read_favSite(function(iteration) {
    	//console.log("La valeur finale est : " + iteration);
    	if(iteration < 10){
			var input = document.getElementById("inputSite");
			let url = input.value;
			if(url != ""){
				var urlparts = url.split('/');
				var name = urlparts[2].split('.');
				var imageUrl = urlparts[0] + '/' + urlparts[1] + '/' + urlparts[2] + "/favicon.ico";
				var i = 0;
				if(name[i] == "www"){
					i = 1;
				}
				//console.log(name[i], url, imageUrl);
				var path = '/data/favSite/' + name[i];
				$.ajax({
            		method: "POST",
            		url: "http://localhost/php/create_file.php",
            		data: { file_path: path, is_content:true, file_content: imageUrl + "]" +  url}
        		})
            	.done(function( response ) {
            		$("p.broken").html(response);
        		});
			}else{
				alert("Ecriver l'url de votre Site Favoris");
			}
			input.value = "";
		}else{
			alert("Vous avez trop de Site Favoris !");
		}
		
		read_favSite(function(iteration) {
			//console.log(iteration);
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

function read_favSite(callback) {
    var iteration = 0;
    var path = '/data/favSite/';
    $.ajax({
        method: "POST",
        url: "http://localhost/php/get_folder_children.php",
        data: { file_path: path }
    })
    .done(function(response) {
        var data = JSON.parse(response);
        for (var i = -1; i < data.length-1 && i < 10; i++) {
            var id = 'site' + iteration;
            var fileData = loadFile("http://localhost/data/favSite/" + data[iteration]);
            var imageUrl = fileData.split(']')[0];
            var siteURL = fileData.split(']')[1];
            var name = data[iteration];
            var parent = document.getElementById(id);
			var a = parent.childNodes[0];
			a.href = siteURL;
			a.style.textAlign = "center";
			var previousImage = document.getElementById("iconSiteFav" + iteration);
			if (previousImage) {
		    	previousImage.parentNode.removeChild(previousImage);
		  	}
			var image = document.createElement('img');
			image.style.top = "10px";
			image.style.left = "15px";
			image.style.width = "50px";
			image.style.height = "50px"
			image.style.position = "absolute";
			image.id = "iconSiteFav" + iteration;
			image.src = "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + imageUrl;
			a.appendChild(image);
			var previousTitle = document.getElementById('SiteTitre' + iteration);
			if (previousTitle) {
		    	previousTitle.parentNode.removeChild(previousTitle);
		  	}
			var title = document.createElement('h1');
			title.innerHTML = name;
			title.style = "font-size:17px;position:absolute;top:45px;left:50%;transform:translate(-50%,0);" ;
			title.id = "SiteTitre" + iteration;
			a.appendChild(title);
			//console.log(data.length,id, name, imageUrl, siteURL);
            iteration++;
        }

        callback(iteration);
    });
}