let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
let direction = "right"
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = { 
  x: 8 * box,
  y: 8 * box 
}

function createBG() {
  context.fillStyle = "lightgreen"
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
  for (let i in snake) {
    context.fillStyle = "green"
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function createFood() {
  context.fillStyle = "red"
  context.fillRect(food.x, food.y, box, box)
}

function eatFood() {
  if (snake[0].x != food.x || snake[0].y != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }
}

function createMovement() {
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == "right") snakeX += box
  if (direction == "left") snakeX -= box
  if (direction == "up") snakeY -= box
  if (direction == "down") snakeY += box

  eatFood()

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

function snakeLoop() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box
}

function snakeCollision() {
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game)
      alert('Game Over :(')
      location.reload()
    }
  }
}

function score() {
  let score = snake.length - 1

  context.fillStyle = "white"
  context.font = "32px Arial"
  context.fillText(score, 0.5 * box, 1.2 * box)
}

function directionUpdate(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left"
  if (event.keyCode == 38 && direction != "down") direction = "up"
  if (event.keyCode == 39 && direction != "left") direction = "right"
  if (event.keyCode == 40 && direction != "up") direction = "down"
}
  
addEventListener('keydown', directionUpdate)

function startGame() {
  createBG()
  createSnake()
  createFood()
  createMovement()
  snakeLoop()
  snakeCollision()
  score()
}

let game = setInterval(startGame, 100)