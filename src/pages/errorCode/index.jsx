import React from 'react';
import {Table} from 'antd'

const { Column } = Table;

const dataSource = [
  {
    error_code:"1",
    description:"无效AccessToken",
  },
  {
    error_code:"4",
    description:"验签失败",
  },
  {
    error_code: "5",
    description: "参数错误"
  },
  {
    error_code: "13",
    description: "超时"
  },
  {
    error_code: "16",
    description: "预存款余额不足了，限制接口调用"
  }
]

const errorCode = function (){
  return (
    <div style={{maxWidth:1200}}>
      <Table dataSource={dataSource} pagination={false} bordered>
        <Column title="错误代码" dataIndex="error_code"/>
        <Column title="描述" dataIndex="description" />
      </Table>
    </div>
  )
}
export default errorCode;
