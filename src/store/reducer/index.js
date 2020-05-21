import { combineReducers } from "redux";
import toDoList from "./toDoList";
import showList from "./showList";

let reducer = combineReducers({
  toDoList,
  showList
})
export default reducer