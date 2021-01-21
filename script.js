const title = document.getElementById("title")
const grid = document.querySelector(".grid")
const startButton = document.getElementById("start-btn")
const scoreDisplay = document.getElementById("score")
const width = 10
const gameOver = "Game Over!!"
const gameStart = 'Snake Game'
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let intervalTime = 1000
const speed = 0.9
let currentScore = 0
const score = 10
let timerId = 0

function createGrid() {
  for (let i = 0; i<width*width; i++) {
    // create the divs
    const square = document.createElement("div")
    // add them to the parent div "grid"
    grid.appendChild(square)
    // add to a class list so they can be styled in CSS
    square.classList.add('square')
    // add the div's to an array
    squares.push(square)
  }
}

// function restart() {
//   currentSnake.forEach(index => squares[index].classList.remove('snake'))
//   currentSnake.forEach(index => squares[index].classList.remove('apple'))
//   currentSnake = [2, 1, 0]
//   direction = 1
//   appleIndex = 0
//   speed = 1000
//   currentScore = 0
//   startGame()
// }

function move() {
  if ((currentSnake[0] + width >= width*width && direction === width) || //collision with bottom wall
      (currentSnake[0] % width === width-1 && direction === +1) ||  //collision with right wall)
      (currentSnake[0] % width === 0 && direction === -1) ||  //collision with left wall
      (currentSnake[0] - width <= 0 && direction === -width) || //collison with top wall
      (squares[currentSnake[0] + direction].classList.contains('snake')) //collison with itself
    ){
      title.textContent = gameOver
      return clearInterval(timerId) //end game if collision occurs
    }
  // remove the last element and store
  let tail = currentSnake.pop()
  // remove the styling of that element
  squares[tail].classList.remove('snake')
  // add/sub one to the first element and add to beginning of snake array
  currentSnake.unshift(currentSnake[0] + direction)
  
  // snake head eating apple
  // if the snake head and apple are the same
  if (squares[currentSnake[0]].classList.contains('apple'))
    {
      squares[currentSnake[0]].classList.remove('apple') 
      
      currentScore += score
      scoreDisplay.textContent = `${currentScore}`
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      clearInterval(timerId)
      intervalTime *= speed
      timerId = setInterval(move, intervalTime)

      generateApple()
  }

  // add that element to the styling list
  squares[currentSnake[0]].classList.add('snake')
}

function control(e) {
  if (e.keyCode === 39) {          // right arrow
    direction = 1
  } else if (e.keyCode === 38) {    // up arrow
    direction = -width
  } else if (e.keyCode === 37) {    // left arrow
    direction = -1
  } else if (e.keyCode === 40) {    // down arrow
    direction = +width
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random()*squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}

function startGame() {
  // move()
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  title.textContent = gameStart 
  currentSnake = [2, 1, 0]  
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  generateApple()
  direction = 1 
  intervalTime = 1000
  currentScore = 0
  scoreDisplay.textContent = currentScore
  clearInterval(timerId)
  timerId = setInterval(move, intervalTime)

}

// make the grid
createGrid()
// add each snake block to class list for styling



// listen for key presses to move the snake
document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)
