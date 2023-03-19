<?php
$title = "MyPanel";
include('../php/authentification.php');

?>

<html>
<head>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Modak&display=swap" rel="stylesheet">
  <title><?= $title ?></title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script type="text/javascript" src="../js/Desktop.js"></script>
  <script type="text/javascript" src="../js/main.js"></script>
  
  <meta charset="UTF-8">
</head>

<body style="overflow-x: hidden;">
  
    <div class="desktop">
      <img src="https://images3.alphacoders.com/106/1069102.jpg" id="backgroundImage" style="top: 0;left: 0;width: 100vw;height: 100vh;">
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

    <div class="middle" id="middle"></div>

    <div id="backRGBA">
      <div id="widgetMenu">
        <h1 id="titleWidgetMenu">Widget Menu</h1>
        <span id="line"></span>
        <input id="exit" type="button" value="x" onclick="closeWidgetMenu()">
        <input id="reduct" type="button" value="-" onclick="closeWidgetMenu()">
        <div id="widgetMenuBody"></div>
      </div>
    </div>
    <script type="text/javascript" src="../js/Desktop.js"></script>
    <script type="text/javascript" src="addNewWidget.js"></script>
    <script type="text/javascript" src="../widgets/timeWidget.js"></script>
    <script type="text/javascript" src="../widgets/separationHorizWidget.js"></script>
    <script type="text/javascript" src="../widgets/separationVertiWidget.js"></script>
    <script type="text/javascript" src="../widgets/meteoWidget.js"></script>
    <script type="text/javascript" src="../widgets/batteryWidget.js"></script>
    <script type="text/javascript" src="../widgets/imageWidget.js"></script>
    <script type="text/javascript" src="../widgets/songWidget.js"></script>
    <script type="text/javascript" src="../widgets/projectWidget.js"></script>
    <script type="text/javascript" src="../widgets/calculatorWidget.js"></script>
    <script type="text/javascript" src="../widgets/favoriteSiteswidget.js"></script>
</body>
</html>

