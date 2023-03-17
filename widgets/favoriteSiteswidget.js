class FavoriteSiteswidget {
  constructor(container, position,width,height,backgroundColor,border,top,left, useAttributs) {
    this.container = container;
    this.position = position;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.border = border;
    this.top = top;
    this.left = left;
    this.useAttributs = useAttributs;
  }

  create() {
  	let container = this.container
  	let position = this.position
  	let po = "relative";
  	var div = document.createElement('div');
		if(position){
			po = "absolute";
		}
  	if(this.useAttributs){
  		div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: ' + this.height + ';' +
			'width: ' + this.width + ';' +
			'border:' + this.border + ';' +
			'top:' + this.top + ';' +
			'left:' + this.left + ';' + 
			'background-color:' + this.backgroundColor + ';' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 300px;' +
			'width: 300px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
		}
		div.classList.add('child');
		div.classList.add('widget');
		div.classList.add('draggable');
		div.id = "FavoriteSiteswidget";
		
		var styleCreateProject = 
		'position:absolute;' + 
		'width:50px;' + 
		'height:50px;' + 
		'border-radius: 2px 10px 2px 35px;' +
		'background: #090808;' +
		'top:0px;' + 
		'right:0px;' +
		'font-size:30px;'+
		'color:white;';		

		var createSite = document.createElement('input');
		createSite.type = 'button';
		createSite.value = ' + '
		createSite.style = styleCreateProject;
		

		createSite.addEventListener("mouseover", function() {
		    createSite.style = styleCreateProject + 'background: #151515;';
		});
		createSite.addEventListener("mouseout", function() {
		    createSite.style = styleCreateProject + 'background: #090808;';
		});
		createSite.addEventListener("click", function() {
		  var url = prompt('Enter l\'url du site : ');
		  if(url != ""){
				var urlparts = url.split('/');
				var name = urlparts[2].split('.');
				var imageUrl = urlparts[0] + '/' + urlparts[1] + '/' + urlparts[2] + "/favicon.ico";
				var i = 0;
				if(name[i] == "www"){
					i = 1;
				}

				var object = {name: name[i], url: url, imageUrl: imageUrl}
				$.get("../futur/FavoriteSites.txt", function(response) {
	        var lines = response.split("\n");
	        if (lines[lines.length - 1] === "") {
	          lines.pop();
	        }
	        lines.push(JSON.stringify(object));
	        var text = lines.join("\n");
	        $.ajax({
	          method: "POST",
	          url: "../futur/edit_FavoriteSite.php",
	          data: { data: text }
	        })
	        .done(function(res) {
	          alert("Le site a été ajouté au favoris !");
	          console.log(object);
	        });
      	});
				
			}
		});
		div.appendChild(createSite);

		$.get("../futur/FavoriteSites.txt", function(response) {
        let sites = response.split("\n");
        for(var i = 0; i < sites.length; i++){
        	let site = JSON.parse(sites[i]);
      		console.log(site.name,site.url,site.imageUrl)
      	}

    });

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}

