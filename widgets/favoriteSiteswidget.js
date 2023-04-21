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
			div.classList.add('widget');
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 139px;' +
			'width: 340px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widgetCover');
		}
		div.classList.add('child');
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
		if(actions){
			createSite.addEventListener("click", function() {
				message(function(callback,message,number){
					var url = callback[0];
					var urlparts = url.split('/');
					var name = urlparts[2].split('.');
					var imageUrl = urlparts[0] + '/' + urlparts[1] + '/' + urlparts[2] + "/favicon.ico";
					var i = 0;
					if(name[i] == "www"){
						i = 1;
					}

					var object = {name: name[i], url: url, imageUrl: imageUrl}
					saveData('favSites', object, true)
					refresh()
				},['Enter l\'url du site '],1);
			  
			});
		}
		div.appendChild(createSite);


				readData('favSites',function(response,callback){
	        let sites = [{"name":"Site 1","url":"","imageUrl":"https://cdn.iconscout.com/icon/free/png-256/logo-3446031-2882300.png"},
	        	{"name":"Site 2","url":"","imageUrl":"https://cdn.iconscout.com/icon/free/png-256/logo-3446031-2882300.png"},
	        	{"name":"Site 3","url":"","imageUrl":"https://cdn.iconscout.com/icon/free/png-256/logo-3446031-2882300.png"}];
	        if(!div.classList.contains('widgetCover')){
	        	if(JSON.parse(callback).length){
	        		sites = JSON.parse(callback);
	        	}
	        }
	        for(var i = 0; i < sites.length; i++){
	        	let site = sites[i];
	      		var container = document.createElement('a');
	      		container.style.width = '85px';
	      		container.style.height = '85px';
	      		container.style.marginLeft = '5%';
	      		container.style.position = 'relative'
	      		if(actions){container.href = site.url; container.target="_blank"}
	      		container.style.left = 25 + "px";
	      		container.classList.add("favSites");

	      		var img = document.createElement('img');
				    img.onerror = function() {
				      this.src = 'https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/remove-image-photo-icon.png';
				    };
				    img.id = site.imageUrl;
				    img.src = site.imageUrl;
				    img.style.width = '60px';
				    img.style.height = "65px";
				    img.style.marginLeft = '10px';
				    img.style.marginTop = '30px';
				    container.appendChild(img)

	      		var h1 = document.createElement('h1');
	      		h1.innerHTML = site.name;
	      		h1.style = 
	      		'position:absolute;' +
	      		'top:70%;' +
	      		'left:50%;' +
	      		'transform:translateX(-50%);' +
	      		'font-size:17px;' +
	      		'color:gray;' +
	      		'text-decoration:none;';
	      		container.appendChild(h1)

	      		div.appendChild(container);
	      	}
	      	document.querySelectorAll('.favSites').forEach(function (element) {
						element.addEventListener("mouseover", function() {
				    		element.style.opacity = '0.6';
				    		let trash = document.getElementById('trashSite');
				        if(trash){
				          trash.parentNode.removeChild(trash);
				        }
				        var button = document.createElement('div');
				        button.id = 'trashSite';
				        button.innerHTML = '<i class="fa fa-trash-o" style="margin:3px;font-size:26px;color:white"></i>';
				        button.style = 
				        'width:30px;' + 
				        'height:30px;' + 
				        'position:absolute;' +
				        'text-align:center;' +
 				        'top:-20%;' + 
				        'left:-15%;' +
				        'border:1px solid #000;' + 
				        'border-radius:10px;' +
				        'background-color:rgba(100, 100, 100,0.5);' + 
				        'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
				        element.appendChild(button);
				        button.addEventListener('mousedown', function(e) {
				          message(function(callback,message,number){
				            if(callback === true){
											var object = {name: element.children[1].innerHTML, url: element.href, imageUrl: element.children[0].id}
											console.log(object)
				            	deleteData('favSites', object);
				              createNotification("Site supprimé ✌️ !");
				              refresh();
				            }
				          },['Voulez vous supprimer ce Site ? '],0)
				        });
						});
						element.addEventListener("mouseout", function() {element.style.opacity = '1';});
					})
	    });



		  document.getElementById(container).appendChild(div)
	    console.log("Bonjour, je m'appelle " + container + "!");
	  }
}

