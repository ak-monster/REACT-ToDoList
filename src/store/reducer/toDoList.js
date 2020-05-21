import * as TYPE from '../action-type'

import storage from "../../common/Storage";

export default function toDoList(state = {
  data: storage.get('Data') ? storage.get('Data') : [],
}, action) {
  // 这里要用深度克隆（踩坑），目的：不能直接修改原有的state，把原有的深度克隆一份，return的结果才是覆盖原有的信息
  state = JSON.parse(JSON.stringify(state))
  let { key, content } = action
  switch (action.type) {
    // 增加的任务信息：content传递进来
    case TYPE.ADD_ITEM:
      // 给每个记录都赋唯一key值，区分各个项目。注意这里不能直接用长度来代替，因为增删的时候，key会变化
      content.key = state.data.length === 0 ? 1 : (parseFloat(state.data[state.data.length - 1]['key']) + 1)
      state.data.push(content)
      console.log(state.data);
      break
    case TYPE.DELETE_ITEM:
      state.data = state.data.filter(item => item.key !== key)
      // console.log(state.data);
      break
    case TYPE.EDIT_CONTENT:
      let { row } = action
      const index = state.data.findIndex(item => row.key === item.key);
      const item = state.data[index];
      state.data.splice(index, 1, { ...item, ...row });
      break
    case TYPE.SELECT_ITEM:
      let { rowKeys } = action
      state.data.map(item => {
        /* eslint-disable no-unused-expressions */
        rowKeys.findIndex(k => k === item.key) >= 0 ? (item.status = 1, item.statusShow = '已完成') : (item.status = 0, item.statusShow = '未完成')
      })
      break
  }
  storage.set('Data', state.data)
  return state
}