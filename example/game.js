
//Variables globals
var scene = 0;	// Serveix per controlar en qui moment del joc estem.

//Imatges
var img;		// Guarda  el "punter" de la imatge


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
	// Aquesta linea deixeu-la al final perque es la que crida de nou a la funcio per fer
	//   el seguent frame. 
	requestAnimationFrame(joc);
}


function inicialitzacioICarregaImatges(){
	// Aqu� podem inicialitzar les nostres variables del joc i fer les carregues dels fitxers necesaris
	
	// Declarem images a carregar
	img = document.createElement("img");
	img.src = "ship.png";
	// si hi ha m�s imatges, ser�a bo enmagatzamar-les en un array totes juntes.
	scene = 1;
}

function esperarCarregarImatges(){
	var loading = false;
	if (img.complete == true){
		loading = true;
	}
	// Si hi haguessin m�s imatges, no hem de donar el loading com a true fins que no estiguin totes carregades.
	// El canvi de la variable scene nom�s s'ha de produir quan estiguem segur que tot est� carregat.

	if (loading == true){
		scene = 2;
	}
}

function loopGame(){
	var jocActiu = true; // Perqu� creieu que podem fer servir aquesta variable ?

	// **********************
	//Aqu� hi anir�a la l�gica del joc: captures de tecles, moviments d'objectes,,etc.
	//   Penseu tamb� que poden haber crides a funcions, metodes de classes, etc.
	// **********************
	
	//Pintat dels objectes
	// Fem el "gancho" al Canvas.
	var canvas = document.getElementById("myCanvas");
	// Agafem el contex2D, El nostre punt "llapis" que fem servir per pintar.
	var ctx = canvas.getContext("2d");
	
	ctx.clearRect(0,0,640,480);		// Primer metejar el canvas
	ctx.drawImage(img, 10, 400);
	
}
