import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(event.target)
    this.$emit('formula:input', $(event.target).text())
  }
  storeChanged(changes) {
    this.$formula.text(changes.currentText)
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })
    // this.$subscribe(state => {
    //   this.$formula.text(state.currentText)
    // })
  }
  onKeydown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}