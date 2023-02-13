<?php 


function get_children($path) {
  $children = array();
  $path = $_SERVER['DOCUMENT_ROOT'] . $path;
  if(is_dir($path)) {
    $files = scandir($path);
    foreach($files as $file) {
      if($file != "." && $file != "..") {
        $children[] = $file;
      }
    }
  }
  return $children;
}

$response = get_children($_POST['file_path']);
echo json_encode($response);


?>