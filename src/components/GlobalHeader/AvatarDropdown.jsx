import { FieldTimeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Popconfirm, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import moment from 'moment';
import avatar from '@/assets/avatar.png'

const userMap = {
  user:"普通用户",
  clerk:"员工",
  admin:"管理员",
}

const AvatarDropdown = ({ currentUser = {}, menu, dispatch }) => {
  const [visible, setVisible] = useState(false);

  const onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/${key}`);
  };

  const hideExpireTip = () => {
    sessionStorage.setItem('hideExpireTip', '1');
    setVisible(false);
  };

  useEffect(() => {
    const THREE_DAY = new Date().getTime() + 1000 * 60 * 60 * 24 * 3;
    const hasHideExpireTip = sessionStorage.getItem('hideExpireTip');
    if (THREE_DAY > currentUser.expire_date && !hasHideExpireTip) {
      setVisible(true);
    }
  }, [currentUser]);

  const menuHeaderDropdown = () => {
    return (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
  };

  const now = new Date().getTime();
  const { expire_date } = currentUser;

  return currentUser && currentUser.email ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar className={styles.avatar} src={avatar} alt="avatar" />
          <div>
            <p className={styles.name}>{currentUser.email}</p>
            <p className={styles.name}>{userMap[currentUser.auth]}</p>
          </div>
        </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
