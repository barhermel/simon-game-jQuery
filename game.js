let gamePattern = [];
let userClickedPattern = [];
let btnColours = ["red", "blue", "green", "yellow"];
let level = 1;
let triger = 0 // 0 = key not pressed 1 = key pressed
let tutorialflag = 0;
let dificult = 2;
$('.play').one('click', startOver);
$('.play').one('touchstart',startOver);
$('.tutorial').one('click', startTutorial);
$('.tutorial').one('touchstart',startTutorial);

$(`#easy`).click((e) => {
    dificult = 1;
});

$(`#hard`).click((e) => {
    dificult = 2;
});

$('.btn').on('tap', (e) => {

    userClickColor(e);
});

$(`.btn`).on(`click`, (e) => {

    userClickColor(e);
} );

function nextSequance() {
    if (tutorialflag === 0){
        changeTitle(`Level ${level}`);
    }
    setTimeout(() => {
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
        if (userClickedPattern.length === level){
            level++;
            if ( tutorialflag !== 3)  nextSequance();
        } 
    }
    else {
        playSound(`wrong`);
        $(`body`).addClass("game-over");
        setTimeout(() => {
            $(`body`).removeClass("game-over");
        }, 200);
        changeTitle(`Game Over, Press Any Key to Restart`);
        $('.play').addClass('show');
        $('.tutorial').addClass('show');
        $(`#formName`).addClass('show');
        $('.play').one('click', startOver);
        $('.play').one('touchstart',startOver);
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
    $('.play').removeClass('show');
    $('.tutorial').removeClass('show');
    $('.play').addClass('hide');
    $('.tutorial').addClass('hide');
    $(`#formName`).removeClass('show');
    $(`#formName`).addClass('hide');
    // $(`#hard`).removeClass('show');
    // $(`#hard`).addClass('hide');
    // $().removeClass('show');
    // $().addClass('hide');
    gamePattern = [];
    level = 1;
    nextSequance();
}

function  generateNewRandomColour(){
    let randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = btnColours[randomNumber];
    gamePattern.push(randomChosenColour);
    if (dificult === 1){
        index = 1;
        for (const color of gamePattern) {
            setTimeout(() => {
                console.log(color);
                $(`.${color}`).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
                playSound(color);
            }, index * 500);
            index++;
        }
    }
    else{
        let chosenColourBtn = `.${randomChosenColour}`;
        $(chosenColourBtn).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
        playSound(randomChosenColour);

    }
}

function changeTitle(newTitle){
    $('h1').text(newTitle);
}

function startTutorial(){
    $('.play').removeClass('show');
    $('.tutorial').removeClass('show');
    $('.play').addClass('hide');
    $('.tutorial').addClass('hide');
    $(`#formName`).removeClass('show');
    $(`#formName`).addClass('hide');
    tutorialflag = 1;
    let instructions = 'In each level Simon will chose a diffrent color like this';
    changeTitle(instructions)
    nextSequance();
    setTimeout(() => {
        instructions = 'You need to memorize the color patern that simon choose';
        changeTitle(instructions);
        setTimeout(() => {
            instructions = `Now click The color Simon choose (${gamePattern[0]})`;
            $('h1').text(instructions);
            
        }, 3000);
    }, 3000);
}


function userClickColor(e){
    console.log(`in user click`)
    let userChosenButton = e.target.id;
    userClickedPattern.push(userChosenButton);
    playSound(userChosenButton);
    animatePress(userChosenButton);
    let checkAnsweVar = checkAnswer(userClickedPattern.length-1);
    if (tutorialflag === 0){
        gameNextState(checkAnsweVar);
    }
    else if (tutorialflag === 1){
        
        if (!checkAnsweVar) changeTitle('Try Again');
        else {
                let instructions = `Lets try another turn`;
                setTimeout(() => {
                    changeTitle(instructions);
                    instructions = `Remember Simon will show you only the last color`;
                    setTimeout(()=>{
                        changeTitle(instructions);
                        setTimeout(() => {
                            instructions = `You need to click/tap the whole pattern`;
                            tutorialflag = 2;
                            changeTitle(instructions);
                            gameNextState(checkAnsweVar);
                            tutorialflag = 3;
                        }, 3000)
                    }, 3000 )
                }, 3000)
            }
        
    }
     else if(tutorialflag === 3) {

    setTimeout(() => {
        instructions = `Now you are ready for game`;
        changeTitle(instructions);
        setTimeout(() => {
            instructions = `To start a new game press on Play`;
            changeTitle(instructions);
            tutorialflag = 0;
            setTimeout(() => {
                $('.play').addClass('show');
                $('.tutorial').addClass('show');
                $(`#formName`).addClass('show');
            }, 2000)
        }, 2000)
    }, 3000)
     }
}

