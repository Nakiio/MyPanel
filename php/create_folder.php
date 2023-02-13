<?php
function create_folder($folder_name) {
    $folder_name = $_SERVER['DOCUMENT_ROOT'] . $folder_name;
    if(empty(trim($folder_name))){
        throw new Exception('Le nom du dossier est vide');
    }
    if (!file_exists($folder_name)) {
        mkdir($folder_name, 0777, true);
    }
}

try {
    if(isset($_POST['folder_name'])) {
        $folder_name = $_POST['folder_name'];
        create_folder($folder_name);
        echo json_encode(['status' => 'success', 'message' => "Dossier créé avec succès"]);
    } else {
        throw new Exception('Aucun nom de dossier n\'a été transmis');
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
