import * as TYPE from '../action-type'

export default function showList(state = {
  filter: TYPE.SHOW_ALL
}, action) {
  switch (action.type) {
    case TYPE.SHOW_ALL:
      console.log(state.filter);
      state = {...state, filter: TYPE.SHOW_ALL}
      break
    case TYPE.SHOW_DONE:
      state = {...state, filter: TYPE.SHOW_DONE}
      console.log(state.filter);
      break
    case TYPE.SHOW_DOING:
      state = {...state, filter: TYPE.SHOW_DOING}
      console.log(state.filter);
      break
  }
  return state
}