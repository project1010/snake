/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__painter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snake__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__food__ = __webpack_require__(5);




var canvas = document.getElementById('mycanvas');
var startButton = document.getElementById('start-btn');
document.getElementById("main").style.display = "none";
startButton.addEventListener("click", function () {
    init();
});
var gameLoop;
function init() {
    document.getElementById("main").style.display = "block";
    document.getElementById("logo").style.display = "none";
    startButton.setAttribute('disabled', true);
    var painter = new __WEBPACK_IMPORTED_MODULE_0__painter__["a" /* Painter */](canvas);
    var snake = new __WEBPACK_IMPORTED_MODULE_2__snake__["a" /* Snake */](5, 'green', 'darkgreen', false);
    var food = new __WEBPACK_IMPORTED_MODULE_3__food__["a" /* Food */]();
    var board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */](painter, snake, food, 500, 500, 50);
    var initPosition = { x: null, y: null };
    board.init();
    document.getElementById("start-btn").style.display = "none";
    gameLoop = setInterval(function () {
        board.init();
        board.showHighScore();
        snake.move();
        if (snake.eatFood(food.position)) {
            food.createFood(); //if snakes its food, create a new food.
            board.drawScore(); //Draw score after eating food
            board.drawFood(); //draw the food on canvas
        }
        //If snake bites its own tail!
        if (snake.checkCollision()) {
            alert("You bite on your own tail, Game over");
            location.reload();
        }
        if (board.checkBoundary()) {
            alert("Game over");
            location.reload();
        }
        document.onkeydown = function (event) {
            var keyCode = event.keyCode;
            snake.changeDirection(keyCode);
        };
        board.drawSnake();
        board.drawFood();
    }, 350);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Painter; });
var Painter = /** @class */ (function () {
    function Painter(_canvas) {
        this.canvas = _canvas;
        this.context = _canvas.getContext('2d');
    }
    Painter.prototype.fillArea = function (x1, y1, x2, y2, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x1, y1, x2, y2);
    };
    Painter.prototype.strokeArea = function (x1, y1, x2, y2, color) {
        this.context.strokeStyle = color;
        this.context.strokeRect(x1, y1, x2, y2);
    };
    return Painter;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var Board = /** @class */ (function () {
    //private highestScore : number = 100;
    function Board(painter, snake, food, h, w, s) {
        this.score = 0;
        this.highestScore = Number(localStorage.getItem("highScore"));
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
    }
    Board.prototype.drawSnake = function () {
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if (i == 0) {
                this.drawSnakeCell(cell.x, cell.y, true);
            }
            else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }
        }
    };
    Board.prototype.drawSnakeCell = function (x, y, isHead) {
        if (isHead) {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "orange");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "black");
        }
        else {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "#4c0202");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "black");
        }
    };
    Board.prototype.drawFood = function () {
        this.painter.fillArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "#07f20b");
        this.painter.strokeArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "black");
    };
    Board.prototype.drawScore = function () {
        this.score++;
        if (this.score > this.highestScore) {
            localStorage.setItem("highScore", JSON.stringify(this.score));
            this.highestScore = this.score;
        }
        document.getElementById("score").innerHTML = '<p><b>Score : ' + this.score + '</b></p>';
    };
    Board.prototype.showHighScore = function () {
        document.getElementById("higestscore").innerHTML = '<p><b>Higest Score : ' + this.highestScore + '</p>';
        document.getElementById("score").innerHTML = '<p><b>Score : ' + this.score + '</b></p>';
    };
    Board.prototype.checkBoundary = function () {
        return this.snake.checkBoundary(-1, this.width / this.size, -1, this.height / this.size);
    };
    Board.prototype.init = function () {
        this.painter.fillArea(0, 0, this.width, this.height, "lightblue");
        this.painter.strokeArea(0, 0, this.width, this.height, "black");
    };
    return Board;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Snake; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums_direction__ = __webpack_require__(4);

var Snake = /** @class */ (function () {
    function Snake(_length, _bodyColor, _borderColor, _isFoodEaten) {
        this.cells = [];
        this.length = _length;
        this.bodyColor = _bodyColor;
        this.borderColor = _borderColor;
        this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
        this.isFoodEaten = _isFoodEaten;
        for (var i = 0; i < _length; i++) {
            this.cells.push({ x: i, y: 0 });
        }
    }
    Snake.prototype.changeDirection = function (keyCode) {
        switch (keyCode) {
            case 37:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left;
                }
                break;
            case 39:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right;
                }
                break;
            case 38:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up;
                }
                break;
            case 40:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
                }
                break;
        }
    };
    Snake.prototype.move = function () {
        var snakeX = this.cells[0].x;
        var snakeY = this.cells[0].y;
        if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
            snakeX++;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
            snakeX--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
            snakeY--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
            snakeY++;
        }
        this.cells.pop();
        this.cells.unshift({ x: snakeX, y: snakeY });
    };
    Snake.prototype.eatFood = function (food) {
        var head = this.cells[0];
        //store position of last cell
        var lastCell = this.cells[this.cells.length - 1];
        if (food.x == head.x && food.y == head.y) {
            //pushed last cell again as one new cell;
            this.cells.push({ x: lastCell.x, y: lastCell.y });
            return true;
        }
        else {
            return false;
        }
    };
    Snake.prototype.checkCollision = function () {
        var head = this.cells[0];
        //initialize i from 1 because we want to exclude head's (x,y) position
        for (var i = 2; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if (cell.x === head.x && cell.y === head.y)
                return true;
        }
        return false;
    };
    Snake.prototype.checkBoundary = function (bx1, bx2, by1, by2) {
        var firstCell = this.cells[0];
        if (firstCell.x == bx1 || firstCell.y == by1 || firstCell.x == bx2 || firstCell.y == by2) {
            return true;
        }
        else {
            return false;
        }
    };
    return Snake;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Direction; });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Food; });
var Food = /** @class */ (function () {
    function Food() {
        this.createFood();
    }
    Food.prototype.createFood = function () {
        var pos = {
            x: Math.floor(Math.random() * 9),
            y: Math.floor(Math.random() * 9)
        };
        this.position = pos;
    };
    return Food;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2QyM2NjNTk0ZTIzOWJhYjU5M2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RGtDO0FBQ0o7QUFDQTtBQUNGO0FBRzVCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBSXZELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7SUFDbEMsSUFBSSxFQUFF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QUFDLENBQUM7UUFDOUIsRUFBRSxFQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7WUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7QUNwR0QsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLHFDQUFFO0lBQ0YseUNBQUk7SUFDSix5Q0FBSTtJQUNKLDJDQUFLO0FBQ1QsQ0FBQyxFQUxXLFNBQVMsS0FBVCxTQUFTLFFBS3BCOzs7Ozs7OztBQ0REO0FBQUE7SUFFSTtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QseUJBQVUsR0FBVjtRQUNJLElBQUksR0FBRyxHQUFHO1lBQ04sQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkMjNjYzU5NGUyMzliYWI1OTNjIiwiaW1wb3J0IHtQYWludGVyfSBmcm9tICcuL3BhaW50ZXInO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL2JvYXJkJztcclxuaW1wb3J0IHtTbmFrZX0gZnJvbSAnLi9zbmFrZSc7XHJcbmltcG9ydCB7Rm9vZH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5cclxubGV0IGNhbnZhczogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Y2FudmFzJyk7XHJcbmxldCBzdGFydEJ1dHRvbjogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWJ0bicpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuXHJcblxyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdCgpO1xyXG59KTtcclxuXHJcbmxldCBnYW1lTG9vcDphbnk7XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIHN0YXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIGxldCBwYWludGVyID0gbmV3IFBhaW50ZXIoY2FudmFzKTtcclxuICAgIHZhciBzbmFrZSA9IG5ldyBTbmFrZSg1LCAnZ3JlZW4nLCAnZGFya2dyZWVuJywgZmFsc2UpO1xyXG4gICAgdmFyIGZvb2QgPSBuZXcgRm9vZCgpO1xyXG4gICAgdmFyIGJvYXJkID0gbmV3IEJvYXJkKHBhaW50ZXIsIHNuYWtlLCBmb29kLCA1MDAsIDUwMCwgNTApO1xyXG4gICAgbGV0IGluaXRQb3NpdGlvbiA6IElQb3NpdGlvbiA9IHt4OiBudWxsLCB5OiBudWxsfTtcclxuICAgIGJvYXJkLmluaXQoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnRuXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBnYW1lTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBib2FyZC5pbml0KCk7XHJcbiAgICAgICAgYm9hcmQuc2hvd0hpZ2hTY29yZSgpOyAgICAgICAgXHJcbiAgICAgICAgc25ha2UubW92ZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNuYWtlLmVhdEZvb2QoZm9vZC5wb3NpdGlvbikpe1xyXG4gICAgICAgICAgICBmb29kLmNyZWF0ZUZvb2QoKTsgLy9pZiBzbmFrZXMgaXRzIGZvb2QsIGNyZWF0ZSBhIG5ldyBmb29kLlxyXG4gICAgICAgICAgICBib2FyZC5kcmF3U2NvcmUoKTsgLy9EcmF3IHNjb3JlIGFmdGVyIGVhdGluZyBmb29kXHJcbiAgICAgICAgICAgIGJvYXJkLmRyYXdGb29kKCk7ICAvL2RyYXcgdGhlIGZvb2Qgb24gY2FudmFzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIHNuYWtlIGJpdGVzIGl0cyBvd24gdGFpbCFcclxuICAgICAgICBpZihzbmFrZS5jaGVja0NvbGxpc2lvbigpKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJZb3UgYml0ZSBvbiB5b3VyIG93biB0YWlsLCBHYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihib2FyZC5jaGVja0JvdW5kYXJ5KCkpe1xyXG4gICAgICAgICAgICBhbGVydChcIkdhbWUgb3ZlclwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBsZXQga2V5Q29kZTpudW1iZXIgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgICAgICBzbmFrZS5jaGFuZ2VEaXJlY3Rpb24oa2V5Q29kZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9hcmQuZHJhd1NuYWtlKCk7XHJcbiAgICAgICAgYm9hcmQuZHJhd0Zvb2QoKTtcclxuICAgIH0sIDM1MClcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvbWFpbi50cyIsImltcG9ydCB7SVBhaW50ZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBhaW50ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhaW50ZXIgaW1wbGVtZW50cyBJUGFpbnRlcntcclxuICAgIGNhbnZhczphbnk7XHJcbiAgICBjb250ZXh0OiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihfY2FudmFzOmFueSl7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBfY2FudmFzO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IF9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIH1cclxuICAgIGZpbGxBcmVhKHgxOm51bWJlciwgeTE6bnVtYmVyLHgyOm51bWJlciwgeTI6bnVtYmVyLCBjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4MSwgeTEseDIsIHkyKTtcclxuXHJcbiAgICB9XHJcbiAgICBzdHJva2VBcmVhKHgxOm51bWJlciwgeTE6bnVtYmVyLHgyOm51bWJlciwgeTI6bnVtYmVyLCBjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeDEsIHkxLHgyLCB5Mik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvcGFpbnRlci50cyIsImltcG9ydCB7SVBhaW50ZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBhaW50ZXInO1xyXG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcclxuaW1wb3J0IHtJU25ha2V9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNuYWtlJztcclxuaW1wb3J0IHtJQm9hcmR9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJvYXJkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCBpbXBsZW1lbnRzIElCb2FyZHtcclxuICAgIHBhaW50ZXI6IElQYWludGVyO1xyXG4gICAgc25ha2U6IElTbmFrZTtcclxuICAgIGhlaWdodDpudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgc2l6ZTpudW1iZXI7XHJcbiAgICBmb29kOiBJRm9vZDtcclxuICAgIHByaXZhdGUgc2NvcmUgOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBoaWdoZXN0U2NvcmUgOiBudW1iZXIgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaWdoU2NvcmVcIikpO1xyXG4gICAgLy9wcml2YXRlIGhpZ2hlc3RTY29yZSA6IG51bWJlciA9IDEwMDtcclxuICAgIGNvbnN0cnVjdG9yKHBhaW50ZXI6IElQYWludGVyLHNuYWtlOiBJU25ha2UsIGZvb2Q6IElGb29kLGg6bnVtYmVyLCB3Om51bWJlciwgczpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICB0aGlzLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLnNpemUgPSBzO1xyXG4gICAgICAgIHRoaXMucGFpbnRlciA9IHBhaW50ZXI7XHJcbiAgICAgICAgdGhpcy5zbmFrZSA9IHNuYWtlO1xyXG4gICAgICAgIHRoaXMuZm9vZCA9IGZvb2Q7XHJcbiAgICB9XHJcbiAgICBkcmF3U25ha2UoKTp2b2lke1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zbmFrZS5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuc25ha2UuY2VsbHNbaV07XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U25ha2VDZWxsKGNlbGwueCwgY2VsbC55LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NuYWtlQ2VsbChjZWxsLngsIGNlbGwueSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1NuYWtlQ2VsbCh4Om51bWJlciwgeTpudW1iZXIsIGlzSGVhZDpib29sZWFuKXtcclxuICAgICAgICBpZihpc0hlYWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJvcmFuZ2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiYmxhY2tcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiIzRjMDIwMlwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJibGFja1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3Rm9vZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHRoaXMuZm9vZC5wb3NpdGlvbi54KnRoaXMuc2l6ZSwgdGhpcy5mb29kLnBvc2l0aW9uLnkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCIjMDdmMjBiXCIpO1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHRoaXMuZm9vZC5wb3NpdGlvbi54KnRoaXMuc2l6ZSwgdGhpcy5mb29kLnBvc2l0aW9uLnkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJibGFja1wiKTtcclxuXHJcbiAgICB9XHJcbiAgICBkcmF3U2NvcmUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc2NvcmUrKztcclxuICAgICAgICBpZih0aGlzLnNjb3JlID4gdGhpcy5oaWdoZXN0U2NvcmUpe1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhpZ2hTY29yZVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNjb3JlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGVzdFNjb3JlID0gdGhpcy5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY29yZVwiKS5pbm5lckhUTUwgID0gICAnPHA+PGI+U2NvcmUgOiAnICsgdGhpcy5zY29yZSArICc8L2I+PC9wPicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaWdoU2NvcmUoKTp2b2lke1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnZXN0c2NvcmVcIikuaW5uZXJIVE1MICA9ICAnPHA+PGI+SGlnZXN0IFNjb3JlIDogJyArIHRoaXMuaGlnaGVzdFNjb3JlICsgJzwvcD4nO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikuaW5uZXJIVE1MICA9ICAgJzxwPjxiPlNjb3JlIDogJyArIHRoaXMuc2NvcmUgKyAnPC9iPjwvcD4nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQm91bmRhcnkoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5zbmFrZS5jaGVja0JvdW5kYXJ5KC0xLCAgdGhpcy53aWR0aC90aGlzLnNpemUsLTEsIHRoaXMuaGVpZ2h0L3RoaXMuc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBpbml0KCk6dm9pZHtcclxuICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIFwibGlnaHRibHVlXCIpXHJcbiAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsXCJibGFja1wiKVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvYm9hcmQudHMiLCJpbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xyXG5pbXBvcnQge0RpcmVjdGlvbn0gZnJvbSAnLi4vZW51bXMvZGlyZWN0aW9uJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2UgaW1wbGVtZW50cyBJU25ha2V7XHJcbiAgICBjZWxsczogSVBvc2l0aW9uW107XHJcbiAgICBib2R5Q29sb3I6IHN0cmluZztcclxuICAgIGJvcmRlckNvbG9yOiBzdHJpbmc7XHJcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcclxuICAgIGlzRm9vZEVhdGVuIDogYm9vbGVhbjtcclxuICAgIHN0YXJ0WCA6IG51bWJlcjtcclxuICAgIGxlbmd0aDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoX2xlbmd0aDpudW1iZXIsIF9ib2R5Q29sb3I6c3RyaW5nLCBfYm9yZGVyQ29sb3I6IHN0cmluZywgX2lzRm9vZEVhdGVuOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBfbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuYm9keUNvbG9yID0gX2JvZHlDb2xvcjtcclxuICAgICAgICB0aGlzLmJvcmRlckNvbG9yID0gX2JvcmRlckNvbG9yO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkRvd247XHJcbiAgICAgICAgdGhpcy5pc0Zvb2RFYXRlbiA9IF9pc0Zvb2RFYXRlbjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IF9sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goe3g6IGksIHk6IDB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRGlyZWN0aW9uKGtleUNvZGU6bnVtYmVyKXtcclxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5MZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLkxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5SaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLlVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkRvd247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIGxldCBzbmFrZVg6IG51bWJlciA9IHRoaXMuY2VsbHNbMF0ueDtcclxuICAgICAgICBsZXQgc25ha2VZOiBudW1iZXIgPSB0aGlzLmNlbGxzWzBdLnk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uUmlnaHQpIHtcclxuICAgICAgICAgICAgc25ha2VYKys7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uTGVmdCkge1xyXG4gICAgICAgICAgICBzbmFrZVgtLTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5VcCkge1xyXG4gICAgICAgICAgICBzbmFrZVktLTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgIHNuYWtlWSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jZWxscy5wb3AoKTtcclxuICAgICAgICB0aGlzLmNlbGxzLnVuc2hpZnQoe3g6c25ha2VYLCB5OnNuYWtlWX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVhdEZvb2QoZm9vZDpJUG9zaXRpb24pOiBib29sZWFue1xyXG4gICAgICAgIGxldCBoZWFkIDogSVBvc2l0aW9uID0gdGhpcy5jZWxsc1swXTtcclxuICAgICAgICAvL3N0b3JlIHBvc2l0aW9uIG9mIGxhc3QgY2VsbFxyXG4gICAgICAgIGxldCBsYXN0Q2VsbCA6IElQb3NpdGlvbiA9IHRoaXMuY2VsbHNbdGhpcy5jZWxscy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZihmb29kLnggPT0gaGVhZC54ICYmIGZvb2QueSA9PSBoZWFkLnkpe1xyXG4gICAgICAgICAgICAvL3B1c2hlZCBsYXN0IGNlbGwgYWdhaW4gYXMgb25lIG5ldyBjZWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goe3g6bGFzdENlbGwueCwgeTpsYXN0Q2VsbC55fSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja0NvbGxpc2lvbigpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBoZWFkOklQb3NpdGlvbiA9IHRoaXMuY2VsbHNbMF07XHJcbiAgICAgICAgLy9pbml0aWFsaXplIGkgZnJvbSAxIGJlY2F1c2Ugd2Ugd2FudCB0byBleGNsdWRlIGhlYWQncyAoeCx5KSBwb3NpdGlvblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDI7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcclxuICAgICAgICAgICAgaWYoY2VsbC54ID09PSBoZWFkLnggJiYgY2VsbC55ID09PSBoZWFkLnkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY2hlY2tCb3VuZGFyeShieDE6bnVtYmVyLGJ4MjpudW1iZXIsIGJ5MTpudW1iZXIsIGJ5MjpudW1iZXIgKTpib29sZWFue1xyXG4gICAgICAgIHZhciBmaXJzdENlbGwgPSB0aGlzLmNlbGxzWzBdO1xyXG4gICAgICAgIGlmKGZpcnN0Q2VsbC54ID09IGJ4MSB8fCBmaXJzdENlbGwueSA9PSBieTEgfHwgZmlyc3RDZWxsLnggPT0gYngyIHx8IGZpcnN0Q2VsbC55ID09IGJ5Mil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9zbmFrZS50cyIsImV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XHJcbiAgICBVcCxcclxuICAgIERvd24sXHJcbiAgICBMZWZ0LFxyXG4gICAgUmlnaHRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW51bXMvZGlyZWN0aW9uLnRzIiwiXHJcbmltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XHJcbmltcG9ydCB7SUZvb2R9IGZyb20gJy4uL2ludGVyZmFjZXMvaWZvb2QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvb2QgaW1wbGVtZW50cyBJRm9vZHtcclxuICAgIHBvc2l0aW9uOiBJUG9zaXRpb247XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRm9vZCgpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRm9vZCgpOnZvaWR7XHJcbiAgICAgICAgbGV0IHBvcyA9IHtcclxuICAgICAgICAgICAgeDpNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSxcclxuICAgICAgICAgICAgeTpNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvZm9vZC50cyJdLCJzb3VyY2VSb290IjoiIn0=