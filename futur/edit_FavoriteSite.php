<?php
function edit_conf($data) {
	$file_name = $_SERVER['DOCUMENT_ROOT'] . "/futur/FavoriteSites.txt";

	if (file_exists($file_name)) {
	  file_put_contents($file_name, "");
	} else {
	  fopen($file_name, "w");
	}
	file_put_contents($file_name, $data);
}
var_dump($_POST);
edit_conf($_POST['data']);
?>