/**
 * Created by congcong on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');


var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signin', {title: '登录'});
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    var _user = req.body
    var username = _user.username
    var password = _user.password
    User.findOne({username: username}, function (err, doc) {
        if (err) console.error(err);
        if (!doc) {
            res.send({
                code: 402,
                desc: '用户名不存在！'
            })
            return
        }
        doc.comparePassword(password, function (err, isMatched) {
            if (err) console.error(err);
            if (isMatched) {
                //注意这里不能是 _user 因为_user中的密码是明文的，存储在数据库的密码必须加密
                //cookie保存在客户端，session保存在服务器
                //cookie中存有对应站点的session name(key) (明文)， session id(hash值) （暗文）
                req.session.user = doc
                res.send({
                    code: 200,
                    desc: '登录成功！'
                })
            } else {
                res.send({
                    code: 403,
                    desc: '密码错误！'
                })
            }
        })

    })


});

module.exports = router;