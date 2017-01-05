/**
 * Created by congcong on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');


var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signin', {title: '登录'});

});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
    var _user = req.body
    var username = _user.username
    var password = _user.password
    User.findOne({username:username}, function(err, doc){
        if(err) console.error(err);
        if(!doc){
            res.send({
                status:402,
                description:'用户名不存在！'
            })
            return
        }
        doc.comparePassword(password, function(err, isMatched){
            if(err) console.error(err);
            if(isMatched){
                res.send({
                    status:200,
                    description:'登录成功！'
                })
            }else{
                res.send({
                    status:403,
                    description:'密码错误！'
                })
            }
        })

    })


});

module.exports = router;