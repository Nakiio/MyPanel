class BatteryWidget {
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
			'width: 420px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
		}
		div.classList.add('child');
		div.classList.add('widget');
		div.classList.add('draggable');
		div.id = "BatteryWidget";

    var battery = document.createElement('div');
    battery.style =
    'position: relative;' +
	'top: 50%;' +
	'left: 50%;' +
	'transform: translate(-50%,-60%);' +
	'width: 350px;' +
	'height: 200px;' +
	'border-radius: 35px;' +
	'border: 5px solid #fff;' +
	'background-color: none;';
	div.appendChild(battery);

	var before = document.createElement('div');
	before.style =
	'content: "";' +
	'position: absolute;' +
	'height: 90%;' +
	'width: var(--Butilise);' +
	'top: 50%;' +
	'left: 5%;' +
	'transform: translate(0%, -50%);' +
	'border-radius:20px;' +
	'background: #fff;' +
	'z-index: -1;';
	battery.appendChild(before);

	var after = document.createElement('div');
	after.style =
	'content: "";' +
	'position: absolute;' +
	'top: 50%;' +
	'transform: translateY(-50%);' +
	'height: 40%;' +
	'width: 20px;' +
	'right: -31px;' +
	'border-radius:10px;' +
	'border: 5px solid #fff;' +
	'background: none;';
	battery.appendChild(after);

	var h1 = document.createElement('h1');
	h1.innerHTML = "Batterie Restant : not found";
	h1.style = 
	'color: #5B5555;' +
	'font-size: 20px;' +
	'text-align: center;' +
	'top: 87%;' +
	'left: 50%;' +
	'width: auto;' +
	'transform: translate(-50%, -50%);' +
	'position: absolute;';
	div.appendChild(h1);

	try {
	  var root = document.querySelector(':root');
	  var total = 50;
	  var restant1 = 50;
	  navigator.getBattery().then(function(battery) {
	    total = battery.level * 100;
	    var restant2 = total * 315 / 100;
	    let text = "Batterie Restant : " + Math.round(total).toString() + "%";
	    h1.innerHTML = text;
	    root.style.setProperty('--Butilise',restant2);
	  });
	} catch (error) {
  	console.log("Une erreur s'est produite : " + error.message);
	}

	document.getElementById(container).appendChild(div)
  console.log("Bonjour, je m'appelle " + container + "!");
  }
}