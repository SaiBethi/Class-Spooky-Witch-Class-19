var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("witch.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,30,30);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.2
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  spookySound.loop();
}

function draw() {
  background(0);
  if (gameState==="play")  {

  if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("left_arrow"))  {
      ghost.x=ghost.x-3
    }
    if (keyDown("right_arrow"))  {
      ghost.x=ghost.x+3
    }
    if (keyDown("space"))  {
      ghost.velocityY=-12
    }
    ghost.velocityY=ghost.velocityY+0.8;
    spawnDoor()
    if (ghost.isTouching(climberGroup))  {
      ghost.velocityX=0;
      ghost.velocityY=0;
    }
    if (ghost.y>600||ghost.isTouching(invisibleBlockGroup))  {
      gameState="end"
    }
    drawSprites();
}
else if (gameState==="end")  {
  fill ("yellow")
  textSize(30);
  text("Game Over",230,250)
}
}
function spawnDoor()  {
  if (frameCount%240===0)  {
    door=createSprite(200,-50)
    climber=createSprite(200,10)
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400))  
    climber.x=door.x
    invisibleBlock.x=door.x
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    door.depth=ghost.depth
    ghost.depth+=1;
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    invisibleBlock.debug=false;
    doorGroup.add(door);
    climberGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
}