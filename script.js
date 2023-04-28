import { setupBoard } from "./mineSweeper"
const boardContainer = document.querySelector('.board')
const BOARD_SIZE = 2
const MINE_NUMBER = 2

const board = setupBoard(BOARD_SIZE,MINE_NUMBER)
boardContainer.style.setProperty('--size',BOARD_SIZE)
board.forEach(row=>{
    row.forEach(tile=>{
        boardContainer.append(tile.element)
    })
})

