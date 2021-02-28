
function CheckCollision(RectA, RectB){
	if ((RectA.PosX < RectB.PosX + RectB.Width) &&
		(RectB.PosX < RectA.PosX + RectA.Width) &&
		(RectA.PosY < RectB.PosY + RectB.Height) &&
		(RectB.PosY < RectA.PosY + RectA.Height)){
		return true;
    }
	return false;
}

function Ship(X,Y,W,H){
	this.PosX = X;
	this.PosY = Y;
	this.Width = W;
	this.Height = H;
	var img;
	var Life = 3;
}

var Player = new Ship (320,400,80,59);
var Enemy = [
	new Ship ((Math.random()*600),(Math.random()*-400),50,90),
	new Ship ((Math.random()*600),(Math.random()*-400),50,90),
	new Ship ((Math.random()*600),(Math.random()*-400),50,90),
	new Ship ((Math.random()*600),(Math.random()*-400),50,90),
	new Ship ((Math.random()*600),(Math.random()*-400),50,90)
];


var scene = 0;	
var img = {}
function joc(){
	switch(scene){
		case 0:
			inicialitzacioICarregaImatges();
			break;
		case 1:
			esperarCarregarImatges();
			break;
		case 2:
			loopGame();
			break;
	}

	requestAnimationFrame(joc);
}


function inicialitzacioICarregaImatges(){
	img[0] = document.createElement("img");
	img[0].src = "./image/bg/bg1.png";
	img[1] = document.createElement("img");
	img[1].src = "./image/bg/bg2.png";
	img[2] = document.createElement("img");
	img[2].src = "./image/bg/bg3.png";
	img[3] = document.createElement("img");
	img[3].src = "./image/bg/bg4.png";
	Player.img = document.createElement("img");
	Player.img.src = "./image/ship.png";
	for (var i =0; i <  Enemy.length; i++) {
		Enemy[i].img = document.createElement("img");
		Enemy[i].img.src = "./image/enemy.png";
	}

	scene = 1;
}

function esperarCarregarImatges(){
	var loading = false;
	if (Player.img.complete == true && img[1].complete&& img[3].complete && img[0].complete && img[2].complete && Enemy[0].img.complete == true && Enemy[1].img.complete == true && Enemy[2].img.complete == true && Enemy[3].img.complete == true && Enemy[4].img.complete == true){
		loading = true;
	}
	
	if (loading == true){
		scene = 2;
	}
}


var bgY=240;
var bgX=((Math.random()*640)-60);
var bg2Y=40;
var bg2X=((Math.random()*300));
var bg3Y=300;
var bg3X=((Math.random()*300));

var dirVector=320;
var spacebar;
var rightArrow;
var leftArrow;
function movPlayer(){
    $(document).ready(function(){
        $(document).keydown(function(event){
            var keycode = (event.keycode ? event.keyCode : event.which);
            if(keycode==32){
                spacebar=true;
            }
            if(keycode==39){
                rightArrow=true;
            }
            if(keycode==37){
                leftArrow=true;        
            }
        });
        
        $(document).keyup(function(event){
            var keycode = (event.keycode ? event.keyCode : event.which);
            
            if(keycode==32){
                spacebar=false;
            }
            if(keycode==39){
                rightArrow=false;
            }
            if(keycode==37){
                leftArrow=false;
            }
        });
        
    });
    
    if(rightArrow==true){
        dirVector=dirVector+5;    
        Player.PosX=dirVector;     
    }
    if(leftArrow==true){
        dirVector=dirVector-5;
        Player.PosX=dirVector;    
    }
    if(dirVector<0){
        dirVector=0;
        Player.PosX=dirVector;
    }
    if(dirVector>560){
        dirVector=560;
        Player.PosX=dirVector;
    }
} 


function repeatBG(){
	if (bgY> 500) {
		bgY = -300;
		bgX = ((Math.random()*640)-60);
	}
	if (bg2Y> 500) {
		bg2Y=-300;
		bg2X=((Math.random()*300));
	}
	if (bg3Y> 500) {
		bg3Y=-300;
		bg3X=((Math.random()*300));
	}
}
function enemyMov(){
	for (var i = 0; i < Enemy.length; i++) {
		if (Enemy[i].PosY <= 500) {
		Enemy[i].PosY= Enemy[i].PosY+1;
		}else{
			Enemy[i].PosX = (Math.random()*600);
			Enemy[i].PosY = (Math.random()*-400);
		}
	}
}

function respEnemy(){
	for (var i = 0; i < Enemy.length; i++) {
		if (CheckCollision(Player,Enemy[i])) {
			Enemy[i].PosX = (Math.random()*600);
			Enemy[i].PosY = (Math.random()*-400);
			Player.Life -= 1;
			if (Player.Life <= 0) {
				scene = 4; // Where 4 is Game Over Scene
			}
		}
	}
	
}

function loopGame(){
	var jocActiu = true; 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	repeatBG();
	movPlayer();
	enemyMov();
	
	ctx.clearRect(0,0,640,480);	
	ctx.drawImage(img[0],0,0);
	ctx.drawImage(img[2],bg2X,(bg2Y=bg2Y + 1));
	ctx.drawImage(img[3],bg3X,(bg3Y=bg3Y + 1));
	ctx.drawImage(img[1],bgX,(bgY=bgY + 2));

	if (Player.PosX <=0) {
		Player.PosX = 0;
	}if (Player.PosX >=640) {
		Player.PosX = 640;
	}

	console.log(Enemy[0].PosX + " " +Enemy[0].PosY);
	ctx.drawImage(Enemy[0].img,Enemy[0].PosX,Enemy[0].PosY)
	
	ctx.drawImage(Player.img, Player.PosX, Player.PosY);
	
}
