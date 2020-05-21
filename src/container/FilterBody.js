import React from "react";
import TodoBody from "../component/TodoBody";

import { connect } from 'react-redux'
import action from "../store/action";
import * as TYPE from "../store/action-type";

const filterBody = (data, filter) => {
  switch (filter) {
    case TYPE.SHOW_ALL:
      return data
    case TYPE.SHOW_DONE:
      return data.filter(d => d.status === 1)
    case TYPE.SHOW_DOING:
      return data.filter(d => d.status === 0)
  }
}

export default connect(state => ({
  data: filterBody(state.toDoList.data, state.showList.filter)
}), action.item)(TodoBody)