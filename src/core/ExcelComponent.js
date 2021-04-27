import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener{
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.prepare()
    this.storeSub = null
  }

  prepare() {

  }
  toHTML() {
    return ''
  }
  //Уведомляем слушателей про собтие ивент
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged() {

  }
  isWatching(key) {
    return this.subscribe.includes(key)
  }
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }
  // $getState(fn) {
  //   this.storeSub = this.store.getState(fn)
  // }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub() )
   // this.storeSub.unsubscribe()
  }
}