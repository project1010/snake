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
            alert("Game over");
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
    }, 250);
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
        for (var i = 1; i < this.cells.length; i++) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzYyOTYyYmYyOWY0YWZhMWEzM2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RGtDO0FBQ0o7QUFDQTtBQUNGO0FBRzVCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBSXZELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7SUFDbEMsSUFBSSxFQUFF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SSxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBQztZQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7OztBQ3BHRCxJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDakIscUNBQUU7SUFDRix5Q0FBSTtJQUNKLHlDQUFJO0lBQ0osMkNBQUs7QUFDVCxDQUFDLEVBTFcsU0FBUyxLQUFULFNBQVMsUUFLcEI7Ozs7Ozs7O0FDREQ7QUFBQTtJQUVJO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCx5QkFBVSxHQUFWO1FBQ0ksSUFBSSxHQUFHLEdBQUc7WUFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzYyOTYyYmYyOWY0YWZhMWEzM2EiLCJpbXBvcnQge1BhaW50ZXJ9IGZyb20gJy4vcGFpbnRlcic7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vYm9hcmQnO1xyXG5pbXBvcnQge1NuYWtlfSBmcm9tICcuL3NuYWtlJztcclxuaW1wb3J0IHtGb29kfSBmcm9tIFwiLi9mb29kXCI7XHJcbmltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XHJcblxyXG5sZXQgY2FudmFzOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXljYW52YXMnKTtcclxubGV0IHN0YXJ0QnV0dG9uOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnRuJyk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG5cclxuXHJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0KCk7XHJcbn0pO1xyXG5cclxubGV0IGdhbWVMb29wOmFueTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICBzdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICBsZXQgcGFpbnRlciA9IG5ldyBQYWludGVyKGNhbnZhcyk7XHJcbiAgICB2YXIgc25ha2UgPSBuZXcgU25ha2UoNSwgJ2dyZWVuJywgJ2RhcmtncmVlbicsIGZhbHNlKTtcclxuICAgIHZhciBmb29kID0gbmV3IEZvb2QoKTtcclxuICAgIHZhciBib2FyZCA9IG5ldyBCb2FyZChwYWludGVyLCBzbmFrZSwgZm9vZCwgNTAwLCA1MDAsIDUwKTtcclxuICAgIGxldCBpbml0UG9zaXRpb24gOiBJUG9zaXRpb24gPSB7eDogbnVsbCwgeTogbnVsbH07XHJcbiAgICBib2FyZC5pbml0KCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ0blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgZ2FtZUxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYm9hcmQuaW5pdCgpO1xyXG4gICAgICAgIGJvYXJkLnNob3dIaWdoU2NvcmUoKTsgICAgICAgIFxyXG4gICAgICAgIHNuYWtlLm1vdmUoKTsgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZihzbmFrZS5lYXRGb29kKGZvb2QucG9zaXRpb24pKXtcclxuICAgICAgICAgICAgZm9vZC5jcmVhdGVGb29kKCk7IC8vaWYgc25ha2VzIGl0cyBmb29kLCBjcmVhdGUgYSBuZXcgZm9vZC5cclxuICAgICAgICAgICAgYm9hcmQuZHJhd1Njb3JlKCk7IC8vRHJhdyBzY29yZSBhZnRlciBlYXRpbmcgZm9vZFxyXG4gICAgICAgICAgICBib2FyZC5kcmF3Rm9vZCgpOyAgLy9kcmF3IHRoZSBmb29kIG9uIGNhbnZhc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9JZiBzbmFrZSBiaXRlcyBpdHMgb3duIHRhaWwhXHJcbiAgICAgICAgaWYoc25ha2UuY2hlY2tDb2xsaXNpb24oKSl7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyXCIpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYm9hcmQuY2hlY2tCb3VuZGFyeSgpKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGtleUNvZGU6bnVtYmVyID0gZXZlbnQua2V5Q29kZTtcclxuICAgICAgICAgICAgc25ha2UuY2hhbmdlRGlyZWN0aW9uKGtleUNvZGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvYXJkLmRyYXdTbmFrZSgpO1xyXG4gICAgICAgIGJvYXJkLmRyYXdGb29kKCk7XHJcbiAgICB9LCAyNTApXHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL21haW4udHMiLCJpbXBvcnQge0lQYWludGVyfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwYWludGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWludGVyIGltcGxlbWVudHMgSVBhaW50ZXJ7XHJcbiAgICBjYW52YXM6YW55O1xyXG4gICAgY29udGV4dDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoX2NhbnZhczphbnkpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gX2NhbnZhcztcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB9XHJcbiAgICBmaWxsQXJlYSh4MTpudW1iZXIsIHkxOm51bWJlcix4MjpudW1iZXIsIHkyOm51bWJlciwgY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeDEsIHkxLHgyLCB5Mik7XHJcblxyXG4gICAgfVxyXG4gICAgc3Ryb2tlQXJlYSh4MTpudW1iZXIsIHkxOm51bWJlcix4MjpudW1iZXIsIHkyOm51bWJlciwgY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHgxLCB5MSx4MiwgeTIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL3BhaW50ZXIudHMiLCJpbXBvcnQge0lQYWludGVyfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwYWludGVyJztcclxuaW1wb3J0IHtJRm9vZH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pZm9vZCc7XHJcbmltcG9ydCB7SVNuYWtlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzbmFrZSc7XHJcbmltcG9ydCB7SUJvYXJkfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lib2FyZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmQgaW1wbGVtZW50cyBJQm9hcmR7XHJcbiAgICBwYWludGVyOiBJUGFpbnRlcjtcclxuICAgIHNuYWtlOiBJU25ha2U7XHJcbiAgICBoZWlnaHQ6bnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIHNpemU6bnVtYmVyO1xyXG4gICAgZm9vZDogSUZvb2Q7XHJcbiAgICBwcml2YXRlIHNjb3JlIDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgaGlnaGVzdFNjb3JlIDogbnVtYmVyID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGlnaFNjb3JlXCIpKTtcclxuICAgIC8vcHJpdmF0ZSBoaWdoZXN0U2NvcmUgOiBudW1iZXIgPSAxMDA7XHJcbiAgICBjb25zdHJ1Y3RvcihwYWludGVyOiBJUGFpbnRlcixzbmFrZTogSVNuYWtlLCBmb29kOiBJRm9vZCxoOm51bWJlciwgdzpudW1iZXIsIHM6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5zaXplID0gcztcclxuICAgICAgICB0aGlzLnBhaW50ZXIgPSBwYWludGVyO1xyXG4gICAgICAgIHRoaXMuc25ha2UgPSBzbmFrZTtcclxuICAgICAgICB0aGlzLmZvb2QgPSBmb29kO1xyXG4gICAgfVxyXG4gICAgZHJhd1NuYWtlKCk6dm9pZHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc25ha2UuY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLnNuYWtlLmNlbGxzW2ldO1xyXG4gICAgICAgICAgICBpZihpPT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NuYWtlQ2VsbChjZWxsLngsIGNlbGwueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTbmFrZUNlbGwoY2VsbC54LCBjZWxsLnksIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdTbmFrZUNlbGwoeDpudW1iZXIsIHk6bnVtYmVyLCBpc0hlYWQ6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNIZWFkKXtcclxuICAgICAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwib3JhbmdlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImJsYWNrXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcIiM0YzAyMDJcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiYmxhY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0Zvb2QoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh0aGlzLmZvb2QucG9zaXRpb24ueCp0aGlzLnNpemUsIHRoaXMuZm9vZC5wb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiIzA3ZjIwYlwiKTtcclxuICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh0aGlzLmZvb2QucG9zaXRpb24ueCp0aGlzLnNpemUsIHRoaXMuZm9vZC5wb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiYmxhY2tcIik7XHJcblxyXG4gICAgfVxyXG4gICAgZHJhd1Njb3JlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnNjb3JlKys7XHJcbiAgICAgICAgaWYodGhpcy5zY29yZSA+IHRoaXMuaGlnaGVzdFNjb3JlKXtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaWdoU2NvcmVcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5zY29yZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hlc3RTY29yZSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikuaW5uZXJIVE1MICA9ICAgJzxwPjxiPlNjb3JlIDogJyArIHRoaXMuc2NvcmUgKyAnPC9iPjwvcD4nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93SGlnaFNjb3JlKCk6dm9pZHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2VzdHNjb3JlXCIpLmlubmVySFRNTCAgPSAgJzxwPjxiPkhpZ2VzdCBTY29yZSA6ICcgKyB0aGlzLmhpZ2hlc3RTY29yZSArICc8L3A+JztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpLmlubmVySFRNTCAgPSAgICc8cD48Yj5TY29yZSA6ICcgKyB0aGlzLnNjb3JlICsgJzwvYj48L3A+JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0JvdW5kYXJ5KCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc25ha2UuY2hlY2tCb3VuZGFyeSgtMSwgIHRoaXMud2lkdGgvdGhpcy5zaXplLC0xLCB0aGlzLmhlaWdodC90aGlzLnNpemUpO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBcImxpZ2h0Ymx1ZVwiKVxyXG4gICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LFwiYmxhY2tcIilcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwiaW1wb3J0IHtJUG9zaXRpb259IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvc2l0aW9uJztcclxuaW1wb3J0IHtJU25ha2V9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNuYWtlJztcclxuaW1wb3J0IHtEaXJlY3Rpb259IGZyb20gJy4uL2VudW1zL2RpcmVjdGlvbic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNuYWtlIGltcGxlbWVudHMgSVNuYWtle1xyXG4gICAgY2VsbHM6IElQb3NpdGlvbltdO1xyXG4gICAgYm9keUNvbG9yOiBzdHJpbmc7XHJcbiAgICBib3JkZXJDb2xvcjogc3RyaW5nO1xyXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XHJcbiAgICBpc0Zvb2RFYXRlbiA6IGJvb2xlYW47XHJcbiAgICBzdGFydFggOiBudW1iZXI7XHJcbiAgICBsZW5ndGg6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKF9sZW5ndGg6bnVtYmVyLCBfYm9keUNvbG9yOnN0cmluZywgX2JvcmRlckNvbG9yOiBzdHJpbmcsIF9pc0Zvb2RFYXRlbjogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gX2xlbmd0aDtcclxuICAgICAgICB0aGlzLmJvZHlDb2xvciA9IF9ib2R5Q29sb3I7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9IF9ib3JkZXJDb2xvcjtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Eb3duO1xyXG4gICAgICAgIHRoaXMuaXNGb29kRWF0ZW4gPSBfaXNGb29kRWF0ZW47XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBfbGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHt4OiBpLCB5OiAwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZURpcmVjdGlvbihrZXlDb2RlOm51bWJlcil7XHJcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLlJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uTGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5MZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5VcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Eb3duO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKXtcclxuICAgICAgICBsZXQgc25ha2VYOiBudW1iZXIgPSB0aGlzLmNlbGxzWzBdLng7XHJcbiAgICAgICAgbGV0IHNuYWtlWTogbnVtYmVyID0gdGhpcy5jZWxsc1swXS55O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHNuYWtlWCsrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkxlZnQpIHtcclxuICAgICAgICAgICAgc25ha2VYLS07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uVXApIHtcclxuICAgICAgICAgICAgc25ha2VZLS07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uRG93bikge1xyXG4gICAgICAgICAgICBzbmFrZVkrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2VsbHMucG9wKCk7XHJcbiAgICAgICAgdGhpcy5jZWxscy51bnNoaWZ0KHt4OnNuYWtlWCwgeTpzbmFrZVl9KTtcclxuICAgIH1cclxuXHJcbiAgICBlYXRGb29kKGZvb2Q6SVBvc2l0aW9uKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgaGVhZCA6IElQb3NpdGlvbiA9IHRoaXMuY2VsbHNbMF07XHJcbiAgICAgICAgLy9zdG9yZSBwb3NpdGlvbiBvZiBsYXN0IGNlbGxcclxuICAgICAgICBsZXQgbGFzdENlbGwgOiBJUG9zaXRpb24gPSB0aGlzLmNlbGxzW3RoaXMuY2VsbHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYoZm9vZC54ID09IGhlYWQueCAmJiBmb29kLnkgPT0gaGVhZC55KXtcclxuICAgICAgICAgICAgLy9wdXNoZWQgbGFzdCBjZWxsIGFnYWluIGFzIG9uZSBuZXcgY2VsbDtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHt4Omxhc3RDZWxsLngsIHk6bGFzdENlbGwueX0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tDb2xsaXNpb24oKTogYm9vbGVhbntcclxuICAgICAgICBsZXQgaGVhZDpJUG9zaXRpb24gPSB0aGlzLmNlbGxzWzBdO1xyXG4gICAgICAgIC8vaW5pdGlhbGl6ZSBpIGZyb20gMSBiZWNhdXNlIHdlIHdhbnQgdG8gZXhjbHVkZSBoZWFkJ3MgKHgseSkgcG9zaXRpb25cclxuICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbaV07XHJcbiAgICAgICAgICAgIGlmKGNlbGwueCA9PT0gaGVhZC54ICYmIGNlbGwueSA9PT0gaGVhZC55KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRhcnkoYngxOm51bWJlcixieDI6bnVtYmVyLCBieTE6bnVtYmVyLCBieTI6bnVtYmVyICk6Ym9vbGVhbntcclxuICAgICAgICB2YXIgZmlyc3RDZWxsID0gdGhpcy5jZWxsc1swXTtcclxuICAgICAgICBpZihmaXJzdENlbGwueCA9PSBieDEgfHwgZmlyc3RDZWxsLnkgPT0gYnkxIHx8IGZpcnN0Q2VsbC54ID09IGJ4MiB8fCBmaXJzdENlbGwueSA9PSBieTIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvc25ha2UudHMiLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudW1zL2RpcmVjdGlvbi50cyIsIlxyXG5pbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb29kIGltcGxlbWVudHMgSUZvb2R7XHJcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZvb2QoKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZvb2QoKTp2b2lke1xyXG4gICAgICAgIGxldCBwb3MgPSB7XHJcbiAgICAgICAgICAgIHg6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSksXHJcbiAgICAgICAgICAgIHk6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL2Zvb2QudHMiXSwic291cmNlUm9vdCI6IiJ9