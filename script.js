let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
let direction = "right"

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

function createMovement() {
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == "right") snakeX += box
  if (direction == "left") snakeX -= box
  if (direction == "up") snakeY -= box
  if (direction == "down") snakeY += box

  snake.pop()

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
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
  createMovement()
}

let game = setInterval(startGame, 100)