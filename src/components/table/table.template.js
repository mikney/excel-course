import {defaultStyles} from "@/constats";
import {camelToDashCase, toInlineStyles} from "@core/utils";
import {parse} from "@core/parse";

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
// function toCell(row, col) {
//   return `
//     <div class="cell" data-col="${col}" data-row="${row}" contenteditable></div>
//   `
// }
function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const data = state.dataState[`${row}:${col}`] || ''
    //console.log(state.stylesState)
    //const styles =''
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[`${row}:${col}`]})
    return `
      <div 
        class="cell" 
        data-col="${col}" 
        data-id="${row}:${col}" 
        data-type="cell" 
        data-value="${data || ''}"
        contenteditable
        style="${styles}; width: ${width}"
      >${parse(data) || ''}</div>   
    `
      //<div class="cell" data-col="${col}" data-id="${row}:${col}" data-type="cell" contenteditable></div>

  }
}

function toColumn({col, index, width}) {
  return `
  <div class="column " data-type="resizable" data-col="${index}" style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}
function createRow(index, content, state ={}) {
  const height = getHeight(state, index)
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}" >
       <div class="row-info" >
          ${index ? index : ''}
          ${resize}
        </div>
       <div class="row-data">${content}</div>
    </div>
  `
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
function getHeight(state, index) {
  const b = index ? (state.rowState[index] || DEFAULT_HEIGHT) + 'px' : null
  return b
}
function widthWidthFrom(state) {
  return function (col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}
function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
export function createTable(rowsCount = 15, state = {}) {

  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthWidthFrom(state))
    .map(toColumn)
    .join('')
  rows.push(createRow(null, cols))
  for (let row = 0; row < rowsCount; row++ ) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('')
    rows.push(createRow(row + 1, cells, state))
  }
  return rows.join('')
}
