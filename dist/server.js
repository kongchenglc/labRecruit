const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const axios = require('axios')

const app = new Koa()
const router = new Router()
let theCookie = []

//渲染函数，硬编码返回index
function render() {
    return new Promise((resolve, reject)=>{
        fs.readFile('./index.html', 'binary', (err, data)=>{
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

//当有页面请求，从官网获取一个cookie，设置到页面响应头
router.get('/index.html', async(ctx, next) => {
    await axios({
        methods:'get',
        url:'http://222.24.62.120/'
    }).then(data=>{
        //cookie的解析处理
        theCookie = data.headers['set-cookie'][0].split(';')[0].split('=');
        theCookie.push({ 
            // domain: '222.24.62.120',
            path: '/',
            httpOnly: false,
        });
        console.log(theCookie);
    }).catch(err=>{
        console.log(err);
    })
    ctx.cookies.set(...theCookie);
    ctx.body = await render();
    await next();
})


//使用中间件，开启服务
app .use(router.routes())
    .use(router.allowedMethods())
    .use(static(__dirname))
    .listen(3000, () => {
        console.log('[demo] static-use-middleware is starting at port 3000')
    })