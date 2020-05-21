import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Input, Popconfirm, Space, Table} from 'antd';

import {connect} from 'react-redux'
import action from "../store/action";

const EditableContext = React.createContext();

// 可编辑文本框
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                      }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  // 内容编辑框不能为空
  if (editable && dataIndex === 'content') {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title}不能为空`,
          },
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{paddingRight: 24}}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  // 备注编辑框可以为空
  if (editable && dataIndex === 'memo') {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title}不能为空`,
          },
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{paddingRight: 24}}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class TodoBody extends React.Component{
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '内容',
        dataIndex: 'content',
        width: '30%',
        editable: true,
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        width: '20'
      },
      {
        title: '备注',
        dataIndex: 'memo',
        width: '20%',
        editable: true
      },
      {
        title: '状态',
        dataIndex: 'statusShow',
        width: '10%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) =>
          this.props.data.length >= 1 ? (
            <Popconfirm
              placement="topRight"
              title="确认删除该任务吗？"
              onConfirm={() => this.handleDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
  };

  // 删除整行
  handleDelete = key => {
    this.props.deleteItem(key)
  };

  // 更改内容
  handleSave = row => {
    this.props.editContent(row)
  };

  // 测试data数据
  test = () => {
    console.log(this.props.data);
  }

  // 存放所有被选中的任务行，目的：其自身（antd）传参需要
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.props.selectItem(selectedRowKeys)
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
      ],
    };

    const { data } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          pagination={{position: ['bottomCenter']}}
          rowSelection={rowSelection}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={columns}
        />
        {/*<button onClick={this.test}>data</button>*/}
      </div>
    )
  }
}

// export default connect(state => ({...state.toDoList}), action.item)(TodoBody)