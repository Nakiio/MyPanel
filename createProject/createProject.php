<?php include('../php/authentification.php');?>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> MyPanel </title>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="http://localhost/js/project.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <div class="container">
      <form action="#">
        <div class="title">Projet</div>
        <div class="input-box underline">
          <input id="name" name="name" type="text" placeholder="Entrer le nom du projet" required>
        </div>
        <div class="input-box underline">
          <input id="author" type="text" placeholder="Entrer le nom de l'auteur" required>
        </div>
        <div class="input-box underline">
          <input id="speech" type="text" placeholder="Entrer le langage du projet" required>
        </div>
        <div class="input-box underline">
          <input id="ide" type="text" placeholder="Entrer le nom d'IDE" required>
        </div>
        <div class="input-box underline">
          <input id="description" type="text" placeholder="Entrer la description du projet" required>
        </div>
        <div class="input-box button">  
          <input type="submit" name="" value="Continue" onclick="ClickCreateProject()">
        </div>
      </form>
    </div>
  </body>
</html>