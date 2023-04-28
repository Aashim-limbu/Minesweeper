import random from "lodash.random";
export const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  MARKED: "marked",
  NUMBER: "number",
};
export function setupBoard(BoardSize, NumberOfMines) {
  const board = [];
  const minePositions = getMinePosition(BoardSize, NumberOfMines);

  for (let i = 0; i < BoardSize; i++) {
    let row = [];
    for (let j = 0; j < BoardSize; j++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUS.HIDDEN;
      const tile = {
        element,
        mine: minePositions.some(PositionMatch.bind(null, { i, j })),
        i,
        j,
        get getTileStatus(){
            return element.dataset.status 
        },
        set setTileStatus(value){
            element.dataset.status = value 
        }
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
function getMinePosition(BoardSize, NumberOfMines) {
  const mines = [];
  while (mines.length < NumberOfMines) {
    let mine = {
      i: randomOrdinate(BoardSize),
      j: randomOrdinate(BoardSize),
    };
    if (!mines.some((m) => PositionMatch(m, mine))) {
      mines.push(mine);
    }
  }
  return mines;
}
function PositionMatch(a, b) {
  return a.i == b.i && a.j == b.j;
}
function randomOrdinate(BoardSize) {
  return random(0, BoardSize - 1);
}
