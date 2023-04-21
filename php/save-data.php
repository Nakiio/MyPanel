<?php
$type = $_POST['type'];
$data = json_decode($_POST['data'], true);

$file = $_SERVER['DOCUMENT_ROOT'] . '/futur/data.json';
if (!file_exists($file)) {
  file_put_contents($file, '{}');
}

$content = file_get_contents($file);
$json = json_decode($content, true);
$json[$type] = $data;
file_put_contents($file, json_encode($json));
?>
