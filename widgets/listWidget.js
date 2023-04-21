class ListWidget {
  constructor(container, position,name ,width,height,backgroundColor,border,top,left, useAttributs) {
    this.container = container;
    this.position = position;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.border = border;
    this.top = top;
    this.left = left;
    this.useAttributs = useAttributs;
    this.name = name;
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
			'height: 300px;' +
			'width: 300px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widgetCover');
		}
		div.classList.add('child');
		div.classList.add('draggable');
		div.id = "ListWidget_" + this.name;

		var lineVertical = document.createElement('div');
		lineVertical.style = 
		'width:2px;' + 
		'height:80%;' + 
		'margin-top:20%;' +
		'margin-left:25%;' +
		'background-color:gray;';
		div.appendChild(lineVertical);

		var lineHorizontal = document.createElement('div');
		lineHorizontal.style = 
		'width:70%;' + 
		'height:2px;' + 
		'margin-top:20%;' +
		'margin-left:15%;' +
		'background-color:gray;';
		div.appendChild(lineHorizontal);

		var title = document.createElement('h1');
		title.innerHTML = this.name;
		title.style = 
		'color:gray;' +
		'font-size:18px;' +
		'margin-top:11%;' +
		'margin-left:20%;';
		div.appendChild(title)

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
			createSite.addEventListener("click", function(e) {
				let name = e.target.parentNode.id.split('_')[1];
				message(function(callback,message,number){
					var note = callback[0];
					var object = {note: note, do: false}
					saveData(name, object, true)
					refresh()
				},['Entrer votre note'],1);
			  
			});
		}
		div.appendChild(createSite);

		readData(this.name,function(response,callback){
	        let notes = JSON.parse(callback);
	        if(div.id.split('_')[1].split(' ')[0] === '&#f;'){
	        	notes = [{"note":"❗| Note 0 ","do":true},
	        		{"note":"❓ | Note 1","do":false},
	        		{"note":"⁉️ | Note 2","do":true},
	        		{"note":"❗ | Note 3","do":false},
	        		{"note":"⭕ | Note 4","do":true}];
	        }
	        for(var i = 0; i < notes.length; i++){
	        	let note = notes[i];
	        	var divNote = document.createElement('div');
	        	divNote.classList.add('notes');
	        	divNote.style = 
	        	'margin-left:15%;' + 
	        	'margin-top:5%;' +  
	        	'width:70%;' + 
	        	'position:relative;' +
	        	'height:30px;';
	        	div.appendChild(divNote);

	        	var checkBox = document.createElement('input');
	        	checkBox.type = 'checkbox';
	        	if(note['do']){
	        		checkBox.checked = true;
	        	}
	        	
	        	checkBox.style = 
	        	'width:15%;' + 
	        	'height:20px;' +
	        	'margin-left:0px;' +
	        	'background-color:black;' + 
	        	'margin-top:5px';
	        	divNote.appendChild(checkBox)
	        	checkBox.addEventListener('change', function(e) {
	        		let name = e.target.parentNode.parentNode.id.split('_')[1];
	        		if(e.target.checked){
	        			updateData(name,{note: note['note'], do: false},{note: note['note'], do: true})
	        		}else{
	        			updateData(name,{note: note['note'], do: true},{note: note['note'], do: false})
	        		}
	        	});

	        	var title = document.createElement('h1');
						title.innerHTML = note['note'];
						title.id = note['note'];
						title.style = 
						'color:gray;' +
						'font-size:18px;' +
						'width:auto;' +
						'margin-left:20%;' +
						'margin-top:-13%;';
						divNote.appendChild(title)

						
	      	}
	      	document.querySelectorAll('.notes').forEach(function (element) {
						element.addEventListener("mouseover", function() {
				    		element.style.opacity = '0.6';
				    		let trash = document.getElementById('trashNote');
				        if(trash){
				          trash.parentNode.removeChild(trash);
				        }
				        var button = document.createElement('div');
				        button.id = 'trashNote';
				        button.innerHTML = '<i class="fa fa-trash-o" style="margin:3px;font-size:26px;color:white"></i>';
				        button.style = 
				        'width:30px;' + 
				        'height:30px;' + 
				        'position:absolute;' +
				        'text-align:center;' +
 				        'top:-4%;' + 
				        'left:-15%;' +
				        'border:1px solid #000;' + 
				        'border-radius:10px;' +
				        'background-color:rgba(100, 100, 100,0.5);' + 
				        'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
				        element.appendChild(button);
				        button.addEventListener('mousedown', function(e) {
				          message(function(callback,message,number){
				            if(callback === true){
				            	let name = element.parentNode.id.split('_')[1];
											var object = {note: element.children[1].id, do: element.children[0].checked}
				            	deleteData(name, object);
				              createNotification("Note supprimé ✌️ !");
				              refresh();
				            }
				          },['Voulez vous supprimer cette note ? '],0)
				        });
						});
						element.addEventListener("mouseout", function() {element.style.opacity = '1';});
					})
	    });

	  

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}

