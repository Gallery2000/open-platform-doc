import React,{useState} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {prefix} from '@/utils/request'


function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadImage = ({value,onChange})=>{
  const [loading,setLoading] = useState(false);


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      onChange(info.file.response.data.url);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const token = localStorage.getItem('token');

  return(
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      headers={{
        Authorization: `Bearer ${token}`,
      }}
      action={`${prefix}/upload/qq`}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
};

export default UploadImage;
