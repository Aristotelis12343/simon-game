var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event){
    if (!started){
        $('h1').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.random()*4;
    var randomNumber=Math.floor(randomNumber);

    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    level+=1;
    $('h1').text('level ' + level);
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("correct");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $("h1").text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = 0;
}







