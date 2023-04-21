createNotification("Bon retoure parmie Nous ✌️ !");
var openingFile = false;
var canvas = document.getElementById("canvas");
var div = document.getElementById('selectRect'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;

if (div) {
    div.hidden = 1;
}
readData('backgroundImage',function(response,callback) {
    var img = document.getElementById('backgroundImage');
    img.src = JSON.parse(callback);
})

if(canvas){
    canvas.addEventListener("mousedown", function(e){
      var previousMenu = document.getElementById("contextMenu");
      if (previousMenu) {
        previousMenu.parentNode.removeChild(previousMenu);
      }
      if (e.button === 0) {
        div.hidden = 0;
        x1 = e.clientX;
        y1 = e.clientY;
        reCalc();
      }
    });

    canvas.addEventListener("mousemove", e => {
        x2 = e.clientX;
        y2 = e.clientY;
        reCalc();
    });
    canvas.addEventListener("mouseup", () => (div.hidden = 1));
    canvas.addEventListener("contextmenu", contextMenu);
}

function contextMenu(e) {
  e.preventDefault();
  var previousMenu = document.getElementById("contextMenu");
  if (previousMenu) {
    previousMenu.parentNode.removeChild(previousMenu);
  }
  var menu = document.createElement("div");
  menu.id = "contextMenu";
  menu.style.position = "absolute";
  menu.style.left = e.clientX + 5 + "px";
  menu.style.top = e.clientY - 50 + "px";
  menu.innerHTML ='<div class="contextmenu">'+
                    '<input type="button" value="Nouveau dossier" id="topOptionsButton" class="optionButton" onclick="createFolder()"></input>'+
                    '<input type="button" value="Nouveau fichier" class="optionButton" onclick="create_and_write_file()"></input>'+
                    '<input type="button" value="Ouvrir les fichiers" class="optionButton" onclick="open_file_desktop()"></input>'+
                    '<input type="button" value="Changer l\'arrère plan" class="optionButton" onclick="changeBackground()"></input>'+
                    '<input type="button" value="Ouvrire un terminal" id="bottomOptionsButton" class="optionButton" onclick="runTerminal()"></input>'+
                  '</div>'

  document.getElementById('blackRect').appendChild(menu);
        
}

function contextFileMenu(e) {
  e.preventDefault();
  var previousMenu = document.getElementById("contextFileMenu");
  if (previousMenu) {
    previousMenu.parentNode.removeChild(previousMenu);
  }
  var menu = document.createElement("div");
  menu.id = "contextFileMenu";
  menu.style.position = "absolute";
  menu.style.left = e.clientX + 5 + "px";
  menu.style.top = e.clientY - 50 + "px";
  menu.innerHTML ='<div class="contextmenu">'+
                    '<input type="button" value="Nouveau dossier" id="topOptionsButton" class="optionButton" onclick="createFolder()"></input>'+
                    '<input type="button" value="Nouveau fichier" class="optionButton" onclick="create_and_write_file()"></input>'+
                    '<input type="button" value="Ouvrire un terminal" id="bottomOptionsButton" class="optionButton" onclick="runTerminal()"></input>'+
                  '</div>'

  document.getElementById('blackRect').appendChild(menu);
        
}

function reCalc() {
    var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    div.style.left = x3 - 140 + 'px';
    div.style.top = y3 - 60 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
    div.style.background = "rgba(15,131,239,0.5)";
    div.style.border = "1px solid #0047FF";
    div.style.position = "absolute";
}

function open_file_desktop(){
    open_file('/data/desktop/');
}

function runTerminal(){
    var title = document.createElement('h1');
    title.style = 
    "width:100px;" + 
    "height:30px;" +
    "border-radius:10px;" + 
    "left:50%;" + 
    "position:absolute;" + 
    "top:-2px;" + 
    "font-size:15px;" +
    "transform: translateX(-50%);" +
    "color:gray;";
    title.innerHTML = "MyTerminal";

    var term = document.createElement('div');
    term.style.top = "40px";
    term.style.position = "absolute";
    term.style.left = "0px";
    term.style.width = "900px";
    term.style.height = "500px";
    term.style.background = "#353030";
    term.style.overflow = "scroll";
    term.style.overflowX = "hidden";


    var input = document.createElement('div');
    input.style = 
    "width:900px;" + 
    "height:25px;" + 
    "background-color: rgb(150, 49, 49);";

        var inputHead = document.createElement('p');
        inputHead.innerHTML = "nakiio@MyPanel -> ";
        inputHead.style.margin = "2px";
        inputHead.style.fontSize = "18px";
        inputHead.style.color = "#6C6363";
        input.appendChild(inputHead);

        var inputText = document.createElement('input');
        inputText.id = "inputTextTerminal";
        inputText.type = "text";
        inputText.style.margin = "2px";
        inputText.style.position = "absolute";
        inputText.style.left = "180px";
        inputText.style.top = "0px";
        inputText.style.width = "720px";
        inputText.style.color = "#6C6363";
        inputText.style.background = "none";
        inputText.style.fontSize = "18px";
        inputText.style.border = "none";
        inputText.addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
                var output = document.createElement('p');
                output.innerHTML = "nakiio@MyPanel -> " + inputText.value;
                output.style.margin = "2px";
                output.style.color = "#6C6363";
                term.appendChild(output);
                sendCommand(inputText.value, function(callback){
                    console.log(callback);
                    var outputCmd = document.createElement('p');
                    outputCmd.innerHTML = callback;
                    outputCmd.style.margin = "2px";
                    outputCmd.style.color = "#6C6363";
                    term.appendChild(outputCmd);
                    inputText.value = "";
                    term.appendChild(input);
                    term.scrollTop = term.scrollHeight;
                    if(document.getElementById("inputTextTerminal")){
                        document.getElementById("inputTextTerminal").focus();
                    }

                })
                
            }

        });
        input.appendChild(inputText);
        if(document.getElementById("inputTextTerminal")){
            document.getElementById("inputTextTerminal").focus();
        }
    term.append(input);
    newWindow("terminal", term, title);
}

function sendCommand(command, callback) {
      $.ajax({
        type: "POST",
        url: "http://localhost/php/terminal.php",
        data: { command: command },
        success: function(data) {
          callback(data);
        }
      });
      
    }


function open_file(pathFile){
    openingFile = true;
    var path = document.createElement('h1');
    path.id = 'fileExplorerTitle';
    path.style = 
    "width:600px;" + 
    "height:30px;" +
    "border-radius:10px;" + 
    "left:10%;" + 
    "position:absolute;" + 
    "top:-5px;" + 
    "font-size:15px;" +
    "background-color:rgba(0, 0, 0, 0.7);" + 
    "color:white;" + 
    "border: 1px solid #201B22;" +
    "display: flex; align-items: center; justify-content: center; height: 30px;";;
    var p = "File : " + pathFile;
    path.innerText = p;

    var div = document.createElement('div');
    div.style.top = "40px";
    div.style.left = "0px";
    div.style.width = "100%"
    div.style.height = "500px";


    var canvas = document.createElement('div');
    canvas.style.top = "0px";
    canvas.id = "fileExplorerCanvas";
    canvas.style.left = "0px";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.background = theme;
    canvas.addEventListener("contextmenu", contextFileMenu);
    canvas.addEventListener("mousedown", function(e){
        var previousMenu = document.getElementById("contextFileMenu");
        if (previousMenu) {
            previousMenu.parentNode.removeChild(previousMenu);
        }
    });

    show_desktop_files(canvas,pathFile);

    div.appendChild(canvas);
    newWindow("fileExplorer", div, path)
}



function createFolder() {
    message(function(callback,data,number){
        var folderName = callback;
        if(folderName !== "/data/desktop/" && folderName){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/php/create_folder.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    message(function(callback,message,number){},['Dossier créé avec succès !'],0)
                }
            };
            var path;
            var currentFilePath;
            if(document.getElementById('contextFileMenu')){
                path = document.getElementById('fileExplorerTitle').innerText.replaceAll("File : ","") + folderName + "/";
                currentCanvas = document.getElementById('fileExplorerCanvas');
            }else{
                path = '/data/desktop/' + folderName + "/";
                currentCanvas = document.getElementById("canvas");
            }
            xhr.send("folder_name=" + path);
            var list = path.split('/');
            var currentFile = "";
            for(var i = 0; i < list.length - 2; i++){
                currentFile = currentFile + list[i] + "/";
            }
            show_desktop_files(currentCanvas,currentFile);
        }
    },['Entrez le nom du dossier à créer'],1)
    
}

function create_and_write_file() {
    message(function(callback,data,number){
        var fileName = callback;
        if(fileName !== "/data/desktop/" && fileName){
            var path;
            var currentFilePath;
            if(document.getElementById('contextFileMenu')){
                path = document.getElementById('fileExplorerTitle').innerText.replaceAll("File : ","") + fileName;
                currentCanvas = document.getElementById('fileExplorerCanvas');
            }else{
                path = '/data/desktop/' + fileName;
                currentCanvas = document.getElementById("canvas");
            }
            var list = path.split('/');
            var currentFile = "";
            for(var i = 0; i < list.length - 1; i++){
                currentFile = currentFile + list[i] + "/";
            }
            $.ajax({
                method: "POST",
                url: "http://localhost/php/create_file.php",
                data: { file_path: path, is_content:false, file_content:"" }
            })
            .done(function( response ) {
                message(function(callback,message,number){},['Fichier créé avec succès !'],0)
            });
            show_desktop_files(currentCanvas,currentFile);
        }
    },['Entrez le nom du fichier à créer'],1) 
}

function changeBackground(){
    message(function(callback,message,number){
        saveData('backgroundImage', callback[0],false);
        var img = document.getElementById('backgroundImage');
        img.src = callback[0];
    },['Voulez vous ajouter ce Widget a votre bureau'],1)
}

function show_desktop_files(canvas, path) {
    if (canvas){
        document.querySelectorAll(".desktopFiles").forEach(function (element) {
            if (element && canvas.contains(element)){
                element.parentNode.removeChild(element);
            }
        });

        $.ajax({
            method: "POST",
            url: "http://localhost/php/get_folder_child.php",
            data: { file_path: path }
        })
        .done(function(response) {
            var data = JSON.parse(response);
            const canvasWidth = canvas.offsetWidth;
            var divWidth = 60;
            var divHeight = 65;
            var divMargin = 20;
            var divsPerRow = Math.floor(canvasWidth / (divWidth + divMargin));
            var left = 0;
            var top = 0;
            var divsInRow = 0;

            for (var i = 0; i < data.length; i++) {
                var div = document.createElement('div');
                div.style.width = divWidth + "px";
                div.style.height = divHeight + "px";
                div.style.position = "absolute";
                div.style.margin = divMargin + "px";
                div.style.textAlign = "center";
                div.style.borderRadius = "10px";
                div.classList.add("desktopFiles");
                div.style.color = "white";
                div.style.left = left + "px";
                div.style.top = top + "px";
                var file_name = data[i][0];
                div.addEventListener("click", (function(file_name,i) {
                return function() {
                    var file;
                    if(path[path.length - 1 ] === "/"){
                        file = path + file_name + "/";
                    }else{
                        file = path + "/" + file_name + "/";
                    }
                    if (data[i][1]){
                        if(openingFile === true){
                            show_desktop_files(document.getElementById('fileExplorerCanvas'),file);
                            var p = "File : " + file;
                            console.log(document.getElementById('fileExplorerTitle').innerText = p);
                        }else{
                            open_file(file);
                        }
                    }else{
                        openFile('..' + file.substring(0, file.length-1))  
                    } 
                }
              })(file_name,i));

                var img = document.createElement('img');
                if (data[i][1]){
                    img.src = "http://localhost/images/nautilus.png";
                }else{
                    img.src = "http://localhost/images/libreoffice.png";
                }
                img.style.width = "50px";
                img.style.height = "50px";
                img.style.top = "0px";
                img.style.left = "5px";
                img.style.position = "absolute";

                var p = document.createElement('p');
                var fileName = data[i][0];
                if (fileName.length > 10) {
                    p.innerHTML = fileName.substring(0, 7) + "...";
                } else {
                    p.innerHTML = fileName;
                }
                p.style.cssText = "text-align:center;width:100%;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;top:50px;position:absolute;left:0;right:0;margin:auto;";
                div.appendChild(p);
                div.appendChild(img);
                canvas.appendChild(div);

                divsInRow++;
                if (divsInRow % divsPerRow === 0) {
                    left = 0;
                    top += divHeight + divMargin;
                } else {
                    left += divWidth + divMargin;
                }
            }
        });
    }
}

function newWindow(id, content, title){
    if(document.getElementById(id)){
        document.getElementById(id).style = "display:block;";
    }else{
        var div = document.createElement("div");
        div.id = id;
        div.style.width = "900px";
        div.style.height = "540px";
        div.style.position = "absolute";
        div.style.left = event.clientX + "px";
        div.style.top = event.clientY + "px";
        div.style.border = "1px solid #000000";
        div.style.boxShadow = "10px 10px 4px rgba(0, 0, 0, 0.25)";
        div.style.borderRadius = "10px 10px 0px 0px";

        var topBar = document.createElement('div');
        topBar.style.top = "0px";
        topBar.style.left = "0px";
        topBar.style.width = "900px";
        topBar.style.height = "40px";
        topBar.style.background = "rgba(0,0,0,0.5)";
        topBar.style.border = "1px solid #000000";
        topBar.style.boxShadow = "0px 10px 4px rgba(0, 0, 0, 0.25)";
        topBar.style.borderRadius = "10px";

        var exit = document.createElement('input');
        exit.style = 
        "width:25px;" + 
        "height:25px;" +
        "border-radius:50%;" + 
        "left:96%;" + 
        "position:absolute;" + 
        "top:8px;" + 
        "font-size:18px;" +
        "background-color:#00C3A0;" + 
        "text-align: center;" + 
        "color:white;" + 
        "border: 1px solid #201B22;";
        exit.value = "x";
        exit.type = "button";
        exit.id = "exit";
        exit.classList.add('exit');
        exit.onclick = function(){
            var previousExit = document.getElementById(id);
            if (previousExit) {
                previousExit.parentNode.removeChild(previousExit);
            }
            if(id === "fileExplorer"){
                openingFile = false;
            }
        };
        topBar.appendChild(exit);
        if(id === "fileExplorer"){
            var former = document.createElement('input');
            former.style = 
            "width:25px;" + 
            "height:25px;" +
            "border-radius:15%;" + 
            "left:5%;" + 
            "position:absolute;" + 
            "top:9px;" + 
            "font-size:20px;" +
            "background-color:#5E5A5A;" + 
            "text-align: center;" + 
            "color:white;" + 
            "box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);" +
            "border: 1px solid #201B22;";
            former.value = "<";
            former.type = "button";
            former.id = "former";
            former.onclick = function(){
                var file = document.getElementById('fileExplorerTitle').innerText.split("/");
                console.log(file[file.length - 2] === "desktop")
                if(file[file.length - 2] != "desktop"){
                    var filePath = "/";
                    for(var i = 1; i < file.length - 2; i++){
                        filePath = filePath + file[i] + "/";
                    }
                    document.getElementById('fileExplorerTitle').innerText = "File :" + filePath;
                    show_desktop_files(document.getElementById('fileExplorerCanvas'),filePath);
                }
            };
            topBar.appendChild(former);

            former.addEventListener("mouseover", function() {
            former.style.backgroundColor = "#1A1515";
                former.style.color = "gray";
            });

            former.addEventListener("mouseout", function() {
                former.style.backgroundColor = "#5E5A5A";
                former.style.color = "black";
            });
        }

        var reduct = document.createElement('input');
        reduct.style = 
        "width:25px;" + 
        "height:25px;" +
        "border-radius:50%;" + 
        "left:92%;" + 
        "position:absolute;" + 
        "top:8px;" + 
        "font-size:20px;" +
        "background-color:#13EFE2;" + 
        "text-align: center;" + 
        "color:white;" + 
        "border: 1px solid #201B22;";
        reduct.value = "-";
        reduct.type = "button";
        reduct.id = "reduct";
        reduct.classList.add('reduct');
        reduct.onclick = function(){
            var previousExit = document.getElementById(id);
            if (previousExit) {
                previousExit.parentNode.removeChild(previousExit);
            }
            if(id === "fileExplorer"){
                openingFile = false;
            }
            
        };
        topBar.appendChild(reduct);

        exit.addEventListener("mouseover", function() {
          exit.style.backgroundColor = "#1385EF";
        });

        exit.addEventListener("mouseout", function() {
          exit.style.backgroundColor = "#13EFE2";
        });

        reduct.addEventListener("mouseover", function() {
          reduct.style.backgroundColor = "#156045";
        });

        reduct.addEventListener("mouseout", function() {
          reduct.style.backgroundColor = "#00C3A0";
        });

        var initialX;
        var initialY;
        var isDragging = false;

        topBar.addEventListener("mousedown", function(e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isDragging = true;
        });

        topBar.addEventListener("mouseup", function(e) {
        isDragging = false;
        console.log("Final position:", div.style.left, div.style.top);
        });

        topBar.addEventListener("mousemove", function(e) {
        if (!isDragging) return;
        div.style.left = (div.offsetLeft - initialX + e.clientX) + "px";
        div.style.top = (div.offsetTop - initialY + e.clientY) + "px";
        initialX = e.clientX;
        initialY = e.clientY;
        });

        topBar.appendChild(title);
        div.appendChild(content);
        div.appendChild(topBar);
        document.getElementById('blackRect').appendChild(div);
    }
}

function loadFileContent(filePath, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhttp.open("GET", filePath, true);
  xhttp.send();
}



document.getElementById('louppe').addEventListener('click', function(e){
    let content = document.getElementById('googleSearch').value;
    if(content !== ''){
        var encodedInput = encodeURIComponent(content);
        var googleSearchUrl = "https://www.google.com/search?q=" + encodedInput;
        window.open(googleSearchUrl, '_blank').focus();
    }
})

function openFile(filePath) {
    
    loadFileContent(filePath, function(callback) {
        var fileContent = callback;
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
        'width:10%;' +
        'margin-left:45%;' +
        'height:7%;';
        background.appendChild(container)

        var styleButton = 
        'font-size:30px;' +
        'background:none;' +
        'border:none;'+
        'margin-top:15px;' + 
        'margin-left:5%;'
        'transition: 0.5s ease-in;';

        var back = document.createElement('input');
        back.classList.add('fileButtons');
        back.type = 'button';
        back.value = '⬅️';
        back.style = styleButton;
        back.onclick = function(){
            background.parentNode.removeChild(background)
            document.body.style.overflowY = 'auto';
        }
        container.appendChild(back)

        var save = document.createElement('input');
        save.classList.add('fileButtons');
        save.type = 'button';
        save.value = '💾';
        save.style = styleButton;
        save.onclick = function() {
            const data = new FormData();
            data.append('text', textArea.value);
            data.append('filename', filePath);

            fetch('../php/editFile.php', {
              method: 'POST',
              body: data
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            createNotification('Le fichier a été sauvegarder !! 💾 ');
        }
        container.appendChild(save)

        var download = document.createElement('input');
        download.classList.add('fileButtons');
        download.type = 'button';
        download.value = '📥';
        download.style = styleButton;
        download.onclick = function() {
            downloadFile(filePath);
            createNotification('Le fichier a été Télécharger !! 📥 ');
        }
        container.appendChild(download)

        var textArea = document.createElement('textarea');
        textArea.value = fileContent;
        textArea.placeholder = 'Ecriver le contenue de votre fichier...';
        textArea.style = 
        'border: solid 1px #d0d0d0; ' +
        'box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);' +
        'background: white;' +
        'color: #161414;' +
        'border-radius: 10px;' +
        'font-size: 20px;' +
        'height: 1500px;' +
        'word-break: break-word; ' +
        'resize: none;' +
        'width: 50%;' +
        'height:85%;' +
        'margin-left: 25%;' + 
        'margin-top: 5%;';
        background.appendChild(textArea)
    });

}

function downloadFile(url) {
  var a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
