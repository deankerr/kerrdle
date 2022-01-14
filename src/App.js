import './App.css'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'


function App() {
  return (
    <div className="App">

      <div className="game">
        <header>
          KERRDLE
        </header>

        <div className="gameBoard">

          <div className="cellContainer">


            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>



            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>



            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>



            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>



            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>

            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>
            <div className="cell">
              A
            </div>


          </div>

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
