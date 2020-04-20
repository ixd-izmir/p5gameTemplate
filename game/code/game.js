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
  windoww,
  toolSpr;

var cx, cy; // this variables store the position at the center of the screen (used as origin if you want your game to be centered)
var showInventory = false; // this boolean checks for activating/disactivating the inventory
var img = []; // this array contains all the loaded images to be assigned to objects

var testo = "The Curse of Monkey Island"; // this variable holds the text shown above the game frame
var thinPixel; // variable for the typeface

var playerSprS, toolSprS;

var story = new inkjs.Story(storyContent);
var buttons = [];
var buttonSize =50,buttonSpacing=10,buttonsXLoc,buttonsYLoc;  //size of buttons

function preload() {
  thinPixel = loadFont('assets/ThinPixel7-1Yq0.ttf'); // loading font
  img[0] = loadImage("assets/tools.png"); // loading images
  img[1] = loadImage("assets/01_bgx5.png");
  img[2] = loadImage("assets/01_cannon.png");
  img[3] = loadImage("assets/01_cannonBalls.png");
  img[4] = loadImage("assets/01_cannonRestrainRope.png");
  img[5] = loadImage("assets/01_door.png");
  img[6] = loadImage("assets/01_grate.png");
  img[7] = loadImage("assets/01_keyhole.png");
  img[8] = loadImage("assets/01_ramrod.png");
  img[9] = loadImage("assets/01_rope.png");
  img[10] = loadImage("assets/01_smallPirate.png");
  img[11] = loadImage("assets/01_window.png");
  // one way of loading spritesheet
  //a faster way of loading everything at once
  playerSprS = loadSpriteSheet('assets/00_guybrush.png', 184 / 4, 130, 4);
  toolSprS = loadSpriteSheet('assets/tools.png', 128 / 4, 32, 4);
}

function setup() {
  createCanvas(windowWidth, windowHeight); //set canvas size
  textFont(thinPixel); //set font typeface
  textSize(40); //set font size
  cx = int(width * .5); //set center of the screen X
  cy = int(height * .5); //set center of the screen Y

  bg01 = p5xgT_createAnObject(0, 0, img[1], "");

  //create sprite and assign spritesheet for main character as well as click on functions
  guyBrush = createSprite(cx + 90, cy + 27);
  guyBrush.addAnimation("playerSprites", playerSprS); //p5.play function
  guyBrush.animation.stop();
  p5xgT_roundPos(guyBrush);
  /*guyBrush.onMouseOver = function() {
    testo = "hello! it's me Guybrush!";
  }
  guyBrush.onMouseOut = function() {
    testo = "";
  }*/
  guyBrush.onMouseReleased =  function() {print("hello"); story.ChoosePathString("missing_reel"); ink_continueStory();}  // jump to a position of the story

  //create sprites and assign images as well as click on functions for each interactive object
  windoww = p5xgT_createAnObject(-175, 50, img[11], "window");
  cannon = p5xgT_createAnObject(-136, 62, img[2], "cannon");
  cannonBalls = p5xgT_createAnObject(2, 59, img[3], "cannon balls");
  cannonRestrainRope = p5xgT_createAnObject(-154, 67, img[4], "cannon restrain rope");
  door = p5xgT_createAnObject(175, 37, img[5], "door");
  grate = p5xgT_createAnObject(8, -95, img[6], "grate");
  keyhole = p5xgT_createAnObject(172, 47, img[7], "keyhole");
  ramrod = p5xgT_createAnObject(4, 9, img[8], "ramrod");
  rope = p5xgT_createAnObject(134, 84, img[9], "rope");
  smallPirate = p5xgT_createAnObject(-69, 56, img[10], "small pirate");

  toolSpr = createSprite(0, 0);
  toolSpr.addAnimation("toolSprites", toolSprS);
  toolSpr.animation.stop();

  buttonsXLoc=cx-50;
  buttonsYLoc=50;
  ink_continueStory(true);
}

function draw() {
  background(color('#F1BF46'));
  drawSprites(); //draw all the sprites
  p5xgT_dialogue(); //empty function for now
  p5xgT_inventory(); //should allow the creation of inventory (not enabled yet)
  p5xgT_setPosition(guyBrush); //this allows the obj to be positioned with keyboard on screen
  p5xgT_tool(); //shoud give the possibility of different type of interaction with objects
}

//---------------------- this is due to inky --------------------------------------------------------------------------------------
function ink_continueStory(firstTime) {
  buttons=[];
  var paragraphIndex = 0;
  while (story.canContinue) {
    print(story);
    // Get ink to generate the next paragraph
    var paragraphText = story.Continue();
    testo = paragraphText;
  }
  //*---------------------------------------------------------------------------------------------------------------*/
  story.currentChoices.forEach(function(choice,index) {
    var choiceButtonElement = new Clickable();                   //Create button
    choiceButtonElement.text = choice.text;
    choiceButtonElement.locate(buttonsXLoc, buttonsYLoc+index*(buttonSize+buttonSpacing));        //Position Button
    choiceButtonElement.onPress = function() {                   //When myButton is pressed
      story.ChooseChoiceIndex(choice.index);
      ink_continueStory();
    }
    buttons.push(choiceButtonElement);
  });
}
// ----------------------------------------------------------------------------------------------------


// function that shows the text for dialogues and other text info
function p5xgT_dialogue() {
  textSize(40);
  textLeading(30);
  textAlign(CENTER, BOTTOM);
  text(testo, int(cx-width*.25), int(cy - height*.37), int(width*.5), int(height*.25));
  buttons.forEach(button => button.draw());
}

// function to select different tools
function p5xgT_tool() {
  if (keyDown('c')) {
    toolSel = 'c';
    toolSpr.animation.changeFrame(0);
  } // inventory object
  if (keyDown('e')) {
    toolSel = 'e';
    toolSpr.animation.changeFrame(1);
  } // examine-skull
  if (keyDown('t')) {
    toolSel = 't';
    toolSpr.animation.changeFrame(2);
  } // talk-parrot
  if (keyDown('u')) {
    toolSel = 'u';
    toolSpr.animation.changeFrame(3);
  } // use-hand
  if (keyDown('i')) showInventory = true; // use-hand

  toolSpr.position.x = mouseX;
  toolSpr.position.y = mouseY;
}

function p5xgT_inventory() {
  if (showInventory) {

  }
}

// -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------- Various Helper functions
// -----------------------------------------------------------------------------

function p5xgT_setPosition(obj) {
  if (keyDown('w')) {
    obj.position.y -= 1;
    guyBrush.animation.changeFrame(2);
  }
  if (keyDown('s')) {
    obj.position.y += 1;
    guyBrush.animation.changeFrame(3);
  }
  if (keyDown('a')) {
    obj.position.x -= 1;
    guyBrush.animation.changeFrame(0);
  }
  if (keyDown('d')) {
    obj.position.x += 1;
    guyBrush.animation.changeFrame(1);
  }
//  var a= story.currentPathString;
  //print(a);
  text("scene:"+story.currentTags+" x:" + (obj.position.x - cx) + " y:" + (-cy + obj.position.y), cx, 20);
  //print(story.currentTags);
}

// function for rounding images to avoid split pixels alignemnt
function p5xgT_roundPos(obj) {
  obj.position.x = int(obj.position.x);
  obj.position.y = int(obj.position.y);
}

// function that create the object and assign a text to them
// dx: distance in x-axis from the center
// dy: distance in y-axis from the center
// img: image
// caption: caption text
function p5xgT_createAnObject(dx, dy, img, caption) {
  var c = createSprite(cx + dx, cy + dy);
  c.addImage(img);
  if (caption != "") {
    c.onMouseOver = function() {
      testo = caption;
    }
    c.onMouseOut = function() {
      testo = "";
    }
  }
  p5xgT_roundPos(c);
  return c;
}
