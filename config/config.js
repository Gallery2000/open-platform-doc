// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
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
              icon: 'AppstoreOutlined',
              component: './guide',
            },
            {
              path: '/api',
              name: '接入指南',
              icon: 'AppstoreOutlined',
              routes:[
                {
                  path: '/api/topUp',
                  name: '话费充值',
                  component: './api/topUp',
                },
              ]
            },
            {
              path: '/errorCode',
              name: '错误代码',
              icon: 'AppstoreOutlined',
              component: './errorCode',
            },
            {
              path: '/sign',
              name: '验签工具',
              icon: 'AppstoreOutlined',
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
