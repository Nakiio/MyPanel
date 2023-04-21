class CalendarWidget {
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
			'overflow:hidden;' + 
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widget');
  	}else{
	  	div.style = 
	  	'position: ' + po + ';' +
			'margin: 50px;' +
			'height: 440px;' +
			'width: 460px;' +
			'border:1px solid #000;' +
			'border-radius: 10px;' +
			'overflow:hidden;' + 
			'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
			div.classList.add('widgetCover');
	}
	div.classList.add('child');
	div.classList.add('draggable');
	div.id = "CalendarWidget";

	var dates = [];
	let date = new Date(),
	currYear = date.getFullYear(),
	currMonth = date.getMonth();
	const days = ["Lun",'Mar','Mer','Jeu','Ven','Sam','Dim'];
	const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
		           "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

	var calendarContainer = document.createElement('div');
	calendarContainer.style = 
	'width:450px;' + 
	'height:432px;' +
	'margin:5px;' +
	'border-radius:10px;' +
	'border:1px solid #000;' +
	'background-color:rgba(0,0,0,0.3);';
	div.appendChild(calendarContainer);

	var calendarHealder = document.createElement('div');
	calendarHealder.style = 
	'margin-left:5%;' +
	'margin-top:0px;' + 
	'width:90%;' +
	'height:20%;';
	calendarContainer.appendChild(calendarHealder);

	var h1 = document.createElement('h1');
	h1.innerHTML = months[currMonth] + ' ' + currYear;
	h1.style = 
	'margin-left:5%;' +
	'color:gray;' +
	'font-size:35px;';
	calendarHealder.appendChild(h1)

	var buttonStyle = 
    'position:absolute;' +
    'top:25%;' +
    'text-align:center;' +
    'width:40px;' + 
    'border-radius:50%;' +
    'color:gray;' +
    'height:40px;';
	
    var prev = document.createElement('span');
    dates.push(prev);
    prev.id = 'prev';
    prev.innerHTML = '<h1 style="position:relative;margin-top:10px;font-size:20px;"><</h1>';
    prev.style = buttonStyle + 'left:75%;';
    calendarHealder.appendChild(prev)

    var next = document.createElement('span');
    dates.push(next);
    next.id = 'next';
    next.innerHTML = '<h1 style="position:relative;margin-top:10px;font-size:20px;">></h1>';
    next.style = buttonStyle + 'left:88%;';
    calendarHealder.appendChild(next)


		var calendar = document.createElement('div');
		calendar.style = 
		'width:90%;' +
		'height:80%;' +
		'margin-top:20%;' +
		'margin-left:5%;';
		calendarContainer.appendChild(calendar);

		for(var i = 0; i < days.length;i++){
			var li = document.createElement('li');
			li.innerHTML = days[i];
			li.style =
			'color: gray;' +
			'display:inline-block;' +
			'width:9%;' +
			'height:5%;' +
		  'margin-top:10px;' +
		  'margin-left:5%;' +
		  'font-size: 21px;';
		  calendar.appendChild(li);
		}

		var calendarTable = document.createElement('div');
		calendar.appendChild(calendarTable);
			const showList = (name) => {
							for(var i = 0; i < div.children.length; i++) {
								let child = div.children[i];
								if(child.id){
									child.parentNode.removeChild(child);
								}
							}
							name = '&#x2637; ' + name;
							readData(name,function(response,callback){
	        			let notes = callback;
	        			if(notes === '{}'){
									let listWidget = new ListWidget("CalendarWidget",false,name ,'300','432','none','1px solid #000','-10%','53.5%', true);
	  							listWidget.create();
	  						}else{
	  							notes = JSON.parse(notes);
	  							
	  							let listWidget = new ListWidget("CalendarWidget",false,name ,'300','432','none','1px solid #000','-10%','53.5%', true);
	  							listWidget.create();
	  						}
	  					})
						}


						const button = (type) => {
						for(var i = 0; i < dates.length; i++){
						let ele = dates[i];
						ele.addEventListener('click', function(e) {
							console.log(dates[i])
							if(type){
								if(!isNaN(e.target.innerHTML)){
									let title = e.target.innerHTML + ' ' + months[currMonth] + ' ' + currYear;
									showList(title);
								}
  						}else{
  							currMonth = ele.id === "prev" ? currMonth - 1 : currMonth + 1;
						    if(currMonth < 0 || currMonth > 11) {
						        date = new Date(currYear, currMonth, new Date().getDate());
						        currYear = date.getFullYear();
						        currMonth = date.getMonth();
						    } else {
						        date = new Date();
						    }
						    renderCalendar();

  						}
						})

						ele.addEventListener("mouseover", function() {
							if(!ele.classList.contains('toDay')){
								ele.style.backgroundColor = 'rgba(0,0,0,0.5)';
							}
						});
						ele.addEventListener("mouseout", function() {
							if(!ele.classList.contains('toDay')){
						    ele.style.backgroundColor = 'rgba(0,0,0,0)';
						  }
						});
					}
				}
			const renderCalendar = () => {
				calendarTable.innerHTML = '';
			    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
			    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
			    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
			    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
			    
			    var style = 
					'display:inline-block;' +
					'border-radius:50%;' + 
					'margin-top:3%;' +
					'margin-left:4%;' +
					'width:40px;' +
					'height:40px;' +
					'text-align:center;' +
					'font-size: 21px;';
			    for (let i = firstDayofMonth; i > 1; i--) { 
			    		var li = document.createElement('li');
			    		let day = lastDateofLastMonth - i + 1;
			    		li.id = day;
			    		li.innerHTML = '<h1 style="position:relative;margin-top:10px;font-size:20px;">' + day + '</h1>';
							li.style = style + 'color: gray;';
							dates.push(li);
						  calendarTable.appendChild(li);
			    }

			    for (let i = 1; i <= lastDateofMonth; i++) {
			        var li = document.createElement('li');
			        li.id = i;
			    		li.innerHTML = '<h1 style="position:relative;margin-top:10px;font-size:20px;">' + i + '</h1>';
							li.style = style + 'color: #333;';
							dates.push(li);
						  calendarTable.appendChild(li);
						  if(i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()){
						  	li.style = style + 'background-color:#9B59B6;color:white;';
						  	let name = i + ' ' + months[currMonth] + ' ' + currYear;
						  	li.classList.add('toDay');
						  	showList(name);
						  }
			    }

			    for (let i = lastDayofMonth; i < 7; i++) {
			    		var li = document.createElement('li');
			    		let day = i - lastDayofMonth + 1;
			    		li.id = day;
			    		li.innerHTML = '<h1 style="position:relative;margin-top:10px;font-size:20px;">' + day + '</h1>';;
							li.style = style + 'color: gray;';
							dates.push(li);
						  calendarTable.appendChild(li);
			    }
			    h1.innerHTML = months[currMonth] + ' ' + currYear;
			    button(true)    	
			}
			button(false)
			renderCalendar();
		document.getElementById(container).appendChild(div)
  	console.log("Bonjour, je m'appelle " + container + "!");
  }
}