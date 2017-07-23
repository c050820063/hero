// 控制器模块
const path = require('path');

const fs = require('fs');
//导入model模块
const model = require('./model.js');

const querystring = require('querystring');

const moment = require('moment');

module.exports = {
    //加载首页模块
    getIndexPage(req, res) {
        model.getAllHeros((err, data) => {
            if (err) throw err;
            res.render('index', { list: data });
        })
    },
    //加载添加英雄模块
    getAddPage(req, res) {
        res.render('add', {});
    },
    //添加新英雄
    addNewHero(req, res) {
        var data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            var hero = querystring.parse(data);
            hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
            var id = 0;
            model.getAllHeros((err, heros) => {
                heros.forEach(item => {
                    if (item.id > id) {
                        id = item.id;
                    };
                });
                id++;
                hero.id = id;
                model.addNewHero(hero, (err, isok) => {
                    if (isok) {
                        res.end(JSON.stringify({
                            code: 0
                        }))
                    } else {
                        res.end(JSON.stringify({
                            code: 1,
                            msg: "写入失败"
                        }))
                    }
                })
            });
        })
    },
    //静态资源加载
    getStaticRes(req, res) {
        var url = req.url;
        fs.readFile(path.join(__dirname, url), (err, data) => {
            if (err) return res.end('404');
            //如果是css文件加载头文件
            if (/\.css$/.test(url)) {
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8'
                })
            }
            res.end(data);
        })
    }

}