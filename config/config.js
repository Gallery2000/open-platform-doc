// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  history:{
    type: 'hash'
  },
  hash: false,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/guide',
            },
            {
              path: '/guide',
              name: '接入指南',
              icon: 'DashboardOutlined',
              component: './guide',
            },
            {
              path: '/checkBalance',
              icon: 'AppstoreOutlined',
              name: '查看余额接口',
              component: './checkBalance',
            },
            {
              name:'老挝接口',
              icon: 'AppstoreOutlined',
              path:'/laos',
              routes:[
                {
                  path: '/laos/topUp',
                  name: '话费充值',
                  component: './laos/topUp',
                },
                {
                  path: '/laos/checkBalance',
                  name: '查看余额',
                  component: './laos/checkBalance',
                },
                {
                  path: '/laos/checkInformation',
                  name: '检查信息',
                  component: './laos/checkInformation',
                },
              ]
            },
            {
              name:'泰国接口',
              icon: 'AppstoreOutlined',
              path:'/thailand',
              routes:[
                {
                  path: '/thailand/topUp',
                  name: '话费流量充值',
                  component: './thailand/topUp',
                },
                {
                  path: '/thailand/checkInformation',
                  name: '号码运营商查询',
                  component: './thailand/checkInformation',
                },
                {
                  path: '/thailand/packageComplete',
                  name: '话费流量套餐大全',
                  component: './thailand/packageComplete',
                },
              ]
            },
            {
              path: '/errorCode',
              name: '错误代码',
              icon: 'ExclamationCircleOutlined',
              component: './errorCode',
            },
            {
              path: '/sign',
              name: '验签工具',
              icon: 'ToolOutlined',
              component: './sign',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
