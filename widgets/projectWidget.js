class ProjcetWidget {
  constructor(container, position,width,height,border,top,left, useAttributs) {
    this.container = container;
    this.position = position;
    this.width = width;
    this.height = height;
    this.border = border;
    this.top = top;
    this.left = left;
    this.useAttributs = useAttributs;
  }

  create() {
  	let container = this.container
  	let position = this.position
  	var randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
		var randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;
		var randomAngle = () => `${Math.floor(Math.random() * 361)}deg`;
		let firstColor = randomColor();
		let secondColor = randomColor();
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
			'background-color:' + document.getElementById("middle").style.backgroundColor + ';' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widget');
  	}else{
	  	div.style = 
	  		'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 488px;' +
			'width: 419px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'background-color:' +  document.getElementById("widgetMenuBody").style.backgroundColor + ';' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widgetCover');
		}
		div.classList.add('child');
		div.classList.add('draggable');
		div.id = "ProjcetWidget";

		var clipPath = document.createElement('div');
		clipPath.style =
		'height: 100%;' +
		'width: 100%;' +
		'position:absolute;' +
		'clip-path: polygon(21% 53%, 27% 65%, 100% 51%, 24% 72%, 10% 41%, 0 57%, 13% 22%);'+
		'background: linear-gradient(' + randomAngle() + ', ' + firstColor + ',' + secondColor + ');';
		div.appendChild(clipPath)

		let style = 
		'font-size:23px;' +
		'color:white;' + 
		'margin-top:50px;' +
		'position: absolute;' +
		'left:50%;' + 
		'display:flex;' + 
		'transform:translateX(-50%);' + 
		'text-align:center;';
		var numProj = 0;
		readData('projects', function(response,callback) {
				let projects =JSON.parse(callback);
				let project = {'name':'Exemple De Nom','author':'Exemple d\'auteur','date':'00/52/2857',
				'description':'Ceci est la description de mon exemple de projet'};
				if(projects[numProj]){
					project = projects[numProj];
				}
 				var h1 = document.createElement('h1');
				h1.innerHTML = 'Nom du Projet : ' + project['name']
				h1.style = style;
				h1.style.top = '10%';
				div.appendChild(h1)

				var h2 = document.createElement('h2');
				h2.innerHTML = 'Nom du créateur : ' + project['author']
				h2.style = style;
				h2.style.top = '25%';
				div.appendChild(h2)

				var h3 = document.createElement('h3');
				h3.innerHTML = 'Date : ' + project['date']
				h3.style = style;
				h3.style.top = '40%';
				div.appendChild(h3)

				var h4 = document.createElement('h4');
				h4.innerHTML = 'Description : ' + project['description']
				h4.style = style;
				h4.style.top = '55%';
				div.appendChild(h4)
		

				let styleCreateProject = 
				'position:absolute;' + 
				'width:50px;' + 
				'height:50px;' + 
				'border-radius: 2px 10px 2px 35px;' +
				'background: linear-gradient(to right, ' + firstColor + ' 2.97%, ' + secondColor + ' 76.33%);' +
				'top:0px;' + 
				'right:0px;' +
				'font-size:30px;'+
				'color:white;';

				var createProject = document.createElement('input');
				createProject.type = 'button';
				createProject.value = ' + '
				createProject.style = styleCreateProject;

				createProject.addEventListener("mouseover", function() {
			      createProject.style = styleCreateProject + 
			      'background: linear-gradient(to left, ' + firstColor + ' 2.97%, ' + secondColor + ' 76.33%);';
		    });
		    createProject.addEventListener("mouseout", function() {
			      createProject.style = styleCreateProject + 
			      'background: linear-gradient(to right, ' + firstColor + ' 2.97%, ' + secondColor + ' 76.33%);';
		    });
		    createProject.addEventListener("click", function() {
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
			        saveData('projects', object, true)
			        refresh()
						},['Enter le nom du projet','Enter le nom de l\'auteur','Enter la description du projet'],3);
		    	}
		    });
				div.appendChild(createProject);

				var nextProject = document.createElement('input');
				nextProject.type = 'button';
				nextProject.value = ' > '
				nextProject.style = 
				'position:absolute;' +
				'bottom:5%;' + 
				'right:10%;' + 
				'width:45px;' +
				'height:45px;' + 
				'border-radius:50%;' +
				'border:2px solid #000;' + 
				'background:' + firstColor + ';';

				nextProject.addEventListener("mouseover", function() {
			      nextProject.style.backgroundColor = secondColor;
			      nextProject.style.scale = "1.5";
		    });
		    nextProject.addEventListener("mouseout", function() {
			      nextProject.style.backgroundColor = firstColor;
			      nextProject.style.scale = "1";

		    });
		    if(actions){
			    nextProject.addEventListener("click", function() {
			    	if(numProj < projects.length - 1){
			    		numProj = numProj + 1;
			    	}
				    project = projects[numProj];
				    h1.innerHTML = 'Nom du Projet : ' + project['name'];
						h2.innerHTML = 'Nom du créateur : ' + project['author'];
						h3.innerHTML = 'Date : ' + project['date'];
						h4.innerHTML = 'Description : ' + project['description'];
			    });
		  	}
				div.appendChild(nextProject);

				var formerProject = document.createElement('input');
				formerProject.type = 'button';
				formerProject.value = ' < '
				formerProject.style = 
				'position:absolute;' +
				'bottom:5%;' + 
				'left:10%;' + 
				'width:45px;' +
				'height:45px;' + 
				'border-radius:50%;' +
				'border:2px solid #000;' + 
				'background:' + secondColor + ';';

				formerProject.addEventListener("mouseover", function() {
			      formerProject.style.backgroundColor = firstColor;
			      formerProject.style.scale = "1.5";
		    });
		    formerProject.addEventListener("mouseout", function() {
			      formerProject.style.backgroundColor = secondColor;
			      formerProject.style.scale = "1";

		    });
		    if(actions){
			    formerProject.addEventListener("click", function() {
				    if(numProj > 0){
			    		numProj = numProj - 1;
			    	}
				    project = projects[numProj];
				    h1.innerHTML = 'Nom du Projet : ' + project['name'];
						h2.innerHTML = 'Nom du créateur : ' + project['author'];
						h3.innerHTML = 'Date : ' + project['date'];
						h4.innerHTML = 'Description : ' + project['description'];
			    });
		  	}
				div.appendChild(formerProject);
		})

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}

