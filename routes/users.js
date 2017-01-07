var express = require('express');
var router = express.Router();
var User = require('../models/user')
var signinRequired = require('../middlewares/user').signinRequired
var adminRequired = require('../middlewares/user').adminRequired

router.get('/', signinRequired, adminRequired, function (req, res, next) {
    User.fetch(function (err, docs) {
        if (err) return console.error(err);
        console.log('user in session = ' + JSON.stringify(req.session.user));
        res.render('userlist', {
            title: '用户列表页',
            users: docs
        })
    })
});
router.post('/', function (req, res, next) {
    res.send({
        status: 200,
        description: 'user in session',
        data: req.session.user
    });
})

//登出
router.get('/logout', function (req, res, next) {
    delete req.session.user
    res.end()
})
/* GET users listing. */
router.get('/:name', function (req, res, next) {
    res.send('hello, name = ' + req.params.name);
});


module.exports = router;
