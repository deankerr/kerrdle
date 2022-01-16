export default function Grid(props) {

  const board = props.board

  let grid = []
  let id = 0
  board.forEach(row => {
    row.forEach(cell => {
      let cellColour = ''
      if (cell.match) cellColour = ' match'
      if (cell.misplaced) cellColour = ' misplaced'
      if (cell.wrong) cellColour = ' wrong'
      grid.push(
        <div className={'cell' + cellColour} key={id}>
          {cell.value}
        </div>
      )
      id++
    })
  })


  return (
    <div className="cellContainer">

      {
        grid.map(e => e)
      }

    </div>
  )
}
