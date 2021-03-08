
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
function Misile(X,Y,W,H){
	this.PosX = X;
	this.PosY = Y;
	this.Width = W;
	this.Height = H;
	var img;
}
var Player = new Ship (320,400,80,59);
var Points=0;
var Enemy = [
	new Ship ((Math.random()*600),(Math.random()*-600),60,59),
	new Ship ((Math.random()*600),(Math.random()*-600),60,59),
	new Ship ((Math.random()*600),(Math.random()*-600),60,59),
	new Ship ((Math.random()*600),(Math.random()*-600),60,59),
	new Ship ((Math.random()*600),(Math.random()*-600),60,59)
];

var Misiles = [
	new Misile (0,0,60,59),
	new Misile (0,0,60,59),
	new Misile (0,0,60,59),
	new Misile (0,0,60,59),
	new Misile (0,0,60,59)
];
//Sound Variables
var HitSound;
var HitSoundR;
var ShootSound;
var ShootSoundR;
var BGMusic;



var scene = 0;	
var img = {};

var Enemyposy=0.5;

//Background Variables
var bgY=240;
var bgX=((Math.random()*640)-60);
var bg2Y=40;
var bg2X=((Math.random()*300));
var bg3Y=300;
var bg3X=((Math.random()*300));


//Variables for keyboard controls and movement
var dirVector=320;
var dirVectorY=400;
var spacebar = false;
var rightArrow = false;
var leftArrow = false;
var upArrow = false;
var downArrow = false;

//Variables for Shooting + audio when shooting
var ticksForSpacebar =101;
var bulletIndex=0;
var audioAlradyPlayingShoot=false;
var audioAlradyPlaying = false;

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
		case 3:
			loopMainMenu();
			break;
		case 4:
			loopGameOver();
			break;
	}

	requestAnimationFrame(joc);
}


function inicialitzacioICarregaImatges(){
	HitSound = document.createElement("audio");
	HitSound.src = "./sounds/HitSound.mp3";
	HitSound.setAttribute("preload", "auto");
	HitSound.setAttribute("controls", "none");
	HitSound.style.display = "none";

	HitSoundR = document.createElement("audio");
	HitSoundR.src = "./sounds/HitSound.mp3";
	HitSoundR.setAttribute("preload", "auto");
	HitSoundR.setAttribute("controls", "none");
	HitSoundR.style.display = "none";

	ShootSound = document.createElement("audio");
	ShootSound.src = "./sounds/ShootSound.mp3";
	ShootSound.setAttribute("preload", "auto");
	ShootSound.setAttribute("controls", "none");
	ShootSound.style.display = "none";

	ShootSoundR = document.createElement("audio");
	ShootSoundR.src = "./sounds/ShootSound.mp3";
	ShootSoundR.setAttribute("preload", "auto");
	ShootSoundR.setAttribute("controls", "none");
	ShootSoundR.style.display = "none";

	BGMusic = document.createElement("audio");
	BGMusic.src = "./sounds/bgMusic.mp3";
	BGMusic.setAttribute("preload", "auto");
	BGMusic.setAttribute("controls", "none");
	BGMusic.style.display = "none";


	img[0] = document.createElement("img");
	img[0].src = "./image/bg/bg1.png";
	img[1] = document.createElement("img");
	img[1].src = "./image/bg/bg2.png";
	img[2] = document.createElement("img");
	img[2].src = "./image/bg/bg3.png";
	img[3] = document.createElement("img");
	img[3].src = "./image/bg/bg4.png";
	img[4] = document.createElement("img");
	img[4].src = "./image/logos/logo.png";
	Player.img = document.createElement("img");
	Player.img.src = "./image/ship.png";
	for (var i =0; i <  Enemy.length; i++) {
		Enemy[i].img = document.createElement("img");
		Enemy[i].img.src = "./image/enemy.png";
	}	
	for (var i =0; i <  Misiles.length; i++) {
		Misiles[i].img = document.createElement("img");
		Misiles[i].img.src = "./image/missile.png";
	}

	scene = 1;
}

function esperarCarregarImatges(){
	var loading = false;
	if (Player.img.complete == true && img[1].complete&& img[4].complete && img[3].complete && img[0].complete && img[2].complete && Enemy[0].img.complete == true && Enemy[1].img.complete == true && Enemy[2].img.complete == true && Enemy[3].img.complete == true && Enemy[4].img.complete == true&& Misiles[0].img.complete == true && Misiles[1].img.complete == true && Misiles[2].img.complete == true && Misiles[3].img.complete == true && Misiles[4].img.complete == true){
		loading = true;
	}
	
	if (loading == true){
		BGMusic.play();
		scene = 3;
	}
}




function shoot(){
	//When called a bullet will shoot from the players position
	//ticksForSpacebar is the amount of time that has elapsed since
	//the last missile
	if (ticksForSpacebar >= 40) {	
		ticksForSpacebar=0;
		if (audioAlradyPlaying) {
			ShootSoundR.play();
			audioAlradyPlayingShoot = false;
		}
		else{
			audioAlradyPlayingShoot = true,
			ShootSound.play();
		}
		Misiles[bulletIndex].PosX = Player.PosX + 25;
		Misiles[bulletIndex].PosY = Player.PosY;
		bulletIndex += 1;
		if (bulletIndex == (Misiles.length)-1) {
			bulletIndex = 0;
		}
	}
}

function checkForShooting(){
	for (var i = 0; i < Misiles.length; i++) {
		if (Misiles[i].PosY >= 0) {
			Misiles[i].PosY= Misiles[i].PosY-3;
			for (var iy = 0; iy < Enemy.length; iy++) {
				if (CheckCollision(Misiles[i],Enemy[iy])) {
					Misiles[i].PosX = -90;
					Misiles[i].PosY = -90;
					Enemy[iy].PosX = (Math.random()*600);
					Enemy[iy].PosY = (Math.random()*-400);
					Points = Points+ 100;
					Enemyposy = Enemyposy + 0.1;
					if (audioAlradyPlaying) {
						HitSoundR.play();
						audioAlradyPlaying = false;
					}
					else{
						audioAlradyPlaying = true,
						HitSound.play();
					}
				}
			}
		}else{
			Misiles[i].PosX = -90;
			Misiles[i].PosY = -90;
		}
	}
}
function showMisiles(ctx){
	//Display all missiles
	for (var i = 0; i < Misiles.length; i++) {
		ctx.drawImage(Misiles[i].img,Misiles[i].PosX,Misiles[i].PosY);
	}
	ticksForSpacebar = ticksForSpacebar +1;
}





function movPlayer(){
	//This function checks what key's pressed and preforms an 
	//action aferwards
    $(document).ready(function(){
        $(document).keydown(function(event){
            var keycode = (event.keycode ? event.keyCode : event.which);
            if(keycode==32 ){
            	spacebar=true;
            }
            if(keycode==39){
                rightArrow=true;
            }
            if(keycode==37){
                leftArrow=true;        
            }
            if(keycode==38){
                upArrow=true;        
            }
            if(keycode==40){
                downArrow=true;        
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
            if(keycode==38){
                upArrow=false;        
            }
            if(keycode==40){
                downArrow=false;        
            }
        });
        
    });
    if (spacebar) {
    	shoot();
    }
    if(downArrow==true){
        dirVectorY=dirVectorY+6;    
        Player.PosY=dirVectorY;     
    }
    if(upArrow==true){
        dirVectorY=dirVectorY-6;
        Player.PosY=dirVectorY;    
    }
    if(rightArrow==true){
        dirVector=dirVector+6;    
        Player.PosX=dirVector;     
    }
    if(leftArrow==true){
        dirVector=dirVector-6;
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
	//This function checks if the bakground is not on the players 
	//view and it teleports above the screen to come down again
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
var enemySpriralValue=0.0;
var definer = 1;
var timenow = new Date;
var timeelapsed = 0.0;

function timerCount(){
	var timeend = new Date;
	timeelapsed = timeend.getTime() - timenow.getTime();
}

function enemySpriral(){
	//Changes the enemy X directon int ordrer to produce a spriral effect.
	//Instead of using Math.Sin this way we hav more control of what amount
	//we want the enemy to sprital both left and right
	if (enemySpriralValue >= 2) {definer = -1;}
	if (enemySpriralValue <= -2) {definer = 1;}
	enemySpriralValue = (enemySpriralValue+(0.01*definer));
}

function enemyMov(){
	//This function will alwasy be called and will bring down the enemy
	//until it is below the screen and it will also reduce players points
	for (var i = 0; i < Enemy.length; i++) {
		if (Enemy[i].PosY <= 500) {
		Enemy[i].PosY= Enemy[i].PosY + Enemyposy+0.5;
		if (timeelapsed >= 50000 && timeelapsed <= 90000) {enemySpriral();}
		else{
			enemySpriralValue = 0.0;
		}
		if (timeelapsed >= 160000) {enemySpriral();}

		Enemy[i].PosX = Enemy[i].PosX + enemySpriralValue;
		}else{
			Enemy[i].PosX = (Math.random()*600);
			Enemy[i].PosY = (Math.random()*-600);
		}
	}
}

function respEnemy(ctx){
	//This part will always render the enemy regardless if 
	//it is on the canvas or not
	for (var i = 0; i < Enemy.length; i++) {
		ctx.drawImage(Enemy[i].img,Enemy[i].PosX,Enemy[i].PosY);
	}
	//Checks if any enemy is touching the player 
	for (var i = 0; i < Enemy.length; i++) {
		if (CheckCollision(Player,Enemy[i])) {
			Enemy[i].PosX = (Math.random()*600);
			Enemy[i].PosY = (Math.random()*-600);
			Player.Life -= 1;
			if (Player.Life <= 0) {
				scene = 4; // Where 4 is Game Over Scene
			}
		}
	}
}




function incrementYEnemy(){
	//Simple function to add more velocity to enemies when called
	Enemyposy = Enemyposy + 0.005;
}

function loopGame(){
	var jocActiu = true; 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	timerCount();
	repeatBG();
	movPlayer();
	enemyMov();
	checkForShooting();

	ctx.clearRect(0,0,640,480);	
	//Displaying Background parallax
	ctx.drawImage(img[0],0,0);
	ctx.drawImage(img[2],bg2X,(bg2Y=bg2Y + 0.5));
	ctx.drawImage(img[3],bg3X,(bg3Y=bg3Y + 1));
	ctx.drawImage(img[1],bgX,(bgY=bgY + 1.5));
	
	//Out of bounds check
	if (Player.PosX <=0) {
		Player.PosX = 0;
	}if (Player.PosX >=640) {
		Player.PosX = 640;
	}
	if (Player.PosY <=0) {
		Player.PosY = 0;
	}if (Player.PosY >=420) {
		Player.PosY = 420;
	}
	
	respEnemy(ctx); //Showing Enemies
	showMisiles(ctx); //Displaying Bullets/Missiles
	ctx.drawImage(Player.img, Player.PosX, Player.PosY); //Showing Player
	ctx.font = "47px DotGothic16"; //Setting UI Font
	ctx.fillStyle = "white";//Setting UI text Color
	ctx.fillText(("HP: "+ Player.Life), 10, 50); //Displays Lifes
	ctx.fillText(("Points: "+ Points), 10, 100); //Displays points
	ctx.fillText(("Time: "+ (Math.floor(timeelapsed/1000))),10, 460)
}



function checkForConfirmation() {
	$(document).ready(function(){
        $(document).keydown(function(event){
            var keycode = (event.keycode ? event.keyCode : event.which);
            if(keycode==32 && scene != 2){
            	scene = 2;
            	restaringLoop();
            }
        });
    });
}
function restaringLoop(){
	//Function to restart all propieties of a game
	for (var i = 0; i < Enemy.length; i++) {
		Enemy[i].PosX = (Math.random()*600);
		Enemy[i].PosY = (Math.random()*-600);
	}
	Player.Life = 3;
	bgX=((Math.random()*640)-60);
	bg2Y=40;
	bg2X=((Math.random()*300));
	bg3Y=300;
	bg3X=((Math.random()*300));
	ticksForSpacebar =101;
	bulletIndex=0;
	audioAlradyPlayingShoot=false;
	audioAlradyPlaying = false;
	Enemyposy = 0.01;
	Points = 0;
	timeelapsed = 0.0;
	timenow = new Date;
}

function loopMainMenu() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,640,480);	
	//Creating parallax
	ctx.drawImage(img[0],0,0);
	ctx.drawImage(img[2],bg2X,bg2Y);
	ctx.drawImage(img[3],bg3X,bg3Y);
	ctx.drawImage(img[1],bgX,bgY);
	ctx.drawImage(img[4],50,100);
	ctx.font = "47px DotGothic16";
	ctx.fillStyle = "white";
	ctx.fillText("Press SPACEBAR to start", 50, 400); 
	checkForConfirmation();
	
}
function loopGameOver(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,640,480);	
	//Creating parallax
	ctx.drawImage(img[0],0,0);
	ctx.drawImage(img[2],bg2X,bg2Y);
	ctx.drawImage(img[3],bg3X,bg3Y);
	ctx.drawImage(img[1],bgX,bgY);
	ctx.font = "47px DotGothic16";
	ctx.fillStyle = "white";
	ctx.fillText("Game Over", 220, 100); 
	ctx.fillText("Press SPACEBAR to restart", 32, 400); 
	checkForConfirmation();
	
}
