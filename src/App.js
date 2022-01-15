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

  const [ gameOver, setGameOver ] = useState(false)

  const [ board, setBoard ] = useState(INITIAL_BOARD)
  const [ attempt, setAttempt ] = useState(0)

  const [ word, setWord ] = useState("TIGER") // TODO: Pull random world from list

  return (
    <div className="App">

      <div className="game">

        <header>
          KERRDLE
        </header>

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
          />

        </div>

      </div>

    </div>
  )
}

export default App
