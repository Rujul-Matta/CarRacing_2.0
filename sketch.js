var edges, car, car_2 , road , ground ;
var car_image, car_2_image, road_image ;
var score_1,score_2 ,coin ,coin_image, special, special_coin; 
var  block_image, block_image_1, block_image_2;
var game , gameover , overimage;
var blockGrp , blockGrp1 , blockGrp2,blockGrp_1, blockGrp11 , blockGrp22; 

function preload(){
  car_image = loadImage("Car.png");
  car_2_image = loadImage("Car-2.png");
  road_image = loadImage("Road.jfif");
  block_image = loadImage("Obstacle.png");
  block_image_1 = loadImage("Obstacle_1.png");
  block_image_2 = loadImage("Obstacle_2.png");
  coin_image = loadImage("Coin.png");
  special = loadImage("Special_Coin.png");
  overimage = loadImage("gameover.png");

}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  edges= createEdgeSprites();
  
  ground = createSprite(width/2,height/2,width,1);
  road = createSprite(width/2,height/2,1,1);
  
  coin = createSprite(0,0,1,1);
  special_coin = createSprite(0,0,1,1);
  
  block1 = createSprite(0,0,1,1);
  block_1 = createSprite(0,0,1,1);
  block_2 = createSprite(0,0,1,1);
  block11 = createSprite(0,0,1,1);
  block_11 = createSprite(0,0,1,1);
  block_22 = createSprite(0,0,1,1);
  gameover = createSprite(width/2,height/2);
  
  car = createSprite(width - (width/4),height-3*(height/4));
  car_2 = createSprite(width-(width/4),height - (height/4));
  
  
  road.addImage(road_image);
  car.addImage(car_image);
  car_2.addImage(car_2_image);
  
  
  road.scale = 6;
  car.scale = 0.1;
  car_2.scale = 0.1;
  
  score_1 = 0;
  score_2 = 0;
  
  life_1 = 5;
  life_2 = 5;
  
  game = "serve";
  blockGrp = new Group();
  blockGrp1 = new Group();
  blockGrp2 = new Group();
   blockGrp_1 = new Group();
  blockGrp11= new Group();
  blockGrp22 = new Group();
}
function draw() {
 background(0);
  // block.debug = true;
 

  if(game == "serve"){
     write();
  }
  if(keyDown("space") && game == "serve"){
    game = "play" 
  }
  if(game == "play"){
  
  gameover.visible = false;
  road.velocityX = 2;
  reset_road();
  
    car.visible = true;
    car_2.visible = true;
    
  car.setVelocity(0,0);
  car_2.setVelocity(0,0);
  movement();
     
  car.collide(edges);
  car_2.collide(edges);
  
  car.collide(ground);
  car_2.collide(ground);
  
  spawnCoins();
  spawnBlocks0();
  spawnBlocks1();
  spawnBlocks2();
  spawnBlocks3();
  spawnBlocks4();
  spawnBlocks5();
    
  run();
  out();
    
  drawSprites();
  a();
 } 
  if(game == "end"){

    gameover.visible = true;
    gameover.addImage(overimage);
    size = 2;
    gameover.scale = size;
    
  car.setVelocity(0,0);
  car.visible = false;
    
  car_2.setVelocity(0,0);
  car_2.visible = false;
  drawSprites();
  if(score_1 > score_2){
    textSize(30);
    fill("red");
    stroke("red");
    text("!!!!RED CAR wins !!!!!" , width/3 , height/2 -100);
    }
  if(score_1 < score_2){
      textSize(30);
      fill("blue");
      stroke("blue");
      text("!!!!!BLUE CAR wins !!!!!" , width/3 ,height/2 - 100);
      }
  a();

  textSize(25);
  fill("red");
  stroke("red");
  text("PRESS space to start again",width/2 - 150 ,height/2+50);
  

    if(keyDown("space")){
      reset();
      game = "play";
    }
}
}
function run (){
    if(car.collide(coin)){
    score_1 += 100
    coin.lifetime = 0;

  }
  if(car_2.isTouching(coin)){
    score_2 += 100;
    coin.lifetime = 0;

  }
    if(car.collide(special_coin)){
    score_1 += 250;
    special_coin.lifetime = 0;

  }
  if(car_2.isTouching(special_coin)){
    score_2 += 250;
    special_coin.lifetime = 0;

  }
}
function out(){
 
  if(blockGrp1.isTouching(car)){
    blockGrp1.remove(block_1);
    block_1.destroy();
    block_1.lifetime = 0
    score_1 -= 100;
    life_1 -= 1;
  }
  if(blockGrp2.isTouching(car)){
    blockGrp2.remove(block_2);
    block_2.destroy();
    block_2.lifetime = 0
    score_1 -= 100;
    life_1 -= 1;
  }
  if(blockGrp.isTouching(car)){
      blockGrp.remove(block1);
      block1.destroy();
      block1.lifetime = 0;
      score_1 -= 100;
      life_1 -= 1;
    }

  if(blockGrp_1.isTouching(car_2)){
    blockGrp_1.remove(block11);
    block11.destroy();
    block11.lifetime = 0;
    score_2 -= 100;
    life_2 -= 1;
  }
if(blockGrp11.isTouching(car_2)){
    blockGrp11.remove(block_11);
    block_11.destroy();
    block_11.lifetime = 0
    score_2 -= 100;
    life_2 -= 1;
  }
  if(blockGrp22.isTouching(car_2)){
    blockGrp22.remove(block_22);
    block_22.destroy();
    block_22.lifetime = 0
    score_2 -= 100;
    life_2 -= 1;
  }
  if(life_1 == 0 || life_2 == 0){
    blockGrp.destroyEach();
     blockGrp1.destroyEach();
     blockGrp2.destroyEach();
     blockGrp_1.destroyEach();
     blockGrp11.destroyEach();
     blockGrp22.destroyEach();
    coin.destroy();
    special_coin.destroy();
    game = "end";
    road.velocityX = 0;

    
  }
 
 
}
function reset_road(){    
  if(road.x > 400 )
    {
      road.x = road.width/2;
    }
}
function spawnCoins(){
  var x = Math.round(random(0,300));
  var y = Math.round(random(0,390));

  if(frameCount % 150 == 0){  
  coin = createSprite(x,y);
  coin.x = x;
  coin.y = y;
  coin.addImage(coin_image);
  coin.scale = 0.2;
  coin.velocityX = 6;
  coin.lifetime = width;
  }
  
  if(frameCount % 250 == 0){
  special_coin.x = x;
  special_coin.y = y;
  special_coin.addImage(special);
  special_coin.scale = 0.1;
  special_coin.velocityX = 7;
  special_coin.lifetime = 200;
  }
}
function spawnBlocks0(){
  var num = Math.round(random(1,3));
  //var x = Math.round(random(0,width/2));
  var x = -10;
  var y = Math.round(random(0,height/2));
 
  if(frameCount % 260 == 0){
  block1 = createSprite();
  
  block1.x = x;
  block1.y = y;

  block1.velocityX = 8;
 

    block1.debug = true;
 block1.addImage(block_image);
    
  
  block1.scale = 0.1;
  
  block1.lifetime = width;
  
  blockGrp.add(block1);
 
}
}
function spawnBlocks1(){
  var num = Math.round(random(1,3));
 // var x = Math.round(random(0,width/2));
  var x = -10;
  var y = Math.round(random(0,height/2));

  
  
  if(frameCount % 160 == 0){
  block_1 = createSprite();
  
  block_1.x = x;
  block_1.y = y;

  block_1.velocityX = 8;
 

    // block.debug = true;
 block_1.addImage(block_image_1);
    
  
  block_1.scale = 0.1;
  
  block_1.lifetime = width;
  
  blockGrp1.add(block_1);
 
}
}
function spawnBlocks2(){
  var num = Math.round(random(1,3));
 // var x = Math.round(random(0,width/2));
  var x = -10;
  var y = Math.round(random(0,height/2));

  
  
  if(frameCount % 220 == 0){
  block_2 = createSprite();
  
  block_2.x = x;
  block_2.y = y;

  block_2.velocityX = 8;
 

    // block.debug = true;
 block_2.addImage(block_image_2);
    
  
  block_2.scale = 0.1;
  
  block_2.lifetime = width;
  
  blockGrp2.add(block_2);
 
}
}
function spawnBlocks3(){
  var num = Math.round(random(1,3));
 // var x = Math.round(random(width/2,width));
  var x = -10
  var y = Math.round(random(height/2,height-20));

  
  
  if(frameCount % 260 == 0){
  block11 = createSprite();
  
  block11.x = x;
  block11.y = y;

  block11.velocityX = 8;
 

    // block.debug = true;
 block11.addImage(block_image);
    
  
  block11.scale = 0.1;
  
  block11.lifetime = width;
  
  blockGrp_1.add(block11);
 
}
}
function spawnBlocks4(){
  var num = Math.round(random(1,3));
 // var x = Math.round(random(0,width));
  var x=-10;
  var y = Math.round(random(height/2,height-20));

  
  
  if(frameCount % 160 == 0){
  block_11 = createSprite();
  
  block_11.x = x;
  block_11.y = y;

  block_11.velocityX = 8;
 

    // block.debug = true;
 block_11.addImage(block_image_1);
    
  
  block_11.scale = 0.1;
  
  block_11.lifetime = width;
  
  blockGrp11.add(block_11);
 
}
}
function spawnBlocks5(){
  var num = Math.round(random(1,3));
  var x=-10;
  var y = Math.round(random(height/2,height-20));
  
  
  if(frameCount % 220 == 0){
  block_22= createSprite();
  
  block_22.x = x;
  block_22.y = y;

  block_22.velocityX = 8;
 

    // block.debug = true;
 block_22.addImage(block_image_2);
    
  
  block_22.scale = 0.1;
  
  block_22.lifetime = width;
  
  blockGrp22.add(block_22);
 
}
}
function write(){
  fill("cyan");
  textSize(35);
  text("!! WELCOME !! to car racing game" , width/2 - width/6 , 50);
  
  fill("white");
  textSize(30);
  text("INSRTUCTIONS: " , 0 , 75);

fill("Yellow");
textSize(40);
text("1. It is a two player game. " , 25,125);
text("2. 1st player is the red car controlled by arrow  keys.", 25,200);
text("3. 2nd player is the blue car controlled by w,a,s,d.", 25 ,275);
text("4. Lives for both players = 5." , 25 , 350);
text("5. Earn coins to increase score.",25,425);
text("6. Hitting obstacles will decrease score by 100! and also lives by 1.",25, 500);
  
  fill("red");
  textSize(35);
  text("!! PRESS space to start !!",width/2-width/6,height-50);

}
function movement(){
  if(keyDown("UP_ARROW"))
  {
    car.velocityY = -4;
  }
  if(keyDown("DOWN_ARROW"))
  {
    car.velocityY = 4;
  }
  if(keyDown("LEFT_ARROW"))
  {
    car.velocityX = -1;
  }
  if(keyDown("RIGHT_ARROW"))
  {
    car.velocityX = 4;
  }
  if(keyDown("w"))
  {
    car_2.velocityY = -4;
  }
  if(keyDown("s"))
  {
    car_2.velocityY = 4;
  }
  if(keyDown("a"))
  {  
    car_2.velocityX = -2;
  }
  if(keyDown("d"))
  {
    car_2.velocityX = 4;
  }  
  
}
function reset(){
  blockGrp.destroyEach();
  blockGrp1.destroyEach();
  blockGrp2.destroyEach();
  blockGrp_1.destroyEach();
  blockGrp11.destroyEach();
  blockGrp22.destroyEach();
  coin.destroy();
  special_coin.destroy();
  score_1 = 0;
  score_2 =0;
  life_1 =5;
  life_2 = 5;
  
  car.x = width - (width/4);
  car.y = height-3*(height/4);
    
  car_2.x = width - (width/4);
  car_2.y = height - (height/4);

}
function a(){

textSize(25);
  
fill("red");
stroke("red");
text("Score = "+score_1,width - 1.8*(width/2),height-8*(height/9));
  
fill("cyan");
stroke("cyan");
text("Score = "+score_2,width - 1.8*(width/2),height-(height/8));
    
fill("Red");
stroke("red");
text("Lives = "+life_1,width - (width/5),height-8*(height/9));
    
fill("cyan");
stroke("cyan");
text("Lives = "+life_2,width - (width/5),height-(height/8));


}