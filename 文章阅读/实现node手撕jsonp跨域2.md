# 地址
https://juejin.im/post/5e74854df265da573f359506
# 总结
1. js请求部分
const options = {
      callbackName: 'callback'
    }
    function jsonp({ url, params, callback }) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script');
         params = JSON.parse(JSON.stringify(params));
        const arr = [];
        for (const key in params) {
          arr.push(`${key}=${params[key]}`);
        }
        arr.push(`callback=${callback}`);
        script.src = `${url}?${arr.join('&')}`;
        document.body.append(script);
        window[options.callbackName] = function(data) {
          delete window[options.callbackName];
          resolve(data);
          document.body.removeChild(script);
        };
      });
    }
    jsonp({
      url: 'http://127.0.0.1:7001/jsonp',
      params: {
        word: 'i love you',
      },
      callback: 'callback'
    }).then(data => {
      console.log(data)
    });

2. Egg.js 实现JSONP
(1).router.js
module.exports = app => {
const { router, controller } = app;
const jsonp = app.jsonp();
router.get('/', controller.home.index);
router.get('/jsonp', jsonp, controller.home.jsonpTest);
};

(2).controller
 async jsonpTest() {
    const { ctx } = this;
    const {callback,wd} = ctx.query;
    console.log(callback, wd);
    let data = {
      username: 'test',
      password: '123123',
    };
    ctx.body = data;
  }
  (3).express.js

  const express = require('express')
const app = express()
const port = 3000

var router = express.Router();
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/jsonp', function(req, res, next) {
	let data = {
    username : 'www.fire1024.com',
    password : 123456
  }
  // 调用回调函数 , 并响应
  res.send(`${callback}(${JSON.stringify(data)})`);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
