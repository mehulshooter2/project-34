var dog,happyDog,dogImg,happyDogImg,database,foodS,foodStock;

function preload()
{

  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happydog.png");
	
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  
  
}


function draw() {  
background(46,139,87);
  
  drawSprites(); 
  
    textSize(20);    
    fill("white");    
    text("Note: Press up aroow to feed Drago milk", 50,50);
    text("food left:"+foodS,120,150);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS = 20
  }
  
}

function readStock(data){

  foodS=data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food : x
  })
}
