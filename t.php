<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MyPanel - Login</title> 
  </head>
  <body>
    <style>
      body{
        background-color: #1d1d1d;
        font-family: 'system-ui', fantasy;
        overflow: hidden;
      }

      #container{
        position: absolute;
        border-radius: 40px;
        width: 25%;
        height: 55%;
        top: 50%;
        left: 50%;
        border:1px solid #000;
        transform: translate(-50%,-50%);
        background-color: rgba(25, 25, 25,0.7);
        box-shadow:  50px 50px 100px #2e1249,
               -50px -50px 100px #4930ab;
      }
      h1{margin: 15%; }
      h1::before{
        content:' ';
        position: absolute;
        width: 40%;
        height: 4px;
        background-color: black;
        top: 110px;
      }

      #container div input{ 
        margin-top: 2%;
        margin-left: 15%;
        font-size: 20px;
        width: 75%;
        height: 35px;
        background-color: #1d1d1d;
        border:1px solid #000;
        border-radius: 10px;
        box-shadow:  6px 6px 12px #0D0D0D;
      }
      h2{
        margin-left: 15%;
        margin-top: 13%;
        margin-bottom: 0%;
      }
      a{
        text-decoration: underline;
        color: #4930ab;
        font-size: 15px;
        position: absolute;
        margin-top: 3%;
        margin-left: 15%;
        transition: 0.5s ease-in;
      }
      a:hover{color: #2e1249;cursor: pointer;}

      input[type='button']{
        background-color: rgba(0, 0, 0, 0.2);
        width: auto;
        height: 7%;
        text-align: center;
        font-size: 20px;
        border: 1px solid #000;
        border-radius: 10px;
        position: absolute;
        top: 10%;
        left: 15%;
        cursor: pointer;
        transition: 0.5s ease-in;
      }

      input[type='button']:hover{
        box-shadow:  10px 10px 35px #2e1249,
               -10px -10px 35px #4930ab;
      }

      input[type='button']:active{
        background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(73,48,171,1) 0%, rgba(46,18,73,1) 100%);
      }

      #buttons{
        position: absolute;
        width: 25%;
        height: 55%;
        top: 100%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      #container div{
        height: 0px;
      }
      #container .demi input{
        width: 60%;
      }
      #container #prenom{
        position: absolute;
        top: 18%;
        left: 5%;
      }

      #container #nom{
        position: absolute;
        top: 19%;
        left: 50%;
      }

      #container #date{
        position: absolute;
        top: 35%;
        left: 5%;
      }

      #container #mail{
        position: absolute;
        top: 35.8%;
        left: 50%;
      }

      #container #password{
        position: absolute;
        width: 100%;
        top: 45%;
        left: 0%;
      }

      #container #confPassword{
        position: absolute;
        width: 100%;
        top: 60%;
        left: 0%;
      }
      #buttons #continue{left:70%;}
      #buttons input{top:0;}

      .loginItem{
        margin-top: 20%;
      }
    </style>
    <div id="container">
      <div id="login">
        <h1>Connexion</h1>
        <div class="inputs loginItem">
          <h2>Mail</h2>
          <input type="text">
        </div>

        <div class="inputs loginItem">
          <h2>Password</h2>
          <input type="text">
        </div>
        <a href="https://www.codehim.com" class="loginItem">Vous avez oublier votre mot de passe ?</a></div>
    </div>


    <div id="buttons">
      <input type="button" value="Créer un compte" id="create" onclick="changeWindow(this)">
      <input type="button" value="Continuer" id="continue" onclick="toContinue()">
    </div>

    <script>
      function changeWindow(e) {
        if(e.value === 'Créer un compte'){
          e.value = 'Connexion';
          document.getElementById('container').innerHTML = '<h1>Créer votre compte</h1><div class="inputs demi" id="prenom"><h2>Prenom</h2><input type="text"></div><div class="inputs demi" id="nom"><h2>Nom</h2><input type="text"></div><div class="inputs demi" id="date"><h2>Date de naissance</h2><input type="text"></div><div class="inputs demi" id="mail"><h2>Mail</h2><input type="text"></div><div class="inputs" id="password"><h2>Mot de passe </h2><input type="text"></div><div class="inputs" id="confPassword"><h2>Confirmez le Mot de passe </h2><input type="text"></div>';
        }else if(e.value === 'Connexion'){
          e.value = 'Créer un compte';
          document.getElementById('container').innerHTML = '<div id="login"><h1>Connexion</h1><div class="inputs loginItem"><h2>Mail</h2><input type="text"></div><div class="inputs loginItem"><h2>Password</h2><input type="text"></div><a href="https://www.codehim.com" class="loginItem">Vous avez oublier votre mot de passe ?</a></div>';
        }
      }

      function toContinue(){
        if(document.getElementById('create').value === 'Connexion'){
        
        }else{

        }
      }
    </script>


  </body>
</html>