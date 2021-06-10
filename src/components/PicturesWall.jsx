import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {prefix} from '@/utils/request'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class PicturesWall extends React.Component {

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  componentDidMount(){
    const {value=[]} = this.props;
    const fileList = value.map((url,uid)=>({url,uid,status:'done',name:url}));
    this.setState({ fileList })
  }


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => {
    const images = fileList.filter(f=>f.status==='done').map(f=>f.url||f.response.url);
    this.props.onChange(images);
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );


    const token = localStorage.getItem('token');

    return (
      <>
        <Upload
          action={`${prefix}/upload/image`}
          listType="picture-card"
          fileList={fileList}
          multiple
          headers={{
            Authorization: `Bearer ${token}`,
          }}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall;
