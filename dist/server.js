const Koa = require('koa')
const fs = require('fs')
const http = require('http')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const axios = require('axios')

const app = new Koa()
const router = new Router()
let theCookie = []


//处理post请求
app.use(async (ctx,next)=>{
    //学生登录
    if (ctx.url === '/login' && ctx.method === 'POST') {
        let chunks = ''
        console.log('postttttt');
        ctx.req.on('data', chunk=>{
            chunks += chunk;
        })
        ctx.req.on('end', ()=>{
            let data = JSON.parse(chunks)
            console.log(data.sNumber);
        })
    } else {
        console.log('other: ' + ctx.url + ' + ' + ctx.method);  
    }
    await next();
})




//当有页面请求，判断如果是验证码，转发图片和cookie
router.get('/CheckCode.aspx', async (ctx, next) => {
    //验证码请求配置文件
    const option = {
        hostname: '222.24.62.120',
        path: '/CheckCode.aspx',
        headers: {
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Accept-Encoding': 'Unicode',  //这里设置返回的编码方式 设置其他的会是乱码
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Host': '222.24.62.120',
        }
    };
    //请求验证码函数
    await new Promise((resolve, reject)=>{
        http.get(option, res=>{
            //配置客户端相应头
                //cookie的解析处理
                if (res.headers['set-cookie']) {
                    theCookie = res.headers['set-cookie'][0].split(';')[0].split('=');
                    theCookie.push({
                        path: '/',
                        httpOnly: false,
                    });
                    ctx.cookies.set(...theCookie);
                }
            ctx.res.writeHead(200, {
                'Content-Type': 'image/png;',
                'Accept-Ranges': 'bytes',
                'Transfer-Encoding': 'identity'
            });
            //\配置客户端相应头

            res.on('data', chunk=>{
                ctx.res.write(chunk, 'binary');
            })
            res.on('end',()=>{
                ctx.res.end()
            })
        })
    })
    await next();
})






//使用中间件，开启服务
app .use(router.routes())
    .use(router.allowedMethods())
    .use(static(__dirname))
    .listen(3000, () => {
        console.log('[demo] static-use-middleware is starting at port 3000')
    })