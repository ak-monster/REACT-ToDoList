import React from "react";
import { connect } from 'react-redux'
import action from "../store/action";

import { formatDate } from "../common/uitls/utils";

import {Typography, Input, Button, message, Space} from 'antd';
const { Title } = Typography;

class TodoHead extends React.Component{
  constructor(props) {
    super(props)
  }


  render() {
    // input输入值
    let value = ''
    // 加入列表中
    let addItem = () => {
      value ? this.props.addItem({
        content: value,
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        memo: '备注',
        status: 0,
        statusShow: '未完成'
      }) : message.warning('请先添加内容')
    }
    // input回车确认
    let keyUp = event => {
      value = event.target.value.trim()
      if (event.keyCode === 13) {
        addItem()
      }
    }
    // 确认按钮
    let confirm = () => {
      // console.log(this.props);
      addItem()
    }

    return (
      <div>
        <Title style={{color: 'white', textAlign: 'center', marginTop: '12px', marginBottom: '-6px'}}>ToDoList</Title>
        <Input
          placeholder="请输入待办事项"
          style={{width: '50%', marginRight: '12px'}}
          onKeyUp={keyUp}/>
        <Button
          type="primary"
          onClick={confirm}>
          确认
        </Button>
      </div>
    );
  }
}

export default connect(state => ({...state.toDoList}), action.item)(TodoHead)