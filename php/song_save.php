<?php
function save_song($data) {
	$json_data = json_encode($data);
	$file_name = $_SERVER['DOCUMENT_ROOT'] . "/data/songs.json";

	if (file_exists($file_name)) {
	  file_put_contents($file_name, "");
	} else {
	  fopen($file_name, "w");
	}
	file_put_contents($file_name, $json_data);
}
var_dump($_POST);
save_song($_POST['data']);
?>