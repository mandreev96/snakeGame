import React from 'react'
import './App.css'

class App extends React.Component{
    constructor() {
        super()
        this.state = {
            width: 18,
            height: 18,
            snake: [{x: 1, y: 2},{x: 1, y: 3}],
            direction: 2,
            apples: [
                {x: 3, y: 6},
                {x: 4, y: 2}
                ],
            time: 800
        }



        this.showField = this.showField.bind(this)
        this.showCell = this.showCell.bind(this)
        this.isAppleHere = this.isAppleHere.bind(this)
        this.isSnakeHere = this.isSnakeHere.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.moveRight = this.moveRight.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.move = this.move.bind(this)
        this.changeDirection = this.changeDirection.bind(this)
        this.throughWall = this.throughWall.bind(this)
        this.goSnake = this.goSnake.bind(this)
        this.eatingApple = this.eatingApple.bind(this)
        this.generateApples = this.generateApples.bind(this)
        this.increaseTime = this.increaseTime.bind(this)
        this.checkBreakSnake = this.checkBreakSnake.bind(this)
        this.breakSnake = this.breakSnake.bind(this)
    }


    eatingApple() {
        const snake = this.state.snake,
              apples = this.state.apples
        for (let i=0; i<=apples.length-1; i++) {
            if (((snake[0].x == apples[i].x))&&((snake[0].y == apples[i].y))) {
                snake.push(apples[i])
                apples.splice(i, 1)
                this.setState({
                    snake,
                    apples
                })
            }
        }
    }

    throughWall() {
        const snake = this.state.snake
        snake.some(item => {
            if ((item.x === -1)&&(this.state.direction === 0)) {
                item.x = this.state.width-1
            }
            else if ((item.x === this.state.height)&&(this.state.direction === 2)) {
                item.x = 0
            }
            else if ((item.y === -1)&&(this.state.direction === 3)) {
                item.y = this.state.height-1
            }
            else if ((item.y === this.state.width)&&(this.state.direction === 1)) {
                item.y = 0
            }
        })
        this.setState({
            snake
        })
    }

    generateApples() {
        const apples = this.state.apples,
              snake = this.state.snake;
        if (apples.length === 0) {
            let a = {};
            for (let i = 0; i<4; i++) {
                a.x = Math.round(Math.random()*(this.state.height-1));
                a.y = Math.round(Math.random()*(this.state.width-1));
                apples.push({x: a.x, y: a.y})

            }
        }

        this.setState({
            apples
        })
    }

    increaseTime() {
        if ((this.state.snake.length === 7)&&(this.state.time !== 400)) {
            this.setState({
                time: 400
            })
            clearInterval(this.timerMove)
            this.timerMove1 = setInterval(this.move, this.state.time)
        } else if ((this.state.snake.length === 14)&&(this.state.time !== 200)) {
            this.setState({
                time: 200
            })
            clearInterval(this.timerMove1)
            this.timerMove2 = setInterval(this.move, this.state.time)
        } else if ((this.state.snake.length === 21)&&(this.state.time !== 100)) {
            this.setState({
                time: 100
            })
            clearInterval(this.timerMove2)
            this.timerMove3 = setInterval(this.move, this.state.time)
        } else if ((this.state.snake.length === 30)&&(this.state.time !== 60)) {
            this.setState({
                time: 60
            })
            clearInterval(this.timerMove3)
            this.timerMove4 = setInterval(this.move, this.state.time)
        }
        console.log(this.state.time)
    }

    goSnake(snake) {
        for (let i=snake.length-1; i>0; i--) {
            snake[i] = {...snake[i-1]}
        }
    }

    moveDown() {
        const snake = this.state.snake
        this.goSnake(snake)
        snake[0].x = snake[0].x + 1
        this.setState({
            snake
        })
    }
    moveUp() {
        const snake = this.state.snake
        this.goSnake(snake)
        snake[0].x = snake[0].x - 1
        this.setState({
            snake
        })
    }
    moveLeft() {
        const snake = this.state.snake
        this.goSnake(snake)
        snake[0].y = snake[0].y - 1
        this.setState({
            snake
        })
    }
    moveRight() {
        const snake = this.state.snake
        this.goSnake(snake)
        snake[0].y = snake[0].y + 1
        this.setState({
            snake
        })
    }
    move() {
        if (this.state.direction === 0 ) {
            this.moveUp()
        } else if (this.state.direction === 1 ) {
            this.moveRight()
        } else if (this.state.direction === 2 ) {
            this.moveDown()
        } else if (this.state.direction === 3 ) {
            this.moveLeft()
        }

        this.breakSnake(this.checkBreakSnake())
        this.eatingApple()
        this.throughWall()
        this.generateApples()
        this.increaseTime()
    }

    checkBreakSnake() {
        const snake = [...this.state.snake];
        let a, b;
        for (let i = 0; i < snake.length; i++) {
            a = {...snake[i]}
            snake.splice(i, 1)
            snake.some((el) => {
                if ((a.x === el.x)&&(a.y === el.y)) {
                    b = true
                }
            })
        }
        return b
    }

    breakSnake(state) {
        const snake = this.state.snake
        if (state === true) {
            clearInterval(this.timerMove)
            setInterval(() => {
                snake.splice(snake.length-1, 1)
                this.setState({
                    snake
                })
            }, 90)
        }
    }

    changeDirection(event) {
        if ((event.keyCode == 38)&&(this.state.direction !== 2)) {
            this.setState({
                direction: 0
            })
        } else if ((event.keyCode == 39)&&(this.state.direction !== 3)) {
            this.setState({
                direction: 1
            })
        } else if ((event.keyCode == 40)&&(this.state.direction !== 0)) {
            this.setState({
                direction: 2
            })
        } else if ((event.keyCode == 37)&&(this.state.direction !== 1)) {
            this.setState({
                direction: 3
            })
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.changeDirection, false)
        this.timerMove = setInterval(this.move, this.state.time)
    }


    showCell(i){
        const field = []
        for (let j=0; j<this.state.width; j++) {
                if (this.isAppleHere(i, j) === true) {
                    field.push(<span className='apple cell'> </span>)
                } else if (this.isSnakeHere(i,j) === true) {
                    field.push(<span className='snake cell'>  </span>)
                } else {
                    field.push(<span className='nothing cell'>  </span>)
                }
        }
        return <p className='line'>{field}</p>
    }

    isAppleHere(i, j) {
        return this.state.apples.some(item => {
            if (item.x === i && item.y === j) {
                return true
            } else {
                return false
            }
        })
    }

    isSnakeHere(i, j) {
        return this.state.snake.some(item => {
            if (item.x === i && item.y === j) {
                return true
            } else {
                return false
            }
        })
    }

    showField() {
        const field = [];
        for (let i=0; i<this.state.width; i++) {
            field.push(this.showCell(i))
        }
        return field
    }

    render() {
        return (
            <div className='App' >
                <div className='field'>
                    {this.showField()}
                </div>
            </div>
        )
    }

}


export default App