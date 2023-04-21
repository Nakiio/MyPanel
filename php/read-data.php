<?php
$type = $_GET['type'];

$file = $_SERVER['DOCUMENT_ROOT'] . '/futur/data.json';
if (!file_exists($file)) {
  echo '{}';
  exit();
}

$content = file_get_contents($file);
$json = json_decode($content, true);
if (isset($json[$type])) {
  echo json_encode($json[$type]);
} else {
  echo '{}';
}
?>
