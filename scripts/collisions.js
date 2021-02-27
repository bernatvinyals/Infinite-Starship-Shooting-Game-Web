// Example to check collision between 2 objects
// Objects must have 4 propierties: 
//   Position X, Position Y, Width and Height
// This propierties define a rectangle area

// This is the function that tells if 2 rectangle area are in collision or not
// If collision happens, function returns true otherwise false

function CheckCollision(RectA, RectB){
	if ((RectA.PosX < RectB.PosX + RectB.Width) &&
		(RectB.PosX < RectA.PosX + RectA.Width) &&
		(RectA.PosY < RectB.PosY + RectB.Height) &&
		(RectB.PosY < RectA.PosY + RectA.Height)){
		return true;
    }
	return false;
}

// To define objects in Javascript, please take a look to this URL
// https://www.w3schools.com/js/js_object_definition.asp
// and all JS Objects sections

// To define object class, use function word.
function Ship(X,Y,W,H){
	this.PosX = X;
	this PosY = Y;
	this.Width = W;
	this.Height = H;
	var img;
	var Life = 3;
}

// To declare object of a class, use new word.
var Player = new Ship (100,100,40,30);
var Enemy = new Ship (200,0,50,90);

// Move enemy or Player changing its PosX or PosY. And use this
//   variables to render its img in Canvas.

Player.PsoX = 50;



// Check Collision example
if (CheckCollision (Player, Enemy)){
	Player.Life -= 1;
	if (Player.Life <= 0) {
		scene = 4; // Where 4 is Game Over Scene
	}
}