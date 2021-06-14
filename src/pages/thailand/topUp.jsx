import React from 'react';
import {Typography, Table} from 'antd';
import {Link} from 'umi';

const { Title, Text, } = Typography;

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
    description:<span>运营商参数:12CALL/TRMV/HAPPY/....，更多详细参考<Link to="/thailand/packageComplete">套餐大全</Link></span>,
  },
  {
    title:'telephone_number',
    required:'是',
    type:'string',
    description:'06/08/09开头的泰国手机号码',
  },
  {
    title:'top_up_amount',
    required:'是',
    type:'string',
    description:<span>充值金额，详细参考<Link to="/thailand/packageComplete">套餐大全</Link></span>,
  },
  {
    title:'out_trade_no',
    required:'是',
    type:'string',
    description:'格式a-z，A-Z，0-9，长度10-30',
  },
  {
    title:'notify_url',
    required:'是',
    type:'string',
    description:'回调地址: POST 接收充值结果 transaction_id , status , msg_zh,dest_ref',
  }
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
        "trans_id":"1000001",
        "msisdn":"2076005343",
        "amount":"500",
    },
    "status": {
        "code": 0,
        "message": "SUCCESS"
    }
}
  `;

const reply = `
{
    "trans_id": "1000001", //系统订单号
    "status": true, //充值状态
    "dest_ref": "1234567890123456", //用户单号
    "msg_zh": "号码未激活" //信息
}
`;

const topUp = function (){
    return(
      <Typography style={{maxWidth:1200}}>
        <Title level={5}>请求URL：</Title>
        <Text code>http://api.defu2020.com/api/gateway/thailand/topUp</Text>
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
        <Title level={5}>回调示例</Title>
        <div className="my-code">{reply}</div>
        <Title level={5}>备注</Title>
        <Text>更多返回错误代码请看首页的错误代码描述</Text>
      </Typography>
    )
}
export default topUp;
