import {IPosition} from '../interfaces/iposition';
import {ISnake} from '../interfaces/isnake';
import {Direction} from '../enums/direction';


export class Snake implements ISnake{
    cells: IPosition[];
    bodyColor: string;
    borderColor: string;
    direction: Direction;
    isFoodEaten : boolean;
    startX : number;
    length: number;
    constructor(_length:number, _bodyColor:string, _borderColor: string, _isFoodEaten: boolean){
        this.cells = [];
        this.length = _length;
        this.bodyColor = _bodyColor;
        this.borderColor = _borderColor;
        this.direction = Direction.Down;
        this.isFoodEaten = _isFoodEaten;
        for(let i = 0 ; i < _length ; i++){
            this.cells.push({x: i, y: 0});
        }
    }

    changeDirection(keyCode:number){
        switch (keyCode) {
            case 37:
                if (this.direction != Direction.Right) {
                    this.direction = Direction.Left;
                }
                break;
            case 39:
                if (this.direction != Direction.Left) {
                    this.direction = Direction.Right;
                }
                break;

            case 38:
                if (this.direction != Direction.Down) {
                    this.direction = Direction.Up;
                }
                break;

            case 40:
                if (this.direction != Direction.Up) {
                    this.direction = Direction.Down;
                }
                break;
        }
    }

    move(){
        let snakeX: number = this.cells[0].x;
        let snakeY: number = this.cells[0].y;

        if (this.direction == Direction.Right) {
            snakeX++;
        } else if (this.direction == Direction.Left) {
            snakeX--;
        } else if (this.direction == Direction.Up) {
            snakeY--;
        } else if (this.direction == Direction.Down) {
            snakeY++;
        }

        this.cells.pop();
        this.cells.unshift({x:snakeX, y:snakeY});
    }

    eatFood(food:IPosition): boolean{
        let head : IPosition = this.cells[0];
        //store position of last cell
        let lastCell : IPosition = this.cells[this.cells.length - 1];
        if(food.x == head.x && food.y == head.y){
            //pushed last cell again as one new cell;
            this.cells.push({x:lastCell.x, y:lastCell.y});
            return true;
        } else {
            return false;
        }
    }
    checkCollision(): boolean{
        let head:IPosition = this.cells[0];
        //initialize i from 1 because we want to exclude head's (x,y) position
        for(var i = 1; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if(cell.x === head.x && cell.y === head.y)
                return true;
        }
        return false;
    }
    checkBoundary(bx1:number,bx2:number, by1:number, by2:number ):boolean{
        var firstCell = this.cells[0];
        if(firstCell.x == bx1 || firstCell.y == by1 || firstCell.x == bx2 || firstCell.y == by2){
            return true;
        } else {
            return false;
        }
    }
}