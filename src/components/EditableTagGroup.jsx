import React from "react";
import {Tag, Input, Tooltip} from 'antd';
import {PlusOutlined} from '@ant-design/icons';


class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  handleClose = removedTag => {
    const {value=[],onChange} = this.props;

    const tags = value.filter(tag => tag !== removedTag);
    onChange(tags);
  };

  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({inputValue: e.target.value});
  };

  handleInputConfirm = () => {
    const {inputValue} = this.state;
    const {value=[],onChange} = this.props;
    if (inputValue && value.indexOf(inputValue) === -1) {
      onChange([...value, inputValue]);
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({editInputValue: e.target.value});
  };

  handleEditInputConfirm = () => {
    this.setState(({ editInputIndex, editInputValue}) => {
      const {value=[],onChange} = this.props;
      const newTags = value;
      newTags[editInputIndex] = editInputValue;
      onChange(newTags);
      return {
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input
  };

  saveEditInputRef = input => {
    this.editInput = input
  };

  render() {
    const { inputVisible, inputValue, editInputIndex, editInputValue} = this.state;
    const {value=[]} = this.props;
    return (
      <div className="edit-tag__wrap">
        {value.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={index}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={index}
              closable
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    this.setState({editInputIndex: index, editInputValue: tag}, () => {
                      this.editInput.focus();
                    });
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            style={{width:78}}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined/> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;