export default function Grid(props) {

  const board = props.board

  let grid = []
  board.forEach(row => {
    row.forEach(cell => {
      grid.push(
        <div className="cell" >
          {cell}
        </div>
      )
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
