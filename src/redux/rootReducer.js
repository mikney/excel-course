import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, CURRENT_STYLE, TABLE_RESIZE} from "@/redux/types";
import {toInlineStyles} from "@core/utils";

export function rootReducer(state, action) {
  // console.log(state, action.type)
  // console.log(action)
  console.log(action)
  let field
  let prevState
  console.log(field)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.dataset === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {
          ...state,
          [field]: prevState,
        }
    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state, currentText: action.data.value, dataState: prevState
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      const val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        stylesStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {
        ...state, title: action.data
      }
    default: return state
  }
}