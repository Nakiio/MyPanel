class TimeWidget {
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
		div.id = "TimeWidget";

	  var time = document.createElement('h1');
		time.style = 
		'position: relative;' +
		'left: 120px;' +
		'top: 125px;' +
		'font-size: 35px;' +
		'color:white;' +
		'width:auto;' +
		'height:30px;' +
		'margin: 0';
		time.classList.add('time');
		div.appendChild(time);

		var date = document.createElement('h2');
		date.style = 
		'position: relative;' +
		'left: 120px;' +
		'top: 130px;' +
		'font-size: 15px;' +
		'color: #5B5555;' +
		'text-transform: capitalize;' +
		'margin: 0;';
		date.classList.add('date');
		div.appendChild(date);

		var sun = document.createElement('div');
		sun.innerHTML = "☀️";
		sun.style = 
		'position: relative;' + 
		'left: 10px;' + 
		'top: 60px;' + 
		'font-size: 5rem;' + 
		'display:none;' +
		'color: white;';
		sun.classList.add("sun");
		div.appendChild(sun);

		var moon = document.createElement('div');
		moon.innerHTML = "&#127769;";
		moon.style = 
		'position: relative;' + 
		'left: 10px;' + 
		'top: 60px;' + 
		'font-size: 5rem;' + 
		'display:none;' +
		'color: white;';
		moon.classList.add("moon");
		div.appendChild(moon);
		
		setInterval((function(date,time,sun,moon) {
	   		return function() {
				let now = new Date();
				let hour = now.getHours();
				let minutes = now.getMinutes();
				let seconds = now.getSeconds();
				let timeString = hour.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
				time.innerHTML = timeString;

				let dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
				let monthNames = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
				let day = dayNames[now.getDay()];
				let d = now.getDate();
				let month = monthNames[now.getMonth()];
				let year = now.getFullYear();
				let dateString = day + ' ' + d + ' ' + month + ' ' + year;
				date.innerHTML = dateString;

				let isDay = hour >= 6 && hour < 20;
				sun.style.display = isDay ? 'block' : 'none';
				moon.style.display = isDay ? 'none' : 'block';
			}
	  })(date,time,sun,moon), 1000);

	  document.getElementById(container).appendChild(div)
    console.log("Bonjour, je m'appelle " + container + "!");
  }
}

