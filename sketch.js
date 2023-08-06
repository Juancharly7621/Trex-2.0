var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var rand;
var obstaclesGroup, cloudsGroup;
var PLAY = 1
var END = 0 
var gamestate = 1 
var restart, gameover;
var gameoverImage, restartImage;
var checkpoint, die, jump;


var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage= loadImage("cloud.png")
 
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

  checkpoint = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  gameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  //crear sprite de trex
  trex = createSprite(50,windowHeight-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,40)
  
  //crear sprite de suelo
  ground = createSprite(0,windowHeight-50,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //crear game over 
  gameover=createSprite(windowWidth/2,windowHeight/2);
  restart=createSprite(windowWidth/2-0,windowHeight/2-70);
  restart.scale =1
  gameover.scale = 5
  gameover.addImage(gameoverImage)
  restart.addImage(restartImage)

  score = 0
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(windowWidth/2,windowHeight-20,windowWidth,10);
  invisibleGround.visible = false;
  
  //generar números aleatorios
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //establecer color de fondo
  background(180);
  textSize(50)
  text("puntuacion: "+score,750,75)
  
  console.log(trex.y)
  
  if (gamestate===PLAY){
    gameover.visible=false
    restart.visible=false
    ground.velocityX = -4;
    score = score+Math.round(frameCount/60)
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -7;
      jump.play()
    }
    
    trex.velocityY = trex.velocityY + 1
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds()
    spawnObstacles()
    if(obstaclesGroup.isTouching(trex)){
      die.play()
      
    gamestate=END
    
    }
    if (((score>0)&&(score%100))===0){checkpoint.play()}  
  } else if (gamestate===END){
    ground.velocityX = 0;
    trex.velocityY= 0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible=true
    


    
  }
  //hacer que el trex salte al presionar la barra espaciadora
 
  
  
  
  
  
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes
  
  drawSprites();

}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código
 if(frameCount%60===0){
  cloud = createSprite(600,windowHeight-500,40,10)
  cloud.velocityX =-3
  cloud.lifetime = 200
  cloud.y = Math.round(random(10,70))
cloud.addImage(cloudImage)
cloud.scale = 0.8
cloudsGroup.add(cloud)
cloud.depth = trex.depth 
trex.depth = trex.depth +1 
 }
}
 function spawnObstacles(){
  if(frameCount%80===0){
  obstacle = createSprite(600,windowHeight-50,10,40)
  obstacle.velocityX = -3
obstacle.lifetime = 200
obstacle.scale = 0.6
obstaclesGroup.add(obstacle)

rand = Math.round(random (1,6))
switch(rand){
 case 1: obstacle.addImage(obstacle1)
          break; 
 case 2 : obstacle.addImage(obstacle2)
          break;
 case 3: obstacle.addImage(obstacle3)
          break; 
 case 4 : obstacle.addImage(obstacle4)
          break;
 case 5: obstacle.addImage(obstacle5)
          break; 
 case 6 : obstacle.addImage(obstacle6)
          break;
  default : break;

}
}
}


