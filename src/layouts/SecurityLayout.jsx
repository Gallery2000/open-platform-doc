import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { connect } from 'umi';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    if (loading || !isReady) {
      return <PageLoading />;
    }

    return children;
  }
}

export default connect(({ loading }) => ({
  loading: loading.models.user,
}))(SecurityLayout);
