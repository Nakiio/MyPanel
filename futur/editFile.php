<?php
$message = '';
$fileContent = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['file_path'])) {
    $filePath = $_POST['file_path'];
    $fileContent = file_get_contents($filePath);
    if ($fileContent !== false) {
        if (isset($_POST['file_content'])) {
            $newContent = $_POST['file_content'];
            $file = fopen($filePath, 'w');
            fwrite($file, $newContent);
            fclose($file);
            $message = '<div style="color:green;margin-left:15%;text-align:center;width:70%;height:6%;background: rgba(54, 167, 35, 0.5);
border: 1px solid #1C6A15;border-radius:20px;"><span style="font-size:20px;margin-top:40%;">Le fichier a été sauvegarder.</span></div>';
            $fileContent = $newContent;
        }
    } else {
        $message = '<div style="color:red;margin-left:15%;text-align:center;width:70%;height:6%;background: rgba(200, 17, 17, 0.5);
border: 1px solid #C50505;border-radius:20px;"><span style="font-size:20px;margin-top:40%;">Le fichier ' . $filePath . ' n\'exsiste pas.</span></div>';
    }
}
?>

<body style="background: #e4e9eb;font-family: 'Helvetica Neue', sans-serif;">
    <h1 style="color:rgba(13, 13, 13, 1);position: relative;top: 2%;text-align: center;">Editeur de fichier</h1>
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
        <?php echo $message ?>
        <div class="items">
            <input class="path" type="text" name="file_path" value="<?php echo isset($_POST['file_path']) ? $_POST['file_path'] : ''; ?>" placeholder="Enter file path...">
            <button class="item" type="submit">Enregistrer</button>
            <a class="item" href="home.php" style="float:left;margin: 10px;"><span id="span">< Retour</span></a>
        </div>
        <div >
            <textarea class="fileContent" style=" word-break: break-word; resize: none;" name="file_content" placeholder="Enter file content..."><?php echo $fileContent; ?></textarea>
        </div>
        
    </form>
    <style type="text/css">
        .item{
            box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);
            text-decoration: none;
            text-align: center;
            width: 130px;
            height: 30px;
            background: #357AE2;
            border: 1px solid black;
            border-radius: 5px;
            margin: 10px;
            color: black;
            font-size: 15px;
        }
        .item:hover{background: #004CBE;}
        .items{
            margin-left: 37%;
        }
        #span{
            position: relative;
            top:25% ;
            font-size: 15px;
            text-align: center;
            font-size: 15px;
        }
        .fileContent{
            border: solid 1px #d0d0d0; 
            box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);
            background: white;
            color: #161414;
            border-radius: 10px;
            font-size: 20px;
            height: 1500px;
            word-break: break-word; 
            resize: none;
            width: 80%;
            margin-left: 10%;
        }
        .path{
            box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.25);
            background: white;
            color: #161414;
            border-radius: 5px;
            border:1px solid black;
            margin: 10px;
            width: auto;
            height: 30px;
            font-size: 15px;
        }
        body{
            background-color: #e4e9eb;
        }

    </style>
</body>
