class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //WAIT STATE (Game State = 0)
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carimg1);
    car2 = createSprite(300,200);
    car2.addImage(carimg2);
    car3 = createSprite(500,200);
    car3.addImage(carimg3);
    car4 = createSprite(700,200);
    car4.addImage(carimg4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){ //GAME STARTS
      background("brown");
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 330;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        //Identifying the currently active car/player
        if (index === player.index){
          fill("red");
          ellipse(x,y, 60,60 );
          
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
     }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance> 5250) {
      gameState = 2;
    }
    
    drawSprites();
  }

  end(){
    console.log("GAME ENDED");
  }
}
