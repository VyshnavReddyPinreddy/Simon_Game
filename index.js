var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];
var level = 1;
var started = false;

const sounds = {
  red: new Audio("./sounds/red.mp3"),
  blue: new Audio("./sounds/blue.mp3"),
  green: new Audio("./sounds/green.mp3"),
  yellow: new Audio("./sounds/yellow.mp3"),
  wrong: new Audio("./sounds/wrong.mp3")
};

for (let key in sounds) {
  sounds[key].load();
}

$(document).on("keydown", function () {
  if (!started) {
    startGame();
  }
});

$("#start-btn").on("click", function () {
  if (!started) {
    startGame();
  }
});

function startGame() {
  $("#level-title").text("Level " + level);
  $("#start-btn").prop("disabled", true);
  nextSequence();
  started = true;
}

function nextSequence() {
  var randomnumber = Math.floor(4 * Math.random());
  var randomcolor = buttoncolors[randomnumber];
  gamepattern.push(randomcolor);

  $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomcolor);
  playSound(randomcolor);

  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").on("click", function () {
  var clickedcolor = $(this).attr("id");
  playSound(clickedcolor);
  userclickedpattern.push(clickedcolor);

  animatePress(clickedcolor);
  checkAnswer(userclickedpattern.length - 1);
});

function checkAnswer(i) {
  if (userclickedpattern[i] === gamepattern[i]) {
    if (i === gamepattern.length - 1) {
      userclickedpattern = [];
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    level = 1;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Press Any Key or below Button to Start");
    started = false;
    gamepattern = [];
    userclickedpattern = [];
    $("#start-btn").prop("disabled", false);
  }
}

function playSound(color) {
  if (sounds[color]) {
    try {
      const soundClone = sounds[color].cloneNode(); 
      soundClone.play();
    } catch (e) {
      console.warn("Audio play failed for:", color, e);
    }
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

$("#help-btn").on("click", function () {
  $("#help-box").fadeToggle(200);
});

