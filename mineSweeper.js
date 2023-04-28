
export function setupBoard(BoardSize, NumberOfMines) {
  const board = [];
  for (let i = 0; i < BoardSize; i++) {
    let row = [];
    for (let j = 0; j < BoardSize; j++) {
      const element = document.createElement("div");
      const minePositions = getMinePosition(BoardSize,NumberOfMines);
      element.dataset.status = "hidden";
      const tile = {
        element,
        mine: true,
        i,
        j,
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
function getMinePosition(BoardSize,NumberOfMines) {
  const mines = [];
  while (mines.length < NumberOfMines) {
    let mine = {
      i: randomOrdinate(BoardSize),
      j: randomOrdinate(BoardSize),
    };
    if(!mines.some(m=>PositionMatch(m,mine))){
         mines.push(mine)
    }
  }
  return mines;
}
function PositionMatch(a,b){
    return a.i == b.i && a.j == b.j 
}
function randomOrdinate() {
return{
    // i:_.random(0, 5);
    j:Math.random()
}
}
