import App from './index.rgl'

const app = new App()

app.$inject()

export default {
  config: {
    pages: [
      'pages/index/index',
      'pages/counter/index',
      'pages/todomvc/index',
      'pages/list/index',
      'pages/r-html/index',
      'pages/r-model/index',
      'pages/r-component/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
