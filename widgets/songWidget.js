class SongWidget {
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
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widget');
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 318px;' +
			'width: 493px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widgetCover');
		}
		div.classList.add('child');
		div.classList.add('draggable');
		div.id = "SongWidget";

		var createSong = document.createElement('input');
		createSong.type = 'button';
		createSong.value = ' + '
		createSong.style = 
		'position:absolute;' + 
		'width:50px;' + 
		'height:50px;' + 
		'border-radius: 2px 10px 2px 35px;' +
		'background: gray;' +
		'top:0px;' + 
		'right:0px;' +
		'font-size:30px;'+
		'color:white;';

		createSong.addEventListener("click", function() {
		 	if(actions){
		   	message(function(callback,message,number){
					console.log(callback);
					var date = new Date();
					var jour = date.getDate();
			    var mois = date.getMonth() + 1;
			    var annee = date.getFullYear();
			    var dateFormatee = jour.toString().padStart(2, "0") + "/" + mois.toString().padStart(2, "0") + 
			    "/" + annee.toString().substr(-2);
			    var object = { name: callback[0], author: callback[1],date:dateFormatee, description: callback[2]}; 
			    //saveData('projects', object, true)
			    //refresh()
				},['Enter l\'url de la vidéo.'],1);
		 	}
		});
		div.appendChild(createSong);

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}


