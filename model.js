const path = require('path');

const fs = require('fs');


function getHerosList(callback) {
    fs.readFile(path.join(__dirname, 'data.json'), (err, data) => {
        if (err) return callback(err);
        var datalist = JSON.parse(data);
        callback(null, datalist);
    })
};

function writeAll(heros, callback) {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(heros), (err) => {
        if (err) return callback(err);
        callback(null, true);
    })
}

module.exports = {
    getAllHeros(callback) {
        getHerosList(callback);
    },
    addNewHero(hero, callback) {
        //添加新英雄
        getHerosList((err, heros) => {
            if (err) return callback(err);
            heros.push(hero);
            writeAll(heros, callback);
        })
    }
}