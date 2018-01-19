import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";
import {IPosition} from '../interfaces/iposition';

let canvas: any = document.getElementById('mycanvas');
let startButton: any = document.getElementById('start-btn');
document.getElementById("main").style.display = "none";



startButton.addEventListener("click", function () {
    init();
});

let gameLoop:any;


function init(): void {
    document.getElementById("main").style.display = "block";
    startButton.setAttribute('disabled', true);
    let painter = new Painter(canvas);
    var snake = new Snake(5, 'green', 'darkgreen', false);
    var food = new Food();
    var board = new Board(painter, snake, food, 500, 500, 50);
    let initPosition : IPosition = {x: null, y: null};
    board.init();
    document.getElementById("start-btn").style.display = "none";

    gameLoop = setInterval(function () {
        board.init();
        board.showHighScore();        
        snake.move();            
        
        if(snake.eatFood(food.position)){
            food.createFood(); //if snakes its food, create a new food.
            board.drawScore(); //Draw score after eating food
            board.drawFood();  //draw the food on canvas
        }

        //If snake bites its own tail!
        if(snake.checkCollision()){
            alert("Game over");
            location.reload();
        }
        
        if(board.checkBoundary()){
            alert("Game over");
            location.reload();            
        }
        document.onkeydown = function (event) {
            let keyCode:number = event.keyCode;
            snake.changeDirection(keyCode)
        }
        board.drawSnake();
        board.drawFood();
    }, 250)
}

