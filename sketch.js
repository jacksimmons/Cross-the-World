// main variables
var player;
var playerImage;
var bg

// gravity boundaries for all levels
var startbar;
var endbar;

// image for all levels
var levelImage;

// jumping
var jump = false;

// score
var score = 0;

// the speed for the player
var playerSpeed = 0;

// sound
var sound;

// actual dimensions of canvas
var SCENE_W = 3800
var SCENE_H = 7000

// menu screen
var gameStarted = false;

// platforms for level 1
var bar1;
var bar2;
var bar4;
var bar5;
var bar6;
var bar7;
var bar8;
var bar9;
var bar10;

// new levels
var level2;
var level3;
var level4;
var level5;

// song
//var song;
//var splay = false;
//var loopStart = 0.01;
//var loopDuration = 0.01;

// death boundary
var death;
var dead = false

// lives
var lives = 3;


// textsprites

var level1png;




// loads anything into the game before the actual game starts running
function preload() {
  playerImage=loadImage("/Assets/character.png")
	levelImage=loadImage("/Assets/bgf.png")
	song = loadSound("/Sounds/backtrack.mp3")
  level1png=loadImage("/Assets/level1.png") 
}


// creates the characters, backgrounds and any other assets
function setup() {
  
	// create canvas
	createCanvas(775, 500);
	
	// create groups
	Ground = new Group();
	Platforms = new Group();
    
		// creating the background
		bg = createSprite(2000,0)
		bg.addImage(levelImage)
		//background(levelImage)

    // creating level text
    l1txt = createSprite(140,240)
    l1txt.addImage(level1png)

		
		// creating the ground
		startbar = createSprite(213,844,600, 1000)
		endbar = createSprite(3541,844, 650,1000)
		
		// creating the platforms
		bar1 = createSprite(680,300, 200, 10)
		bar2 = createSprite(920,250, 140, 10)
		bar3 = createSprite(1200,210,250,10)
		bar4 = createSprite(1500,270,200,10)
		bar5 = createSprite(1780,300,150,10)
		bar6 = createSprite(1940,240,160,10)
		bar7 = createSprite(2200,200,180,10)
		bar8 = createSprite(2450,160,200,10)
		bar9 = createSprite(2690,250,140,10)
		bar10 = createSprite(3000,290,200,10)

		// creating new level switches
		level2 = createSprite(3800,250,50,200)
		level3 = createSprite(3800,700,50,200)
		level4 = createSprite(3800,700,50,200)
		level5 = createSprite(3800,700,50,200)
		
		// making the ground invisible
		startbar.visible = false
		endbar.visible = false

		// making level switches invisible
		level2.visible = false
		level3.visible = false
		level4.visible = false
		level5.visible = false


		// adding the ground to the group
		Ground.add(startbar)
		Ground.add(endbar)

		// adding the platforms to the group
		Platforms.add(bar1)
		Platforms.add(bar2)
		Platforms.add(bar3)
		Platforms.add(bar4)
		Platforms.add(bar5)
		Platforms.add(bar6)
		Platforms.add(bar7)
		Platforms.add(bar8)
		Platforms.add(bar9)
		Platforms.add(bar10)

    // creating player and resizing
    player =  createSprite(0,300)
    player.addImage(playerImage)

    
}


// the main code
function draw() {
background(136,194,246)
frameRate(60);

// fall boundary
if (player.position.y > 1000 ){

	player.position.y =  310
	player.position.x = 0
	lives = lives - 1
  


}



// character boundaries
	if(player.position.x < 0)
    player.position.x = 0;
	if(player.position.y < 0)
    player.position.y = 0;

// camera settings

	// camera follows player at certain distances (the 110 to the right of the player)
	camera.position.x = player.position.x + 110;
	camera.position.y = player.position.y - 50;

	// how much the camera is zoomed in from default zoom
	camera.zoom = 1.2

	// if player goes past the map width sets the players position to max width preventing them going past it
	if(player.position.x > SCENE_W)
    player.position.x = SCENE_W;

	// same as above but for map height
	if(player.position.y > SCENE_H)
    player.position.y = SCENE_H;

	// same as player but wont let the camera show past map width
	if(camera.position.x > SCENE_W)
    camera.position.x = SCENE_W;

	// sane as above but for map height
	if(camera.position.y < 0)
    camera.position.y = 0;
		
// gravity
player.position.y += playerSpeed;


// stops character falling on ground and platforms
if (player.collide(Ground) || player.collide(Platforms)) {
	jump = false;
} 
else playerSpeed++;

// if you hit level 2 boundary level 2 begins
if (player.collide(level2)) {
	level2.position.y = 750
	level3.position.y = 250
	player.position.x = 0
	l1txt.position.y = 3000
	bar1.position.y = 350
	bar2.position.x = 850
	bar3.position.x = 1150
	bar3.position.y = 170
	bar4.position.x = 1500
	bar4.position.y = 120
	bar5.position.x = 1830
	bar5.position.y = 260
	bar6.position.x = 2130
	bar7.position.x = 2450
	bar7.position.y = 220
	bar8.position.x = 2800
	bar9.position.x = 3100
	bar10.position.x = -100
	bar10.position.y = 500
	bar10.visible.false
}

// if you hit level 3 boundary level 3 begins
if (player.collide(level3)) {
	level3.position.y = 750
	level4.position.y = 250
	player.position.x = 0
}

// if you hit level 4 boundary level 4 begins
if (player.collide(level4)) {
	level4.position.y = 750
	level5.position.y = 250
	player.position.x = 0
}

// if you hit level 5 boundary level 5 begins
if (player.collide(level5)) {
	level4.position.y = 750
	level5.position.y = 750
	player.position.x = 0
}


//if (splay === false) {
//song.play();
//song.loop();
//splay = true
//}


// the tells everything to be drawn and be executed
drawSprites()
keyboardCode()
}


// all the movement keys
function keyboardCode(){
  
	// moves character to the left
  if (keyIsDown(LEFT_ARROW) || keyIsDown('A'.charCodeAt(0)) && keyIsPressed === true) {
    player.position.x -= 6;
	}

	// moves character to the right
  if (keyIsDown(RIGHT_ARROW) || keyIsDown('D'.charCodeAt(0)) && keyIsPressed === true) {
    player.position.x += 6;
	}

	// character jump
  if ((keyIsDown(UP_ARROW) || keyIsDown('W'.charCodeAt(0))) && keyIsPressed === true && jump === false) {
    jump = true;
    player.position.y -= 1
    playerSpeed = -15;
	}

	// position of character
	if (keyIsDown(ENTER) && keyIsPressed === true) {
		console.log("Player position X: " + player.position.x)
		console.log("Player position Y: " + player.position.y)
	}
}