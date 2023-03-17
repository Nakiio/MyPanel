window.onclick = e => {
    var id = e.target.id;
    var listIdTask = ["task0","task1","task2","task3","task4","task5","task6","task7","task8","task9","task10","task11"];
    var li = document.getElementById(id);
    for(var i = 0; i < listIdTask.length; i++){
      if(id == listIdTask[i]){
        var fileName = li.innerHTML;
        var path = '/data/tasks/' + fileName;
        var is_do = loadFile("http://localhost/data/tasks/" + fileName);
        console.log(is_do);
        if(is_do == "true"){
          is_do = "false"
          li.style = "text-decoration: none;";
        }else {
          is_do = "true"
          li.style = "text-decoration:line-through;";
        }
        console.log(is_do);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/php/create_file.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
            }
        }
        xhr.send("file_path=" + path + "&is_content=true&file_content=" + is_do);
            break;
      }
    }
  
}

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}