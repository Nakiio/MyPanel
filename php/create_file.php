<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
function create_file($file_path, $is_content, $file_content = "") {
    $file_path = $_SERVER['DOCUMENT_ROOT'] . $file_path;
    if (is_writable(dirname($file_path))) {
        
        if(empty($file_path)){
            throw new Exception('Le chemin du fichier ne peut pas être vide');
        }
        if($is_content){
            $handle = fopen($file_path, 'w');
            fwrite($handle, $file_content);
            fclose($handle);
        }else{
            $handle = fopen($file_path, 'w');
            fwrite($handle, $file_content);
            fclose($handle);    }
    }else {
    throw new Exception("Impossible d'ecrire dans le repertoire : " . dirname($file_path));
    }
}
var_dump($_POST);
create_file($_POST['file_path'], $_POST['is_content'], $_POST['file_content']);

?>


