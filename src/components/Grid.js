export default function Grid(props) {

  const board = props.board

  let grid = []
  let id = 0
  board.forEach(row => {
    row.forEach(cell => {
      grid.push(
        <div className="cell" key={id}>
          {cell}
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
