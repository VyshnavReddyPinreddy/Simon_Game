var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];
var level = 1;
var started = false;
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function nextSequence(){
    var randomnumber = Math.floor(4*Math.random());
    var randomcolor = buttoncolors[randomnumber]
    gamepattern.push(randomcolor);
    
    $("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomcolor);
    playsound(randomcolor);
    
    $("#level-title").text("Level "+level);
    level++;
}
$(".btn").on("click",function(){
    var clickedcolor = $(this).attr("id");
    playsound(clickedcolor);
    userclickedpattern.push(clickedcolor);

    console.log(gamepattern);
    console.log(userclickedpattern);

    animatePress(clickedcolor);
    checkAnswer(userclickedpattern.length-1);
});
function checkAnswer(i){
    if(userclickedpattern[i]===gamepattern[i]){
        console.log("success");
        if(i===gamepattern.length-1){
            userclickedpattern = [];
            setTimeout(function (){nextSequence();},500);
        }
    }else{
        level=1;
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("#level-title").text("Press A Key to Start");
        started = false;
        gamepattern = [];
        userclickedpattern = [];
        console.log("fail");
    }
}
function playsound(randomcolor){
    var audio = new Audio("./sounds/"+randomcolor+".mp3");
    audio.play();
}
function animatePress(randomcolor){
    $("#"+randomcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+randomcolor).removeClass("pressed");
    },100);
}


