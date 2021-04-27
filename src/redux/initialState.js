import {storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constats";


const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {'1': {}},
  currentText: '',
  currentStyles: defaultStyles,
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})


export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState