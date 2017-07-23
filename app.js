const http = require('http');

//导入router模块
const router = require('./router.js');

//导入render模块
const bindRender = require('./render.js');

var server = http.createServer();

server.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});

server.on('request', (req, res) => {
    bindRender(res);

    router(req, res);
})