<?php 


function get_children($path) {
  $childrens= array();
  $path = $_SERVER['DOCUMENT_ROOT'] . $path;
  if(is_dir($path)) {
    $files = scandir($path);
    foreach($files as $file) {
      if($file != "." && $file != "..") {
        $childrenOption = array();
        $childrenOption[] = $file;
        if(is_dir($path . $file)){
          $childrenOption[] = true;
        }else{
          $childrenOption[] = false;
        }
        $childrens[] = $childrenOption;
      }
    }
  }
  return $childrens;
}

$response = get_children($_POST['file_path']);
echo json_encode($response);


?>