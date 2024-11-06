var buttonColors = ["red","green","yellow","blue"]
var gamePattern = [];
var userClickedPattern = []
var started = false;
var level = 0;

function nextSequence(){
    
    userClickedPattern= [];
    level++;
    $("#level-title").text("Level "+level)

    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100)
    playSound(randomChosenColor)
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

function animatePress(currentColor){
        $("."+currentColor).addClass("pressed")
        setTimeout(function(){
            $("."+currentColor).removeClass("pressed")
        },100)    
}

function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }else{
            var wrong = new Audio("sounds/wrong.mp3")
            wrong.play()
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200)
            $("#level-title").text("Game Over, Press Any Key to Restart")
            startOver()
            level = 0
            gamePattern = []
            started = false
    }
}

function startOver(){

}

$(".btn").click(function(){
       var userChosenColor = $(this).attr("id");
       userClickedPattern.push(userChosenColor);

       playSound(userChosenColor)
       animatePress(userChosenColor)
       checkAnswer(userClickedPattern.length-1)
})

$(document).keypress(function(){
    if(!started){
        nextSequence()
        $("#level-title").text("Level "+level)
        started = true;
    }
})