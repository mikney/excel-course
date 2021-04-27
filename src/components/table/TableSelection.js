import {isCell} from "@/components/table/table.function";
import {$} from "@core/dom";

export class TableSelection {
  constructor() {
    //this.counter = []
    this.current = null
    this.group = []
  }
  select($el) {
    this.current = $el
    // this.group[0] ? this.group[0].removeClass('selected') : null
    this.clear()
    $el.addClass('selected')
    // const old$el = this.group[0]
    // old$el ? old$el.removeClass('selected') : null
    this.group.push($el)
  }

  get selectedIds() {
    return this.group.map(el => el.id())
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => {
      $el.addClass('selected')
    })
  }
  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }

  clear() {
    this.group.forEach(el => el.removeClass('selected'))
    this.group = []
  }
  shift() {
    document.onmousemove
  }
}