let middle = document.getElementById("middle");
let draggableChildren = [];
dragActiv = false;
var clickWidget = false;

let activerDrag = () => {
  dragActiv = true;
  let children = middle.querySelectorAll(".child");

  for (let child of children) {
    if (!child.classList.contains("dragged")) {
      child.classList.add("dragged");
      child.classList.add("draggable");

      child.addEventListener("mousedown", (e) => {
        if (dragActiv) {
          child.style.cursor = "grabbing";
          let decalageX = e.clientX - child.offsetLeft;
          let decalageY = e.clientY - child.offsetTop;

          let bougerChild = (e) => {
            child.style.left = e.clientX - decalageX + "px";
            child.style.top = e.clientY - decalageY + "px";
          };

          let arreterBougerChild = () => {
            document.removeEventListener("mousemove", bougerChild);
          };

          document.addEventListener("mousemove", bougerChild);
          document.addEventListener("mouseup", arreterBougerChild);
        }
      });

      draggableChildren.push(child);
    }

    child.addEventListener("mouseup", (e) => {
      if (dragActiv) { 
        child.style.cursor = "grab"; 
      }
    });
  }
};



let sauvegarderContenu = () => {
  for (let child of draggableChildren) {
    dragActiv = false;
    child.classList.remove("dragged");
  }
  console.log(middle.innerHTML);
  $.ajax({
    method: "POST",
    url: "edit_conf.php",
    data: { data: middle.innerHTML }
  })
  .done(function( response ) {
    alert("La configuration a été mis a jour !");
  });
};


if(middle){
    middle.addEventListener("click", function(e){
      var previousMenu = document.getElementById("contextMenu");
      if (previousMenu) {
        previousMenu.parentNode.removeChild(previousMenu);
      }
      var previousMenu = document.getElementById("contextModifMenu");
      if (previousMenu) {
        previousMenu.parentNode.removeChild(previousMenu);
      }
    });
    middle.addEventListener("contextmenu", contextMenu);
}

function contextMenu(e) {
  if(clickWidget === false){
    e.preventDefault();
    var previousMenu = document.getElementById("contextMenu");
    if (previousMenu) {
      previousMenu.parentNode.removeChild(previousMenu);
    }
    var menu = document.createElement("div");
    menu.id = "contextMenu";
    menu.style.position = "absolute";
    menu.style.left = e.clientX + 5 + "px";
    menu.style.top = e.clientY - 500 + "px";
    menu.style.width = "160px";
    menu.style.background = "#0D0D0D";
    menu.style.borderRadius = "10px";
    menu.style.border = "1px solid #000"
    menu.innerHTML ='<input type="button" value="Nouveau widget" class="optionButton" onclick="openWidgetMenu()"></input>'+
                    '<input type="button" value="Changer l\'arrère plan" class="optionButton" onclick=""></input>'+
                    '<input type="button" value="Deplacer Les widgets" class="optionButton" onclick="activerDrag()"></input>' +
                    '<input type="button" value="Sauvegarder les modifications" class="optionButton" onclick="sauvegarderContenu()"></input>';

    let innerElements = menu.getElementsByTagName('*');
    var height = innerElements.length * 30 + 5;
    menu.style.height = height + "px";
    document.getElementById('middle').appendChild(menu);    
  }
  clickWidget = false;
}

function openWidgetMenu() {
	document.getElementById('backRGBA').style.display = "block";
  document.getElementById('widgetMenuBody').innerHTML ="";
  let timeWidget = new TimeWidget("widgetMenuBody",false);
  timeWidget.create();
  let meteoWidget = new MeteoWidget("widgetMenuBody",false);
  meteoWidget.create();
  let batteryWidget = new BatteryWidget("widgetMenuBody",false);
  batteryWidget.create();
  let imageWidget = new ImageWidget("widgetMenuBody",false);
  imageWidget.create();
  let separationHorizWidget = new SeparationHorizWidget("widgetMenuBody",false);
  separationHorizWidget.create();
  let separationVertiWidget = new SeparationVertiWidget("widgetMenuBody",false);
  separationVertiWidget.create();
  let songWidget = new SongWidget("widgetMenuBody",false);
  songWidget.create();
  let projcetWidget = new ProjcetWidget("widgetMenuBody",false);
  projcetWidget.create();
  let calculatorWidget = new CalculatorWidget("widgetMenuBody",false);
  calculatorWidget.create();
  let favoriteSiteswidget = new FavoriteSiteswidget("widgetMenuBody",false);
  favoriteSiteswidget.create();
	const widgets = document.querySelectorAll('.widget');
	const container = document.querySelector('#widgetMenuBody');
	widgets.forEach(widget => {
    widget.addEventListener('click',function(e) {
      if(document.getElementById('backRGBA').style.display === "block"){
        if(confirm('Voulez vous ajouter ce Widget a votre Bureau ?')){
          createWidget(widget, "middle",false);
        }
      }
    })
	});
  document.body.style.overflow = 'hidden';
}

function closeWidgetMenu() {
	  document.getElementById('backRGBA').style.display = "none";
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
}

function contextModifMenu(e) {
  clickWidget = true;
  e.preventDefault();
  var previousMenu = document.getElementById("contextModifMenu");
  if (previousMenu) {
    previousMenu.parentNode.removeChild(previousMenu);
  }
  var menu = document.createElement("div");
  menu.id = "contextModifMenu";
  menu.style.position = "absolute";
  menu.style.left = e.clientX + 5 + "px";
  menu.style.top = e.clientY - 300+ "px";
  menu.style.width = "160px";
  menu.style.background = "#0D0D0D";
  menu.style.borderRadius = "10px";
  menu.style.border = "1px solid #000"
  menu.innerHTML ='<input type="button" value="Nouveau widget" class="optionButton" onclick="openWidgetMenu()"></input>'+
                  '<input type="button" value="Changer la couleur" class="optionButton" onclick="widgetColorChange(this)"></input>'+
                  '<input type="button" value="Deplacer Les widgets" class="optionButton" onclick="activerDrag()"></input>' +
                  '<input type="button" value="Sauvegarder les modifications" class="optionButton" onclick="sauvegarderContenu()"></input>';
  console.log()
  let innerElements = menu.getElementsByTagName('*');
  var height = innerElements.length * 30 + 5;
  menu.style.height = height + "px";
  e.target.appendChild(menu);


        
}

function widgetColorChange(div) {
  div = div.closest(".widget");
  console.log(div.classList,div.id );
  var input = document.createElement('input');
  input.type = "color";
  input.addEventListener("input", function() {
    div.style.backgroundColor = input.value;
  });
  input.addEventListener("blur", function() {
    input.parentNode.removeChild(input);
    div.style.backgroundColor = input.value;
  });
  div.appendChild(input);

}
createWidgetWithHTML()

function createWidgetWithHTML() {
  const middle = document.getElementById("middle");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "conf.txt", true);
  xhr.responseType = "text";
  xhr.onload = function() {
    if (xhr.status === 200) {
      var m = document.createElement('div');
      m.style.display = "none";
      document.body.appendChild(m)
      m.innerHTML = xhr.responseText;
      for (let i = 0; i < m.children.length; i++) {
        const child = m.children[i];
        let attributs = {
          id:child.id,
          width:child.style.width,
          height:child.style.height,
          backgroundColor:child.style.backgroundColor,
          border:child.style.border,
          top:child.style.top,
          left:child.style.left,
          child:child
        }
        createWidget(attributs,'middle',true)
      }
    } else {
      middle.innerHTML = "Une erreur s'est produite lors de la récupération du fichier.";
    }
  };
  xhr.send();
}
function createWidget(attributs,container, useAttributs){
  let name = attributs['id'];
  if(name === "BatteryWidget"){
    let batteryWidget = new BatteryWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    batteryWidget.create();
  }else if(name === "MeteoWidget"){
    let meteoWidget = new MeteoWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    meteoWidget.create();
  }else if(name === "TimeWidget"){
    let timeWidget = new TimeWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    timeWidget.create();
  }else if(name === "ImageWidget"){
    let imageWidget = new ImageWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],attributs['child'],useAttributs);
    imageWidget.create();
  }else if(name === "SeparationHorizWidget"){
    let separationHorizWidget = new SeparationHorizWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    separationHorizWidget.create();
  }else if(name === "SeparationVertiWidget"){
    let separationVertiWidget = new SeparationVertiWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    separationVertiWidget.create();
  }else if(name === "SongWidget"){
    let songWidget = new SongWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    songWidget.create();
  }else if(name === "ProjcetWidget"){
    let projcetWidget = new ProjcetWidget(container,true,attributs['width'],attributs['height'],
      attributs['border'],attributs['top'],attributs['left'],useAttributs);
    projcetWidget.create();
  }else if(name === "FavoriteSiteswidget"){
    let favoriteSiteswidget = new FavoriteSiteswidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    favoriteSiteswidget.create();
  }else if(name === "CalculatorWidget"){
    let calculatorWidget = new CalculatorWidget(container,true,attributs['width'],attributs['height'],
      attributs['border'],attributs['top'],attributs['left'],useAttributs);
    calculatorWidget.create();
  }

  const widgets = document.querySelectorAll('.widget');
  widgets.forEach(widget => {
    widget.addEventListener('contextmenu',contextModifMenu)
  });
}