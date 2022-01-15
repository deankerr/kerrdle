import './App.css'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import Grid from './components/Grid'

function App() {
  return (
    <div className="App">

      <div className="game">
        <header>
          KERRDLE
        </header>

        <div className="gameArea">

          <Grid />

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
