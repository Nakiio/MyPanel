class SeparationVertiWidget {
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
  	var div = document.createElement('input');
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
			'border-radius: 3px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);'+ 
			'background:' + div.value + ';';
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 300px;' +
			'width: 10px;' +
			'border:1px solid #000;' +
			'border-radius: 3px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);'+
			'background:' + div.value + ';';
		}
	div.type = 'color';
	div.classList.add('child');
	div.classList.add('widget');
	div.classList.add('draggable');
	div.id = "SeparationVertiWidget";
	div.addEventListener("input", function() {
    	div.style.backgroundColor = div.value;
  	});
    
    document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  	}
}
	
