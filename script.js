//click start/reset button
//QUESTION: are we playing?
    //yes-> reload game-page
    //no->   
        //'show' trials left box
        //change the button text to "reset game"
        //set playing status to yes(true)
        //set score value to 0
        //1. generate a random fruit
        //define a random fruit-step
        //2. move fruit down one step every 30msec
            //QUESTION: is fruit too low?
                //no->  repeat #2
                //yes-> QUESTION: any trials left?
                    //yes->repeat #1
                //no-> 
                    //show game over
                    //change button text to 'start game'

//SLICE FRUIT
    //play sound effect
    //explode fruit
    //increase score value
let $ = window.$;             //found this suggestion on github: https://github.com/facebook/create-react-app/issues/4422
var playing = false;
var score;
var trialsLeft;
var monsters = ["bogeyowl","frankenstein","humanoid","wolfman","heart-1-red_sm","humanoid-invert"];
var step;
let isHeart = false;

$(function(){
    
$("#startreset").click(function(){
    //playing?
    if(playing == true){
        location.reload();//reload page
    }else{
        playing = true; //game initiated
        score = 0;                        //reset score to 0
        $("#scorevalue").html(score);   //scoreboard reflects score value

        //make trialsLeft box appear
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide gameover box
        $("#gameover").hide();

        //change #startreset to 'reset game'
        $("#startreset").html("Reset Game")

        startAction();
    }
});

/*___________________________________

  =============FUNCTIONS=============
  __________________________________*/

$("#monster1").mouseover(function(){
    score++;    //increase score by one point
    $("#scorevalue").html(score);   //update the scoreboard
    /*document.getElementById("slicesound").play();*/
    $("#slicesound")[0].play();  //play sound effect

    if(isHeart){
        trialsLeft += 1;
        isHeart = false;
        addHearts();
    }
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit through animation
    $("#monster1").hide("explode", 500);
    
    //send new fruit
    setTimeout(startAction,500);
});  
    

function addHearts(){
    $("#trialsLeft").empty();
    for(i=0;i<trialsLeft;i++){
        $("#trialsLeft").append(' <img src="images/heart-1-red_sm.png"> ');
        //impliment time-delay for effect
    }
}

function startAction(){
    $("#monster1").show();  //this undoes css style .monster{display:none;}
    
    chooseMonster(); //choose a random monster
    
    $("#monster1").css({"left":Math.round(800*Math.random()),"top":-130});//random x-location
    
    step = Math.round(5 + Math.random()) +1;    //random dy interval
    
    //move fruit downward every 10ms
    action = setInterval(function(){
        $("#monster1").css("top", $("#monster1").position().top + step ); //move monster step by step
        
        //check if the monster has fallen too low
        if( $("#monster1").position().top > $("#fruitContainer").height()){
           //check if any heart containers remaining
            if(trialsLeft > 1){
                //generate another fruit
                $("#monster1").show();
                chooseMonster(); //choose a random monster
                $("#monster1").css({"left":Math.round(800*Math.random()),"top":-130});//random x-location
                step = Math.round(5 + Math.random()) +1;    //random dy interval
                
                //reduce heart containers by 1
                trialsLeft --;
                //populate trialsLeft box
                addHearts();
            }else{  //game over
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html("<p>Game Over</p><p>Your score is " + score + "</p>");
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    },20);
}

//generate a random monster
function chooseMonster(){
    /*for(i=Math.floor(Math.random()*4)){
        $("#monster1").attr("src","images/" + monsters[i] + ".png");
    }*/
    let rand = Math.floor(Math.random()*6);
    // $("#monster1").attr("src","images/" + monsters[Math.floor(Math.random()*6)] + ".png");
    $("#monster1").attr("src","images/" + monsters[rand] + ".png");

    //check if heart container
    if(rand === 4){
        isHeart = true;
        console.log(rand);
        console.log(isHeart);
    }
    // console.log(rand + " " + isheart);
}

//stop dropping fruit
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
    
    
});



