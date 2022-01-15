const GRID_SIZE = 30;

export default function Grid() {

  let grid = []
  for (let i = 0; i < (GRID_SIZE); i++) {
    grid.push(
      <div className="cell" id={i} key={i}>
        A
      </div>
    )
  }


  return (
    <div className="cellContainer">

    {
      grid.map(e => e)
    }

    </div>

  )
}
