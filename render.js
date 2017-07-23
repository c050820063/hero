const template = require('art-template');
const path = require('path');

//封装渲染模板模块


module.exports = function(res) {
    res.render = function(fileName, objData) {
        var html = template(path.join(__dirname, 'views/' + fileName + '.html'), objData);
        res.end(html);
    }
}