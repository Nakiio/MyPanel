let middle = document.getElementById("middle");
let draggableChildren = [];
dragActiv = false;
refresh()



let activerDrag = () => {
  dragActiv = true;   
  message(function(callback,message,number){},['Vous pouvez deplacer vos Widgets'],0)
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
  saveData('middleContente', middle.innerHTML, false)
  message(function(callback,message,number){},['La configuration a été mis a jour !'],0)
};


document.querySelectorAll('.nav').forEach(button => {
    button.addEventListener('click',function(e){
        if(e.target.id === 'mouve'){
          activerDrag();
        }else if(e.target.id === 'save'){
          sauvegarderContenu();
        }else if(e.target.id === 'widgets'){
          openWidgetMenu();
        }else if(e.target.id === 'settings'){
          settingsMenu();
        }else if(e.target.id === 'infos'){
          infos();
        }
        console.log(e.target.id)
    })
  });

function settingsMenu(){
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

  var settingsMenu = document.createElement('div');
  settingsMenu.style = 
  'background-color:' + theme +';' +
  'width:300px;' +
  'height:180px;' +
  'top:50%;' +
  'left:50%;' +
  'border:1px solid #000;' +
  'border-radius:10px;' +
  'position:absolute;' +
  'transform:translate(-50%,-50%);';
  background.appendChild(settingsMenu);

  var h1 = document.createElement('h1');
  h1.innerHTML = 'Menu Option';
  h1.style = 
  'font-size:20px;' +
  'margin-top:10px;' +
  'color:gray;' +
  'margin-left:10%;';
  settingsMenu.appendChild(h1);

  var line = document.createElement('div');
  line.style = 
  'height:2px;' +
  'width:70%;' +
  'margin-top:-7px;' +
  'margin-left:10%;' +
  'background-color:gray;';
  settingsMenu.appendChild(line);

  var p = document.createElement('p');
  p.innerHTML = 'Choisissez la <b>Couleur</b> de votre <b>thème</b>, recharger la page après cela.';
  p.style = 
  'text-align:center;' +
  'color:gray;' +
  'font-size:15px;';
  settingsMenu.appendChild(p);

  var input = document.createElement('input');
  input.type = 'color';
  input.style =
  'margin-top:-5px;' +
  'margin-left:40%;';
  settingsMenu.appendChild(input);

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
  settingsMenu.appendChild(cancel);
  cancel.addEventListener('click', function(e) {
    var previousMessage = document.getElementById('message');
    previousMessage.parentNode.removeChild(previousMessage);
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
  settingsMenu.appendChild(confirm);
  confirm.addEventListener('click', function(e) {
    var previousMessage = document.getElementById('message');
    previousMessage.parentNode.removeChild(previousMessage);
    theme = input.value;
    saveData('themeColor',input.value,false);
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

function openWidgetMenu() {
  actions = false;
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
  let listWidget = new ListWidget("widgetMenuBody",false,'&#x2637; exemple');
  listWidget.create();
  let deezerWidget = new DeezerWidget("widgetMenuBody",false);
  deezerWidget.create();
  let calendarWidget = new CalendarWidget("widgetMenuBody",false);
  calendarWidget.create();
	const widgets = document.querySelectorAll('.widgetCover');
	const container = document.querySelector('#widgetMenuBody');
	widgets.forEach(widget => {
    widget.addEventListener('click',function(e) {
      if(document.getElementById('backRGBA').style.display === "block"){
        if(widget.id.split('_')[0] === 'ListWidget'){
          message(function(callback,message,number){
              widget.id = 'ListWidget_' + callback[0];
              createWidget(widget, "middle",false);
          },['Titre de la list a créer !'],1)
        }else{
          message(function(callback,message,number){
            if(callback === true){
              createWidget(widget, "middle",false);
            }
          },['Voulez vous ajouter ce Widget a votre bureau ?'],0)
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

function createWidgetWithHTML() {
  const middle = document.getElementById("middle");
  readData('middleContente', function(response, callback) {
      var m = document.createElement('div');
      m.style.display = "none";
      document.body.appendChild(m)
      m.innerHTML = JSON.parse(callback)[0];
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
  });
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
  }else if(name.split('_')[0] === "ListWidget"){
    let listWidget = new ListWidget(container,true,name.split('_')[1],attributs['width'],attributs['height'],attributs['backgroundColor'],
      attributs['border'],attributs['top'],attributs['left'],useAttributs);
    listWidget.create();
  }else if(name === "DezzerWidget"){
    let dezzerWidget = new DezzerWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    dezzerWidget.create();
  }else if(name === "CalendarWidget"){
    let calendarWidget = new CalendarWidget(container,true,attributs['width'],attributs['height'],attributs['backgroundColor']
      ,attributs['border'],attributs['top'],attributs['left'],useAttributs);
    calendarWidget.create();
  }

  document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('mouseover', function(e) {
        let trash = document.getElementById('trash');
        if(trash){
          trash.parentNode.removeChild(trash);
        }
        var button = document.createElement('div');
        button.id = 'trash';
        button.innerHTML = '<i class="fa fa-trash-o" style="margin:3px;font-size:29px;color:white"></i> <p style="position:absolute;top:-5px;left:25%;color:white;">Supprimer</p>';
        button.style = 
        'position:absolute;' + 
        'width:120px;' + 
        'height:35px;' + 
        'top:5%;' + 
        'left:5%;' +
        'border:1px solid #000;' + 
        'border-radius:10px;' +
        'background-color:rgba(100, 100, 100,0.5);' + 
        'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);';
        widget.appendChild(button);
        button.addEventListener('mousedown', function(e) {
          message(function(callback,message,number){
            if(callback === true){
              widget.parentNode.removeChild(widget);
              saveData('middleContente', middle.innerHTML, false)
              createNotification("Widget supprimé ✌️ !");
            }
          },['Voulez vous supprimer ce widget ? '],0)
        });
    })
  })
}

const emojis = {
    'smiley':[
      "😀",  "😃",  "😄",  "😁",  "😆",  "😅",  "🤣",  "😂",  "🙂",  "🙃",  "😉",  "😊",  "😇",  "🥰",  "😍",  "🤩",  "😘",  "😗",
      "😚",  "😙",  "😋",  "😛",  "😜",  "🤪",  "😝",  "🤑",  "🤗",  "🤭",  "🤫",  "🤔",  "🤐",  "🤨",  "😐",  "😑",  "😶", 
      "😏",  "😒",  "🙄",  "😬",  "🤥",  "😌",  "😔",  "😪",  "🤤",  "😴",  "😷",  "🤒",  "🤕",  "🤢",  "🤮",  "🥵",  "🥶",  "🥴",  
      "😵",  "🤯",  "🤠",  "🥳",  "😎",  "🤓",  "🧐",  "😕",  "😟",  "🙁",  "☹️",  "😮",  "😯",  "😲",  "😳",  "🥺",  "😦",  "😧",  
      "😨",  "😰",  "😥",  "😢",  "😭",  "😱",  "😖",  "😣",  "😞",  "😓",  "😩",  "😫",  "🥱",  "😤",  "😡",  "😠",  "🤬",  "😈",  
      "👿",  "💀",  "☠️",  "💩",  "🤡",  "👹",  "👺",  "👻",  "👽",  "👾",  "🤖",  "🎃",  "😺",  "😸",  "😹",  "😻",  "😼",  "😽",  
      "🙀",  "😿",  "😾",  "👋",  "🤚",  "🖐️",  "✋",  "🖖",  "👌",  "🤏",  "✌️",  "🤞",  "🤟",  "🤘",  "🤙",  "👈",  "👉",  "👆",  
      "🖕",  "👇",  "☝️",  "👍",  "👎",  "✊",  "👊"],
    'nature':[
      "🐵",  "🐒",  "🦍",  "🦧",  "🐶",  "🐕",  "🦮",  "🐕‍🦺",  "🐩",  "🐺",  "🦊",  "🦝",  "🐱",  "🐈",  "🐈‍⬛",  "🦁",  "🐯",  "🐅",
      "🐆",  "🐴",  "🐎",  "🦄",  "🦓",  "🦌",  "🦬",  "🐮",  "🐂",  "🐃",  "🐄",  "🐷",  "🐖",  "🐗",  "🐽",  "🐏",  "🐑",  "🐐",  
      "🦙",  "🦌",  "🐪",  "🐫",  "🦒",  "🦏",  "🦛",  "🐘",  "🦣",  "🦥",  "🦦",  "🦨",  "🦘",  "🦡",  "🐁",  "🐀",  "🐿️",  "🦔",  
      "🐇",  "🐰",  "🐹",  "🐻",  "🐨",  "🐼",  "🦥",  "🦦",  "🦧",  "🦨",  "🦫",  "🦮",  "🦯",  "🐾",  "🦩",  "🐦",  "🐧",  "🕊️",  
      "🦅",  "🦆",  "🦢",  "🦉",  "🦤",  "🪶",  "🦩",  "🦜",  "🐸",  "🐊",  "🐢",  "🦎",  "🐍",  "🐲",  "🐉",  "🦕",  "🦖",  "🐳",  
      "🐋",  "🐬",  "🦭",  "🐟",  "🐠",  "🐡",  "🦈",  "🐙",  "🦑",  "🦐",  "🦞",  "🦀",  "🐚",  "🐌",  "🦋",  "🐛",  "🐜",  "🐝",  
      "🪲",  "🐞","🦗","🌵", "🎋", "🌲", "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🎍", "🍃", "🍂", "🍁", "🍄", "🌾", "💐", "🌷", "🌹", 
      "🥀", "🌺", "🌸", "🌼", "🌻", "🏵️", "🌞", "🌝", "🌛", "🌜", "🌙", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "⛈️", "🌩️", "🌨️", 
      "❄️",  "☃️", "⛄", "🌬️", "💨", "🌪️", "🌫️", "🌊", "💦", "💧"],
    'food':[
      "🍇",  "🍈",  "🍉",  "🍊",  "🍋",  "🍌",  "🍍",  "🥭",  "🍎",  "🍏",  "🍐",  "🍑",  "🍒",  "🍓",  "🫐",  "🥝",  "🍅",  "🫒",  
      "🥥",  "🥑",  "🍆",  "🥔",  "🥕",  "🌽",  "🌶️",  "🫑",  "🥒",  "🥬",  "🥦",  "🧄",  "🧅",  "🍄",  "🥜",  "🌰",  "🍞",  "🥐",  
      "🥖",  "🫓",  "🥨",  "🥯",  "🥞",  "🧇",  "🧀",  "🍖",  "🍗",  "🥩",  "🥓",  "🍔",  "🍟",  "🍕",  "🌭",  "🥪",  "🌮",  "🌯",  
      "🫔",  "🥙",  "🧆",  "🥚",  "🍳",  "🥘",  "🍲",  "🫕",  "🥣",  "🥗",  "🍿",  "🧈",  "🧂",  "🥫",  "🍱",  "🍘",  "🍙",  "🍚",  
      "🍛",  "🍜",  "🍝",  "🍠",  "🍢",  "🍣",  "🍤",  "🍥",  "🥮",  "🍡",  "🥟",  "🥠",  "🥡",  "🦪",  "🍦",  "🍧",  "🍨",  "🍩",  
      "🍪",  "🎂",  "🍰",  "🧁",  "🥧",  "🍫",  "🍬",  "🍭",  "🍮",  "🍯",  "🍼",  "🥛",  "☕",  "🍵",  "🍶",  "🍾",  "🍷",  "🍸",  
      "🍹",  "🍺",  "🍻",  "🥂",  "🥃",  "🥤",  "🧃",  "🧉",  "🧊"],
    'activity':[
      "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "🎳", "🏓", "🏸", "🥅", "🎯", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🎭", "🎨",
      "🧵", "🧶", "🎼", "🎤", "🎧", "🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎬", "🏹", "🛹", "🛼", "🚣‍♀️", "🚣", "🏊‍♀️", "🏊", "🤽‍♀️", "🤽", 
      "🚴‍♀️", "🚴", "🚵‍♀️", "🚵", "🎽", "🥋", "🥊", "🎯", "🎱", "🎮", "🕹️", "🎰", "🎲", "🧩",  "🧸", "🎭", "🎨", "🎖️", "🏆", "🥇", "🥈", 
      "🥉", "🏅", "🎗️", "🎫", "🎟️", "🎪", "🤹‍♀️", "🤹", "🎭", "🎬", "🎤", "🎧",  "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎮", "🕹️", 
      "🎰", "🎲", "🃏", "🀄", "🎴"],
    'travel':[
      "🚗",  "🚕",  "🚙",  "🚌",  "🚎",  "🏎️",  "🚓",  "🚑",  "🚒",  "🚐",  "🛻",  "🚚",  "🚛",  "🚜",  "🛴",  "🚲",
      "🛵",  "🏍️",  "🛺",  "🚍",  "🚘",  "🚖",  "🚡",  "🚠",  "🚟",  "🚀",  "🛸",  "🛩️",  "🛫",  "🛬",  "🛰️",  "🚁",
      "🚤",  "🛥️",  "⛵",  "🛶",  "🚣",  "🚀",  "🛸",  "🛫",  "🛬",  "🛰️",  "🚁",  "🚤",  "🛥️",  "⛵",  "🛶",  "🚣",
      "🗺️",  "🗾",  "🧭",  "🏔️",  "⛰️",  "🌋",  "🗻",  "🏕️",  "🏖️",  "🏜️",  "🏝️",  "🏞️",  "🏟️",  "🏛️",  "🏗️",  "🧱",
      "🏘️",  "🏚️",  "🏠",  "🏡",  "🏢",  "🏣",  "🏤",  "🏥",  "🏦",  "🏨",  "🏩",  "🏪",  "🏫",  "🏬",  "🏭",  "🏯",
      "🏰",  "💒",  "🗼",  "🗽",  "⛪",  "🕌",  "🕍",  "⛩️",  "🕋",  "⛲",  "⛺",  "🌁",  "🌃",  "🏙️",  "🌄",  "🌅",
      "🌆",  "🌇",  "🌉",  "♨️",  "🎠",  "🎡",  "🎢",  "💈",  "🎪",  "🚂",  "🚃",  "🚄",  "🚅",  "🚆",  "🚇",  "🚈",
      "🚉",  "🚊",  "🚝",  "🚞",  "🚋",  "🚌",  "🚍",  "🚎"],
    'objects':[
      "🎒",  "👓",  "🕶️",  "👔",  "👕",  "👖",  "🧣",  "🧤", "🧥",  "🧦",  "👞",  "👟",  "🥾",  "🥿",  "👠",  "👡",
      "🩰",  "👢",  "👑",  "👒",  "🎩",  "🎓",  "🧢",  "⛑️",  "📿",  "💄",  "💍",  "💼",  "📱",  "📲",  "☎️",  "📞",
      "📟",  "📠",  "🔋",  "🔌",  "💻",  "🖥️",  "🖨️",  "⌨️",  "🖱️",  "🖲️",  "💽",  "💾",  "💿",  "📀",  "🧮",  "🎥",
      "🎞️",  "📽️",  "🎬",  "📺",  "📷",  "📸",  "📹",  "📼",  "🕯️",  "💡",  "🔦",  "🏮",  "🪔",  "📔",  "📕",  "📖",
      "📗",  "📘",  "📙",  "📚",  "📓",  "📒",  "📃",  "📜",  "📄",  "📰",  "🗞️",  "📑",  "🔖",  "🏷️",  "💰",  "💴",
      "💵",  "💶",  "💷",  "💸",  "💳",  "🧾",  "💹",  "✉️",  "📧",  "📨",  "📩",  "📤",  "📥",  "📦",  "📫",  "📪",
      "📬",  "📭",  "📮",  "🗳️",  "✏️",  "✒️",  "🖋️",  "🖊️",  "🖌️",  "🔒",  "🔓",  "🔏",  "🔐",  "🔑",  "🗝️",  "🔨",
      "🪓",  "⛏️",  "🔫",  "🏹",  "🛡️",  "🪚",  "🔧",  "🔩",  "🗜️",  "🪛", "🔍",  "🔎"]
}


function emojiGui(parent, input){
    var container = document.createElement('div');
    container.style =
    'position: absolute;' +
    'left:50%;' +
    'width: 395px;' +
    'height: 329px;' +
    'background: ' + theme + ';' +
    'border:1px solid gray;' +
    'z-index:9999;' +
    'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);' +
    'border-radius: 10px;';
    parent.appendChild(container);

    var title = document.createElement('h1');
    title.innerHTML = 'Emojis';
    title.style = 
    'color:rgba(50,50,50,0.8);' +
    'margin-left:5%;' +
    'font-size:23px;';
    container.appendChild(title);

    var leaveButton = document.createElement('input');
    leaveButton.type = 'button';
    leaveButton.value = '🗙';
    leaveButton.style =
    'position:absolute;' +
    'top:3%;' +
    'right:5%;' +
    'width:35px;' +
    'height:37px;' +
    'border-radius:10px;' + 
    'color:rgba(50,50,50,0.8);;' + 
    'border:none;' +
    'font-size:23px;' +
    'background:none;';
    container.appendChild(leaveButton);

    leaveButton.addEventListener('mouseover', function(e) {
        leaveButton.style.backgroundColor = 'rgba(25,25,25,0.6)';
    })
    leaveButton.addEventListener('mouseout', function(e) {
        leaveButton.style.background = 'none';
    })
    leaveButton.addEventListener('mousedown',function(e) {
        container.parentNode.removeChild(container);
    })


    let listNames = ['smiley','nature','food','activity','travel','objects'];
    let listIcons = ['😀','🌲','🍔','⚽️','🛫','🎒'];
    for(var i = 0; i < listNames.length; i++){ 
      var button = document.createElement('input');
      button.type = 'button';
      button.value = listIcons[i];
      button.id = listNames[i];
      button.classList.add('categorieIcon');
      button.style = 
      'width:16.66%;' +
      'height:14%;' +
      'font-size:23px;' +
      'margin-top:0%;' +
      'border-radius:30% 30% 0px 0px;' +
      'background:rgba(50,50,50,0.8);' +
      'border:1px solid #000;' +
      'border-bottom:none;' +
      'display:inline-block;';
      container.appendChild(button);

      button.addEventListener('mouseover',function(e) {e.target.style.fontSize = '24px';})
      button.addEventListener('mouseout',function(e) {e.target.style.fontSize = '23px';})
      button.addEventListener('mousedown',function(e) {
        document.querySelectorAll(".categorieIcon").forEach(function(ele) {
          ele.style.background = 'rgba(50,50,50,0.8)';
        })
        document.getElementById('emojiCategorie').innerHTML = 'Catégorie : ' + e.target.id;
        emojisByCateg(e.target.id, document.getElementById('smileyContainer'), input);
      })

    }

    var secondContainer = document.createElement('div');
    secondContainer.style = 'width:100%;height:67%;';
    container.appendChild(secondContainer);

    var categorie = document.createElement('h2');
    categorie.id = 'emojiCategorie';
    categorie.innerHTML = 'Catégorie : ' + listNames[0];
    categorie.style = 
    'color:rgba(50,50,50,0.8);' +
    'margin-left:5%;' +
    'border-bottom:1px solid rgba(50,50,50,0.8);' +
    'width:50%;' +
    'font-size:17px;';
    secondContainer.appendChild(categorie);

    var smileyContainer = document.createElement('div');
    smileyContainer.id = 'smileyContainer';
    smileyContainer.style = 
    'overflow-x:hidden;' +
    'overflow-y:auto;' +
    'width:100%;' + 
    'height:80%;' +
    'border-radius: 0px 0px 10px 10px;';
    secondContainer.appendChild(smileyContainer);

    emojisByCateg('smiley', smileyContainer, input);
}

function emojisByCateg(categorie, parent, input) {
  parent.innerHTML = '';
  document.getElementById(categorie).style.background = theme;
  for(var o = 0; o < emojis[categorie].length; o++){
    var emoji = document.createElement('p');
    emoji.style =
    'font-size:20px;' +
    'margin-top:5px;' +
    'margin-right:5px;' +
    'margin-left:5px;' +
    'cursor:pointer;' +
    'display:inline-block;';
    emoji.innerHTML = emojis[categorie][o];
    parent.appendChild(emoji)

    emoji.addEventListener('mouseover',function(e) {e.target.style.scale = '1.2';})
    emoji.addEventListener('mouseout',function(e) {e.target.style.scale = '1';})
    emoji.addEventListener('mousedown',function(e) {
      input.value = input.value + e.target.innerHTML;
  })

  }
}



