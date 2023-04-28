import { setupBoard } from "./mineSweeper";
import { TILE_STATUS } from "./mineSweeper";
const boardContainer = document.querySelector(".board");
const BOARD_SIZE = 4;
const MINE_NUMBER = 3;
const board = setupBoard(BOARD_SIZE, MINE_NUMBER);
const mineLeft = document.querySelector("[data-set-mine-left]");
setMineNumber(MINE_NUMBER);
// console.log(board);
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

boardContainer.style.setProperty("--size", BOARD_SIZE);
board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.element);
    tile.element.addEventListener("click", () => {
      if (tile.getTileStatus == TILE_STATUS.MARKED) return;
      revealTiles(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      MarkTile(tile);
      const getMarkedCount = board.reduce((count, row) => {
        return (count =
          count +
          row.filter((tile) => tile.getTileStatus == TILE_STATUS.MARKED)
            .length);
      }, 0);
      setMineNumber(MINE_NUMBER - getMarkedCount);
    });
  });
});
function revealTiles(board, tile) {
  if (!(tile.getTileStatus == TILE_STATUS.HIDDEN)) return;
  if (tile.mine) {
    tile.setTileStatus = TILE_STATUS.MINE;
    return;
  }
  tile.setTileStatus = TILE_STATUS.NUMBER;
  const adjecentTiles = nearByTiles(board, tile);
  const mines = adjecentTiles.filter((t) => t.mine);
  if (mines.length == 0) {
    adjecentTiles.forEach(revealTiles.bind(null, board));
  } else {
    tile.element.innerText = mines.length;
  }
}
function MarkTile(tile) {
  if (tile.getTileStatus == TILE_STATUS.NUMBER) return;
  if (tile.getTileStatus == TILE_STATUS.MINE) return;
  if (tile.getTileStatus != TILE_STATUS.MARKED) {
    tile.setTileStatus = TILE_STATUS.MARKED;
  } else {
    tile.setTileStatus = TILE_STATUS.HIDDEN;
  }
}

function setMineNumber(MINE_NUMBER) {
  if (MINE_NUMBER < 0) {
    mineLeft.innerText = `Mines Left: 0`;
  } else {
    mineLeft.innerText = `Mines Left: ${MINE_NUMBER}`;
  }
}

function nearByTiles(board, { i, j }) {
  const tiles = [];
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board?.[i + xOffset]?.[j + yOffset];
      if (tile) tiles.push(tile);
    }
  }
  return tiles;
}
function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);
  if (win || lose) {
    boardContainer.addEventListener("click", stopProp, true);
    boardContainer.addEventListener("contextmenu", stopProp, true);
    board.forEach(row=>{
        row.forEach(tile=>{
            if(tile.getTileStatus == TILE_STATUS.MARKED)MarkTile(tile)
            if(tile.mine) revealTiles.bind(null,board)(tile)
        })
    })
  }
  if(win){
    mineLeft.innerText=('!! CONGRATS YOU WON !!')
}
if(lose){
      mineLeft.innerText=('---SORRY YOU LOST---')

  }
}
function stopProp (e){

    e.stopImmediatePropagation();
}
function checkWin(board){
    return board.every(row=>{
        return row.every(tile=>{
            return tile.getTileStatus == TILE_STATUS.NUMBER ||
            (tile.mine)&&(TILE_STATUS.HIDDEN||TILE_STATUS.MARKED)
        })
    })
}
function checkLose(board){
    return board.some(row=>{
        return row.some(tile=>{
            return tile.getTileStatus== TILE_STATUS.MINE
        })
    })
}