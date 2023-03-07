var buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;


$(document).keypress(function(){
    if (!isGameStarted){
        $("#level-title").text("Level " + level);
        isGameStarted = true;
        nextSequence();
    }
})

$(".row .btn").click(UserClickHandler);
function UserClickHandler(){
    var userChoosenColor = this['id'];
    // or we can do this way too. var userChoosenColor = $(this).attr("this");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).toggleClass("pressed");}
        , 100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNum];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(key){
    var audioName = "sounds/"+key+".mp3";
    var audio = new Audio(audioName);
    audio.play();
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}