<?php include('../php/authentification.php');?>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> MyPanel </title>
    <link rel="stylesheet" href="style.css">
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
          <input id="description" type="text" placeholder="Entrer la description du projet" required>
        </div>
        <div class="input-box button">  
          <input type="submit" name="" value="Continue" onclick="ClickCreateProject()">
        </div>
      </form>
    </div>
    <script type="text/javascript">
      
    function ClickCreateProject(){
        var name = document.getElementById('name');
        var author = document.getElementById('author');
        var description = document.getElementById('description');
        var inputsValue = [name.value, author.value, description.value];
        var notNull = true;
        for(var i = 0; i < inputsValue.length; i++){
            var value = inputsValue[i].toString();
            if(value === ""){
                notNull = false;
            }
        }
      if (notNull === true) {
        var date = new Date();

        var jour = date.getDate();
        var mois = date.getMonth() + 1;
        var annee = date.getFullYear();
        var dateFormatee = jour.toString().padStart(2, "0") + "/" + mois.toString().padStart(2, "0") + 
        "/" + annee.toString().substr(-2);
        var object = { name: name.value, author: author.value,date:dateFormatee, description: description.value };
        updateProject(object);
      }
    }
    function updateProject(object) {
      $.get("../futur/projects.txt", function(response) {
        var lines = response.split("\n");
        if (lines[lines.length - 1] === "") {
          lines.pop();
        }
        lines.push(JSON.stringify(object));
        var text = lines.join("\n");
        $.ajax({
          method: "POST",
          url: "../futur/edit_project.php",
          data: { data: text }
        })
        .done(function(res) {
          window.location.replace('http://localhost/futur/home.php'); 
          alert("La configuration a été mise à jour !");
        });
      });
    }
    </script>
  </body>
</html>
