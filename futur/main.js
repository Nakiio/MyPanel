var root = document.querySelector(':root');
let y = 5400 - window.innerHeight;
let size = 5400 - y;
let yBar = window.innerHeight - 275;
let yScroll = window.innerHeight - 200;
let canvasSize = window.innerHeight - 350;
let width = window.innerWidth;
var actions = true;
var theme = '#0D0D0D';
readData('themeColor',function(response,callback){
  theme = JSON.parse(callback)[0];
  root.style.setProperty("--theme", theme);
  console.log(theme)
})

root.style.setProperty("--topMiddle", size);
root.style.setProperty("--heightMiddle", y);
root.style.setProperty("--sizeCanvasX", window.innerWidth - window.innerWidth * 20 /100);
root.style.setProperty("--sizeX", window.innerWidth);
root.style.setProperty("--yBar", yBar);
root.style.setProperty("--canvasSize", canvasSize)
root.style.setProperty("--yScroll", yScroll);
root.style.setProperty("--width", width);

function saveData(type, data, replace) {
	readData(type,function(response,callback) {
	  const xhr = new XMLHttpRequest();
	  const url = 'http://'+location.hostname+'/php/save-data.php';
	  var list = [];
	  if(replace === true){
	  	let everyProjs = JSON.parse(callback);
	  	for(var i = 0; i < everyProjs.length;i++){
	  		list.push(everyProjs[i])
	  	}
	  }
	  list.push(data);
	  const params = "type=" + encodeURIComponent(type) + "&data=" + encodeURIComponent(JSON.stringify(list));
	  xhr.open("POST", url, true);
	  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	      console.log('xhr.responseText');
	    }
	  };
	  xhr.send(params);
  })
}

function readData(type, callback) {
  const xhr = new XMLHttpRequest();
  const url = 'http://'+location.hostname+"/php/read-data.php?type=" + encodeURIComponent(type);
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = xhr.responseText;
      callback(null,response);
    }
  };
  xhr.send();
}

function updateData(type, objToUpdate, updatedObj) {
    readData(type, function(response, callback) {
        const xhr = new XMLHttpRequest();
        const url = 'http://' + location.hostname + '/php/save-data.php';
        let objArray = JSON.parse(callback);

        objArray = objArray.map((obj) => {
            if (JSON.stringify(obj) === JSON.stringify(objToUpdate)) {
                return updatedObj;
            } else {
                return obj;
            }
        });

        const params = "type=" + encodeURIComponent(type) + "&data=" + encodeURIComponent(JSON.stringify(objArray));
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        xhr.send(params);
    });
}

function deleteData(type, data) {
  readData(type, function(response, callback) {
    const xhr = new XMLHttpRequest();
    const url = 'http://' + location.hostname + '/php/save-data.php';
    let list = JSON.parse(callback);
    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(data)) {
        list.splice(i, 1);
        break;
      }
    }
    const params = "type=" + encodeURIComponent(type) + "&data=" + encodeURIComponent(JSON.stringify(list));
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(params);
  });
}


function message(callback,message,number){
  document.body.style.overflow = 'hidden';

  var background = document.createElement('div');
  background.id = 'message';
  background.style = 
  'display: block;' +
  'top: 0;' +
  'left: 0;' +
  'position: fixed;' +
  'width: 100%;' +
  'height: 100%;' +
  'background-color: rgba(0, 0, 0, 0.7);' +
  'z-index: 9999;'
  document.body.appendChild(background);

  var container = document.createElement('div');
  container.style = 
  'background: #0D0D0D;' + 
  'width: 400px;' +
  'height: auto;' + 
  'min-height:150px;' +
  'min-width:300px;' + 
  'position:absolute;' +
  'position: absolute;' +
  'top: 50%;' +
  'left: 50%;' +
  'transform: translate(-50%, -50%);' +
  'box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);' +
  'border:1px solid #000;' +
  'border-radius:25px;';
  background.appendChild(container);

  if(number === 0){
  	if(Array.isArray(message)){
  		message = message[0];
  	}
  	var h1 = document.createElement('h1');
  	h1.style =
  	'text-align:center;' + 
  	'font-size:20px;' + 
  	'margin-top:10%;' +
  	'color:gray;';
  	h1.innerHTML = message;
  	container.appendChild(h1);
  }else{
  	for(var i = 0; i < number;i++){
  		var h1 = document.createElement('h1');
	  	h1.style =
	  	'margin-left:20%;' + 
	  	'font-size:20;' + 
	  	'margin-top:10%;' +
	  	'color:gray;';
	  	h1.innerHTML = message[i];
	  	container.appendChild(h1);

	  	var input = document.createElement('input');
	  	input.type = 'text';
	  	input.id = message[i];
	  	input.style =
	  	'margin-left:20%;' + 
	  	'font-size:17;' + 
	  	'width:250px;' +
	  	'margin-bottom:5%;' +
	  	'margin-right: 80%;' +
	  	'background-color:#151515;' +
	  	'border:1px solid #000;' +
	  	'border-radius:5px;' +
	  	'box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);' +
	  	'color:gray;';
	  	container.appendChild(input);

        if(message[i] === 'Entrer votre note'){
            var emoji = document.createElement('input');
            emoji.style = 
            'font-size:22px;' +
            'text-align:center;' +
            'border:none;' + 
            'background:none;' +
            'position:absolute;' + 
            'top:38%;' + 
            'left:83%;' +
            'height:35px;' +
            'width:35px;';
            emoji.type = 'button';
            emoji.value = '😀';
            emoji.addEventListener('mouseover',function(e) {e.target.style.scale = '1.2'});
            emoji.addEventListener('mouseout', function(e) {e.target.style.scale = '1'});
            emoji.addEventListener('mousedown', function(e) {emojiGui(background, input)});
            container.appendChild(emoji);
        }

  	}
  }

  var cancel = document.createElement('input');
  cancel.type = 'button';
  cancel.value = 'annuler';
  cancel.classList.add('messageButton');
  cancel.style =
  'width:30%;' +
  'height:30px;' +
  'margin-left:18%;' +
  'margin-top:5%;' +
  'font-size:17px;' +
  'border-radius:5px;' +
  'border:1px solid #000;' +
  'box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);' +
  'background-color:gray;';
  container.appendChild(cancel);
  cancel.addEventListener('click', function(e) {
  	var previousMessage = document.getElementById('message');
    if (previousMessage) {
      previousMessage.parentNode.removeChild(previousMessage);
      document.body.style.overflowY = 'auto';
    }
      return 'cancel';
  })

  var confirm = document.createElement('input');
  confirm.type = 'button';
  confirm.value = 'confirm';
  confirm.classList.add('messageButton');
  confirm.style =
  'width:30%;' +
  'height:30px;' +
  'margin-left:5%;' +
  'margin-top:5%;' +
  'margin-bottom:5%;' +
  'font-size:17px;' +
  'border-radius:5px;' +
  'border:1px solid #000;' +
  'box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);' +
  'background-color:gray;';
  container.appendChild(confirm);
  confirm.addEventListener('click', function(e) {
  	let list = [];
  	for(var i = 0; i < number;i++){
  		let result = document.getElementById(message[i]).value;
  		if(result === ''){
  			document.getElementById(message[i]).placeholder = message[i];
  		}else{
  			list.push(result);
  		}
  		
  	}
  	if(list.length === number){
  		var previousMessage = document.getElementById('message');
	    if (previousMessage) { 
	      previousMessage.parentNode.removeChild(previousMessage);
	    }
	    if(number === 0){
	    	callback(true,null,null);
	    }else{
  			callback(list,null,null);
  		}
  	}
    document.body.style.overflowY = 'auto';
  })

  document.querySelectorAll('.messageButton').forEach(function (element) {
  	element.addEventListener("mouseover", function() {
        element.style.backgroundColor = "#2C2A2A";
    });
    element.addEventListener("mouseout", function() {
        element.style.backgroundColor = "gray";
    });
  });
}


function createNotification(text) {
  const notification = document.createElement('div');
  notification.style =
    'position: fixed;' +
    'top: -100px;' +
    'left: calc(50% - 30% / 2);' +
    'background-color: ' + theme +';' +
    'color:gray;' +
    'border: 1px solid #000;' +
    'padding: 10px;' +
    'border-radius: 10px;' +
    'width: 30%;' +
    'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);' +
    'z-index: 9999;' +
    'transition: top 0.5s ease-out, opacity 0.5s ease-out;;';
  
  const notif = document.createElement('h1');
  notif.style =
  'text-align:center;' +
  'margin-top:5px;' +
  'font-size:21px;';
  notif.textContent = 'Notification';
  notification.appendChild(notif);

  const title = document.createElement('h1');
  title.style =
  'margin-top:7px;' +
  'font-size:19px;';
  title.textContent = text;
  notification.appendChild(title);
  document.body.appendChild(notification);

  let opacity = 1;

  setTimeout(() => {
    notification.style.top = '20px';
  }, 100);

  const fadeOutInterval = setInterval(() => {
    setTimeout(() => {
        opacity -= 0.1;
        notification.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(fadeOutInterval);
          notification.remove();
        }
    }, 100);
  }, 1000);

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function refresh() {
    document.getElementById("middle").innerHTML = '';
    createWidgetWithHTML()
  
};


setInterval(() => {
    setTimeout(() => {
        const notifs = ["Vous pouvez changer la couleur de votre thème en cliquant sur le bouton \"theme\" !",
                        "Vous pouvez deplacer vos widgets en cliquant sur le bouton \"Déplacer\" !",
                        "Si vous cliquer sur le bouton \"Widgets\", vous verrez les widges que vous pouver mettre dans votre Panel 💻!",
                        "Pensez a sauvegarder 💾 vos modifications en appuyant sur le bouton \"Sauvegarder\" !",
                        "Cliquez sur le bouton \"Info\" pour lire la documentation 🕮 !"]
        createNotification(notifs[getRandomInt(notifs.length)]);
        console.log('notif !')
    }, 100);
}, 300000);


function infos() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    var background = document.createElement('div');
    background.style = 
    'display: block;' +
    'top: 0;' +
    'left: 0;' +
    'position: fixed;' +
    'width: 100%;' +
    'height: 100%;' +
    'background-color: rgba(0, 0, 0, 0.7);' +
    'z-index: 9999;'
    document.body.appendChild(background);

    var searchCercle = document.createElement('div');
    searchCercle.style = 
    'border:3px solid #fff;' + 
    'width:35%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:10px;' +
    'left:50%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(searchCercle);

    var searchTitle = document.createElement('h1');
    searchTitle.innerHTML = 'Dans cette barre vous pouvez </br> faire des recherches internet !';
    searchTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:58%;' +
    'top:20px;' +
    'transform:translateX(+75%);' +
    'color:white;';
    background.appendChild(searchTitle);

    var connexionCercle = document.createElement('div');
    connexionCercle.style = 
    'border:3px solid #fff;' + 
    'width:14%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:87%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(connexionCercle);

    var connexionTitle = document.createElement('h1');
    connexionTitle.innerHTML = 'En cliquant sur ce bouton </br> vous serez deconnecter de MyPanel !';
    connexionTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:85%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(connexionTitle);

    var themeCercle = document.createElement('div');
    themeCercle.style = 
    'border:3px solid #fff;' + 
    'width:7%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:75%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(themeCercle);

    var themeTitle = document.createElement('h1');
    themeTitle.innerHTML = 'En cliquant sur </br> ce bouton vous </br> pourez changer </br> de couleur le theme !';
    themeTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:73%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(themeTitle);

    var saveCercle = document.createElement('div');
    saveCercle.style = 
    'border:3px solid #fff;' + 
    'width:12%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:64.5%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(saveCercle);

    var saveTitle = document.createElement('h1');
    saveTitle.innerHTML = 'En cliquant sur ce </br>bouton vous </br> pourez le changement </br> de votre bureau !';
    saveTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:60%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(saveTitle);

    var mouveCercle = document.createElement('div');
    mouveCercle.style = 
    'border:3px solid #fff;' + 
    'width:12%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:38%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(mouveCercle);

    var mouveTitle = document.createElement('h1');
    mouveTitle.innerHTML = 'En cliquant sur ce bouton </br> vous  pourez deplacer vos </br> Widgets !';
    mouveTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:33%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(mouveTitle);

    var widgetsCercle = document.createElement('div');
    widgetsCercle.style = 
    'border:3px solid #fff;' + 
    'width:10%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:26%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(widgetsCercle);

    var widgetsTitle = document.createElement('h1');
    widgetsTitle.innerHTML = 'Cliquer sur ce bouton </br> vous affichera le </br> menu des Widgets !';
    widgetsTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:21%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(widgetsTitle);

    var infosCercle = document.createElement('div');
    infosCercle.style = 
    'border:3px solid #fff;' + 
    'width:8%;' + 
    'height:70px;' +
    'position:absolute;' + 
    'top:88%;' +
    'left:15%;' +
    'transform:translateX(-50%);' +
    'border-radius:30px;';
    background.appendChild(infosCercle);

    var infosTitle = document.createElement('h1');
    infosTitle.innerHTML = 'Cliquer sur ce </br> bouton pour  </br> afficher le tuto !';
    infosTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:10%;' +
    'top:75%;' +
    'color:white;';
    background.appendChild(infosTitle);

    var infosCercle = document.createElement('div');
    infosCercle.style = 
    'border:3px solid #fff;' + 
    'width:80%;' + 
    'height:60%;' +
    'position:absolute;' + 
    'top:10%;' +
    'left:10%;' +
    'border-radius:30px;';
    background.appendChild(infosCercle);

    var Title = document.createElement('h1');
    Title.innerHTML = 'Votre Bureau !';
    Title.style =
    'font-size:28px;' +
    'position:absolute;' +
    'left:45%;' +
    'top:25%;' +
    'color:white;';
    background.appendChild(Title);

    var desktopTitle = document.createElement('h1');
    desktopTitle.innerHTML = 'Vous pouvez créer, éditer, ouvrir, supprimer </br> vos fichier en faisant clique droit sur votre bureau.';
    desktopTitle.style =
    'font-size:20px;' +
    'position:absolute;' +
    'left:40%;' +
    'top:35%;' +
    'color:white;';
    background.appendChild(desktopTitle);

    var leaveButton = document.createElement('input');
    leaveButton.type = 'button';
    leaveButton.value = '🗙';
    leaveButton.style =
    'margin:20px;' +
    'width:35px;' +
    'height:37px;' +
    'border-radius:10px;' + 
    'color:white;' + 
    'border:none;' +
    'font-size:23px;' +
    'background:none;';

    leaveButton.addEventListener('mouseover', function(e) {
        leaveButton.style.backgroundColor = 'rgba(25,25,25,0.6)';
    })
    leaveButton.addEventListener('mouseout', function(e) {
        leaveButton.style.background = 'none';
    })
    leaveButton.addEventListener('mousedown',function(e) {
        background.parentNode.removeChild(background);
        document.body.style.overflowY = 'auto';
    })
    background.appendChild(leaveButton);
}