import {$} from "@core/dom";

export function resizeHandler(dataset, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  console.log(coords)
  let value
  document.onmousemove = e => {
    if (dataset === 'col') {
      const delta = e.pageX - coords.right
      value = delta + coords.width
      $resizer.css({
        right: -delta + 'px',
        zIndex: 1000
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = delta + coords.height
      $resizer.css({bottom: -delta + 'px'})
    }
    // document.onmouseup = () => {
    //   document.onmouseup = null
    //   if (dataset === 'col') {
    //     $parent.css({width: value + 'px'})
    //     this.$root
    //       .findAll(`[data-col="${$parent.data.col}"]`)
    //       .forEach((el) => $(el).css({width: value + 'px'} ))
    //     $resizer.css({right: 0})
    //   } else {
    //     $parent.css({height: value + 'px'})
    //     $resizer.css({bottom: 0})
    //   }
    //   document.onmousemove = null
    // }
  }
  document.onmouseup = () => {
    document.onmouseup = null
    if (dataset === 'col') {
      $parent.css({width: value + 'px'})
      this.$root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => $(el).css({width: value + 'px'} ))
      $resizer.css({right: 0})
    } else {
      $parent.css({height: value + 'px'})
      $resizer.css({bottom: 0})
    }
    document.onmousemove = null
  }
}
