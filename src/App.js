import './App.css'
import { useState } from 'react'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import useKeypress from 'react-use-keypress'

import Grid from './components/Grid'

import words from './util/validwords.json'

// Initial board generation
const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

let INITIAL_BOARD = []
for (let i = 0; i < MAX_ATTEMPTS; i++) {
  let row = []
  for (let j = 0; j < WORD_LENGTH; j++) {
    row.push({ value: '', match: false, misplaced: false, wrong: false })
  }
  INITIAL_BOARD.push(row)
}

function isValidWord(word) {
  return words.words.includes(word)
}

function getRandomWord() {
  return words.words[Math.floor(Math.random() * words.words.length)]
}

function App() {

  const [gameOver, setGameOver] = useState(false)

  const [message, setMessage] = useState('')

  const [board, setBoard] = useState(INITIAL_BOARD)

  const [attempt, setAttempt] = useState(0)

  const [curLetter, setCurLetter] = useState(0)

  const [targetWord, setTargetWord] = useState(getRandomWord())

  const [matchedLetters, setMatchedLetters] = useState('')
  const [misplacedLetters, setMisplacedLetters] = useState('')
  const [wrongLetters, setWrongLetters] = useState('')

  function checkAnswer() {

    let answer = ''
    board[attempt].forEach(e => {
      answer += e.value
    })

    if (answer.length < WORD_LENGTH) {
      setMessage('Word too short!!')
    }

    else if (answer !== 'QQQQQ' && !isValidWord(answer)) {
      setMessage('Invalid word!')
    }

    else {
      const newAttempt = attempt + 1
      let wordHints = targetWord

      let newMatchedLetters = ''
      // Find matching (green) letters
      board[attempt].forEach((el, index) => {
        if (el.value === targetWord[index]) {
          el.match = true
          // Delete matching char to prevent it being found again in next stage
          wordHints = wordHints.substring(0, index) + ' ' + wordHints.substring(index + 1)
          console.log('[match] new word hints:', wordHints);

          // Add matched letters to list for keyboard colouring
          newMatchedLetters += el.value + ' '
        }

        setMatchedLetters(matchedLetters + newMatchedLetters)
      })

      let newMisplacedLetters = ''
      // Find misplaced (yellow letters)
      board[attempt].forEach(el => {
        if (!el.match && wordHints.includes(el.value)) {
          el.misplaced = true
          const misplacedChar = wordHints.indexOf(el.value)
          wordHints = wordHints.substring(0, misplacedChar) + ' ' + wordHints.substring(misplacedChar + 1)
          console.log('[misplaced] new word hints:', wordHints);

          // Add matched letters to list for keyboard colouring
          newMisplacedLetters += el.value + ' '
        }
        setMisplacedLetters(misplacedLetters + newMisplacedLetters)
      })

      let newWrongLetters = ''
      // Find remaining (wrong/black) letters
      board[attempt].forEach(el => {
        if (!el.match && !el.misplaced) {
          el.wrong = true
          newWrongLetters += el.value + ' '
        }
        setWrongLetters(wrongLetters + newWrongLetters)
      })

      if (answer === targetWord) {
        setMessage('You win!')
        setGameOver(true)
      }

      else if (newAttempt === MAX_ATTEMPTS) {
        setMessage('Game Over!!! The word was: ' + targetWord)
        setGameOver(true)
      }

      else {
        setAttempt(attempt + 1)
        setCurLetter(0)
      }

    }

  }

  // Onscreen keyboard + key logic
  function handleKeyPress(button) {

    if (gameOver) return

    setMessage('')

    if (button === '{enter}') checkAnswer()

    else if (button === '{bksp}') {
      if (curLetter > 0) {
        let newBoard = board
        let newCurLetter = curLetter - 1
        newBoard[attempt][newCurLetter].value = ''
        setBoard(newBoard)
        setCurLetter(newCurLetter)
      }
    }

    else if (curLetter !== WORD_LENGTH) {
      let newBoard = board
      newBoard[attempt][curLetter].value = button
      setBoard(newBoard)
      setCurLetter(curLetter + 1)
    }

  }

  // Physical keyboard
  useKeypress(
    [
      'q', 'Q', 'w', 'W', 'e', 'E', 'r', 'R', 't', 'T', 'y', 'Y', 'u', 'U', 'i', 'I', 'o', 'O', 'p', 'P', 'a', 'A', 's', 'S', 'd', 'D', 'f', 'F', 'g',
      'G', 'h', 'H', 'j', 'J', 'k', 'K', 'l', 'L', 'z', 'Z', 'x', 'X', 'c', 'C', 'v', 'V', 'b', 'B', 'n', 'N', 'm', 'M', 'Enter', 'Backspace', '`'
    ], (ev) => {
      switch (ev.key) {
        case '`':
          console.log('the target word is:', targetWord, ';)')
          break
        case 'Enter':
          handleKeyPress('{enter}')
          break
        case 'Backspace':
          handleKeyPress('{bksp}')
          break
        default:
          handleKeyPress(ev.key.toUpperCase())
      }
    })

  return (
    <div className="App">

      <div className="game">

        <header>
          KERRDLE
        </header>

        <div className="messageContainer">
          <div className={'messageBox' + (message && ' active')}>
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
            buttonTheme={
              [
                {
                  class: 'misplacedButton',
                  buttons: misplacedLetters
                },
                {
                  class: 'matchedButton',
                  buttons: matchedLetters
                },
                {
                  class: 'wrongButton',
                  buttons: wrongLetters
                }
              ]
            }
            onKeyPress={handleKeyPress}
          />
        </div>

      </div>

    </div>
  )
}

export default App
