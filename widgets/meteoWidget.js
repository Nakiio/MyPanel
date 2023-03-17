class MeteoWidget {
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
		div.id = "MeteoWidget";

    var h1 = document.createElement('h1');
    h1.style = 
    'position: relative;' +
	'left: 160px;' +
	'top: 150px;' +
	'font-size: 15px;' +
	'color: #5B5555;' +
	'text-transform: capitalize;' +
	'margin: 0;';
	div.appendChild(h1);


	var h2 = document.createElement('h2');
	h2.style =
	'position: relative;' +
	'left: 160px;' +
	'top: 110px;' +
	'font-size: 20px;' +
	'color:white;' +
	'margin: 0;';
	div.appendChild(h2);

	var h3 = document.createElement('h3');
	h3.style =
	'position: relative;' +
	'left: 10px;' +
	'top: 50px;' +
	'font-size: 36px;' +
	'color: white;';
	div.appendChild(h3);

	var emoji = document.createElement('div');
	emoji.style = 
	'position: relative;' +
	'left: 90px;' +
	'top: -35px;' +
	'font-size: 45px';
	div.appendChild(emoji);

		var xhr = new XMLHttpRequest();
      	xhr.open('GET', 'https://ipapi.co/json/', true);
      	xhr.onload = function() {
        if (xhr.status === 200) {
          	var data = JSON.parse(xhr.responseText);
          	var city = data.city;
          	var country = data.country_name;
          	const url = `https://www.wunderground.com/weather/fr/${city}`;
          	fetch(url)
				.then(response => response.text())
				.then(data => {
				    const parser = new DOMParser();
				    const doc = parser.parseFromString(data, "text/html");
				    const temp = doc.querySelector(".wu-value").textContent;
				    const tempF = parseFloat(temp);
        			const tempC = (tempF - 32) * 5 / 9;
				    h1.innerHTML = city;
				    h2.innerHTML = country;
				    h3.innerHTML = tempC.toFixed(1) + "°";

				    const url = `https://wttr.in/${city}?format=%C;%t;%m;%M`;
					fetch(url)
						.then(response => response.text())
						.then(data => {
					    	const weatherData = data.split(';');
					    	const weatherDesc = weatherData[0];
					    	const temperature = weatherData[1];
					    	const humidity = weatherData[2];
					    	const wind = weatherData[3];
					    	var iconImage = '❓';
					    	const lowerCaseDesc = weatherDesc.toLowerCase();
							if (lowerCaseDesc.includes('plus')) {
								iconImage = '🌧️';
							} else if (lowerCaseDesc.includes('nuage')) {
								iconImage = '☁️';
							} else {
								let now = new Date();
								let hour = now.getHours();
								let isDay = hour >= 6 && hour < 20;
								if(isDay){
									iconImage = '☀️';
								}else{
									iconImage = '🌙';
								}
							}
					    	//const weatherInfo = ` ${temperature}°C | ${humidity}% humidité | ${wind} vent ${icon}`;
					    	emoji.innerHTML = iconImage;
					    	})
					    	.catch(error => {
					     	 	console.error(`Une erreur s'est produite : ${error}`);
					   	 	});
					   	})
						.catch(error => {
				    		console.error(`Une erreur s'est produite : ${error}`);
						});
		      	};
        	}

        	xhr.send();
        document.getElementById(container).appendChild(div)
    	console.log("Bonjour, je m'appelle " + container + "!");
  	}
}
	
