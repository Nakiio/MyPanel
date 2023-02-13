
window.onload = function() {
  //--------CSS Variables--------
  var root = document.querySelector(':root');
  let y = 5400 - window.innerHeight;
  let size = 5400 - y;
  let yBar = window.innerHeight - 300;
  let yScroll = window.innerHeight - 200;
  let canvasSize = window.innerHeight - 350;
  root.style.setProperty("--topMiddle", size);
  root.style.setProperty("--heightMiddle", y);
  root.style.setProperty("--sizeCanvasX", window.innerWidth - window.innerWidth * 20 /100);
  root.style.setProperty("--sizeX", window.innerWidth);
  root.style.setProperty("--yBar", yBar);
  root.style.setProperty("--canvasSize", canvasSize)
  root.style.setProperty("--yScroll", yScroll);
  console.log(canvasSize,window.innerWidth - window.innerWidth * 30 /100);


  //--------Utilisateur--------
  document.getElementById("username").innerHTML = "Name : Nakiio";
  document.getElementById("userrole").innerHTML = "Role : Admin";


  //--------Date--------
  const today = new Date();
  let day = today.getDate();
  const month = today.getMonth(); // Janvier est le mois 0
  const year = today.getFullYear();

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  if (day > 7) {
    day = day % 7 - 1;

  }
  document.getElementById("jour").innerHTML = "Jour : " + dayName[day];
  document.getElementById("Sutilise").innerHTML = "Année : " + year;
  document.getElementById("Srestant").innerHTML = "Mois : " + monthNames[month];


  //--------Meteo--------
  getElementOtherSite("https://www.meteo-lyon.net/", "home-carousel-item", function(newDiv) {
    let childList = [];
    for (var i = 0; i < newDiv.children[0].children.length; i++) {
      var child = newDiv.children[0].children[i].children[2].innerText;
        childList.push(child);
    }
    let t = 0;
    let o = 0;
    for(var i =0; i < childList.length; i++){
      t = t + parseInt(childList[i]);
      o = o + 1;
    }
    document.getElementById("temperature").innerHTML = "Température : " + t / o + "C°";     
    document.getElementById("day-legend").innerHTML = "Prévision : " + newDiv.children[1].children[0].innerHTML;
  });

  function getElementOtherSite(url, className, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    
    request.onload = function() {
      var sourceDoc = new DOMParser().parseFromString(request.response, 'text/html');
      var sourceDiv = sourceDoc.getElementsByClassName(className);
      if (sourceDiv.length > 0) {
        callback(sourceDiv[0]);
      } else {
        callback("Aucun élément trouvé avec la classe '" + className + "'");
      }
    };  
  }
          document.getElementById('legend').style.background = '#4410DB';
        var total = 50;
        var restant1 = 50;
        navigator.getBattery().then(function(battery) {
          restant1 = 100 - battery.level * 100;
          restant2 = restant1 * 350 / 100;
          total = battery.level * 100;
          document.getElementById("Butilise").innerHTML = "Batterie Utilise : " + restant1 + "%";
          document.getElementById("Brestant").innerHTML = "Batterie Restant : " +  total + "%";
          root.style.setProperty('--Butilise',restant2);
      });
};

function loadProjects(){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://localhost/js/gradient.js"; 
  document.getElementsByTagName("head")[0].appendChild(script);

  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.src = "http://localhost/js/script.js"; 
  document.getElementsByTagName("head")[0].appendChild(script2);
  return false;
}            
