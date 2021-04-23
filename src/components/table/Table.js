import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, keyPress, matrix, shouldResize} from "@/components/table/table.function";
import {TableSelection} from "@/components/table/TableSelection";
import {range} from "@core/utils";

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
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$emit('table:select', this.selection.current)
    $cell.$el.focus()
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
        this.selection.current.$el.focus()
    })
  }
  // cellSelection(event) {
  //   const $cell = $(event.target)
  //   this.selection.select($cell)
  // }
  onKeydown(e) {
    const obj = this.selection.current.id(true)
    console.log()
    if (e.key && !e.shiftKey) {
      switch (e.key) {
        case 'ArrowDown':
        case 'Enter':
          obj.row += 1
          keyPress(obj.row, obj.col, this, e)
          break
        case 'ArrowUp':
          obj.row += -1
          keyPress(obj.row, obj.col, this, e)
          break
        case 'ArrowRight':
        case 'Tab':
          obj.col += 1
          keyPress(obj.row, obj.col, this, e)
          break
        case 'ArrowLeft':
          obj.col += -1
          keyPress(obj.row, obj.col, this, e)
          break
      }
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler.call(this, shouldResize(event), event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current)
          .map(id => this.$root.find(`[data-id=${id}]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($cell)
      }
        //this.selection.selectGroup()
      this.$emit('table:select', this.selection.current)
    }
    // document.onkeyup = (e) => {
    //   const obj = this.selection.current.id(true)
    //   switch (e.key) {
    //     case 'ArrowDown':
    //       obj.row += 1
    //       keyPress(obj.row, obj.col, this)
    //       break
    //     case 'ArrowUp':
    //       obj.row += -1
    //       keyPress(obj.row, obj.col, this)
    //       break
    //     case 'ArrowRight':
    //       obj.col += 1
    //       keyPress(obj.row, obj.col, this)
    //       break
    //     case 'ArrowLeft':
    //       obj.col += -1
    //       keyPress(obj.row, obj.col, this)
    //       break
    //   }
    // }
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