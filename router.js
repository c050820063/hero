//导入控制器模块
const handle = require('./handle.js');

module.exports = function(req, res) {
    var url = req.url;
    var method = req.method.toLowerCase();
    if (method == 'get' && url === '/') {
        handle.getIndexPage(req, res);
    } else if (method == 'get' && url === '/add') {
        handle.getAddPage(req, res);
    } else if (method == 'post' && url === '/add') {
        // console.log('lall')
        handle.addNewHero(req, res);

    } else if (url.indexOf('/node_modules/') == 0) {
        handle.getStaticRes(req, res);
    } else {
        res.end('404');
    }
}