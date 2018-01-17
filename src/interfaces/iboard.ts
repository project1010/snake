import {IPainter} from './ipainter';
import {IFood} from './ifood';

export interface IBoard {
    painter: IPainter,
    height:number,
    width: number,
    size:number,
    food: IFood,
    drawSnake(isFoodEaten : boolean):void,
    drawFood(x: number, y: number):void,
    drawScore():void,
    init():void
}