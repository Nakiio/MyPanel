<?php
$title = "MyPanel";
include('../php/authentification.php');
?>

<html>
<head>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Modak&display=swap" rel="stylesheet">
  <title><?= $title ?></title>
  <script type="text/javascript" src="../js/main.js"></script>
  <script type="text/javascript" src="../js/task.js"></script>
  <script type="text/javascript" src="../js/favSite.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script type="text/javascript" src="../js/project.js"></script>
  <script type="module" src="../js/clickIcon.js"></script>
  <script type="text/javascript" src="../js/Desktop.js"></script>
  
  <meta charset="UTF-8">
</head>

<body style="overflow-x: hidden;">
  
    <div class="desktop">
      <img src="https://www.omgubuntu.co.uk/wp-content/uploads/2020/04/pop-os-hero.jpg" id="backgroundImage" style="top: 0;left: 0;width: 100vw;height: 100vh;">
      <div class="blackRect" id="blackRect">
        <div class="canvas" id="canvas">
          <div id="selectRect"></div>
        </div>
        <script type="text/javascript">show_desktop_files(document.getElementById("canvas"),'/data/desktop/');</script>
        <div class="bar">
          <div class="alldocs"><img id="alldocs" src="../images/AllDocs.png" width="40" height="40" ></div>
          <div class="caja"><img id="caja" src="../images/caja.png" width="40" height="40" ></div>
          <div class="discord"><img id="discord" src="../images/discord.png" width="40" height="40" ></div>
          <div class="deezer"><img id="deezer" src="../images/deezer.png" width="40" height="40" ></div>
          <div class="firefox"><img id="firefox" src="../images/firefox.png" width="40" height="40" ></div>
          <div class="gimp"><img id="gimp" src="../images/gimp.png" width="40" height="40" ></div>
          <div class="gnome-terminal"><img id="gnome-terminal" src="../images/gnome-terminal.png" width="40" height="40" ></div>
          <div class="google"><img id="google" src="../images/google.png" width="40" height="40" ></div>
          <div class="heroic"><img id="heroic" src="../images/heroic.png" width="40" height="40" ></div>
          <div class="idea"><img id="idea" src="../images/idea.png" width="40" height="40" ></div>
          <div class="konsole"><img id="konsole" src="../images/konsole.png" width="40" height="40" ></div>
          <div class="libreoffice"><img id="libreoffice" src="../images/libreoffice.png" width="40" height="40" ></div>
          <div class="minecraft"><img id="minecraft" src="../images/minecraft.png" width="40" height="40" ></div>
          <div class="nautilus"><img id="nautilus" src="../images/nautilus.png" width="40" height="40" ></div>
          <div class="shotcut"><img id="shotcut" src="../images/shotcut.png" width="40" height="40" ></div>
          <div class="steam"><img id="steam" src="../images/steam.png" width="40" height="40" ></div>
          <div class="sublimetext"></script><img id="sublimetext" src="../images/sublimetext.png" width="40" height="40" ></div>
          <div class="tor"><img id="tor" src="../images/tor.png" width="40" height="40" ></div>
          <div class="vscode"><img id="vscode"src="../images/vscode.png" width="40" height="40" ></div>
          <div class="cajaAdmin"><img id="cajaAdmin" src="../images/cajaAdmin.png" width="40" height="40" ></div>
        </div>
        <div class="footerDesktop">
          <div id="partFooterDesktop" class="leftPart">
            <a class="firstNav" href="#infos" >Infos</a>
            <a class="secondNav" href="#projets" >Projets</a>
            <a class="therdNav" href="#agenda" >Agenda</a>
          </div>
          <div class="scrolldown">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id="partFooterDesktop" class="rightPart">
            <a class="firstNav" href="#setting" >Options</a>
            <a class="secondNav" href="#musique" >Musiques</a>
            <a class="therdNav" href="#" >Login</a>
          </div>
        </div>
      </div>
    </div>
    <div class="middle" id="middle">
      <div class="footer" id="footer">
      </div>
    </div>
    <script type="text/javascript" src="../js/Desktop.js"></script>

     

  <div class="infos reveal" id="infos">
    <div class="welcomeText">
      <h1>
        Bon retour <span>Nakiio!</span>
      </h1>
      <h2>C'est un plaisir de vous<br>
          accueillir sur<br>
          <span>MyPanel.</span>
      </h2>
    </div>
    <div class="infosWegets">
      <div id="wegetInfo" class="batterie">
        <p>Batterie</p>
        <h1 class="ligne"></h1>
        <p><div id="legend" class="legend1"></div><p id="Butilise" >Batterie Utilise : No found</p></p>
        <p><div id="legend" class="legend2"></div><p id="Brestant" >Batterie Restant : No found</p></p>
        <div id="graph"></div>
      </div>
      <div id="wegetInfo" class="utilisateur">
        <p>Utilisateur</p>
        <h1 class="ligne"></h1>
        <p id="username"></p>
        <p id="userrole"></p>
        <img src="https://cdn-icons-png.flaticon.com/512/863/863817.png">
      </div>
      <div id="wegetInfo" class="date">
        <p>Date</p>
        <h1 class="ligne"></h1>
        <p id="Sutilise"></p>
        <p id="Srestant"></p>
        <p id="jour"></p>
      </div>
    </div>

  </div>



  <div class="projets reveal" id="projets">
    
    <div class="inputsProject">
      <div class="shadowNextProj"><input type="submit" class="nextProj" value="" onclick="changePage(this)"></div>
      <input id="add" type="submit" class="newProject" name="" value="Nouveau projet" >
      <div class="shadowFormerProj"><input type="submit" class="formerProj" value="" onclick="changePage(this)"></div>
    </div>
    
    <a class="newProject" href="../createProject/createProject.php"><h1>Nouveau projet</h1></a>
      <a href="#">
        <div id="card" class="project1">
          <div class="c">
            <p id="nom1">Nom : AllApps</p>
            <p id="dev1">Developpeur : Nakiio</p>
            <p id="langue1">Langage : Java</p>
            <p id="env1">Environement : Intellij </p>
            <p id="desc1">Description  : AllApps est une application drive reroupant
             tout vos fichiers, applications et musiques ainsi que des inofs sur votre PC</p>
          </div>
        </div>
      </a>
      <a href="#">
        <div id="card" class="project2">
          <div class="c">
            <clipPath id="text-overlay">
            <p id="nom2">Nom : AllApps</p>
            <p id="dev2">Developpeur : Nakiio</p>
            <p id="langue2">Langage : Java</p>
            <p id="env2">Environement : Intellij </p>
            <p id="desc2">Description  : AllApps est une application drive reroupant
             tout vos fichiers, applications et musiques ainsi que des inofs sur votre PC</p>
           </clipPath>
          </div>
        </div>
      </a>
      <a href="#">
        <div id="card" class="project3">
          <div class="c">
            <p id="nom3">Nom : AllApps</p>
            <p id="dev3">Developpeur : Nakiio</p>
            <p id="langue3">Langage : Java</p>
            <p id="env3">Environement : Intellij </p>
            <p id="desc3">Description  : AllApps est une application drive reroupant
             tout vos fichiers, applications et musiques ainsi que des inofs sur votre PC</p>
          </div>
        </div>
      </a>
  </div>


  <div class="agenda reveal" id="agenda">
    <div id="wegets" class="wegets">
        <div id="agendaWegets" class="siteZone">
          <div>
            <h1>Sites Favories</h1>
            <input type="button" class="exitSite" value="x"></button>
            <input type="button" class="reductSite" value="-"></button>
          </div>
          <input type="text" class="inputSite" id="inputSite" placeholder="url du Site Favorie" name="">
          <input type="button" class="addSite" id="addSite" onclick="create_site()" value="+"></button>
          <ul id="sites1" class="sites1">
            <li class="siteList" id="site0"><a href="#"> </a></li>
            <li class="siteList" id="site1"><a href="#"> </a></li>
          </ul>
          <ul id="sites2" class="sites2">
            <li class="siteList" id="site2"><a href="#"> </a></li>
            <li class="siteList" id="site3"><a href="#"> </a></li>
          </ul>
          <ul id="sites3" class="sites3">
            <li class="siteList" id="site4"><a href="#"> </a></li>
            <li class="siteList" id="site5"><a href="#"> </a></li>
          </ul>
          <ul id="sites4" class="sites4">
            <li class="siteList" id="site6"><a href="#"> </a></li>
            <li class="siteList" id="site7"><a href="#"> </a></li>
          </ul>
          <ul id="sites5" class="sites5">
            <li class="siteList" id="site8"><a href="#"> </a></li>
            <li class="siteList" id="site9"><a href="#"> </a></li>
          </ul>
        </div>

        <div id="agendaWegets" class="taskZone">
          <div>
            <h1>Mes Notes</h1>
            <input type="button" class="exitSite" value="x"></button>
            <input type="button" class="reductSite" value="-"></button>
          </div>
          <input type="text" class="task" id="task" placeholder="Note" name="">
          <input type="button" class="addTask" id="addTask" onclick="create_task()" value="+"></button>
          <ul id="tasks1" class="tasks1">
            <li class="taskList" id="task0"></li>
            <li class="taskList" id="task1"></li>
            <li class="taskList" id="task2"></li>
            <li class="taskList" id="task3"></li>
            <li class="taskList" id="task4"></li>
            <li class="taskList" id="task5"></li>         
          </ul>
          <ul id="tasks2" class="tasks2">
            <li class="taskList" id="task6"></li>
            <li class="taskList" id="task7"></li>
            <li class="taskList" id="task8"></li>
            <li class="taskList" id="task9"></li>
            <li class="taskList" id="task10"></li>
            <li class="taskList" id="task11"></li>          
          </ul>
        </div>

        <div id="agendaWegets" class="meteo">
          <div>
            <h1>Mes Notes</h1>
            <input type="button" class="exitMeteo" value="x"></button>
            <input type="button" class="reductMeteo" value="-"></button>
          </div>
          <p id="temperature">Utilisateur</p>
          <p class="day-legend" id="day-legend">Utilisateur</p>
      </div>
    </div>
    <div id="agendaText" class="agendaText">
      <div>
        <h1>
          <span>Vous</span> pouvez choisir
        </h1>
        <h2>Vos <span>Sites Favoris</span>, ecrire <br>
            vos <span>Notes.</span> et voir la <br>
            <span>Meteo.</span>
        </h2>
        <a href="https://www.meteo-lyon.net/" id="buttonAgenda" ><h1>Meteo</h1></a>      
      </div>
    </div>
  </div>


  <div class="setting reveal" id="setting">
    <div class="backgroundSettings">
      <div class="sliders">
        
        <a id="volumeIcon">
          <div class="volume">
            <div class="speaker">
              <div class="speaker_square"></div>
              <div class="speaker_triangle"></div>
            </div>
            <div class="waves">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
        </div>
      </a>
        <input type="range" class="slider1" id="volumeSlider" min="0" max="100" value="50">
        
        <a id="mikeIcon" ><img src="../images/mike.png"></a>
        <input type="range" class="slider2" id="silder2" min="0" max="100" value="50">

      </div>
      <a class="settingBtn"><img src="../images/settingBtn.png"></a>
      <a class="calc" href="../calculator/calculator.html"><img src="../images/calc.png"></a>
    </div>
  </div>
  
  <div class="musique reveal" id="musique">
      <div class="background2">
        <div class="musiqueHeader">
          <img src="https://m.media-amazon.com/images/I/31se9FyCtsS._UXNaN_FMjpg_QL85_.jpg">
          <div id="singing" class="singing">
            <div class="iconSinging">
              <div class="iconSinging1" ></div>
              <div class="iconSinging2" ></div>
              <div class="iconSinging3" ></div>
            </div>
          </div>
          <h1>Nakiio</h1> 
          <p class="p1">03:08:16 - 27 oct. 2022 </p> 
          <p class="p2">204 Titres  - 10 h 33 min</p>
          <input id="randomSong" type="submit" class="randomSong" name="" value="LANCER L'ECOUTE" onclick="runRandomSong()">
          <input id="addSong" type="submit" class="addSong" name="" value="+">     
        </div>
        <div class="musiqueBody">
          <h1 class="Titre">Titre</h1>
          <h1 class="Artiste">Artiste</h1>
          <h1 class="Ajoute">Ajouté</h1>
          <h1 class="duree">Durée</h1>
          <div id="ScrollStyle" class="ScrollStyle">            
          </div>
        </div>
        <div class="musiqueFooter">
            <h1 id="titleSong">...</h1>
            <p class="duration">00:00</p>
            <progress id="progressSong" class="progressSong" value="0" max="100"> </progress>
            <p class="durationTotal">00:00</p>
            <input id="former" type="submit" class="former" name="" value="|<<" onclick="changeSong(this)">    
            <input type="submit" id="play" class="play" value="||"></input>    
            <input id="next" type="submit" class="next" name="" value=">>|" onclick="changeSong(this)">    
        </div>
    </div>
  </div>
  <div class="footer" id="footer-reveal">
    <h1 class="title">Site Description</h1>
    <h1 class="desc">MyPanel un site permétant a la fois d’avoir toutes ces applications,<br> 
      fichiers, musique depuis n’import qelle appareil ayant acces a une connexion à internet.
    </h1>
    <h2 class="simple"> Simple !</h2>
    <div class="liens">
      <a href="https://twitter.com/?lang=fr"><img src="../images/twetter.png"></a>
      <a href="https://www.instagram.com/?hl=fr"><img src="../images/instagrame.png"></a>
      <a href="https://facebook.com/"><img src="../images/facebook.png"></a>
      <a href="https://youtube.com"><img src="../images/youtube.png"></a>
    </div>
    <h1 class="end">Copyright c 2020 CodeOpacity. Design By Nakiio</h1>
  </div>
  <script type="module" src="../js/app.js"></script>
  <script src="../js/musique.js"></script>
  <script type="text/javascript">
    read_favSite(function(iteration) {
    });
    read_tasks(function(iteration) {
    });

  </script>
  
</body>
</html>

