const Koa = require('koa')
const fs = require('fs')
const http = require('http')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const axios = require('axios')
const monk = require('monk')

const databaseUrl = 'localhost:27017/labRecruit'
const app = new Koa()
const router = new Router()
const db = monk(databaseUrl);
let theCookie = ''


async function dbUpdateState(data) {
    if(data.theToken === 'HeIsAdmin') {
        return db
            .get('student')
            .update({ 'sNumber': data.theSNumber }, { "$set": {status: data.theStatus} })
            .then(result => {
                if(result.nModified === 1) {
                    return 'success';
                } else {
                    return 'dbHasNoThisStu';
                }
            })
            .catch(err => {
                return 'dbError'
            })
    } else {
        return 'TokenError';
    }
}

async function dbSearchMessages(data) {
    console.log('db searching...');
    return db.get('student')
    .find({ $or: [
        { sName: new RegExp(`.*${data.searchText}.*`) },
        { sNumber: new RegExp(`.*${data.searchText}.*`) },
        // { sClass: new RegExp(`.*${data.searchText}.*`) },
        { sSubject: new RegExp(`.*${data.searchText}.*`) },
        // { sPhone: new RegExp(`.*${data.searchText}.*`) },
        { status: new RegExp(`.*${data.searchText}.*`) },
    ] }, {_id: 0, sPassword: 0})
    .then(result => {
        return JSON.stringify(Object.assign({}, result));
    }).catch(err => {
        console.log(err);
        return 'db err';
    })
}

async function dbCheckAdmin(data) {
    return db.get('admin').find(data)
    .then(data => {
        if(data[0]) {
            return 'HeIsAdmin';
        } else {
            return 'InputError';
        }
    }).catch(err => {
        return JSON.stringify(err);
    })
}

async function setInDatabase(data) {
    return db.get('student').insert(data)
    .then(data => {
        return 'saveSuccess';
    })
    .catch(err => {
        return JSON.stringify(err);
    });
}

function getJsonFromClient(ctx) {
    return new Promise((resolve, reject)=>{
        let chunks = ''
        ctx.req.on('data', chunk => {
            chunks += chunk;
        })
        ctx.req.on('end', () => {
            let data = JSON.parse(chunks)
            resolve(data);
        })
    });
}

async function checkDBSigned(sNumber) {
    console.log('db checking...');
    return db.get('student').find({ sNumber },{ _id: 0 }).then(data => {
        if(data.length) {
            return JSON.stringify(data[0]);
        } else {
            return "unregistered";
        }
        db.close();
    })
}

async function sendToWebsite(data) {
    let post_data = `__VIEWSTATE=dDwxNTMxMDk5Mzc0Ozs%2BlYSKnsl%2FmKGQ7CKkWFJpv0btUa8%3D&txtUserName=${data.sNumber}&Textbox1=${data.sNumber}&TextBox2=${data.sPassword}&txtSecretCode=${data.checkcode}&RadioButtonList1=%D1%A7%C9%FA&Button1=&lbLanguage=&hidPdrs=&hidsc=`;//这是需要提交的数据    
    let options = {
        hostname: '222.24.62.120',
        path: '/default2.aspx',
        method: 'POST',
        headers: {
            'Host': '222.24.62.120',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Origin': 'http://222.24.62.120',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cookie': `ASP.NET_SessionId=${theCookie}`
        }
    };
    return new Promise((resolve, reject)=>{
        let chunks;
        let req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                chunks += chunk;
            });
            res.on('end',async ()=>{
                if (chunks.indexOf(`xs_main.aspx?xh=${data.sNumber}`) && res.statusCode === 302) {
                    //数据库验证此账号是否注册
                    let status = await checkDBSigned(data.sNumber);
                    resolve(status);
                } else {
                    resolve('loginFailed');
                }
            })
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        req.write(post_data);
        req.end(); 
    })
}

async function sendBacktoClient(ctx, status) {
    await ctx.res.writeHead(200, {
    });
    await ctx.res.write(status);
    await ctx.res.end();
}

async function loginCheck(ctx) {
    //得到JSON数据
    let data = await getJsonFromClient(ctx)
    //提交JSON数据
    let status = await sendToWebsite(data);
    //返回给客户端
    await sendBacktoClient(ctx, status);
}

async function loginGetCheckcode(ctx) {
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
    await new Promise((resolve, reject) => {
        http.get(option, res => {
            //配置客户端相应头
            //cookie的解析处理
            if (res.headers['set-cookie']) {
                let cookie = res.headers['set-cookie'][0].split(';')[0].split('=');
                theCookie = cookie[1];
                cookie.push({
                    path: '/',
                    httpOnly: false,
                });
                ctx.cookies.set(...cookie);
            }
            ctx.res.writeHead(200, {
                'Content-Type': 'image/png;',
                // 'Accept-Ranges': 'bytes',
                // 'Transfer-Encoding': 'identity'
            });
            //\配置客户端相应头

            //转发图片
            res.on('data', chunk => {
                ctx.res.write(chunk, 'binary');
            })
            res.on('end', () => {
                ctx.res.end()
                resolve();
            })
        })
    }).catch(err => {
        console.log(err);
    })
}

async function signIn(ctx) {
    let data = await getJsonFromClient(ctx);
    let status = await setInDatabase(data);
    await sendBacktoClient(ctx, status);
}

async function adminLogin(ctx) {
    let data = await getJsonFromClient(ctx);
    let status = await dbCheckAdmin(data);
    await sendBacktoClient(ctx, status);
}

async function adminSearch(ctx) {
    let data = await getJsonFromClient(ctx);
    let status = await dbSearchMessages(data);
    await sendBacktoClient(ctx, status);
}

async function updateStudentState(ctx) {
    let data = await getJsonFromClient(ctx);
    let status = await dbUpdateState(data);
    await sendBacktoClient(ctx, status);
}


//转发验证码和cookie
router.get('/login/CheckCode.aspx', async (ctx, next) => {
    await next();
    await loginGetCheckcode(ctx);
})


//处理post请求
app.use(async (ctx, next) => {
    await next();
    if (ctx.method === 'POST') {
        if (ctx.url === '/login') {
            //学生登录
            await loginCheck(ctx);
        } else if (ctx.url === '/signup') {
            //学生信息
            await signIn(ctx);
        } else if (ctx.url === '/admin_login') {
            //管理员登录
            await adminLogin(ctx);
        } else if (ctx.url === '/admin_messages') {
            //管理员查询
            await adminSearch(ctx);
        } else if (ctx.url === '/admin_message') {
            //管理员更改状态
            await updateStudentState(ctx);
        }
    }
})

//使用中间件，开启服务
app .use(router.routes())
    .use(router.allowedMethods())
    .use(static(__dirname))
    .listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})