import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";
import {IPosition} from '../interfaces/iposition';

let canvas: any = document.getElementById('mycanvas');

let startButton: any = document.getElementById('start-btn');

startButton.addEventListener("click", function () {
    init();
});

let gameLoop:any;


function init(): void {
    startButton.setAttribute('disabled', true);
    let painter = new Painter(canvas);
    var snake = new Snake(15, 'green', 'darkgreen', false);
    var food = new Food();
    var board = new Board(painter, snake, food, 500, 500, 50);
    let initPosition : IPosition = {x: null, y: null};
    board.init();

    gameLoop = setInterval(function () {
        board.init();
        snake.move();            
        
        if(snake.eatFood(food.position)){
           // alert("Collision")
            food.createFood();
            //snake = new Snake(6, 'green', 'darkgreen', true);
            //board = new Board(painter, snake, food, 500, 500, 50);
            board.drawScore();
            board.drawFood();
        }

        if(snake.checkCollision()){
            gameLoop = clearInterval(gameLoop);
            snake = null;
            alert("Game over");
            location.reload();
        }
        
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
    }, 250)
}

