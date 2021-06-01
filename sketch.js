var player1 = "X";
var player2 = "O";
var players = [player1, player2]
var board = [
  ["","",""],
  ["","",""],
  ["","",""]
]
var availableSpot = [];

var currentPlayer;
var otherPlayer;
var winner=null;

function setup() {
  createCanvas(650,650);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      availableSpot.push([i,j])
    }
  } 
  var num = Math.round(random(0,1))
  if (num === 0) {
    currentPlayer = player1
    otherPlayer=player2
  }
  if (num === 1) {
    currentPlayer = player2
    otherPlayer=player1
  }
  //console.log(currentPlayer)
}

function draw() {
  background(48, 213, 172);
  let w = width
  let h =height  
  for (var i = 1; i < 3; i++) {
    stroke(116, 125, 123)
    strokeWeight(10)
    line(w/3*i,0+50 ,w/3*i,height-50)
    line(0+50,h/3*i,width-50,h/3*i)
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      //textAlign(CENTER)
      textSize(150)
      strokeWeight(0.1)
      text(board[i][j], w/3*i+50, h/3*j+h/3-50)
    }
  } 
  //next();
  drawSprites();
}

function mouseClicked() {
  if(mouseX>0 && mouseX<215 && mouseY<215 && mouseY>0 && board[0][0]==''){
    board[0][0]=currentPlayer
    availableSpot.splice(0, 1)[0]
  }
  if(mouseX<430 && mouseX>215 && mouseY<215 && mouseY>0 && board[1][0]==''){
    board[1][0]=currentPlayer
    availableSpot.splice(3, 1)[0]
  }
  if(mouseX>430 && mouseX<650 && mouseY<215 && mouseY>0 && board[2][0]==''){
    board[2][0]=currentPlayer
    availableSpot.splice(6, 1)[0]
  }  
  
  
  if(mouseX>0 && mouseX<215 && mouseY>215 && mouseY<430 && board[0][1]==''){
    board[0][1]=currentPlayer
    availableSpot.splice(1, 1)[0]
  }
  if(mouseX<430 && mouseX>215 && mouseY>215 && mouseY<430 && board[1][1]==''){
    board[1][1]=currentPlayer
    availableSpot.splice(4, 1)[0]
  }
  if(mouseX>430 && mouseX<650 && mouseY>215 && mouseY<430 && board[2][1]==''){
    board[2][1]=currentPlayer
    availableSpot.splice(7, 1)[0]
  }

  
  if(mouseX>0 && mouseX<215 && mouseY<650 && mouseY>430 && board[0][2]==''){
    board[0][2]=currentPlayer
    availableSpot.splice(2, 1)[0]
  }
  if(mouseX<430 && mouseX>215 && mouseY<650 && mouseY>430 && board[1][2]==''){
    board[1][2]=currentPlayer
    availableSpot.splice(5, 1)[0]
  }
  if(mouseX>430 && mouseX<650 && mouseY<650 && mouseY>430 && board[2][2]==''){
    board[2][2]=currentPlayer
    availableSpot.splice(8, 1)[0]
  }

  var result=checkWinning();

  if(result!=null){
    noLoop();
    if(winner==currentPlayer)
    alert( "You Win!")
    else if(result=="tie"){
      alert( "It's a tie")
    }
    else{
      alert("You Lose");
    }
  }

  else{
    next();
  } 
}

function next(){
  if(availableSpot.length>0){
    var index = floor(random(availableSpot.length))
    var spot = availableSpot.splice(index, 1)[0]

    var i = spot[0]
    var j = spot[1]
   
    board[i][j] =otherPlayer
  }
}

function checkWinning(){
  winner=null;

  //row
  for(var i = 0; i < 3; i++) {
    if(checkEquals(board[i][0],board[i][1],board[i][2])){
      winner=board[i][0];
    }
  }
  
  //column
  for(var i = 0; i < 3; i++) {
    if(checkEquals(board[0][i],board[1][i],board[2][i])){
      winner=board[0][i];
    }
  }
  
  //diagonal 
  if(checkEquals(board[0][0],board[1][1],board[2][2]) ||
     checkEquals(board[0][2],board[1][1],board[2][0])){
      winner=board[0][0];    
  }

  //Tie
  if(winner==null && availableSpot.length==0){
    return "tie";
  }
  else if(winner!==null){
    return winner;  
  }    
}

function checkEquals(x,y,z){
  if(x==y && y==z && x!=''){
    return true;
  } 
}