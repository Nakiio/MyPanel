class ImageWidget {
  constructor(container, position,width,height,backgroundColor,border,top,left,child, useAttributs) {
    this.container = container;
    this.position = position;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.border = border;
    this.top = top;
    this.left = left;
    this.useAttributs = useAttributs;
    this.child = child;
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
		div.id = "ImageWidget";

  	var img = document.createElement('img');
  	if(this.useAttributs){
  		img.src = this.child.children[0].src;
  	}else{
  		img.src = "https://static.vecteezy.com/ti/photos-gratuite/p2/7763043-feuille-verte-avec-goutte-de-pluie-dans-la-jungle-goutte-d-eau-sur-feuilles-feuille-verte-texture-fond-avec-motif-minimal-feuilles-vertes-dans-la-foret-tropicale-sur-sombre-fond-verdure-papier-peint-jardin-botanique-gratuit-photo.jpg";
  	}
  	img.style.width = "100%";
  	img.style.height = "100%";
  	img.style.top = "0";
  	img.style.left = "0";
  	img.style.borderRadius = "10px";
  	div.appendChild(img);

		var h1 = document.createElement('h1');
		h1.innerHTML = 'Cliquer pour, </br> <span style="font-size:20px; color:#888;">Changer ' + "l'" + 'image';
		h1.style.color = "white";
		h1.style.fontSize = "25px";
		h1.style.position = "absolute";
		h1.style.top = "50%";
		h1.style.display = "none";
		h1.style.left = "50%";
		h1.style.transform = "translate(-50%,-50%)";
		h1.style.textAlign = "center";
		div.appendChild(h1);

		img.addEventListener("mouseover", function() {
        img.style.filter = "invert(0.15)";
        h1.style.display = "block";
        div.style.cursor = "grab";
    });
    h1.addEventListener("mouseover", function() {
        img.style.filter = "invert(0.15)";
        h1.style.display = "block";
        div.style.cursor = "grab";
    });
    img.addEventListener("mouseout", function() {
        img.style.filter = "none";
        h1.style.display = "none";
        div.style.cursor = "none";
    });

    img.addEventListener('click', function(e) {
    	if(div.parentNode.id != "widgetMenuBody"){
    		if (!div.classList.contains("dragged")) {
	    		var url = prompt("Taper l'url de l'image : ");
	    		if (url !== null || url.length === 0 || !url) {
	    			console.log(url)
	      		img.src = url;
	    		}
	    	}
    	}
    })

    h1.addEventListener('click', function(e) {
    	if(div.parentNode.id != "widgetMenuBody"){
    		if (!div.classList.contains("dragged")) {
	    		var url = prompt("Taper l'url de l'image : ");
	    		if (url !== null || url.length === 0 || !url) {
	    			console.log(url)
	      		img.src = url;
	    		}
	    	}
    	}
    })

   	document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}
	
