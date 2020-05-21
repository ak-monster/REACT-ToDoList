import React from "react";
import { connect } from "react-redux"
import action from "../store/action";

import storage from "../common/Storage";

import { Button, Space, Popconfirm, message } from "antd";
const text = '确定要清空缓存并刷新页面吗？';

class TodoFooter extends React.Component{
  constructor (props) {
    super(props)
  }

  confirm = () => {
    message.info('清空缓存成功');
    storage.remove('Data')
    // 延迟目的：让弹窗停留
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  render() {
    return (
      <div>
        <Space>
          <Button type="primary"
                  onClick={this.props.showAll}>
            全部
          </Button>
          <Button type="primary"
                  onClick={this.props.showDone}>
            已完成
          </Button>
          <Button type="primary"
                  onClick={this.props.showDoing}>
            未完成
          </Button>
        </Space>
        <Popconfirm
          placement="topRight"
          title={text}
          onConfirm={this.confirm}
          okText="确认"
          cancelText="取消"
          style={{position: 'absolute', right: '15px'}}>
          <Button
            type="primary"
            danger
            style={{position: 'absolute', right: '15px'}}>
            清空缓存并刷新
          </Button>
        </Popconfirm>
        <div style={{ textAlign: 'center', marginTop: '20px'}}>乌园前端面试测试@2020 Created by China.zf</div>
      </div>
    )
  }
}

export default connect(state => ({...state.showList}), action.show)(TodoFooter)