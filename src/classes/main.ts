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
    var board = new Board(painter, snake, food, 500, 500, 50);
    board.init();

    gameLoop = setInterval(function () {
        board.init();
        snake.move();

        if(snake.eatFood(food.position)){
           // alert("Collision")
            food.createFood();
            //snake = new Snake(6, 'green', 'darkgreen');
            board.drawSnake(true);        
            board.drawFood(1,1);
        };

        if(board.checkBoundary()){
            gameLoop = clearInterval(gameLoop);
            alert("Game over");
        }
        document.onkeydown = function (event) {
            let keyCode:number = event.keyCode;
            snake.changeDirection(keyCode)
        }
        board.drawSnake(false);
        board.drawFood(1,1);
    }, 250)
}

