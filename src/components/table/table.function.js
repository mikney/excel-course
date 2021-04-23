import {range} from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`"${row}:${col}"`))
    return acc
  }, [])
}
export function keyPress(row, col, instance, e) {
  if (row +1 && col +1) {
    e.preventDefault()
    const cell = instance.$root.find(`[data-id="${row}:${col}"]`)
    instance.selection.select(cell)
    instance.selection.current.$el.focus()
    instance.$emit('table:select', instance.selection.current)
  }
}
