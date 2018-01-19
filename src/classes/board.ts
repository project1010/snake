import {IPainter} from '../interfaces/ipainter';
import {IFood} from '../interfaces/ifood';
import {ISnake} from '../interfaces/isnake';
import {IBoard} from '../interfaces/iboard';

export class Board implements IBoard{
    painter: IPainter;
    snake: ISnake;
    height:number;
    width: number;
    size:number;
    food: IFood;
    private score : number = 0;
    private highestScore : number = Number(localStorage.getItem("highScore"));
    //private highestScore : number = 100;
    constructor(painter: IPainter,snake: ISnake, food: IFood,h:number, w:number, s:number){
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
    }
    drawSnake():void{
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if(i==0){
                this.drawSnakeCell(cell.x, cell.y, true);
            } else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }
        }
    }
    drawSnakeCell(x:number, y:number, isHead:boolean){
        if(isHead){
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "orange");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "black");
        } else {
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "#4c0202");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "black");
        }
    }
    drawFood():void{
        this.painter.fillArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "#07f20b");
        this.painter.strokeArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "black");

    }
    drawScore():void{
        this.score++;
        if(this.score > this.highestScore){
            localStorage.setItem("highScore", JSON.stringify(this.score));
            this.highestScore = this.score;
        }
        document.getElementById("score").innerHTML  =   '<p><b>Score : ' + this.score + '</b></p>'                                                        
    }

    showHighScore():void{
        document.getElementById("higestscore").innerHTML  =  '<p><b>Higest Score : ' + this.highestScore + '</p>';
        document.getElementById("score").innerHTML  =   '<p><b>Score : ' + this.score + '</b></p>';                                                                        
    }

    checkBoundary(): boolean{
        return this.snake.checkBoundary(-1,  this.width/this.size,-1, this.height/this.size);
    }
    init():void{
        this.painter.fillArea(0, 0, this.width, this.height, "lightblue")
        this.painter.strokeArea(0, 0, this.width, this.height,"black")
    }
}