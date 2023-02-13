      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;
      var videoId;
      var button = document.getElementById("play");
      var singing = document.getElementById('singing');
      singing.style.display = "none";
      var CurrentSong;
      var timer;
      var timerRunning = false;
      var elapsedTime = 0;
      var songList = [];
      var random = false;

      function onPlayerReady(event) {
        player.mute();
        event.target.playVideo();
        var title = player.getVideoData().title;
        var author = player.getVideoData().author;
        var formattedDuration = formatDuration(player.getDuration()); 
        const today = new Date();
        var month = today.getMonth() + 1;
        var date = today.getDate() + "/" + month + "/" + today.getFullYear();
        const songInfos = [formattedDuration,title,"https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg",videoId,date];
        var result = [];
        $.ajax({
          url: "http://localhost/data/songs.json", 
          type: "GET", 
          dataType: "json",
          success: function(response) {
            result = JSON.parse(response);
            var duplicated = false;
            for(var i = 0; i < result.length; i++) {
              if(result[i][1][1] === title) {
                duplicated = true;
                break;
              }
            }
            if(!duplicated) {
              result.push([songInfos[1], songInfos]);
              songList.push([songInfos[1], songInfos]);
              var jsonData = JSON.stringify(result);
              $.ajax({
                method: "POST",
                url: "http://localhost/php/song_save.php",
                data: { data: jsonData }
              })
              .done(function( response ) {
                alert("La musique a été ajoutée à la playlist");
                show_songs();
              });
            } else {
              alert("Cette musique est déjà dans votre playlist");
            }
          },
          error: function(xhr, status, error) {
            console.log("efsfgsd");
            if (xhr.status === 404) {
              $.ajax({
                method: "POST",
                url: "http://localhost/php/song_save.php",
                data: { data: "[]" }
              })
              .done(function( response ) {
                result.push([songInfos[1], songInfos]);
                var jsonData = JSON.stringify(result);
                $.ajax({
                  method: "POST",
                  url: "http://localhost/php/song_save.php",
                  data: { data: jsonData }
                })
                .done(function( response ) {
                  alert("Le fichier a été créé et la musique a été ajoutée à la playlist");
                  show_songs();
                });
              });
            }
          }
        });
      }
      
      show_songs();
      function show_songs() {
        $.ajax({
          url: "http://localhost/data/songs.json", 
          type: "GET", 
          dataType: "json",
          success: function(response) {
            var responseJson = JSON.parse(response);
            var result = responseJson;
            var newSong = songList.length - 1;
            if(newSong === -1){
              console.log("wsdkjnqsdkjfnqs");
            }else{
              result.push(songList[songList.length - 1])
            }
            document.getElementById('ScrollStyle').innerHTML = "";
            for(var i = 0; i < result.length; i++) {
              var div = document.createElement('div');
              songList.push(result[i]);
              div.id = result[i][1][3]
              div.addEventListener("click", (function(i) {
                return function() {
                  var id = result[i][1][3];
                  var previousPalyer = document.getElementById("player");
                  if (previousPalyer) {
                    previousPalyer.parentNode.removeChild(previousPalyer);
                  }
                  var p = document.createElement('div');
                  p.id = "player";
                  document.getElementById('ScrollStyle').appendChild(p);
                  player = new YT.Player("player", {
                    height: "0",
                    width: "0",
                    videoId: id,
                    events: {
                      "onReady": onPlayerReadyClick,
                      'onStateChange': onPlayerStateChange
                    }
                  });
                }
              })(i));
              var img = document.createElement('img');
              img.src = result[i][1][2];
              div.appendChild(img);

              var titleModif = result[i][1][1];
              if (result[i][1][1].length > 20) {
                titleModif = "";
                for(var o = 0; o<=20; o++){
                  titleModif = titleModif + result[i][1][1][o];
                }
                titleModif = titleModif + "..."
                
              }
              var title = document.createElement('h1');
              title.innerHTML = titleModif;
              title.classList.add("Titre");
              div.appendChild(title);

              var date = document.createElement('h1');
              date.innerHTML = result[i][1][4]
              date.classList.add("Ajoute");
              div.appendChild(date);

              var duration = document.createElement('h1');
              duration.innerHTML = result[i][1][0]
              duration.classList.add("duree");
              div.appendChild(duration);

              document.getElementById('ScrollStyle').appendChild(div);
            }

          }
        });
      }

      var addButton = document.getElementById("addSong");
      addButton.addEventListener("click", function() {
        var videoUrl = prompt("Entrer l'URL de la video :");
        videoId = getYoutubeVideoId(videoUrl);
        var previousPalyer = document.getElementById("player");
        if (previousPalyer) {
          previousPalyer.parentNode.removeChild(previousPalyer);
        }
        var p = document.createElement('div');
        p.id = "player";
        document.getElementById('ScrollStyle').appendChild(p);
        player = new YT.Player("player", {
          height: "0",
          width: "0",
          videoId: videoId,
          events: {
            "onReady": onPlayerReady
          }
        });
      });

      var count = 1;
      button.addEventListener("click", function() {
        count++;
        if (count % 2 == 0) {
          player.pauseVideo();
          button.value = ">";
          singing.style.display = "none";
        } else {
          player.playVideo();
          button.value = "||";
          singing.style.display = "block";
        }
      });

      function onPlayerReadyClick(event) {
        elapsedTime = 0;
        event.target.playVideo();
        CurrentSong = player.getVideoData().video_id;
        var titleSong = document.getElementById('titleSong');
        titleSong.innerHTML = player.getVideoData().title;
        singing.style.display = "block"
        button.value = "||";
        document.querySelector('.durationTotal').innerHTML = formatDuration(player.getDuration());
        document.getElementById("volumeSlider").addEventListener("input", function() {
          player.setVolume(this.value);
        });
      }

      function formatDuration(duration) {
        var minutes = Math.floor(duration / 60);
        var seconds = duration % 60;
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }

      function getYoutubeVideoId(url) {
        var videoId = url.split("v=")[1];
        var ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
      }

      function changeSong(button){
        var whatSong;
        var buttonValue = button.value;
        if(buttonValue === ">>|"){
          whatSong = "next";
        }else if(buttonValue === "|<<"){
          whatSong = "former";
        }
        getSong(whatSong, function(musiqueId) {
          runSong(musiqueId);
        });
        
      }

      function getSong(string, callback) {
      var musiqueId;
      $.ajax({
        url: "http://localhost/data/songs.json", 
        type: "GET", 
        dataType: "json",
        success: function(response) {
          result = JSON.parse(response);
          if(document.getElementById('player')){
            for(var i  = 0; i < result.length; i++){
              if(result[i][1][3] === CurrentSong){
                if(string === "former"){
                  if(i === 0){
                    musiqueId = result[0][1][3];
                  }else{
                    musiqueId = result[i-1][1][3];
                  }
                }else if(string === "currently"){
                  musiqueId = result[i][1][3];
                }else if(string === "next"){
                  if(i === result.length - 1){
                    musiqueId = result[i][1][3];
                  }else{
                    musiqueId = result[i+1][1][3];
                  }
                }
              }
            }
          }else{
            if(string === "former"){
              musiqueId = result[result.length-1][1][3];
            }else if(string === "next"){
              musiqueId = result[0][1][3];
            }
          }
          callback(musiqueId);
        }
      });
    }
    
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            if (!timerRunning) {
                startTimer(player.getDuration(), document.querySelector('.duration'));
                timerRunning = true;
            }
        } else {
            clearInterval(timer);
            timerRunning = false;
        }
    }

    function startTimer(duration, display) {
        var minutes, seconds;
        timer = setInterval(function () {
            elapsedTime++;
            minutes = parseInt(elapsedTime / 60, 10);
            seconds = parseInt(elapsedTime % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            var progress = document.querySelector('#progressSong');
            progress.max = duration;
            progress.value = elapsedTime;

            display.textContent = minutes + ":" + seconds;
            if(parseInt(duration) - 1 === elapsedTime){
              if(random){
                randomSong = songList[Math.floor(Math.random() * songList.length)][1][3];
                runSong(randomSong);
              }else{
                getSong("next", function(musiqueId) {
                  runSong(musiqueId);
                });
              }
            }
        }, 1000);
    }
    function runRandomSong(){
      if(random){
        random = false
        runSong(songList[0][1][3]);
      }else{
        random = true;
        runSong(songList[Math.floor(Math.random() * songList.length)][1][3]);
      }
      
      
    }

    function runSong(id){
      var previousPalyer = document.getElementById("player");
      if (previousPalyer) {
        previousPalyer.parentNode.removeChild(previousPalyer);
      }
      var p = document.createElement('div');
      p.id = "player";
      document.getElementById('ScrollStyle').appendChild(p);
      player = new YT.Player("player", {
            height: "0",
            width: "0",
            videoId: id,
            events: {
                  "onReady": onPlayerReadyClick,
                  'onStateChange': onPlayerStateChange
            }
      });
    }
