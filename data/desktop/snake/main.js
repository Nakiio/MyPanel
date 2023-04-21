var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var appleEat = 0;
var grid = 32;
var count = 0;
var isGaming = false;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 8
};


var apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
	console.log(isGaming)
	if(isGaming === true){
	  requestAnimationFrame(loop);
	  if (++count < 4) {
	    return;
	  }

	  count = 0;
	  context.clearRect(0,0,canvas.width,canvas.height);

	  snake.x += snake.dx;
	  snake.y += snake.dy;

	  if (snake.x < 0) {
	  	lost();
	  }else if (snake.x >= canvas.width) {
			lost();
	  }
	  
	  if (snake.y < 0) {
	  	lost();
	  }else if (snake.y >= canvas.height) {
	  	lost();
	  }
	  snake.cells.unshift({x: snake.x, y: snake.y});

	  if (snake.cells.length > snake.maxCells) {
	    snake.cells.pop();
	  }

	  var previousImg = document.getElementById("appleGame");
    if (previousImg) {
      previousImg.parentNode.removeChild(previousImg);
    }
  	var img = document.createElement('img');
  	img.src = "apple.png";
  	var appleX = (window.innerWidth - 800) / 2 + apple.x;
  	var appleY= (window.innerHeight - 800) / 2 + apple.y - 5;
  	img.style = 
  	"position:absolute;" + 
  	"top:" + appleY + "px;" + 
  	"left:" + appleX + "px;";  
  	img.id = "appleGame";
  	document.getElementById("canvasBorder").appendChild(img);

  	console.log(appleX,appleY)

	  context.fillStyle = 'green';
	  snake.cells.forEach(function(cell, index) {
		  context.fillRect(cell.x, cell.y, grid-1, grid-1);
		  if (cell.x === apple.x && cell.y === apple.y) {
		    appleEat += 1;
		    var snakeSize = appleEat + 8;
		    document.getElementById('sankeSize').innerHTML =  snakeSize;
		    document.getElementById('appleEat').innerHTML = appleEat;
		    snake.maxCells++;
		    apple.x = getRandomInt(0, 25) * grid;
		    apple.y = getRandomInt(0, 25) * grid;


		  }

		  for (var i = index + 1; i < snake.cells.length; i++) {
		    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
		      lost();
		    }
		  }
	  });
	}else{
		document.getElementById('transparentBack').style = "display:block;";
	}
}

document.addEventListener('keydown', function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

function lost(){
	document.getElementById('gameMode').innerHTML = "game over";
	var snakeSize = appleEat + 8;
	document.getElementById('sankeSizeResult').innerHTML =  snakeSize;
	document.getElementById('appleEatResult').innerHTML = appleEat;

	document.getElementById('sankeSize').innerHTML =  8;
	document.getElementById('appleEat').innerHTML = 0;
	isGaming = false;
}

function playGame(){
	document.getElementById('transparentBack').style = "display:none;";
	isGaming = true;
	appleEat = 0;
	
	snake.x = 160
	snake.y = 160
	snake.dx = grid
	snake.dy = 0
	snake.cells = []
	snake.maxCells = 8

	apple.x = getRandomInt(0, 25) * grid;
	apple.y = getRandomInt(0, 25) * grid;
	requestAnimationFrame(loop);
}