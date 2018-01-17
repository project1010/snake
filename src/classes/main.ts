import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";

let canvas: any = document.getElementById('mycanvas');

let startButton: any = document.getElementById('start-btn');

startButton.addEventListener("click", function () {
    init();
});

let gameLoop:any;


function init(): void {
    startButton.setAttribute('disabled', true);
    let painter = new Painter(canvas);
    var snake = new Snake(5, 'green', 'darkgreen');
    var food = new Food();
    var board = new Board(painter, snake, food, 350, 350, 10);
    board.init();

    gameLoop = setInterval(function () {
        board.init();
        snake.move();


        if(board.checkBoundary()){
            gameLoop = clearInterval(gameLoop);
            alert("Game over");
        }
        document.onkeydown = function (event) {
            let keyCode:number = event.keyCode;
            snake.changeDirection(keyCode)
        }
        board.drawSnake();
        board.drawFood();
    }, 150)
}

