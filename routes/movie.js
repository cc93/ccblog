/**
 * Created by congcong on 2017/1/16.
 */
var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res, next) {
    Movie.fetch(function (err, docs) {
        if (err) return console.error(err);
        res.render('index', {
            title: '电影首页--正在热映的电影',
            //movies:{]
            movies: docs
        });
    })

});

router.get('/:id', function (req, res, next) {
    var id = req.params.id
    Movie.findOne({id:id},function (err, doc) {
        if (err) return console.error(err);
        res.render('detail', {
            title: '详情页',
            movie: doc
        });
    })

});


module.exports = router;