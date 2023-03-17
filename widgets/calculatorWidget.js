class CalculatorWidget {
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
  	let po = "relative";
  	var div = document.createElement('div');
		if(position){
			po = "absolute";
		}
  	if(this.useAttributs){
  		div.style = 
	  	'position: ' + po + ';' +
			'padding: 20px;' +
			'height: ' + this.height + ';' +
			'width: ' + this.width + ';' +
			'border:' + this.border + ';' +
			'top:' + this.top + ';' +
			'left:' + this.left + ';' + 
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'padding: 20px;' +
			'height: 444px;' +
			'width: 564px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
		}
		div.classList.add('child');
		div.classList.add('widget');
		div.classList.add('draggable');
		div.id = "CalculatorWidget";

		var result = document.createElement('input');
		result.type = "text";
		result.style = 
		'font-weight: bold;' +
		'background-color: #090808;' +
		'border: solid black 0.5px;' +
		'color: white;' +
		'border-radius: 5px;' +
		'width: 100%;' +
		'height: 50px;';
		div.appendChild(result)

		let style = 
		'color: white;' +
		'font-weight: bold;' +
		'border: solid black 0.5px;' +
		'width: 15%;' +
		'border-radius: 5px;' +
		'height: 40px;' +
		'outline: none;' +
		'margin: 25px;';
		var list = [0,1,2,3,4,5,6,7,8,9, "+", "-","/","*","C","="];
		for(let i = 0; i < list.length; i++){
			let button = document.createElement('input');
			button.style = style;
			button.value = list[i];
			button.type = "button";
			div.appendChild(button);
			let type = true;
			button.style =  style + 'background: #090808;';
			if(typeof list[i] === 'string'){
				type = false;
				button.style =  style + 'background: #111111;';
			}
			button.addEventListener("mouseover", function() {
		        if(type){
		        	button.style =  style + 'background: #151515;';
		        }else{
		        	button.style =  style + 'background: #151515;';
		        }
		    });
		    button.addEventListener("mouseout", function() {
		        if(type){
		        	button.style =  style + 'background: #090808;';
		        }else{
		        	button.style =  style + 'background: #111111;';
		        }
		    });
		    button.onclick = function() {
		    	console.log(button.value)
		    	if(button.value === "C"){
		    		result.value = "";
		    	}else if(button.value === "="){
		    		var p = result.value;
					var q = eval(p);
					result.value = q;
		    	}else{
		    		result.value += button.value;
		    	}
		   	};
			console.log(type)
		}

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}

