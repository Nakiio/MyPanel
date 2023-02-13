
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> MyPanel </title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script>
      function login(){
        var script = document.createElement("py-script");
        script.src = "http://localhost/python/createFile.py"; 
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("yes")
      return false;
     }
    </script>
  </head>

  <body>
    <?php
      $url = 'https://www.php.net';
      $html = file_get_contents($url);
      file_put_contents('http://localhost/createProject/home.html', $html);

    ?> 
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
          <input id="IDE" type="text" placeholder="Entrer le nom d'IDE" required>
        </div>
        <div class="input-box underline">
          <input id="description" type="text" placeholder="Entrer la description du projet" required>
        </div>
        <div class="input-box button">  
          <input type="submit" name="" value="Continue" onclick="login()">
        </div>
      </form>
    </div>
  </body>
</html>