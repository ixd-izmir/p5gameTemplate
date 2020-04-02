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
var showInventory=false;  // this boolean checks for activating/disactivating the inventory
var img = [];  // this array contains all the loaded images to be assigned to objects

var testo = "The Curse of Monkey Island";  // this variable holds the text shown above the game frame
var thinPixel;                             // variable for the typeface

var playerSprS, toolSprS;

var story = new inkjs.Story(storyContent);

function preload() {
  thinPixel = loadFont('assets/ThinPixel7-1Yq0.ttf');  // loading font
  img[0] = loadImage("assets/tools.png");         // loading images
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
  playerSprS = loadSpriteSheet('assets/00_guybrush.png', 46, 130, 4);
  toolSprS = loadSpriteSheet('assets/tools.png', 32, 32, 4);
}

function setup() {
  createCanvas(windowWidth, windowHeight);  //set canvas size
  textFont(thinPixel);   //set font typeface
  textSize(40);          //set font size
  cx = int(width * .5);  //set center of the screen X
  cy = int(height * .5); //set center of the screen Y

  bg01=createAnObject(0,0,img[1],"");

  //create sprite and assign spritesheet for main character as well as click on functions
  guyBrush = createSprite(cx + 90, cy + 27);
  guyBrush.addAnimation("playerSprites",playerSprS);
  guyBrush.animation.stop();
  roundPos(guyBrush);
  guyBrush.onMouseOver = function() {testo = "hello! it's me Guybrush!";}
  guyBrush.onMouseOut = function() {testo = "";}

  //create sprites and assign images as well as click on functions for each interactive object
  windoww=createAnObject(-175,50,img[11],"window");
  cannon=createAnObject(-136,62,img[2],"cannon");
  cannonBalls=createAnObject(2,59,img[3],"cannon balls");
  cannonRestrainRope=createAnObject(-154,67,img[4],"cannon restrain rope");
  door=createAnObject(175,37,img[5],"door");
  grate=createAnObject(8,-95,img[6],"grate");
  keyhole=createAnObject(172,47,img[7],"keyhole");
  ramrod=createAnObject(4,9,img[8],"ramrod");
  rope=createAnObject(134,84,img[9],"rope");
  smallPirate=createAnObject(-69,56,img[10],"small pirate");

  toolSpr = createSprite(0,0);
  toolSpr.addAnimation("toolSprites",toolSprS);
  toolSpr.animation.stop();

  continueStory(true);
}

function draw() {
  background(color('#F1BF46'));

  drawSprites();          //draw all the sprites
  dialogue();             //empty function for now
  tool();                 //shoud give the possibility of different type of interaction with objects
  inventory();            //should allow the creation of inventory (not enabled yet)
  setPosition(guyBrush);  //this allows the obj to be positioned with keyboard on screen

}

//---------------------- this is due to inky --------------------------------------------------------------------------------------
function continueStory(firstTime) {
        var paragraphIndex = 0;
        var delay = 0.0;
        while(story.canContinue) {
          // Get ink to generate the next paragraph
            var paragraphText = story.Continue();
            var tags = story.currentTags;

            // Any special tags included with this line
            var customClasses = [];
            for(var i=0; i<tags.length; i++) {
                var tag = tags[i];

                // Detect tags of the form "X: Y". Currently used for IMAGE and CLASS but could be
                // customised to be used for other things too.
                var splitTag = splitPropertyTag(tag);

                // IMAGE: src
                if( splitTag && splitTag.property == "IMAGE" ) {
                    var imageElement = document.createElement('img');
                    imageElement.src = splitTag.val;
                    storyContainer.appendChild(imageElement);

                    showAfter(delay, imageElement);
                    delay += 200.0;
                }

                // CLASS: className
                else if( splitTag && splitTag.property == "CLASS" ) {
                    customClasses.push(splitTag.val);
                }

                // CLEAR - removes all existing content.
                // RESTART - clears everything and restarts the story from the beginning
                else if( tag == "CLEAR" || tag == "RESTART" ) {
                    removeAll("p");
                    removeAll("img");

                    // Comment out this line if you want to leave the header visible when clearing
                    setVisible(".header", false);

                    if( tag == "RESTART" ) {
                        restart();
                        return;
                    }
                }
            }
        }

}
// ----------------------------------------------------------------------------------------------------


// function that shows the text for dialogues and other text info
function dialogue() {
  text(testo, cx - 170, cy - 120);
}

// function to select different tools
function tool() {
  if (keyDown('c')) {toolSel = 'c'; toolSpr.animation.changeFrame(0);} // inventory object
  if (keyDown('e')) {toolSel = 'e'; toolSpr.animation.changeFrame(1);}// examine-skull
  if (keyDown('t')) {toolSel = 't'; toolSpr.animation.changeFrame(2);} // talk-parrot
  if (keyDown('u')) {toolSel = 'u'; toolSpr.animation.changeFrame(3);} // use-hand
  if (keyDown('i')) showInventory = true; // use-hand

  toolSpr.position.x=mouseX;
  toolSpr.position.y=mouseY;
}

function inventory() {
  if(showInventory) {

  }
}

// -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------- Various Helper functions
// -----------------------------------------------------------------------------

function setPosition(obj) {
  if (keyDown('w')) {obj.position.y -= 1;guyBrush.animation.changeFrame(2);}
  if (keyDown('s')) {obj.position.y += 1;guyBrush.animation.changeFrame(3);}
  if (keyDown('a')) {obj.position.x -= 1;guyBrush.animation.changeFrame(0);}
  if (keyDown('d')) {obj.position.x += 1;guyBrush.animation.changeFrame(1);}
  text("x:" + (obj.position.x - cx) + " y:" + (-cy + obj.position.y), 20, 20);
}

// function for rounding images to avoid split pixels alignemnt
function roundPos(obj) {
  obj.position.x = int(obj.position.x);
  obj.position.y = int(obj.position.y);
}

// function that create the object and assign a text to them
function createAnObject(dx, dy,img, addText){
  var c = createSprite(cx + dx, cy + dy);
  c.addImage(img);
  if(addText!="") {
    c.onMouseOver = function() {testo = addText;}
    c.onMouseOut = function() {testo = "";}
  }
  roundPos(c);
  return c;
}
