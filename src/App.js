import './App.css'
import { useState } from 'react'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import Grid from './components/Grid'


// Initial board generation
const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

let INITIAL_BOARD = []
for (let i = 0; i < MAX_ATTEMPTS; i++) {
  let row = []
  for (let j = 0; j < WORD_LENGTH; j++) {
    row.push('')
  }
  INITIAL_BOARD.push(row)
}


function App() {

  const [gameOver, setGameOver] = useState(false)

  const [message, setMessage] = useState('')

  const [board, setBoard] = useState(INITIAL_BOARD)

  const [attempt, setAttempt] = useState(0)

  const [curLetter, setCurLetter] = useState(0)

  const [targetWord, setTargetWord] = useState("TIGER") // TODO: Pull random world from list


  function checkAnswer() {
    
    const answer = board[attempt].join('')
    console.log('Checking answer:', answer);

    if (answer.length < WORD_LENGTH) {
      setMessage('Word too short!!')
    }


    else if (answer === targetWord) {
      setMessage('You win!')
      setGameOver(true)
    }

    // TODO: Check if word in word list

    else {
      setMessage('Wrong!!!')
      let newAttempt = attempt + 1

      if (newAttempt === MAX_ATTEMPTS) {
        setMessage('Game Over!!!')
        setGameOver(true)
      }

      else {
        setAttempt(attempt + 1)
        setCurLetter(0)
      }
    }

  }


  function onKeyPress(button) {

    if (gameOver) return

    setMessage('')

    if (button === '{enter}') checkAnswer()

    else if (button === '{bksp}') {
      if (curLetter > 0) {
        let newBoard = board
        let newCurLetter = curLetter - 1
        newBoard[attempt][newCurLetter] = ''
        setBoard(newBoard)
        // console.log('newBoard:', newBoard)
        setCurLetter(newCurLetter)
      }
    }

    else if (curLetter !== WORD_LENGTH) {
      let newBoard = board
      newBoard[attempt][curLetter] = button
      setBoard(newBoard)
      // console.log('newBoard:', newBoard)
      setCurLetter(curLetter + 1)
    }

  }


  return (
    <div className="App">

      <div className="game">

        <header>
          KERRDLE
        </header>

        <div className="messageContainer">
          <div className="messageBox">
            {message}
          </div>
        </div>

        <div className="gameArea">
          <Grid board={board} />
        </div>

        <div className="keyboard">
          <Keyboard
            layout={
              {
                default: [
                  'Q W E R T Y U I O P',
                  'A S D F G H J K L',
                  '{enter} Z X C V B N M {bksp}',
                ]
              }
            }
            display={
              {
                '{bksp}': '⌫',
                '{enter}': 'ENTER'
              }
            }
            onKeyPress={onKeyPress}
          />
        </div>

      </div>

    </div>
  )
}

export default App
