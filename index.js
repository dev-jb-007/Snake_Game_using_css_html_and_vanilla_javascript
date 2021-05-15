//Variables
const foodmusic = new Audio("music/food.mp3");
const gameovermusic = new Audio("music/gameover.mp3");
const movemusic = new Audio("music/move.mp3");
console.log("Hi");
let lasttime = 0;
let speed = 10;
let direction = { x: 0, y: 0 };
let snakearr = [{ x: 13, y: 15 }];
let board = document.querySelector(".board");
let food = { x: 5, y: 5 };
let score = 0;
let scoredisplay = document.querySelector(".score");
let highscore = 0;
function score_and_highscore() {
    scoredisplay.innerHTML = `<h1>Score:${score}</h1>`;
    let highscore = localStorage.getItem('highscore');
    if (highscore=== null) {
        highscore = '0';
    }
    else {
        if (JSON.parse(highscore) <= score) {
            highscore = JSON.stringify(score);
        }
    }
    document.querySelector(".score").innerHTML += `<h1>HighScore:${highscore}</h1>`;
    localStorage.setItem('highscore', highscore);
}
//Game  creaction
function isCollide() {
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[0].x == snakearr[i].x && snakearr[0].y == snakearr[i].y) {
            return true;
        }
    }
    if (snakearr[0].x >= 19 || snakearr[0].x <= 0 || snakearr[0].y >= 19 || snakearr[0].y <= 0) {
        return true;
    }
    return false;
}
function foodproblem() {
    let fooddiv = document.createElement("div");
    fooddiv.classList.add("food");
    fooddiv.style.gridRowStart = food.y;
    fooddiv.style.gridColumnStart = food.x;
    board.appendChild(fooddiv);
}

function rungame() {
    score_and_highscore();
    if (isCollide() == true) {
        gameovermusic.play();
        alert("Your game is over");
        score = 0;
        score_and_highscore();
        direction = { x: 0, y: 0 };
        snakearr = [{ x: 13, y: 15 }];
        food = { x: 5, y: 5 };
    }
    //Add snake and dispaly snake
    board.innerHTML = '';
    snakearr.forEach((e, index) => {
        if (index == 0) {
            let element = document.createElement("div");
            element.classList.add("head");
            element.style.gridRowStart = e.y;
            element.style.gridColumnStart = e.x;
            board.appendChild(element);
        }
        else {
            let element = document.createElement("div");
            element.classList.add("snake");
            element.style.gridRowStart = e.y;
            element.style.gridColumnStart = e.x;
            board.appendChild(element);
        }

    });
    //Add food
    foodproblem();
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        foodmusic.play();
        let a = snakearr[0].x + direction.x;
        let b = snakearr[0].y + direction.y;
        snakearr.unshift({ x: a, y: b });
        food = { x: (Math.round(1 + (17) * Math.random())), y: (Math.round(1 + (17) * Math.random())) };
        score++;
        speed++;
        score_and_highscore();
    }

    //Moving snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;





    //Moving Snake
}
window.addEventListener("keydown", (e) => {
    movemusic.play();
    direction = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrow left");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("arrow right");
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }
})





//Setting animations
function move(giventime) {
    window.requestAnimationFrame(move);
    if ((giventime - lasttime) / 1000 < 1 / speed) {
        return;
    }
    lasttime = giventime;
    rungame();
}




//Main
window.requestAnimationFrame(move);