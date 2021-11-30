const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('.'));
app.listen(3087);
 
console.log('listening on port 3087');