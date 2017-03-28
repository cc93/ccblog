var express = require('express');
var router = express.Router();
var User = require('../models/user')
var signinRequired = require('../middlewares/user').signinRequired
var adminRequired = require('../middlewares/user').adminRequired

router.get('/list', signinRequired, adminRequired, function (req, res, next) {
    User.fetch(function (err, docs) {
        if (err) return console.error(err);
        res.render('userlist', {
            title: '用户列表页',
            users: docs
        })
    })
});
router.post('/who', function (req, res, next) {
    res.send({
        code: 200,
        desc: 'user in session',
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
    // req.params.user -> 1.req.route.user  2.req.body.user  3.req.query.user
    res.send('hello, name = ' + req.params.name);
});


module.exports = router;
