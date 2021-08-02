/*

The Game Project 6

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var treePos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var trees_x;
var clouds_x;
var mountains_x;
var canyons_x;
var collectables_x;

var game_score;
var flagpole;

var enemies;
 

function setup()
{
	//Initialise Variables
    createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    startGame();
	
}
function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    treePos_y = 100;
	// Variable to control the background scrolling.
	scrollPos = 0;
    

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    trees_x =[-600,-300,0];
    clouds_x=
             [
                 {Xpos:20, y_pos: 100, size:50},
                 {Xpos:400, y_pos: 100, size:50},
                 {Xpos:800, y_pos: 100, size:50}
             ];

    
    mountains_x=
                [
                     {Xpos:-350, y_pos:100},
                     {Xpos:0, y_pos:100},
                     {Xpos:350, y_pos:100}
                ];
    
    canyons_x=
                [
                    {Xpos:650, width:100},
                    {Xpos:300, width:100},
                    {Xpos:900, width:100},
                    {Xpos:0, width:100}
                ];
    
    collectables_x=
                    [
                        {Xpos:-200, y_pos:100, size:50, isFound:false},
                        {Xpos:50, y_pos:100, size:50, isFound:false},
                        {Xpos:-300, y_pos:100, size:50, isFound:false},
                        {Xpos:150, y_pos:100, size:50, isFound:false}
                    ];
    
    
              
  


    //Initialise game score count
    game_score = 0;

    
    //Initialise flagpole object
    flagpole = {x_pos:1300, isReached:false};

    enemies = [];
    enemies.push(new Enemy(20,432,100));
    enemies.push(new Enemy(320,432,100));
    enemies.push(new Enemy(600,432,100));
    enemies.push(new Enemy(920,432,100));
}

function draw()
{
	background(10, 15, 68); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    push();
    translate(scrollPos,0);
	// Draw clouds.
    drawClouds();

	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();
    
    
    

	// Draw canyons.
    for( var i=0; i<canyons_x.length; i++)
        {
            drawCanyon(canyons_x[i]);
            checkCanyon(canyons_x[i]);
        }

	// Draw collectable items.
    for( var i=0; i<collectables_x.length; i++)
        {
            if(collectables_x[i].isFound==false)
        {
            drawCollectable(collectables_x[i]);
            checkCollectable(collectables_x[i]);
        }
        
        }
        
    if (flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
    //Render Flagpole
    renderFlagpole();
    
    for ( var i = 0; i < enemies.length; i++)
        {
            enemies[i].update();
            enemies[i].draw();
    
    if(enemies[i].isContact(gameChar_world_x,gameChar_y))
        {
            startGame();
        }
             
        }
    
	// Draw game character.
	pop();
	drawGameChar();
    
    //Draw Score Text
    
    fill(255);
    noStroke();
    textSize(20);
    text("score: " + game_score, 20, 20);

	// Logic to make the game character move.
	
    if (isPlummeting)
        {
            gameChar_y +=7; 
        }

    
    
    if(isLeft)
	{
		if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
		else
        {
            scrollPos += 5;
        }
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
        {
            gameChar_x  += 5;
        }
		else
        {
            scrollPos -= 5; // negative for moving against the background
        }
        
	}

	// Logic to make the game character fall.
    if(gameChar_y < floorPos_y)
        
        {
            gameChar_y +=5;
            isFalling=true;
        }

    else
    
        {   
            isFalling=false; 
        }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}



// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

	console.log("press" + keyCode);
	console.log("press" + key);
    
    if (keyCode==37)
        {
            isLeft=true;
        }
    
    if(keyCode==39)
        {
            isRight=true;
        }
    
    if(keyCode==32 && gameChar_y == floorPos_y)
        {
            gameChar_y -=100;
        }

}

function keyReleased()
{

	console.log("release" + keyCode);
	console.log("release" + key);
    
    if (keyCode==37)
        {
        isLeft=false;
        }
    
    if(keyCode==39)
        {
        isRight=false;
        }
    
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isPlummeting)
	
    {
        fill(0,0,255);
        ellipse(gameChar_x+1,gameChar_y-61 ,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        quad(gameChar_x+3,gameChar_y-27,gameChar_x+10,gameChar_y-27,gameChar_x+16,gameChar_y-8,gameChar_x+10,gameChar_y-8);
        quad(gameChar_x,gameChar_y-27,gameChar_x-20,gameChar_y-15,gameChar_x-20,gameChar_y-22,gameChar_x-9,gameChar_y-27);
        fill(0,0,255);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x-20,gameChar_y-51);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-30);
    }
	
    else if(isRight && isPlummeting)
	
    {
		fill(0,0,255);
        ellipse(gameChar_x+1,gameChar_y-61 ,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        quad(gameChar_x-2,gameChar_y-27,gameChar_x-8,gameChar_y-8,gameChar_x-14,gameChar_y-8,gameChar_x-9,gameChar_y-27);
        quad(gameChar_x+10,gameChar_y-27,gameChar_x+21,gameChar_y-20,gameChar_x+21,gameChar_y-13,gameChar_x+3,gameChar_y-27);
        fill(0,0,255);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x-20,gameChar_y-31);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-50);
    }
	
    else if(isLeft)
	
    {
		fill(0,0,255);
        ellipse(gameChar_x+1,gameChar_y-61 ,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        rect(gameChar_x+3,gameChar_y-27,7,20);
        quad(gameChar_x-2,gameChar_y-27,gameChar_x-7,gameChar_y-8,gameChar_x-14,gameChar_y-8,gameChar_x-9,gameChar_y-27);
        fill(0,0,255);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x-20,gameChar_y-51);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-30);
    }
	
    else if(isRight)
	
    {
		fill(0,0,255);
        ellipse(gameChar_x+1,gameChar_y-61 ,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        rect(gameChar_x-9,gameChar_y-27,7,20);
        quad(gameChar_x+3,gameChar_y-27,gameChar_x+10,gameChar_y-27,gameChar_x+16,gameChar_y-8,gameChar_x+10,gameChar_y-8);
        fill(0,0,255);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x-20,gameChar_y-31);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-50);
    }
	
    else if(isFalling || isPlummeting)
	
    {
		fill(0,0,255);
        ellipse(gameChar_x+1,gameChar_y-61 ,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        quad(gameChar_x+10,gameChar_y-27,gameChar_x+21,gameChar_y-20,gameChar_x+21,gameChar_y-13,gameChar_x+3,gameChar_y-27);
        quad(gameChar_x-9,gameChar_y-27,gameChar_x-2,gameChar_y-27,gameChar_x+4,gameChar_y-8,gameChar_x-2,gameChar_y-8);
        fill(0,0,255);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-41);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x+2,gameChar_y-41);
    }
	
    else
	
    {
        fill(0,0,255);
        ellipse(gameChar_x + 1,gameChar_y - 61,18);
        fill(255,0,0);
        rect(gameChar_x-9,gameChar_y-52,20,25);
        fill(255,0,255);
        rect(gameChar_x-9,gameChar_y-27,7,20);
        rect(gameChar_x+3,gameChar_y-27,7,20);
        fill(0,0,255);
        triangle(gameChar_x-9,gameChar_y-46,gameChar_x-9,gameChar_y-36,gameChar_x-20,gameChar_y-41);
        triangle(gameChar_x+11,gameChar_y-46,gameChar_x+11,gameChar_y-36,gameChar_x+22,gameChar_y-41);	
    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds_x.length; i++)
    {
        fill(255);
        ellipse(clouds_x[i].Xpos+100,clouds_x[i].y_pos,clouds_x[i].size+150,clouds_x[i].size+50);
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains_x.length; i++)
    {
        fill(100);
        triangle(mountains_x[i].Xpos+400,mountains_x[i].y_pos+332,mountains_x[i].Xpos+646,mountains_x[i].y_pos+332,mountains_x[i].Xpos+525,mountains_x[i].y_pos+75);
        fill(255);
        triangle(mountains_x[i].Xpos+502,mountains_x[i].y_pos+123,mountains_x[i].Xpos+525,mountains_x[i].y_pos+73,mountains_x[i].Xpos+547,mountains_x[i].y_pos+123);
        fill(100);
        triangle(mountains_x[i].Xpos+502,mountains_x[i].y_pos+123,mountains_x[i].Xpos+525,mountains_x[i].y_pos+96,mountains_x[i].Xpos+547,mountains_x[i].y_pos+123);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for (var i =0; i < trees_x.length; i++)
    {
        fill(162,82,45);
        quad(trees_x[i]+750,treePos_y+332,trees_x[i]+770,treePos_y+200,trees_x[i]+830,treePos_y+200,
        trees_x[i]+850,treePos_y+332);
        fill(7,178,92);
        ellipse(trees_x[i]+800,treePos_y+174,90);
        ellipse(trees_x[i]+750,treePos_y+174,70);
        ellipse(trees_x[i]+850,treePos_y+174,70);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(210,105,30);
    rect(t_canyon.Xpos+83,432,t_canyon.width+100,144);
    fill(0);
    rect(t_canyon.Xpos+133,432,t_canyon.width,144);
    fill(211,211,211);
    quad(t_canyon.Xpos+171,576,t_canyon.Xpos+156,432,t_canyon.Xpos+210,432,t_canyon.Xpos+195,576);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if (gameChar_world_x > t_canyon.Xpos+150 && gameChar_world_x < t_canyon.Xpos+200 && gameChar_y == floorPos_y )
        {
            isPlummeting = true;
        }
    if (gameChar_y > height + 60)
        {
            startGame();
        }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
        stroke(255);
        fill(155,17,30);
        triangle(t_collectable.Xpos+286,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+206,t_collectable.Xpos+323,t_collectable.y_pos+269);
        triangle(t_collectable.Xpos+286,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+332);

        fill(215,0,20);
        triangle(t_collectable.Xpos+323,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+206,t_collectable.Xpos+360,t_collectable.y_pos+269);
        triangle(t_collectable.Xpos+360,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+269,t_collectable.Xpos+323,t_collectable.y_pos+332);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    var d = dist(gameChar_world_x,gameChar_y,t_collectable.Xpos,t_collectable.y_pos);
        
        if(d < 483)
        {
            t_collectable.isFound = true; 
            game_score +=1;
        }
}

//Function to render flagpole
function renderFlagpole()
{
    
    stroke(150);
    strokeWeight(5);
    line(flagpole.x_pos,floorPos_y,flagpole.x_pos, floorPos_y-200);
    if(flagpole.isReached)
        
        {
        noStroke();
        fill(255,255,0);
        rect(flagpole.x_pos, floorPos_y-200,50,50);   
        }
     
    else
        {
          noStroke();
          fill(168,175,199);
          rect(flagpole.x_pos, floorPos_y-50,50,50);    
        }

}

function checkFlagpole()
{
    var d= abs(gameChar_world_x - flagpole.x_pos);
    
    if (d < 50)
    {
        flagpole.isReached = true;
    }
    
}

function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.incr = 1;
    
    this.draw = function()
    {
        
        fill(255,160,122);
        noStroke();
        ellipse(this.current_x,this.y -25, 50);
        fill(255);
        ellipse(this.current_x - 5,this.y -25,5);
        ellipse(this.current_x +5,this.y - 25,5);
        stroke(255);
        strokeWeight(2);
        line(
            this.current_x - 15,
            this.y - 35,
            this.current_x - 5,
            this.y - 30.
        );
        line(
            this.current_x + 15,
            this.y - 35,
            this.current_x + 5,
            this.y - 30
        );
        
    }
    
    this.update = function()
    {
        this.current_x += this.incr;
        
        if(this.current_x < this.x)
            {
                this.incr = 1;
            }
        else if(this.current_x > this.x + this.range)
            {
                this.incr = -1;
            }
    }
    
    this.isContact = function(gm_x,gm_y)
    {
        //returns true if contact is made
       var d =  dist(gm_x,gm_y,this.current_x,this.y);
        
        if(d < 25)
            {
                return true;
            }
            
        else
            {
                return false;
            }
    }
}