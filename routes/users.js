var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.get('/', function (req, res, next) {
    User.fetch(function (err, docs) {
        if (err) return new Error('err')
        res.render('userlist', {
            title: '用户列表页',
            users: docs
        })
    })
});

/* GET users listing. */
router.get('/:name', function (req, res, next) {
    res.send('hello, name = ' + req.params.name);
});


module.exports = router;
