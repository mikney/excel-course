import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, keyPress, matrix, shouldResize} from "@/components/table/table.function";
import {TableSelection} from "@/components/table/TableSelection";
import {range} from "@core/utils";
import {TABLE_RESIZE} from "@/redux/types";
import * as actions from '@/redux/actions'
import {defaultStyles} from "@/constats";
import {parse} from '@core/parse'
export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
    this.$root = $root
  }
  toHTML() {
    return createTable(10, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]')
    console.log('Ha')
    // this.selectCell($cell)
    this.selection.select($cell)
    this.$emit('table:select', this.selection.current)
    this.changeStyles($cell)
    // const styles = $cell.getStyles(Object.keys(defaultStyles))
    // this.$dispatch(actions.changeStyles(styles))
    $cell.$el.focus()
    // this.$subscribe(state => {
    //   console.log('TableState', state)
    // })
    this.$on('formula:input', (text) => {
      this.selection.current
        .attr('data-value', text)
        .text(parse(text))
      //this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => {
        this.selection.current.$el.focus()
    })
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
      // $cell.$el.focus()
    })
    $cell.$el.focus()
    // this.$getState((state) => {
    //   Object.keys(state.colState).forEach((col) =>this.$root.findAll(`[data-col="${col}"]`)
    //     .forEach((el) => $(el).css({width: state.colState[col] + 'px'} ))
    // )})
  }
  changeStyles($cell) {
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log('Получаемые стили', styles)
    this.$dispatch(actions.changeStyles(styles))
  }
  // selectCell($cell) {
  //   this.selection.select($cell)
  //   this.$emit('table:select', $cell)
  //   const styles = $cell.getStyles(Object.keys(defaultStyles))
  //   console.log('Styles to dispatch', styles)
  //   this.$dispatch(actions.changeStyles(styles))
  // }
  // cellSelection(event) {
  //   const $cell = $(event.target)
  //   this.selection.select($cell)
  // }
  onKeydown(e) {
    const obj = this.selection.current.id(true)
    const props = [this, e, (cell) => this.changeStyles(cell)]
    if (e.key && !e.shiftKey) {
      switch (e.key) {
        case 'ArrowDown':
        case 'Enter':
          obj.row += 1
          keyPress(obj.row, obj.col,...props)
          break
        case 'ArrowUp':
          obj.row += -1
          keyPress(obj.row, obj.col,...props)
          break
        case 'ArrowRight':
        case 'Tab':
          obj.col += 1
          keyPress(obj.row, obj.col,...props)
          break
        case 'ArrowLeft':
          obj.col += -1
          keyPress(obj.row, obj.col,...props)
          break
      }
    }
  }
  onInput(event) {
    //this.$emit('table:input', $(event.target))
    // console.log(this.selection.current.id())
    // this.$dispatch(actions.changeText({
    //   id: this.selection.current.id(),
    //   value: $(event.target).text()
    // }))
    this.updateTextInStore($(event.target).text())
  }
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(shouldResize(event), event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current)
          .map(id => this.$root.find(`[data-id=${id}]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($cell)
        this.changeStyles($cell)
      }
        //this.selection.selectGroup()
      this.$emit('table:select', this.selection.current)
      //this.$dispatch({type: TABLE_RESIZE})
    }
  }
}

// function findCell($el, event) {
//   const cellCounter = event.target.dataset.id.split(':')
//   $el.selection.selectGroup(cellCounter, $el.$root)
// }

//291 ms  Scripting
// 2829 ms  Rendering
// 937 ms  Scripting
// 1229 ms  Renderin