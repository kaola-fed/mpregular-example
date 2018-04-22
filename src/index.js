import App from './index.rgl'

App.mpType = 'app';

const app = new App()

app.$inject()

export default {
  config: {
    pages: [
      // 'pages/detail/index',
      'pages/todomvc/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
