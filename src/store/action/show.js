import {SHOW_ALL, SHOW_DONE, SHOW_DOING, DELETE_ALL, TEST} from "../action-type";

// 显示项目
let show = {
  showAll() {
    return {
      type: SHOW_ALL
    }
  },
  showDone() {
    return {
      type: SHOW_DONE
    }
  },
  showDoing() {
    return {
      type: SHOW_DOING
    }
  },
  // 暂时没用，直接在footer页面中作清空处理
  deleteAll() {
    return {
      type: DELETE_ALL
    }
  },


}
export default show