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
startButton.addEventListener("click", function () {
    init();
});
var gameLoop;
function init() {
    startButton.setAttribute('disabled', true);
    var painter = new __WEBPACK_IMPORTED_MODULE_0__painter__["a" /* Painter */](canvas);
    var snake = new __WEBPACK_IMPORTED_MODULE_2__snake__["a" /* Snake */](5, 'green', 'darkgreen');
    var food = new __WEBPACK_IMPORTED_MODULE_3__food__["a" /* Food */]();
    var board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */](painter, snake, food, 500, 500, 50);
    board.init();
    gameLoop = setInterval(function () {
        board.init();
        snake.move();
        if (snake.eatFood(food.position)) {
            // alert("Collision")
            food.createFood();
            //snake = new Snake(6, 'green', 'darkgreen');
            board.drawSnake(true);
            board.drawFood(1, 1);
        }
        ;
        if (board.checkBoundary()) {
            gameLoop = clearInterval(gameLoop);
            alert("Game over");
        }
        document.onkeydown = function (event) {
            var keyCode = event.keyCode;
            snake.changeDirection(keyCode);
        };
        board.drawSnake(false);
        board.drawFood(1, 1);
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
    function Board(painter, snake, food, h, w, s) {
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
    }
    Board.prototype.drawSnake = function (isFoodEaten) {
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
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "red");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
        else {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "green");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
    };
    Board.prototype.drawFood = function (x, y) {
        this.painter.fillArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "yellow");
        this.painter.strokeArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "black");
    };
    Board.prototype.drawScore = function () {
    };
    Board.prototype.checkBoundary = function () {
        return this.snake.checkBoundary(-1, this.width / this.size, -1, this.height / this.size);
    };
    Board.prototype.init = function () {
        this.painter.fillArea(0, 0, this.width, this.height, "lightgrey");
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
    function Snake(_length, _bodyColor, _borderColor) {
        this.cells = [];
        this.length = _length;
        this.bodyColor = _bodyColor;
        this.borderColor = _borderColor;
        this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
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
        console.log(food);
        var head = this.cells[0];
        console.log(head);
        if (food.x == head.x && food.y == head.y) {
            return true;
        }
        else {
            return false;
        }
    };
    Snake.prototype.checkCollision = function () {
        var x = this.cells[0].x;
        var y = this.cells[0].y;
        for (var i = 0; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if (cell.x === x && cell.y === y)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTVkMTlmM2Y1ZmY5MTMxYzU5M2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RGtDO0FBQ0o7QUFDQTtBQUNGO0FBRTVCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFdEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUU1RCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO0lBQ2xDLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLFFBQVksQ0FBQztBQUdqQjtJQUNJLFdBQVcsQ0FBQyxZQUFZ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QVM7SUFDakIscUNBQUU7SUFDRix5Q0FBSTtJQUNKLHlDQUFJO0lBQ0osMkNBQUs7QUFDVCxDQUFDLEVBTFcsU0FBUyxLQUFULFNBQVMsUUFLcEI7Ozs7Ozs7O0FDREQ7QUFBQTtJQUVJO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCx5QkFBVSxHQUFWO1FBQ0ksSUFBSSxHQUFHLEdBQUc7WUFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTVkMTlmM2Y1ZmY5MTMxYzU5M2YiLCJpbXBvcnQge1BhaW50ZXJ9IGZyb20gJy4vcGFpbnRlcic7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gJy4vYm9hcmQnO1xyXG5pbXBvcnQge1NuYWtlfSBmcm9tICcuL3NuYWtlJztcclxuaW1wb3J0IHtGb29kfSBmcm9tIFwiLi9mb29kXCI7XHJcblxyXG5sZXQgY2FudmFzOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXljYW52YXMnKTtcclxuXHJcbmxldCBzdGFydEJ1dHRvbjogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWJ0bicpO1xyXG5cclxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGluaXQoKTtcclxufSk7XHJcblxyXG5sZXQgZ2FtZUxvb3A6YW55O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XHJcbiAgICBzdGFydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICBsZXQgcGFpbnRlciA9IG5ldyBQYWludGVyKGNhbnZhcyk7XHJcbiAgICB2YXIgc25ha2UgPSBuZXcgU25ha2UoNSwgJ2dyZWVuJywgJ2RhcmtncmVlbicpO1xyXG4gICAgdmFyIGZvb2QgPSBuZXcgRm9vZCgpO1xyXG4gICAgdmFyIGJvYXJkID0gbmV3IEJvYXJkKHBhaW50ZXIsIHNuYWtlLCBmb29kLCA1MDAsIDUwMCwgNTApO1xyXG4gICAgYm9hcmQuaW5pdCgpO1xyXG5cclxuICAgIGdhbWVMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJvYXJkLmluaXQoKTtcclxuICAgICAgICBzbmFrZS5tb3ZlKCk7XHJcblxyXG4gICAgICAgIGlmKHNuYWtlLmVhdEZvb2QoZm9vZC5wb3NpdGlvbikpe1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KFwiQ29sbGlzaW9uXCIpXHJcbiAgICAgICAgICAgIGZvb2QuY3JlYXRlRm9vZCgpO1xyXG4gICAgICAgICAgICAvL3NuYWtlID0gbmV3IFNuYWtlKDYsICdncmVlbicsICdkYXJrZ3JlZW4nKTtcclxuICAgICAgICAgICAgYm9hcmQuZHJhd1NuYWtlKHRydWUpOyAgICAgICAgXHJcbiAgICAgICAgICAgIGJvYXJkLmRyYXdGb29kKDEsMSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoYm9hcmQuY2hlY2tCb3VuZGFyeSgpKXtcclxuICAgICAgICAgICAgZ2FtZUxvb3AgPSBjbGVhckludGVydmFsKGdhbWVMb29wKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBsZXQga2V5Q29kZTpudW1iZXIgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgICAgICBzbmFrZS5jaGFuZ2VEaXJlY3Rpb24oa2V5Q29kZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9hcmQuZHJhd1NuYWtlKGZhbHNlKTtcclxuICAgICAgICBib2FyZC5kcmF3Rm9vZCgxLDEpO1xyXG4gICAgfSwgMjUwKVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9tYWluLnRzIiwiaW1wb3J0IHtJUGFpbnRlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcGFpbnRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFpbnRlciBpbXBsZW1lbnRzIElQYWludGVye1xyXG4gICAgY2FudmFzOmFueTtcclxuICAgIGNvbnRleHQ6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKF9jYW52YXM6YW55KXtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IF9jYW52YXM7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgfVxyXG4gICAgZmlsbEFyZWEoeDE6bnVtYmVyLCB5MTpudW1iZXIseDI6bnVtYmVyLCB5MjpudW1iZXIsIGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgxLCB5MSx4MiwgeTIpO1xyXG5cclxuICAgIH1cclxuICAgIHN0cm9rZUFyZWEoeDE6bnVtYmVyLCB5MTpudW1iZXIseDI6bnVtYmVyLCB5MjpudW1iZXIsIGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh4MSwgeTEseDIsIHkyKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwiaW1wb3J0IHtJUGFpbnRlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcGFpbnRlcic7XHJcbmltcG9ydCB7SUZvb2R9IGZyb20gJy4uL2ludGVyZmFjZXMvaWZvb2QnO1xyXG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xyXG5pbXBvcnQge0lCb2FyZH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pYm9hcmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvYXJkIGltcGxlbWVudHMgSUJvYXJke1xyXG4gICAgcGFpbnRlcjogSVBhaW50ZXI7XHJcbiAgICBzbmFrZTogSVNuYWtlO1xyXG4gICAgaGVpZ2h0Om51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBzaXplOm51bWJlcjtcclxuICAgIGZvb2Q6IElGb29kO1xyXG4gICAgY29uc3RydWN0b3IocGFpbnRlcjogSVBhaW50ZXIsc25ha2U6IElTbmFrZSwgZm9vZDogSUZvb2QsaDpudW1iZXIsIHc6bnVtYmVyLCBzOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHM7XHJcbiAgICAgICAgdGhpcy5wYWludGVyID0gcGFpbnRlcjtcclxuICAgICAgICB0aGlzLnNuYWtlID0gc25ha2U7XHJcbiAgICAgICAgdGhpcy5mb29kID0gZm9vZDtcclxuICAgIH1cclxuICAgIGRyYXdTbmFrZShpc0Zvb2RFYXRlbjpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zbmFrZS5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuc25ha2UuY2VsbHNbaV07XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U25ha2VDZWxsKGNlbGwueCwgY2VsbC55LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NuYWtlQ2VsbChjZWxsLngsIGNlbGwueSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1NuYWtlQ2VsbCh4Om51bWJlciwgeTpudW1iZXIsIGlzSGVhZDpib29sZWFuKXtcclxuICAgICAgICBpZihpc0hlYWQpe1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHgqdGhpcy5zaXplLCB5KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwiZGFya2dyZWVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImdyZWVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImRhcmtncmVlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3Rm9vZCh4Om51bWJlciwgeTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLmZpbGxBcmVhKHRoaXMuZm9vZC5wb3NpdGlvbi54KnRoaXMuc2l6ZSwgdGhpcy5mb29kLnBvc2l0aW9uLnkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJ5ZWxsb3dcIik7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEodGhpcy5mb29kLnBvc2l0aW9uLngqdGhpcy5zaXplLCB0aGlzLmZvb2QucG9zaXRpb24ueSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImJsYWNrXCIpO1xyXG5cclxuICAgIH1cclxuICAgIGRyYXdTY29yZSgpOnZvaWR7XHJcblxyXG4gICAgfVxyXG4gICAgY2hlY2tCb3VuZGFyeSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNuYWtlLmNoZWNrQm91bmRhcnkoLTEsICB0aGlzLndpZHRoL3RoaXMuc2l6ZSwtMSwgdGhpcy5oZWlnaHQvdGhpcy5zaXplKTtcclxuICAgIH1cclxuICAgIGluaXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgXCJsaWdodGdyZXlcIilcclxuICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCxcImJsYWNrXCIpXHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9ib2FyZC50cyIsImltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XHJcbmltcG9ydCB7SVNuYWtlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzbmFrZSc7XHJcbmltcG9ydCB7RGlyZWN0aW9ufSBmcm9tICcuLi9lbnVtcy9kaXJlY3Rpb24nO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTbmFrZSBpbXBsZW1lbnRzIElTbmFrZXtcclxuICAgIGNlbGxzOiBJUG9zaXRpb25bXTtcclxuICAgIGJvZHlDb2xvcjogc3RyaW5nO1xyXG4gICAgYm9yZGVyQ29sb3I6IHN0cmluZztcclxuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xyXG4gICAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihfbGVuZ3RoOm51bWJlciwgX2JvZHlDb2xvcjpzdHJpbmcsIF9ib3JkZXJDb2xvcjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBfbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuYm9keUNvbG9yID0gX2JvZHlDb2xvcjtcclxuICAgICAgICB0aGlzLmJvcmRlckNvbG9yID0gX2JvcmRlckNvbG9yO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkRvd247XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxfbGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaCh7eDogaSwgeTogMH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VEaXJlY3Rpb24oa2V5Q29kZTpudW1iZXIpe1xyXG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiAhPSBEaXJlY3Rpb24uTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLlJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uVXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uRG93bjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCl7XHJcbiAgICAgICAgbGV0IHNuYWtlWDogbnVtYmVyID0gdGhpcy5jZWxsc1swXS54O1xyXG4gICAgICAgIGxldCBzbmFrZVk6IG51bWJlciA9IHRoaXMuY2VsbHNbMF0ueTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5SaWdodCkge1xyXG4gICAgICAgICAgICBzbmFrZVgrKztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IERpcmVjdGlvbi5MZWZ0KSB7XHJcbiAgICAgICAgICAgIHNuYWtlWC0tO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlVwKSB7XHJcbiAgICAgICAgICAgIHNuYWtlWS0tO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkRvd24pIHtcclxuICAgICAgICAgICAgc25ha2VZKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNlbGxzLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuY2VsbHMudW5zaGlmdCh7eDpzbmFrZVgsIHk6c25ha2VZfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWF0Rm9vZChmb29kOklQb3NpdGlvbik6IGJvb2xlYW57XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9vZCk7XHJcbiAgICAgICAgbGV0IGhlYWQ6SVBvc2l0aW9uID0gdGhpcy5jZWxsc1swXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZWFkKTtcclxuXHJcbiAgICAgICAgaWYoZm9vZC54ID09IGhlYWQueCAmJiBmb29kLnkgPT0gaGVhZC55KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQ29sbGlzaW9uKCk6IGJvb2xlYW57XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLmNlbGxzWzBdLng7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLmNlbGxzWzBdLnk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xyXG4gICAgICAgICAgICBpZihjZWxsLnggPT09IHggJiYgY2VsbC55ID09PSB5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNoZWNrQm91bmRhcnkoYngxOm51bWJlcixieDI6bnVtYmVyLCBieTE6bnVtYmVyLCBieTI6bnVtYmVyICk6Ym9vbGVhbntcclxuICAgICAgICB2YXIgZmlyc3RDZWxsID0gdGhpcy5jZWxsc1swXTtcclxuICAgICAgICBpZihmaXJzdENlbGwueCA9PSBieDEgfHwgZmlyc3RDZWxsLnkgPT0gYnkxIHx8IGZpcnN0Q2VsbC54ID09IGJ4MiB8fCBmaXJzdENlbGwueSA9PSBieTIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvc25ha2UudHMiLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xyXG4gICAgVXAsXHJcbiAgICBEb3duLFxyXG4gICAgTGVmdCxcclxuICAgIFJpZ2h0XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudW1zL2RpcmVjdGlvbi50cyIsIlxyXG5pbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xyXG5pbXBvcnQge0lGb29kfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lmb29kJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb29kIGltcGxlbWVudHMgSUZvb2R7XHJcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZUZvb2QoKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZvb2QoKTp2b2lke1xyXG4gICAgICAgIGxldCBwb3MgPSB7XHJcbiAgICAgICAgICAgIHg6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSksXHJcbiAgICAgICAgICAgIHk6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL2Zvb2QudHMiXSwic291cmNlUm9vdCI6IiJ9