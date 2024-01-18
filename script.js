const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const snakeSpeed = 100;

let snake = [
  { x: gridSize * 5, y: gridSize * 5 },
  { x: gridSize * 4, y: gridSize * 5 },
  { x: gridSize * 3, y: gridSize * 5 },
  { x: gridSize * 2, y: gridSize * 5 },
  { x: gridSize, y: gridSize * 5 }
];

let dx = gridSize;
let dy = 0;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let newX = snake[0].x + dx;
  let newY = snake[0].y + dy;

  snake.unshift({ x: newX, y: newY });
  snake.pop();

  if (newX === food.x && newY === food.y) {
    // Generate new food
    food = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = "black";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Check for collisions
  if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height) {
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (newX === snake[i].x && newY === snake[i].y) {
      return;
    }
  }

  // Move snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
  }

  setTimeout(update, snakeSpeed);
}

let food = {
  x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
  y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
};

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -gridSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = gridSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -gridSize;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = gridSize;
    dy = 0;
  }
});

update();
