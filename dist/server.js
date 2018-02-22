const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()


const staticPath = './'

app.use(static(
    path.join(__dirname, staticPath)
))

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})