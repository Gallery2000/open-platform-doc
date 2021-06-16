import React from 'react';
import {Typography, Divider, Table} from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { Column } = Table;

const headerDataSource = [
  {
    title:"Authorization",
    required:"是",
    type:"string",
    description:`httpPost.addHeader("Authorization","Bearer "+ accessToken)`,
  }
];
const apiDataSource = [
  {
    title:'timestamp',
    required:'是',
    type:'Date',
    description:'时间戳，例如：1468476350。API服务端允许客户端请求最大时间误差为10分钟。',
  },
  {
    title:'sign',
    required:'是',
    type:'string',
    description:'API输入参数签名结果,签名算法参照下面的介绍。',
  }
];

const dataSource = [
  {
    title:'mobile_operators',
    required:'是',
    type:'string',
    description:'运营商参数：tplus | laotelecom',
  },
  {
    title:'telephone_number',
    required:'是',
    type:'string',
    description:'0205/0207开头的老挝手机号码',
  },
];
const columns = [
  {
    title: '参数名',
    dataIndex: 'title',
  },
  {
    title: '必选',
    dataIndex: 'required',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '说明',
    dataIndex: 'description',
  }
];


const response = `
{
    "data": {
      "banlance":"2076005343"
    },
    "status": {
        "code": 0,
        "message": "SUCCESS"
    }
}
  `

const topUp = function (){
    return(
      <Typography style={{maxWidth:1200}}>
        <Title level={5}>请求URL：</Title>
        <Text code>http://api.hfniudao.com/api/gateway/laos/checkBalance</Text>
        <Title level={5}>请求方式：</Title>
        <Text>POST</Text>
        <Title level={5}>公共Header：</Title>
        <Table dataSource={headerDataSource} pagination={false} bordered columns={columns}/>
        <Title level={5}>公共参数：</Title>
        <Table dataSource={apiDataSource} pagination={false} bordered columns={columns}/>
        <Title level={5}>参数：</Title>
        <Table dataSource={dataSource} pagination={false} bordered columns={columns}/>
        <Title level={5}>返回示例</Title>
        <div className="my-code">{response}</div>
        <Title level={5}>备注</Title>
        <Text>更多返回错误代码请看首页的错误代码描述</Text>
      </Typography>
    )
}
export default topUp;
