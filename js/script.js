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

var file = loadFile("http://localhost/projets/listProjets.txt");
console.log(file);
var s = file.split('.');
for (const ss in s){
  if( s[ss] != null && s[ss] != ""){
    var file = loadFile("http://localhost/projets/projetTextFiles/" + s[ss] + ".txt")
    var t = file.split('.');
    if(ss == 0){
      var i = Number(ss) + 1;
      document.getElementById("nom1").innerHTML = "Nom : "+ t[0];
      document.getElementById("dev1").innerHTML = "Developpeur : "+ t[1];
      document.getElementById("langue1").innerHTML = "Langage : "+ t[2];
      document.getElementById("env1").innerHTML = "Environement : "+ t[3];
      document.getElementById("desc1").innerHTML = "Description : "+ t[4]; 
  }else if(ss == 1){
      document.getElementById("nom2").innerHTML = "Nom :  t[0]";
      document.getElementById("dev2").innerHTML = "Developpeur : "+ t[1];
      document.getElementById("langue2").innerHTML = "Langage : "+ t[2];
      document.getElementById("env2").innerHTML = "Environement : "+ t[3];
      document.getElementById("desc2").innerHTML = "Description : "+ t[4]; 
  }else if(ss == 2){
      document.getElementById("nom3").innerHTML = "Nom : "+ t[0];
      document.getElementById("dev3").innerHTML = "Developpeur : "+ t[1];
      document.getElementById("langue3").innerHTML = "Langage : "+ t[2];
      document.getElementById("env3").innerHTML = "Environement : "+ t[3];
      document.getElementById("desc3").innerHTML = "Description : "+ t[4]; 
  }
  } 
}
