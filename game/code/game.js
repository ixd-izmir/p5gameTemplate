// here I define the objects in use in my game, custom names are given so be careful to delete and replace with adequate naming.
var bg01,
  guyBrush,
  cannon,
  cannonBalls,
  cannonRestrainRope,
  door,
  grate,
  keyhole,
  ramrod,
  smallPirate,
  windoww;

var cx, cy; // this variables store the position at the center of the screen (used as origin if you want your game to be centered)
var showInventory=false;  // this boolean checks for activating/disactivating the inventory
var img = [];  // this array contains all the loaded images to be assigned to objects

var testo = "The Curse of Monkey Island";  // this variable holds the text shown above the game frame
var thinPixel;                             // variable for the typeface
var player_left, player_right, player_top, player_bottom;  // variables for the sprites-movements of the player

// the following for definitions are mapping the position of the sprites to load for the movements
var player_l = [{
  'name': 'player_left',
  'frame': {
    'x': 0,
    'y': 0,
    'width': 40,
    'height': 130
  }
}];
var player_r = [{
  'name': 'player_right',
  'frame': {
    'x': 52,
    'y': 0,
    'width': 40,
    'height': 130
  }
}];
var player_t = [{
  'name': 'player_top',
  'frame': {
    'x': 98,
    'y': 0,
    'width': 40,
    'height': 130
  }
}];
var player_b = [{
  'name': 'player_bottom',
  'frame': {
    'x': 144,
    'y': 0,
    'width': 40,
    'height': 130
  }
}];

function preload() {
  thinPixel = loadFont('assets/ThinPixel7-1Yq0.ttf');  // loading font
  img[1] = loadImage("../assets/01_bgx5.png");         // loading images
  img[2] = loadImage("../assets/01_cannon.png");
  img[3] = loadImage("../assets/01_cannonBalls.png");
  img[4] = loadImage("../assets/01_cannonRestrainRope.png");
  img[5] = loadImage("../assets/01_door.png");
  img[6] = loadImage("../assets/01_grate.png");
  img[7] = loadImage("../assets/01_keyhole.png");
  img[8] = loadImage("../assets/01_ramrod.png");
  img[9] = loadImage("../assets/01_rope.png");
  img[10] = loadImage("../assets/01_smallPirate.png");
  img[11] = loadImage("../assets/01_window.png");
  // one way of loading spritesheet
  player_l2 = loadSpriteSheet('assets/00_guybrush.png', player_l);
  player_left = loadAnimation(player_l2);
  // another way of loading spritesheet (more compressed)
  player_right = loadAnimation(new SpriteSheet('assets/00_guybrush.png', player_r));

  player_top = loadAnimation(new SpriteSheet('assets/00_guybrush.png', player_t));
  player_bottom = loadAnimation(new SpriteSheet('assets/00_guybrush.png', player_b));
}

function setup() {
  createCanvas(windowWidth, windowHeight);  //set canvas size
  textFont(thinPixel);   //set font typeface
  textSize(40);          //set font size
  cx = int(width * .5);  //set center of the screen X
  cy = int(height * .5); //set center of the screen Y

  bg01 = createSprite(cx, cy);  // create sprite for background
  bg01.addImage(img[1]);        // assign sprite for background
  roundPos(bg01);               // round to closest round pixel to avoid half pixel mis-alignments

  //create sprite and assign spritesheet for main character as well as click on functions
  guyBrush = createSprite(cx + 90, cy + 27);
  guyBrush.addAnimation('left', player_left);
  guyBrush.addAnimation('right', player_right);
  guyBrush.addAnimation('top', player_top);
  guyBrush.addAnimation('bottom', player_bottom);
  roundPos(guyBrush);
  guyBrush.onMouseOver = function() {
    testo = "hello! it's me Guybrush!";
  }
  guyBrush.onMouseOut = function() {
    testo = "";
  }

  //create sprites and assign images as well as click on functions for each interactive object
  windoww = createSprite(cx - 175, cy + 50);
  windoww.addImage(img[11]);
  roundPos(windoww);
  windoww.onMouseOver = function() {
    testo = "window";
  }
  windoww.onMouseOut = function() {
    testo = "";
  }

  cannon = createSprite(cx - 136, cy + 62);
  cannon.addImage(img[2]);
  roundPos(cannon);
  cannon.onMouseOver = function() {
    testo = "cannon";
  }
  cannon.onMouseOut = function() {
    testo = "";
  }

  cannonBalls = createSprite(cx + 2, cy + 59);
  cannonBalls.addImage(img[3]);
  roundPos(cannonBalls);
  cannonBalls.onMouseOver = function() {
    testo = "cannon balls";
  }
  cannonBalls.onMouseOut = function() {
    testo = "";
  }

  cannonRestrainRope = createSprite(cx - 154, cy + 67);
  cannonRestrainRope.addImage(img[4]);
  roundPos(cannonRestrainRope);
  cannonRestrainRope.onMouseOver = function() {
    testo = "cannon restrain rope";
  }
  cannonRestrainRope.onMouseOut = function() {
    testo = "";
  }

  door = createSprite(cx + 175, cy + 37);
  door.addImage(img[5]);
  roundPos(door);
  door.onMouseOver = function() {
    testo = "door";
  }
  door.onMouseOut = function() {
    testo = "";
  }

  grate = createSprite(cx + 11, cy - 83);
  grate.addImage(img[6]);
  roundPos(grate);
  grate.onMouseOver = function() {
    testo = "grate";
  }
  grate.onMouseOut = function() {
    testo = "";
  }

  keyhole = createSprite(cx + 172, cy + 47);
  keyhole.addImage(img[7]);
  roundPos(keyhole);
  keyhole.onMouseOver = function() {
    testo = "keyhole";
  }
  keyhole.onMouseOut = function() {
    testo = "";
  }

  ramrod = createSprite(cx + 4, cy + 9);
  ramrod.addImage(img[8]);
  roundPos(ramrod);
  ramrod.onMouseOver = function() {
    testo = "ramrod";
  }
  ramrod.onMouseOut = function() {
    testo = "";
  }

  rope = createSprite(cx + 134, cy + 84);
  rope.addImage(img[9]);
  roundPos(rope);
  rope.onMouseOver = function() {
    testo = "rope";
  }
  rope.onMouseOut = function() {
    testo = "";
  }

  smallPirate = createSprite(cx - 69, cy + 56);
  smallPirate.addImage(img[10]);
  roundPos(smallPirate);
  smallPirate.onMouseOver = function() {
    testo = "small pirate";
  }
  smallPirate.onMouseOut = function() {
    testo = "";
  }
}

function draw() {
  background(color('#F1BF46'));

  // sprite change for main character
  if (guyBrush.facing == "N")
    guyBrush.changeAnimation('top');
  else if (guyBrush.facing == "S")
    guyBrush.changeAnimation('bottom');
  else if (guyBrush.facing == "E")
    guyBrush.changeAnimation('left');
  if (guyBrush.facing == "W")
    guyBrush.changeAnimation('right');

  //head follows the mouse
  /*
  if(mouseX<cx) {background(color('#01BF46'));
    guyBrush.changeAnimation('left');
  }
  else guyBrush.changeAnimation('right');
  */
  /*if(guyBrush.facingRight) guyBrush.changeAnimation('right');
  else guyBrush.changeAnimation('left');*/
  //if(dist(guyBrush.position.x,guyBrush.position.y,smallPirate.position.x,smallPirate.position.y)<20) testo = "small pirate";

  drawSprites();          //draw all the sprites
  dialogue();             //empty function for now
  tool();                 //shoud give the possibility of different type of interaction with objects
  inventory();            //should allow the creation of inventory (not enabled yet)
  setPosition(guyBrush);  //this allows the obj to be positioned with keyboard on screen
}

function setPosition(obj) {
  if (keyDown('w')) {
    obj.position.y -= 1;
    obj.facing = "N";
  }
  if (keyDown('s')) {
    obj.position.y += 1;
    obj.facing = "S";
  }
  if (keyDown('a')) {
    obj.position.x -= 1;
    obj.facing = "E";
  }
  if (keyDown('d')) {
    obj.position.x += 1;
    obj.facing = "W";
  }
  text("x:" + (obj.position.x - cx) + " y:" + (-cy + obj.position.y), 20, 20);
}

// function for rounding images to avoid split pixels alignemnt
function roundPos(obj) {
  obj.position.x = int(obj.position.x);
  obj.position.y = int(obj.position.y);
}

// function that shows the text for dialogues and other text info
function dialogue() {
  text(testo, cx - 170, cy - 120);
}

// function to select different tools
function tool() {
  if (keyDown('c')) toolSel = 'c'; // inventory object
  if (keyDown('e')) toolSel = 'e'; // examine-skull
  if (keyDown('t')) toolSel = 't'; // talk-parrot
  if (keyDown('u')) toolSel = 'u'; // use-hand
  if (keyDown('i')) showInventory = true; // use-hand

  /*toolSpr.position.x=mouseX;
  toolSpr.position.y=mouseX;*/
}

function inventory() {
  if(showInventory) {

  }
}
