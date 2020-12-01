var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  console.log(ground.x);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);
  stroke("black");
    textSize(20);
    fill("black");
    text("Score: "+score, 200, 130);
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival time: "+survivalTime, 200, 150);
  if(gameState === 1){
  if (keyDown("space") && monkey.y>=310){
    monkey.velocityY=-12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  ground.x = ground.width/2;
  monkey.collide(ground);
  rocks();
  yayBananas();
    survivalTime = Math.ceil(frameCount/frameRate())
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score+1;
    }
 }
  if(monkey.isTouching(obstacleGroup)){
    gameState = 0;
    monkey.destroy();
    survivalTime = 0;
    score = 0;
  }
  if(gameState === 0){
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.destroy();
    stroke("red");
    textSize(40);
    fill("red");
    text("GAME OVER", 150, 250)
  }
  drawSprites();
}


function rocks(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,330,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.scale = 0.1
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function yayBananas (){
  if (frameCount % 80 === 0){
    banana = createSprite(600, Math.round(random(220,300)), 30, 30);
    banana.addImage(bananaImage);
    banana.velocityX = -8;
    banana.scale = 0.1
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}



