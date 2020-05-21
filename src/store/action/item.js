import {ADD_ITEM, DELETE_ITEM, EDIT_CONTENT, SELECT_ITEM, TEST} from "../action-type";

// 增删项目
let item = {
  addItem(content) {
    return {
      type: ADD_ITEM,
      content: content
    }
  },
  deleteItem(key) {
    return {
      type: DELETE_ITEM,
      key: key
    }
  },
  editContent(row) {
    return {
      type: EDIT_CONTENT,
      row: row
    }
  },
  selectItem(rowKeys) {
    return {
      type: SELECT_ITEM,
      rowKeys: rowKeys
    }
  },
}

export default item