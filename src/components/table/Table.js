import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.function";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
      //, mouseup
    });
    this.$root = $root
  }
  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler.call(this, shouldResize(event), event)
    }
  }
}

//291 ms  Scripting
// 2829 ms  Rendering
// 937 ms  Scripting
// 1229 ms  Renderin