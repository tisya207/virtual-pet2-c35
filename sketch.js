//Create variables here
var dog,happyDog;
var database;
var foodStock,foodS;
var addFood,feedPet;
var foodObj;
var lastFed;

function preload()
{
  //load images here
  dogImg = loadAnimation("images/dog.png");
  happyDog = loadAnimation("images/happyDog.png");
}

function setup() {
  createCanvas(700, 500);
  
  database = firebase.database();
  console.log(database);
 
  
  dog = createSprite(500,300,10,10)
  dog.addAnimation("dog",dogImg)
  dog.addAnimation("happyDog",happyDog)
  dog.scale = 0.2;


  addFood = createButton("add food for drago")
  addFood.position(500,95)
  addFood.mousePressed(updateFoodStock)

  feedPet = createButton("feed drago")
  feedPet.position(650,95)
  feedPet.mousePressed(deductFood)

  foodObj = new Food()
  
}


function draw() { 
  background(46,139,87);
  drawSprites();
  //add styles here

  /*if(keyIsDown(UP_ARROW)){
    //console.log(foodS)
    writeStock(foodS)
  }
  fill("red")
textSize(20)
text("press up arrow key to feed drago", 200,50)*/

foodObj.display();
getFoodStock();
foodObj.foodStock = foodS
database.ref("lastFed").on("value",(data)=>{
  lastFed = data.val()
  showtime(lastFed)

})

if(mousePressed("feedPet")){
  dog.changeAnimation("happyDog", happyDog)

}

  
}
function updateFoodStock(){
database.ref("/").update({
  food:foodS+1,
  lastFed:hour()
})
}

function deductFood(){
  database.ref("/").update({
    food:foodS-1
})
}
function getFoodStock(){
database.ref("food").on("value",(data)=>{
  foodS = data.val()
})

}

function showtime(lastFed){
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("last fed : " + lastFed%12 + "PM",350,30)

}else if(lastFed===0){
  text("last fed : 12AM", 350,30)
}else{
  text("last fed : " + lastFed + "AM",350,30)
}

}



  





