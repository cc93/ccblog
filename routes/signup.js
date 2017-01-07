/**
 * Created by congcong on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup', {title: '注册'});
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
    // req.params.user -> req.router.user  req.body.user  req.query.user
    var _user = req.body
    var username = _user.username
    var email = _user.email
    var password = _user.password
    User.findOne({username: username}, function (err, doc) {
        if (err) return console.error(err);
        //用户名已存在
        if (doc) {
            res.send({
                code: 401,
                desc: '用户名已存在!'
            })
        } else {
            User.create(_user, function (err, doc) {
                if (err) return console.error(err);
                res.send({
                    code: 200,
                    desc: '注册成功!',
                    //data: 新插入数据库的用户信息
                    data: doc
                })
            })
        }
    })


});

module.exports = router;