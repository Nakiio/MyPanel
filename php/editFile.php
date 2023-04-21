<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];
    $filename = $_POST['filename'];

    if (file_exists($filename)) {
        // Si le fichier existe déjà, on modifie son contenu
        file_put_contents($filename, $text);
        echo "Le fichier $filename a été mis à jour avec le contenu suivant :\n\n$text";
    } else {
        // Sinon, on crée un nouveau fichier avec le contenu spécifié
        file_put_contents($filename, $text);
        echo "Le fichier $filename a été créé avec le contenu suivant :\n\n$text";
    }
}
?>
