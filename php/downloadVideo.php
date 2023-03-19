<?php
    function downloadVideo() {
        $videoURL = readline("Enter the video URL: ");
        $file_path = $_SERVER['DOCUMENT_ROOT'] . "/data/songs/video.mp4";
        $video = file_get_contents($videoURL);
        echo $file_path;
        file_put_contents($file_path, $video);
    }
    downloadVideo();
?>
