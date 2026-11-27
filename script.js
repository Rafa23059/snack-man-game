let gamestarted = false;  //added a variable to set movemkent off untill start button has been pressed 
let y = 0;         //keeping the variable of y as 0 for the score to be 0 at the start of the game

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }
        main.appendChild(block);
    }
}
function startbutton() {  //function to make start button dissappear once it has been pressed
    start.style.opacity = 0.0;    //hiding the start button with the opacity 
    start.style.display = 'none';
    gamestarted = true;          //value true of the movement to be enabled

}

//Player movement
function keyUp(event) {
    if (!startbutton) return ; // function to check if the start button has started to change value to " false" to make the movement to be unuseable

    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) { // function to check if the start button has started to change value to " true" to make the movement to be useable
    if (!startbutton) return ;

    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

const player = document.querySelector('#player');   //default location of the pac-man
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;

setInterval(function () {
    if (!gamestarted) return;  //function to check the true or false of the function as well as enable the movement of the player 
    let position = player.getBoundingClientRect();

    if (downPressed) {
        let newBottom = position.bottom + 1;
        let bottomL = document.elementFromPoint(position.left, newBottom);                         
        let bottomR = document.elementFromPoint(position.right, newBottom);

        if (!bottomL.classList.contains('wall') && !bottomR.classList.contains('wall')) {     //command in order to identify if a wall and stop the movement of the player
            playerTop++;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'down';
    }
    else if (upPressed) {
        let newTop = position.top - 1;
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (!topL.classList.contains('wall') && !topR.classList.contains('wall')) {  //command in order to identify if a wall and stop the moov ement of the player
            playerTop--;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'up';
    }
    else if (leftPressed) {
        let newLeft = position.left - 1;
        let leftT = document.elementFromPoint(newLeft, position.top);
        let leftB = document.elementFromPoint(newLeft, position.bottom);

        if (!leftT.classList.contains('wall') && !leftB.classList.contains('wall')) {  //command in order to identify if a wall and stop the moov ement of the player
            playerLeft--;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'left';
    }
    else if (rightPressed) {
        let newRight = position.right + 1;
        let rightT = document.elementFromPoint(newRight, position.top);
        let rightB = document.elementFromPoint(newRight, position.bottom);

        if (!rightT.classList.contains('wall') && !rightB.classList.contains('wall')) {  //command in order to identify if a wall and stop the moov ement of the player
            playerLeft++;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'right';
    }
    
    let points = document.querySelectorAll('.point');        //points function area 
    points.forEach(function(point) {
        let pointRect = point.getBoundingClientRect();
        if (
            position.right > pointRect.left &&
            position.left < pointRect.right && 
            position.bottom > pointRect.top && 
            position.top < pointRect.bottom
        ) {
            point.classList.remove('point');     //function to remove the points from the screen once the player has eaten them
            point.style.background = 'none';
            
             for (let i = 0; i < points.length; i++) { //checks points location and if user over-laps and add the score 
             let pos = points[i].getBoundingClientRect();          
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
) {
            point.classList.remove('point');
            y = y + 1;  //incrementing the score by 1 followed by the first command where y = 0
            console.log(y); //input for the console 
            document.querySelector(".ScoreP").innerText = y;
            
                if (y === 50) { //highest points to be achieved
                    alert(" Game over, You win!"); //message to be displayed after the game has has been completed
                }               
}
if (y === 50) gamestarted = false;  //when the player has achieved 50 points the game will stop
}
        }
    });
        let enemy = document.querySelectorAll('.enemy');    //same function as the points but for the enemy 
        enemy.forEach(function(enemy) {
            let enemyRect = enemy.getBoundingClientRect();
            if (
                position.right > enemyRect.left &&
                position.left < enemyRect.right &&
                position.bottom > enemyRect.top && 
                position.top < enemyRect.bottom
            ) {
                player.classList.add('dead');
                setTimeout(function() {         //timeout function to make the criteria of the die animation and only after that the game is over
                    alert("Game over, You lose!");
                    gamestarted = false;
                }, 600); // 600 milikseconds used for the alert to pop up
            }
        });
}, 10);
//Event listeners for key presses
document.addEventListener('keydown', keyDown); //sets the movement function to true
document.addEventListener('keyup', keyUp);

const start = document.querySelector('.start');// sets the gamestart function to true to make it run
start.addEventListener('click', startbutton);





