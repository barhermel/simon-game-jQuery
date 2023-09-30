let gamePattern = [];
let userClickedPattern = [];
let btnColours = ["red", "blue", "green", "yellow"];
let level = 0;
$('body').one('keypress', nextSequance);
$('body').one('touchstart',nextSequance);
$(`.btn`).click((e) => {

    if (gamePattern.length > 0) {
        let userChosenButton = e.target.id;
        userClickedPattern.push(userChosenButton);
        playSound(userChosenButton);
        animatePress(userChosenButton);
        gameNextState(checkAnswer(userClickedPattern.length - 1));
    }
});

$('.btn').on('tap', (e) => {

    if (gamePattern.length > 0) {
        let userChosenButton = e.target.id;
        userClickedPattern.push(userChosenButton);
        playSound(userChosenButton);
        animatePress(userChosenButton);
        gameNextState(checkAnswer(userClickedPattern.length - 1));
    }
});

function nextSequance() {
    setTimeout(() => {
        level++;
        changeTitle(`Level ${level}`);
        generateNewRandomColour();
        userClickedPattern = [];
    }, 500)
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        return true;
    }
    return false;
}

function gameNextState(userAnswer){
    if (userAnswer === true){
        if (userClickedPattern.length === level) nextSequance();
    }
    else {
        playSound(`wrong`);
        $(`body`).addClass("game-over");
        setTimeout(() => {
            $(`body`).removeClass("game-over");
        }, 200);
        changeTitle(`Game Over, Press Any Key to Restart`);
        $('body').one('keypress', startOver);
        $('body').one('touchstart',nextSequance);
    }
}


function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    currentColour = $(`#${currentColour}`)
    currentColour.addClass('pressed');
    setTimeout(() => {
        currentColour.removeClass('pressed');
    }, 100)
}

function startOver(){
    gamePattern = [];
    level = 0;
    nextSequance();
}

function  generateNewRandomColour(){
    let randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = btnColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let chosenColourBtn = `.${randomChosenColour}`;
    $(chosenColourBtn).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColour);
}

function changeTitle(newTitle){
    $('h1').text(newTitle);
}
