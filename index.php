<?php
session_start();

// Vérification du mot de passe
if (isset($_POST['password']) && $_POST['password'] === 'sesfleurssontbelles') {
  $_SESSION['auth'] = true;
  header('Location: /futur/home.php');
  exit;
}

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> MyPanel </title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div class="container">
      <form method="POST" action="">
        <div class="title">Login</div>
        
        <div class="input-box underline">
          <input id="password" name="password" type="password" placeholder="Entrer le MDP" required>
          <div class="underline"></div>
        </div>
        <div class="input-box button">
          <input type="submit" name="" value="Continue">
        </div>
      </form>
    </div>
  </body>
</html>  