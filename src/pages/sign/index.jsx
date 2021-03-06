import React,{useState} from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import jsMd5 from 'js-md5';

import {sortAscii} from '@/utils/utils';

const PageSign = () => {
  const [form] = Form.useForm();
  const [str,setStr] = useState('');
  const [sign,setSign] = useState('');

  const onFinish = values => {
    const {AppSecret,params} = values;
    const obj = {};
    params.forEach(({key,value})=>{
      obj[key] = value;
    });
    const _str = AppSecret + sortAscii(obj) + AppSecret;
    const _sing = jsMd5('str');
    setStr(_str);
    setSign(_sing);
  };

  const onReset = function (){
    form.resetFields();
  }

  return (
    <div>
      <Form form={form} initialValues={{params:[{key:'',value:''}]}} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" style={{maxWidth:500}}>
        <Form.Item label="AppSecret" name="AppSecret" rules={[{ required: true, message: 'Missing AppSecret' }]}>
          <Input/>
        </Form.Item>
        <Form.List name="params">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    label="KEY"
                    name={[name, 'key']}
                    fieldKey={[fieldKey, 'key']}
                    rules={[{ required: true, message: 'Missing KEY' }]}
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="VALUE"
                    name={[name, 'value']}
                    fieldKey={[fieldKey, 'value']}
                    rules={[{ required: true, message: 'Missing VALUE' }]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  ????????????
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ??????sign
          </Button>
          <Button style={{marginLeft:16}} onClick={onReset}>
            ??????
          </Button>
        </Form.Item>
      </Form>
      <div style={{fontSize:20}}>
        <div>????????????????????????{str}</div>
        <div>Md5???sign??????{sign}</div>
      </div>
    </div>
  );
};

export default PageSign;
